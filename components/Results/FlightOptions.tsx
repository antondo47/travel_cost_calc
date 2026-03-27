'use client';

import { FlightOption } from '@/types';

interface FlightOptionsProps {
  flights: FlightOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function formatDuration(iso: string): string {
  // PT2H35M -> 2h 35m
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h` : '';
  const m = match[2] ? ` ${match[2]}m` : '';
  return `${h}${m}`.trim();
}

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function FlightCard({
  flight,
  selected,
  onSelect,
  isCheapest,
}: {
  flight: FlightOption;
  selected: boolean;
  onSelect: () => void;
  isCheapest: boolean;
}) {
  const out = flight.outbound;
  const inb = flight.inbound;
  const firstSeg = out.segments[0];
  const lastSeg = out.segments[out.segments.length - 1];
  const inbFirst = inb.segments[0];
  const inbLast = inb.segments[inb.segments.length - 1];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-sm">{flight.airline}</span>
          {isCheapest && (
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
              Cheapest
            </span>
          )}
          {flight.stops === 0 && (
            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">
              Nonstop
            </span>
          )}
          {flight.stops > 0 && (
            <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">
              {flight.stops} stop{flight.stops > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ${flight.totalPrice.toFixed(0)}
          </p>
          <p className="text-xs text-gray-500">
            ${flight.totalPricePerPerson.toFixed(0)}/person
          </p>
        </div>
      </div>

      {/* Outbound */}
      <div className="text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium w-4">↗</span>
          <span>
            {firstSeg.departure.iataCode} {formatDateTime(firstSeg.departure.at)}
          </span>
          <span className="text-gray-400">→</span>
          <span>
            {lastSeg.arrival.iataCode} {formatDateTime(lastSeg.arrival.at)}
          </span>
          <span className="text-gray-400 ml-auto">{formatDuration(out.duration)}</span>
        </div>
        {inbFirst && inbLast ? (
          <div className="flex items-center gap-2">
            <span className="font-medium w-4">↙</span>
            <span>
              {inbFirst.departure.iataCode} {formatDateTime(inbFirst.departure.at)}
            </span>
            <span className="text-gray-400">→</span>
            <span>
              {inbLast.arrival.iataCode} {formatDateTime(inbLast.arrival.at)}
            </span>
            <span className="text-gray-400 ml-auto">{formatDuration(inb.duration)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-medium w-4">↙</span>
            <span>Return leg details unavailable</span>
          </div>
        )}
      </div>
    </button>
  );
}

export default function FlightOptions({ flights, selectedId, onSelect }: FlightOptionsProps) {
  if (flights.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Flights
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({flights.length} option{flights.length > 1 ? 's' : ''} — select one)
        </span>
      </h2>
      <div className="space-y-3">
        {flights.map((flight, i) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            selected={selectedId === flight.id}
            onSelect={() => onSelect(flight.id)}
            isCheapest={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
