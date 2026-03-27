'use client';

import { HotelOption } from '@/types';

interface HotelOptionsProps {
  hotels: HotelOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  return (
    <span className="text-yellow-400 text-xs">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function HotelOptions({ hotels, selectedId, onSelect }: HotelOptionsProps) {
  if (hotels.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Hotels Near Center</h2>
        <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
          No hotels found within 1 hour of the city center for these dates.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Hotels
        <span className="ml-2 text-sm font-normal text-gray-500">
          (≤1 hr transit to center — select one)
        </span>
      </h2>
      <div className="space-y-3">
        {hotels.map((hotel, i) => (
          <label
            key={hotel.hotelId}
            className={`flex items-start gap-3 cursor-pointer rounded-xl border-2 p-4 transition-all ${
              selectedId === hotel.hotelId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <input
              type="radio"
              name="hotel"
              value={hotel.hotelId}
              checked={selectedId === hotel.hotelId}
              onChange={() => onSelect(hotel.hotelId)}
              className="mt-1 accent-blue-600"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm leading-tight">
                    {hotel.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <StarRating rating={hotel.rating} />
                    {hotel.transitTimeFormatted ? (
                      <span className="text-xs text-gray-500">
                        🚇 {hotel.transitTimeFormatted} to center
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        {hotel.distanceFromCenterKm.toFixed(1)} km from center
                      </span>
                    )}
                    {i === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">
                        Best value
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-gray-900">
                    ${hotel.pricePerNight.toFixed(0)}<span className="text-xs font-normal text-gray-500">/night</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    ${hotel.totalPrice.toFixed(0)} total
                  </p>
                </div>
              </div>
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {hotel.amenities.slice(0, 4).map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {a.replace(/_/g, ' ').toLowerCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
