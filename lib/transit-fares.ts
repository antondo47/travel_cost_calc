/**
 * Static public transit data by city (IATA code).
 * fareUSD      — one-way fare in USD
 * tripsPerDay  — estimated round trips per person per day (sightseeing + meals)
 * avgSpeedKmh  — average transit speed including stops/transfers (for time estimates)
 */
interface TransitInfo {
  fareUSD: number;
  tripsPerDay: number;
  avgSpeedKmh: number;
}

const TRANSIT_DATA: Record<string, TransitInfo> = {
  // New York — MTA subway $2.90, fast
  JFK: { fareUSD: 2.90, tripsPerDay: 6, avgSpeedKmh: 18 },
  EWR: { fareUSD: 2.90, tripsPerDay: 6, avgSpeedKmh: 18 },
  LGA: { fareUSD: 2.90, tripsPerDay: 6, avgSpeedKmh: 18 },

  // Los Angeles — Metro $1.75, bus-heavy/slower
  LAX: { fareUSD: 1.75, tripsPerDay: 4, avgSpeedKmh: 12 },
  BUR: { fareUSD: 1.75, tripsPerDay: 4, avgSpeedKmh: 12 },
  SNA: { fareUSD: 1.75, tripsPerDay: 4, avgSpeedKmh: 12 },
  LGB: { fareUSD: 1.75, tripsPerDay: 4, avgSpeedKmh: 12 },
  ONT: { fareUSD: 1.75, tripsPerDay: 4, avgSpeedKmh: 12 },

  // San Francisco Bay Area — BART/Muni $2.50+, fast
  SFO: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 18 },
  OAK: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 18 },
  SJC: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 15 },

  // Chicago — CTA $2.50
  ORD: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 16 },
  MDW: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 16 },

  // Washington D.C. — Metro $2.25–$6 (avg ~$3.50), very fast
  DCA: { fareUSD: 3.50, tripsPerDay: 5, avgSpeedKmh: 22 },
  IAD: { fareUSD: 3.50, tripsPerDay: 5, avgSpeedKmh: 22 },
  BWI: { fareUSD: 3.50, tripsPerDay: 5, avgSpeedKmh: 22 },

  // Boston — MBTA $2.40
  BOS: { fareUSD: 2.40, tripsPerDay: 5, avgSpeedKmh: 15 },
  PVD: { fareUSD: 2.40, tripsPerDay: 4, avgSpeedKmh: 14 },
  MHT: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },

  // Miami — Metrorail $2.25
  MIA: { fareUSD: 2.25, tripsPerDay: 4, avgSpeedKmh: 14 },
  FLL: { fareUSD: 2.25, tripsPerDay: 4, avgSpeedKmh: 14 },
  PBI: { fareUSD: 2.25, tripsPerDay: 4, avgSpeedKmh: 14 },

  // Seattle — Link Light Rail $2.75
  SEA: { fareUSD: 2.75, tripsPerDay: 5, avgSpeedKmh: 18 },

  // Denver — RTD $3.00
  DEN: { fareUSD: 3.00, tripsPerDay: 4, avgSpeedKmh: 16 },

  // Atlanta — MARTA $2.50
  ATL: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 16 },

  // Minneapolis — Metro Transit $2.50
  MSP: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 18 },

  // Philadelphia — SEPTA $2.50
  PHL: { fareUSD: 2.50, tripsPerDay: 5, avgSpeedKmh: 15 },
  ABE: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 14 },

  // Phoenix — Valley Metro $2.00, bus-heavy
  PHX: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },
  AZA: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },

  // Las Vegas — Deuce bus $2.00
  LAS: { fareUSD: 2.00, tripsPerDay: 4, avgSpeedKmh: 13 },

  // Houston — METRO $1.25, car-dependent city
  IAH: { fareUSD: 1.25, tripsPerDay: 3, avgSpeedKmh: 12 },
  HOU: { fareUSD: 1.25, tripsPerDay: 3, avgSpeedKmh: 12 },

  // Dallas — DART $2.50
  DFW: { fareUSD: 2.50, tripsPerDay: 3, avgSpeedKmh: 14 },
  DAL: { fareUSD: 2.50, tripsPerDay: 3, avgSpeedKmh: 14 },

  // Portland, OR — TriMet $2.50
  PDX: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 16 },

  // Nashville — WeGo bus $2.00, limited transit
  BNA: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 11 },

  // Austin — CapMetro $1.25, limited transit
  AUS: { fareUSD: 1.25, tripsPerDay: 3, avgSpeedKmh: 11 },

  // New Orleans — RTA $1.25
  MSY: { fareUSD: 1.25, tripsPerDay: 4, avgSpeedKmh: 12 },

  // Orlando — Lynx $2.00, car-dependent
  MCO: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 11 },
  SFB: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 11 },

  // Tampa — HART $2.00
  TPA: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },
  PIE: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },
  SRQ: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },

  // San Diego — MTS $2.50
  SAN: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 15 },

  // Sacramento — SacRT $2.75
  SMF: { fareUSD: 2.75, tripsPerDay: 4, avgSpeedKmh: 15 },

  // Detroit — SMART bus $2.00
  DTW: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 12 },

  // Salt Lake City — UTA $2.50
  SLC: { fareUSD: 2.50, tripsPerDay: 4, avgSpeedKmh: 16 },

  // Honolulu — TheBus $3.00
  HNL: { fareUSD: 3.00, tripsPerDay: 4, avgSpeedKmh: 14 },
  OGG: { fareUSD: 2.00, tripsPerDay: 3, avgSpeedKmh: 11 },

  // Anchorage — People Mover $2.00, limited
  ANC: { fareUSD: 2.00, tripsPerDay: 2, avgSpeedKmh: 10 },
};

const DEFAULT_TRANSIT: TransitInfo = {
  fareUSD: 2.00,
  tripsPerDay: 4,
  avgSpeedKmh: 14,
};

export function getTransitInfo(iataCode: string): TransitInfo {
  return TRANSIT_DATA[iataCode] ?? DEFAULT_TRANSIT;
}
