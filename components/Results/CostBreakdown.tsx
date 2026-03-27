'use client';

import { FlightOption, HotelOption, AIEstimates, TripSummary } from '@/types';

interface CostBreakdownProps {
  selectedFlight: FlightOption | undefined;
  selectedHotel: HotelOption | undefined;
  aiEstimates: AIEstimates | null;
  summary: TripSummary;
  activitiesTotal?: number;
}

function Row({
  label,
  value,
  badge,
  bold,
  sub,
}: {
  label: string;
  value: number;
  badge?: string;
  bold?: boolean;
  sub?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${bold ? 'border-t border-gray-200 mt-1 pt-3' : ''}`}
    >
      <div>
        <span className={`text-sm ${bold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
          {label}
        </span>
        {badge && (
          <span className="ml-2 text-xs bg-amber-100 text-amber-700 font-medium px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <span className={`text-sm ${bold ? 'font-bold text-gray-900 text-base' : 'text-gray-800'}`}>
        ${value.toFixed(0)}
      </span>
    </div>
  );
}

export default function CostBreakdown({
  selectedFlight,
  selectedHotel,
  aiEstimates,
  summary,
  activitiesTotal,
}: CostBreakdownProps) {
  const flightCost = selectedFlight?.totalPrice ?? summary.cheapestFlightTotal;
  const hotelCost = selectedHotel?.totalPrice ?? summary.cheapestHotelTotal;
  const foodCost = aiEstimates?.foodTotalCost ?? 0;
  const transportCost = aiEstimates?.localTransportTotal ?? 0;
  const actCost = activitiesTotal ?? summary.activitiesTotal ?? 0;
  const grandTotal = flightCost + hotelCost + foodCost + transportCost + actCost;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Cost Breakdown</h2>

      <div className="divide-y divide-gray-100">
        {selectedFlight && (
          <Row
            label={`Flights (${summary.adults} traveler${summary.adults > 1 ? 's' : ''})`}
            value={flightCost}
            sub={`${selectedFlight.airline} · ${selectedFlight.stops === 0 ? 'Nonstop' : `${selectedFlight.stops} stop${selectedFlight.stops > 1 ? 's' : ''}`}`}
          />
        )}

        {selectedHotel ? (
          <Row
            label={`Hotel (${summary.nights} night${summary.nights > 1 ? 's' : ''})`}
            value={hotelCost}
            sub={`${selectedHotel.name} · $${selectedHotel.pricePerNight.toFixed(0)}/night`}
          />
        ) : (
          summary.cheapestHotelTotal > 0 && (
            <Row
              label={`Hotel (${summary.nights} night${summary.nights > 1 ? 's' : ''})`}
              value={hotelCost}
            />
          )
        )}

        {aiEstimates ? (
          <>
            <Row
              label="Food & dining"
              value={foodCost}
              badge="GSA rate"
              sub={`~$${aiEstimates.foodCostPerPersonPerDay}/person/day`}
            />
            <Row
              label="Local transport"
              value={transportCost}
              badge="est."
              sub={`~$${aiEstimates.localTransportPerPersonPerDay}/person/day`}
            />
          </>
        ) : (
          <div className="py-2">
            <p className="text-xs text-gray-400 italic">
              Food &amp; transport estimates unavailable
            </p>
          </div>
        )}

        {actCost > 0 && (
          <Row
            label="Activities"
            value={actCost}
            badge="AI est."
          />
        )}

        <Row label="Total estimated cost" value={grandTotal} bold />
      </div>

      {aiEstimates?.travelTimeFromHotelToCenter && (
        <div className="mt-4 flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
          <span className="text-blue-500 text-base">🚇</span>
          <p className="text-sm text-blue-700">
            <span className="font-medium">Travel time to center:</span>{' '}
            {aiEstimates.travelTimeFromHotelToCenter}
          </p>
        </div>
      )}

      {aiEstimates?.notes && (
        <p className="mt-3 text-xs text-gray-400 italic">{aiEstimates.notes}</p>
      )}
    </section>
  );
}
