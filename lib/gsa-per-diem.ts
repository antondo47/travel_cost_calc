/**
 * GSA Per Diem M&IE (Meals & Incidental Expenses) rates in USD/day — FY2026.
 * Source: https://www.gsa.gov/travel/plan-book/per-diem-rates
 * Rates effective October 1, 2025. Standard CONUS rate: $68/day.
 * All IATA codes in this map share the same city-center as city-coordinates.ts.
 */
const GSA_MIE_RATES: Record<string, number> = {
  // New York / New Jersey — $79
  JFK: 79, EWR: 79, LGA: 79,

  // San Francisco Bay Area — $79
  SFO: 79, OAK: 79, SJC: 79,

  // Boston — $79
  BOS: 79, PVD: 79, MHT: 79,

  // Washington D.C. — $79
  DCA: 79, IAD: 79, BWI: 79,

  // Chicago — $79
  ORD: 79, MDW: 79,

  // Honolulu — $79
  HNL: 79,

  // Los Angeles — $74
  LAX: 74, BUR: 74, SNA: 74, LGB: 74, ONT: 74,

  // Miami / Fort Lauderdale — $74
  MIA: 74, FLL: 74, PBI: 74,

  // Seattle — $74
  SEA: 74,

  // Denver — $74
  DEN: 74,

  // Las Vegas — $74
  LAS: 74,

  // San Diego — $74
  SAN: 74,

  // Maui — $74
  OGG: 74,

  // Nashville — $74
  BNA: 74,

  // Austin — $74
  AUS: 74,

  // Atlanta — $74
  ATL: 74,

  // New Orleans — $74
  MSY: 74,

  // Philadelphia — $74
  PHL: 74, ABE: 74,

  // Orlando — $74
  MCO: 74, SFB: 74,

  // Tampa — $74
  TPA: 74, PIE: 74, SRQ: 74,

  // Phoenix — $74
  PHX: 74, AZA: 74,

  // Portland, OR — $74
  PDX: 74,

  // Sacramento — $74
  SMF: 74,

  // Minneapolis — $74
  MSP: 74,

  // Detroit — $74
  DTW: 74,

  // Salt Lake City — $74
  SLC: 74,

  // Anchorage — $74
  ANC: 74,
};

/** Standard continental US M&IE rate for cities not explicitly listed */
const STANDARD_CONUS_RATE = 68;

/**
 * Returns the GSA M&IE per diem rate ($/person/day) for a destination IATA code.
 * Falls back to the standard CONUS rate ($68) for unlisted cities.
 */
export function getMieRate(iataCode: string): number {
  return GSA_MIE_RATES[iataCode] ?? STANDARD_CONUS_RATE;
}
