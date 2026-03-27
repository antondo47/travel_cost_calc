import { FlightOption, FlightItinerary, FlightSegment } from '@/types';

// ─── SerpAPI types ────────────────────────────────────────────────────────────

interface SerpApiAirport {
  name: string;
  id: string;   // IATA code
  time: string; // "2026-04-15 06:00"
}

interface SerpApiSegment {
  departure_airport: SerpApiAirport;
  arrival_airport: SerpApiAirport;
  duration: number; // minutes
  airline: string;
  flight_number: string;
}

interface SerpApiFlightOption {
  flights: SerpApiSegment[];
  total_duration: number;
  price: number;
  departure_token?: string;
}

interface SerpApiResponse {
  best_flights?: SerpApiFlightOption[];
  other_flights?: SerpApiFlightOption[];
  error?: string;
}

interface OutboundResult {
  option: FlightOption;
  departureToken: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function minutesToISO8601(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h}H${m}M`;
}

function mapSegment(seg: SerpApiSegment): FlightSegment {
  const carrierCode = seg.flight_number.split(' ')[0] ?? seg.airline.slice(0, 2).toUpperCase();
  return {
    departure: { iataCode: seg.departure_airport.id, at: seg.departure_airport.time },
    arrival: { iataCode: seg.arrival_airport.id, at: seg.arrival_airport.time },
    carrierCode,
    number: seg.flight_number,
    duration: minutesToISO8601(seg.duration),
  };
}

function segsToItinerary(segs: SerpApiSegment[]): FlightItinerary {
  return {
    duration: minutesToISO8601(segs.reduce((s, seg) => s + seg.duration, 0)),
    segments: segs.map(mapSegment),
  };
}

// ─── SerpAPI HTTP call ────────────────────────────────────────────────────────

async function callSerpApi(params: Record<string, string>): Promise<SerpApiResponse> {
  const key = process.env.SERPAPI_KEY?.trim();
  if (!key) throw new Error('SERPAPI_KEY is not set');
  console.log('[serpapi] calling engine=google_flights', {
    departure_id: params.departure_id,
    arrival_id: params.arrival_id,
    outbound_date: params.outbound_date,
    return_date: params.return_date,
    has_departure_token: !!params.departure_token,
  });
  const qs = new URLSearchParams({ ...params, api_key: key });
  const res = await fetch(`https://serpapi.com/search?${qs.toString()}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${res.statusText}`);
  const data: SerpApiResponse = await res.json();
  console.log('[serpapi] response: best_flights=', data.best_flights?.length ?? 0, 'other_flights=', data.other_flights?.length ?? 0, 'error=', data.error ?? 'none');
  if (data.error) throw new Error(`SerpAPI: ${data.error}`);
  return data;
}

// ─── Phase 1: outbound search ─────────────────────────────────────────────────

async function fetchOutbound(
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string,
  adults: number
): Promise<OutboundResult[]> {
  const data = await callSerpApi({
    engine: 'google_flights',
    departure_id: origin,
    arrival_id: destination,
    outbound_date: departureDate,
    return_date: returnDate,
    adults: String(adults),
    type: '1', // round trip — flights[] = outbound only; price = total round-trip
    currency: 'USD',
  });

  const rawOptions = [
    ...(data.best_flights ?? []),
    ...(data.other_flights ?? []),
  ].slice(0, 5);

  return rawOptions
    .filter(opt => opt.departure_token)
    .map((opt): OutboundResult => ({
      option: {
        id: opt.departure_token!,
        airline: opt.flights[0]?.airline ?? 'Unknown',
        outbound: segsToItinerary(opt.flights),
        inbound: { duration: 'PT0H0M', segments: [] },
        stops: Math.max(0, opt.flights.length - 1),
        totalPricePerPerson: Math.round((opt.price / adults) * 100) / 100,
        totalPrice: opt.price,
        currency: 'USD',
      },
      departureToken: opt.departure_token!,
    }));
}

// ─── Phase 2: fetch return segments ──────────────────────────────────────────

async function fetchReturn(
  outbound: OutboundResult,
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string,
  adults: number
): Promise<FlightOption> {
  try {
    const data = await callSerpApi({
      engine: 'google_flights',
      departure_id: origin,
      arrival_id: destination,
      outbound_date: departureDate,
      return_date: returnDate,
      adults: String(adults),
      type: '1',
      currency: 'USD',
      departure_token: outbound.departureToken,
    });

    const returnOptions = [
      ...(data.best_flights ?? []),
      ...(data.other_flights ?? []),
    ];

    const returnSegs = returnOptions[0]?.flights ?? [];
    if (returnSegs.length === 0) return outbound.option;

    return { ...outbound.option, inbound: segsToItinerary(returnSegs) };
  } catch {
    return outbound.option;
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function fetchFlights(
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string,
  adults: number
): Promise<FlightOption[]> {
  // Phase 1: get outbound options for the single entered airport pair (2 SerpAPI calls total)
  const outbounds = await fetchOutbound(origin, destination, departureDate, returnDate, adults);

  if (outbounds.length === 0) {
    throw new Error('No flights found for this route and dates.');
  }

  const top3 = outbounds
    .sort((a, b) => a.option.totalPrice - b.option.totalPrice)
    .slice(0, 3);

  // Phase 2: fetch return segments for the top 3 options
  const phase2 = await Promise.allSettled(
    top3.map(ob => fetchReturn(ob, origin, destination, departureDate, returnDate, adults))
  );

  return phase2
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<FlightOption>).value);
}
