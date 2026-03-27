import { z } from 'zod';

// INPUT

export const TripSearchSchema = z.object({
  origin: z
    .string()
    .length(3, 'Must be a 3-letter IATA code')
    .regex(/^[A-Z]{3}$/, 'Must be uppercase letters only'),
  destination: z
    .string()
    .length(3, 'Must be a 3-letter IATA code')
    .regex(/^[A-Z]{3}$/, 'Must be uppercase letters only'),
  departureDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD')
    .refine((d) => new Date(d) > new Date(), 'Departure must be in the future'),
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  adults: z.number().int().min(1).max(9),
  children: z.number().int().min(0).max(8).optional().default(0),
  activityTypes: z.string().optional().default(''),
  activityBudgetUSD: z.preprocess(
    (v) => (typeof v === 'number' && isNaN(v) ? undefined : v),
    z.number().positive().optional()
  ),
}).refine(
  (data) => new Date(data.returnDate) > new Date(data.departureDate),
  { message: 'Return date must be after departure date', path: ['returnDate'] }
);

export type TripSearchParams = z.infer<typeof TripSearchSchema>;

// FLIGHTS

export interface FlightSegment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  number: string;
  duration: string;
}

export interface FlightItinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface FlightOption {
  id: string;
  airline: string;
  outbound: FlightItinerary;
  inbound: FlightItinerary;
  stops: number;
  totalPricePerPerson: number;
  totalPrice: number;
  currency: string;
}

// HOTELS

export interface HotelOption {
  hotelId: string;
  name: string;
  latitude: number;
  longitude: number;
  distanceFromCenterKm: number;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  rating?: number;
  amenities?: string[];
  checkInDate: string;
  checkOutDate: string;
  transitTimeMinutes?: number;
  transitTimeFormatted?: string;
}

// AI ESTIMATES

export interface AIEstimates {
  foodCostPerPersonPerDay: number;
  foodTotalCost: number;
  localTransportPerPersonPerDay: number;
  localTransportTotal: number;
  travelTimeFromHotelToCenter: string;
  currency: string;
  notes?: string;
}

// SUMMARY & AGGREGATE

export interface TripSummary {
  cheapestFlightTotal: number;
  cheapestHotelTotal: number;
  foodTotal: number;
  transportTotal: number;
  activitiesTotal: number;
  grandTotal: number;
  currency: string;
  nights: number;
  adults: number;
}

export interface TripCost {
  flights: FlightOption[];
  hotels: HotelOption[];
  aiEstimates: AIEstimates | null;
  activities?: ActivitySuggestion[];
  summary: TripSummary;
  meta: {
    origin: string;
    destination: string;
    nights: number;
    adults: number;
    searchedAt: string;
  };
  warnings?: string[];
}

// API ERROR
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AMADEUS_ERROR'
  | 'AI_ERROR'
  | 'CITY_NOT_FOUND'
  | 'NO_FLIGHTS_FOUND'
  | 'NO_HOTELS_FOUND'
  | 'UNKNOWN_ERROR';

export interface APIError {
  error: string;
  code: ErrorCode;
  details?: unknown;
}

// CITY COORDINATES

export interface CityCoordinates {
  name: string;
  latitude: number;
  longitude: number;
}

// ACTIVITIES

export interface ActivitySuggestion {
  name: string;
  estimatedCostPerPersonUSD: number;
  estimatedTotalCostUSD: number;
  durationHours: number;
  notes: string;
}
