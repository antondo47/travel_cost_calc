import { AIEstimates } from '@/types';
import { getMieRate } from '@/lib/gsa-per-diem';
import { getTransitInfo } from '@/lib/transit-fares';

/**
 * Returns food + local transport cost estimates using:
 * - GSA per diem M&IE rates (government data, free, no API call)
 * - Static transit fare lookup by city
 *
 * Keeps the same AIEstimates return type so nothing downstream needs to change.
 * iataCode is the destination airport code (used for GSA + transit lookups).
 */
export function fetchCostEstimates(
  iataCode: string,
  nights: number,
  adults: number,
): AIEstimates {
  const miePerPersonPerDay = getMieRate(iataCode);
  const transit = getTransitInfo(iataCode);

  // M&IE covers breakfast + lunch + dinner + incidentals
  // Subtract the incidentals portion (~$5) to get meals-only daily cost
  const foodCostPerPersonPerDay = Math.max(miePerPersonPerDay - 5, miePerPersonPerDay * 0.9);
  const foodTotalCost = Math.round(foodCostPerPersonPerDay * nights * adults);

  const localTransportPerPersonPerDay =
    Math.round(transit.fareUSD * transit.tripsPerDay * 100) / 100;
  const localTransportTotal = Math.round(
    localTransportPerPersonPerDay * nights * adults
  );

  // Estimate travel time from a typical hotel (2 km from center) using avg transit speed
  const typicalDistanceKm = 2;
  const travelMinutes = Math.round((typicalDistanceKm / transit.avgSpeedKmh) * 60);
  const travelTimeFromHotelToCenter = `~${travelMinutes} min by transit`;

  return {
    foodCostPerPersonPerDay: Math.round(foodCostPerPersonPerDay),
    foodTotalCost,
    localTransportPerPersonPerDay,
    localTransportTotal,
    travelTimeFromHotelToCenter,
    currency: 'USD',
    notes: `Food based on GSA per diem M&IE rate ($${miePerPersonPerDay}/day). Transit based on local fare data.`,
  };
}
