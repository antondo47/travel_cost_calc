import { HotelOption } from '@/types';

// ── SerpApi Google Hotels response types ──────────────────────────────────────

interface SerpApiHotelProperty {
  name: string;
  gps_coordinates?: { latitude: number; longitude: number };
  overall_rating?: number;
  hotel_class?: string;
  amenities?: string[];
  rate_per_night?: {
    extracted_lowest?: number;
  };
  total_rate?: {
    extracted_lowest?: number;
  };
}

interface SerpApiHotelsResponse {
  properties?: SerpApiHotelProperty[];
  error?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function computeNights(checkIn: string, checkOut: string): number {
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function fetchHotels(
  latitude: number,
  longitude: number,
  checkInDate: string,
  checkOutDate: string,
  adults: number,
  iataCode: string,
  cityName?: string,
): Promise<HotelOption[]> {
  const key = process.env.SERPAPI_KEY?.trim();
  if (!key) throw new Error('SERPAPI_KEY is not set');

  const nights = computeNights(checkInDate, checkOutDate);
  // Use the human-readable city name for better Google Hotels results
  const query = cityName ? `hotels in ${cityName}` : `hotels near ${iataCode}`;

  console.log(`[hotels] SerpApi query: "${query}" | ${checkInDate} → ${checkOutDate} | ${adults} adult(s)`);

  const qs = new URLSearchParams({
    engine: 'google_hotels',
    q: query,
    check_in_date: checkInDate,
    check_out_date: checkOutDate,
    adults: String(adults),
    currency: 'USD',
    sort_by: '3', // lowest price first
    gl: 'us',
    hl: 'en',
    api_key: key,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await fetch(`https://serpapi.com/search?${qs.toString()}`, {
    next: { revalidate: 0 },
  } as any);

  if (!res.ok) {
    throw new Error(`SerpApi Hotels ${res.status}: ${res.statusText}`);
  }

  const data: SerpApiHotelsResponse = await res.json();

  if (data.error) {
    throw new Error(`SerpApi Hotels error: ${data.error}`);
  }

  const properties = data.properties ?? [];
  console.log(`[hotels] SerpApi returned ${properties.length} properties`);

  if (properties.length === 0) return [];

  // Filter to properties that have pricing, then sort by total price ascending
  const priced = properties
    .filter((p) => p.rate_per_night?.extracted_lowest !== undefined)
    .sort(
      (a, b) =>
        (a.rate_per_night?.extracted_lowest ?? Infinity) -
        (b.rate_per_night?.extracted_lowest ?? Infinity)
    );

  const result: HotelOption[] = priced.slice(0, 5).map((p, i) => {
    const pricePerNight = p.rate_per_night?.extracted_lowest ?? 0;
    // Prefer the total_rate if available, otherwise compute from nightly rate
    const totalPrice = p.total_rate?.extracted_lowest ?? Math.round(pricePerNight * nights);

    const geo = p.gps_coordinates;
    const distanceKm =
      geo ? Math.round(haversineKm(latitude, longitude, geo.latitude, geo.longitude) * 10) / 10 : 0;

    // Parse hotel class string like "5-star hotel" → 5
    let rating = p.overall_rating;
    if (!rating && p.hotel_class) {
      const match = p.hotel_class.match(/(\d+)/);
      if (match) rating = parseInt(match[1], 10);
    }

    return {
      hotelId: `serpapi-${i}-${p.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: p.name,
      latitude: geo?.latitude ?? latitude,
      longitude: geo?.longitude ?? longitude,
      distanceFromCenterKm: distanceKm,
      pricePerNight: Math.round(pricePerNight * 100) / 100,
      totalPrice: Math.round(totalPrice * 100) / 100,
      currency: 'USD',
      rating,
      amenities: p.amenities?.slice(0, 5),
      checkInDate,
      checkOutDate,
      transitTimeMinutes: undefined,
      transitTimeFormatted: undefined,
    };
  });

  console.log(`[hotels] returning ${result.length} hotels (cheapest first)`);
  return result;
}
