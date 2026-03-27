'use client';

import { useState } from 'react';
import { TripCost } from '@/types';
import FlightOptions from './FlightOptions';
import HotelOptions from './HotelOptions';
import CostBreakdown from './CostBreakdown';
import ActivitiesPanel from './ActivitiesPanel';

interface ResultsPanelProps {
  data: TripCost;
}

export default function ResultsPanel({ data }: ResultsPanelProps) {
  const { flights, hotels, aiEstimates, activities, summary, meta, warnings } = data;

  const [selectedFlightId, setSelectedFlightId] = useState(flights[0]?.id ?? '');
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.hotelId ?? '');

  const selectedFlight = flights.find((f) => f.id === selectedFlightId);
  const selectedHotel = hotels.find((h) => h.hotelId === selectedHotelId);

  return (
    <div className="space-y-6">
      {/* Trip meta header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-5">
        <p className="text-sm opacity-80 mb-1">Trip estimate for</p>
        <h2 className="text-2xl font-bold">
          {meta.origin} → {meta.destination}
        </h2>
        <p className="text-sm opacity-80 mt-1">
          {meta.nights} night{meta.nights > 1 ? 's' : ''} · {meta.adults} adult{meta.adults > 1 ? 's' : ''}
        </p>
      </div>

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800"
            >
              <span className="shrink-0">⚠️</span>
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cost breakdown (shown at top for quick scan) */}
      <CostBreakdown
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        aiEstimates={aiEstimates}
        summary={summary}
        activitiesTotal={summary.activitiesTotal}
      />

      {/* Flight options */}
      <FlightOptions
        flights={flights}
        selectedId={selectedFlightId}
        onSelect={setSelectedFlightId}
      />

      {/* Hotel options */}
      <HotelOptions
        hotels={hotels}
        selectedId={selectedHotelId}
        onSelect={setSelectedHotelId}
      />

      {/* Activity suggestions */}
      {activities && activities.length > 0 && (
        <ActivitiesPanel
          activities={activities}
          totalBudgetUSD={summary.activitiesTotal > 0 ? summary.activitiesTotal : undefined}
        />
      )}
    </div>
  );
}
