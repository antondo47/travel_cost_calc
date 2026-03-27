import { CityCoordinates } from '@/types';

// Maps IATA airport codes AND city meta-codes to city center coordinates.
// Multiple airport codes for the same city all resolve to the same city center.
const CITY_COORDINATES: Record<string, CityCoordinates> = {
  // ── United States ── (all 50 states, organized by state) ──────────────────

  // Alabama
  BHM: { name: 'Birmingham', latitude: 33.5631, longitude: -86.7535 },
  HSV: { name: 'Huntsville', latitude: 34.7302, longitude: -86.5842 },
  MOB: { name: 'Mobile', latitude: 30.6944, longitude: -88.0432 },

  // Alaska
  ANC: { name: 'Anchorage', latitude: 61.2181, longitude: -149.9003 },
  FAI: { name: 'Fairbanks', latitude: 64.8378, longitude: -147.8563 },
  JNU: { name: 'Juneau', latitude: 58.3005, longitude: -134.4197 },

  // Arizona
  PHX: { name: 'Phoenix', latitude: 33.4484, longitude: -112.074 },
  TUS: { name: 'Tucson', latitude: 32.2226, longitude: -110.9747 },
  FLG: { name: 'Flagstaff', latitude: 35.1983, longitude: -111.6713 },

  // Arkansas
  LIT: { name: 'Little Rock', latitude: 34.7465, longitude: -92.3291 },
  XNA: { name: 'Fayetteville', latitude: 36.2819, longitude: -94.3069 },

  // California
  LAX: { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
  BUR: { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
  SNA: { name: 'Orange County', latitude: 33.6695, longitude: -117.8681 },
  LGB: { name: 'Long Beach', latitude: 33.8177, longitude: -118.1516 },
  SFO: { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194 },
  OAK: { name: 'Oakland', latitude: 37.8044, longitude: -122.2711 },
  SJC: { name: 'San Jose', latitude: 37.3382, longitude: -121.8863 },
  SAN: { name: 'San Diego', latitude: 32.7157, longitude: -117.1611 },
  SMF: { name: 'Sacramento', latitude: 38.5816, longitude: -121.4944 },
  FAT: { name: 'Fresno', latitude: 36.7468, longitude: -119.7726 },
  SBA: { name: 'Santa Barbara', latitude: 34.4208, longitude: -119.6982 },

  // Colorado
  DEN: { name: 'Denver', latitude: 39.7392, longitude: -104.9903 },
  COS: { name: 'Colorado Springs', latitude: 38.8339, longitude: -104.8214 },
  GJT: { name: 'Grand Junction', latitude: 39.0639, longitude: -108.5506 },

  // Connecticut
  BDL: { name: 'Hartford', latitude: 41.7635, longitude: -72.6832 },
  HVN: { name: 'New Haven', latitude: 41.2638, longitude: -72.8868 },

  // Delaware
  // No major commercial airport — travelers use PHL, BWI, or DCA

  // Florida
  MIA: { name: 'Miami', latitude: 25.7617, longitude: -80.1918 },
  FLL: { name: 'Fort Lauderdale', latitude: 26.1224, longitude: -80.1373 },
  MCO: { name: 'Orlando', latitude: 28.5383, longitude: -81.3792 },
  TPA: { name: 'Tampa', latitude: 27.9506, longitude: -82.4572 },
  JAX: { name: 'Jacksonville', latitude: 30.3322, longitude: -81.6557 },
  PBI: { name: 'West Palm Beach', latitude: 26.7153, longitude: -80.0534 },
  RSW: { name: 'Fort Myers', latitude: 26.5362, longitude: -81.7552 },
  TLH: { name: 'Tallahassee', latitude: 30.4383, longitude: -84.2807 },
  PNS: { name: 'Pensacola', latitude: 30.4213, longitude: -87.2160 },

  // Georgia
  ATL: { name: 'Atlanta', latitude: 33.749, longitude: -84.388 },
  SAV: { name: 'Savannah', latitude: 32.0835, longitude: -81.0998 },
  AGS: { name: 'Augusta', latitude: 33.3699, longitude: -81.9645 },

  // Hawaii
  HNL: { name: 'Honolulu', latitude: 21.3069, longitude: -157.8583 },
  OGG: { name: 'Maui', latitude: 20.7984, longitude: -156.4305 },
  KOA: { name: 'Kona', latitude: 19.6386, longitude: -155.9885 },
  ITO: { name: 'Hilo', latitude: 19.7214, longitude: -155.0486 },
  LIH: { name: 'Kauai', latitude: 21.9760, longitude: -159.3389 },

  // Idaho
  BOI: { name: 'Boise', latitude: 43.6135, longitude: -116.2023 },
  IDA: { name: 'Idaho Falls', latitude: 43.5146, longitude: -112.0707 },
  TWF: { name: 'Twin Falls', latitude: 42.4818, longitude: -114.4877 },

  // Illinois
  ORD: { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
  MDW: { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
  SPI: { name: 'Springfield', latitude: 39.8442, longitude: -89.6779 },
  MLI: { name: 'Moline', latitude: 41.4485, longitude: -90.5075 },

  // Indiana
  IND: { name: 'Indianapolis', latitude: 39.7684, longitude: -86.1581 },
  SBN: { name: 'South Bend', latitude: 41.7083, longitude: -86.3172 },
  FWA: { name: 'Fort Wayne', latitude: 40.9777, longitude: -85.1952 },

  // Iowa
  DSM: { name: 'Des Moines', latitude: 41.5868, longitude: -93.6091 },
  CID: { name: 'Cedar Rapids', latitude: 41.9779, longitude: -91.7108 },
  DBQ: { name: 'Dubuque', latitude: 42.4002, longitude: -90.7093 },

  // Kansas
  ICT: { name: 'Wichita', latitude: 37.6889, longitude: -97.3361 },
  MCI: { name: 'Kansas City', latitude: 39.2976, longitude: -94.7139 },
  TOP: { name: 'Topeka', latitude: 39.0682, longitude: -95.6711 },

  // Kentucky
  SDF: { name: 'Louisville', latitude: 38.2527, longitude: -85.7585 },
  LEX: { name: 'Lexington', latitude: 38.0406, longitude: -84.6041 },
  CVG: { name: 'Cincinnati/Northern Kentucky', latitude: 39.1031, longitude: -84.5120 },

  // Louisiana
  MSY: { name: 'New Orleans', latitude: 29.9511, longitude: -90.0715 },
  BTR: { name: 'Baton Rouge', latitude: 30.4583, longitude: -91.1499 },
  SHV: { name: 'Shreveport', latitude: 32.5252, longitude: -93.7502 },
  LFT: { name: 'Lafayette', latitude: 30.2052, longitude: -91.9877 },

  // Maine
  PWM: { name: 'Portland', latitude: 43.6615, longitude: -70.3093 },
  BGR: { name: 'Bangor', latitude: 44.8074, longitude: -68.8281 },

  // Maryland
  BWI: { name: 'Baltimore', latitude: 39.2904, longitude: -76.6122 },

  // Massachusetts
  BOS: { name: 'Boston', latitude: 42.3601, longitude: -71.0589 },
  ORH: { name: 'Worcester', latitude: 42.2673, longitude: -71.8729 },

  // Michigan
  DTW: { name: 'Detroit', latitude: 42.3314, longitude: -83.0457 },
  GRR: { name: 'Grand Rapids', latitude: 42.9634, longitude: -85.6681 },
  FNT: { name: 'Flint', latitude: 42.9654, longitude: -83.7436 },
  LAN: { name: 'Lansing', latitude: 42.7337, longitude: -84.5555 },
  MBS: { name: 'Saginaw', latitude: 43.5329, longitude: -84.0797 },
  CIU: { name: 'Sault Ste. Marie', latitude: 46.2508, longitude: -84.4724 },

  // Minnesota
  MSP: { name: 'Minneapolis', latitude: 44.9778, longitude: -93.265 },
  DLH: { name: 'Duluth', latitude: 46.7867, longitude: -92.1005 },
  RST: { name: 'Rochester', latitude: 43.9079, longitude: -92.5002 },

  // Mississippi
  JAN: { name: 'Jackson', latitude: 32.3112, longitude: -90.0759 },
  GPT: { name: 'Gulfport', latitude: 30.4073, longitude: -89.0701 },
  MEI: { name: 'Meridian', latitude: 32.3326, longitude: -88.7549 },

  // Missouri
  STL: { name: 'St. Louis', latitude: 38.6270, longitude: -90.1994 },
  MKC: { name: 'Kansas City', latitude: 39.0997, longitude: -94.5786 },
  SGF: { name: 'Springfield', latitude: 37.2090, longitude: -93.2923 },

  // Montana
  BZN: { name: 'Bozeman', latitude: 45.6770, longitude: -111.0429 },
  BIL: { name: 'Billings', latitude: 45.7833, longitude: -108.5007 },
  GTF: { name: 'Great Falls', latitude: 47.4941, longitude: -111.3708 },
  MSO: { name: 'Missoula', latitude: 46.8721, longitude: -114.0121 },
  HLN: { name: 'Helena', latitude: 46.6077, longitude: -112.0268 },

  // Nebraska
  OMA: { name: 'Omaha', latitude: 41.2565, longitude: -95.9346 },
  LNK: { name: 'Lincoln', latitude: 40.8136, longitude: -96.6752 },
  GRI: { name: 'Grand Island', latitude: 40.9675, longitude: -98.3096 },

  // Nevada
  LAS: { name: 'Las Vegas', latitude: 36.1699, longitude: -115.1398 },
  RNO: { name: 'Reno', latitude: 39.5296, longitude: -119.8138 },

  // New Hampshire
  MHT: { name: 'Manchester', latitude: 42.9326, longitude: -71.4357 },
  LEB: { name: 'Lebanon', latitude: 43.6261, longitude: -72.3042 },

  // New Jersey
  EWR: { name: 'Newark', latitude: 40.7357, longitude: -74.1724 },
  ACY: { name: 'Atlantic City', latitude: 39.3776, longitude: -74.4572 },

  // New Mexico
  ABQ: { name: 'Albuquerque', latitude: 35.0845, longitude: -106.6511 },
  SAF: { name: 'Santa Fe', latitude: 35.6167, longitude: -106.0889 },
  ROW: { name: 'Roswell', latitude: 33.3016, longitude: -104.5306 },

  // New York
  NYC: { name: 'New York City', latitude: 40.7128, longitude: -74.006 },
  JFK: { name: 'New York City', latitude: 40.7128, longitude: -74.006 },
  LGA: { name: 'New York City', latitude: 40.7128, longitude: -74.006 },
  BUF: { name: 'Buffalo', latitude: 42.8864, longitude: -78.8784 },
  ROC: { name: 'Rochester', latitude: 43.1566, longitude: -77.6088 },
  SYR: { name: 'Syracuse', latitude: 43.0481, longitude: -76.1474 },
  ALB: { name: 'Albany', latitude: 42.6526, longitude: -73.7562 },
  ITH: { name: 'Ithaca', latitude: 42.4440, longitude: -76.5002 },

  // North Carolina
  CLT: { name: 'Charlotte', latitude: 35.2271, longitude: -80.8431 },
  RDU: { name: 'Raleigh-Durham', latitude: 35.7796, longitude: -78.6382 },
  GSO: { name: 'Greensboro', latitude: 36.0726, longitude: -79.7920 },
  AVL: { name: 'Asheville', latitude: 35.5951, longitude: -82.5515 },
  ILM: { name: 'Wilmington', latitude: 34.2257, longitude: -77.9447 },
  FAY: { name: 'Fayetteville', latitude: 35.0527, longitude: -78.8803 },

  // North Dakota
  FAR: { name: 'Fargo', latitude: 46.8772, longitude: -96.7898 },
  BIS: { name: 'Bismarck', latitude: 46.8083, longitude: -100.7837 },
  GFK: { name: 'Grand Forks', latitude: 47.9253, longitude: -97.0529 },
  MOT: { name: 'Minot', latitude: 48.2325, longitude: -101.2799 },

  // Ohio
  CMH: { name: 'Columbus', latitude: 39.9612, longitude: -82.9988 },
  CLE: { name: 'Cleveland', latitude: 41.4993, longitude: -81.6944 },
  DAY: { name: 'Dayton', latitude: 39.7589, longitude: -84.1916 },
  TOL: { name: 'Toledo', latitude: 41.6639, longitude: -83.5552 },
  CAK: { name: 'Akron', latitude: 40.9162, longitude: -81.4422 },

  // Oklahoma
  OKC: { name: 'Oklahoma City', latitude: 35.4676, longitude: -97.5164 },
  TUL: { name: 'Tulsa', latitude: 36.1560, longitude: -95.9928 },
  LAW: { name: 'Lawton', latitude: 34.5677, longitude: -98.4166 },

  // Oregon
  PDX: { name: 'Portland', latitude: 45.5051, longitude: -122.675 },
  EUG: { name: 'Eugene', latitude: 44.0521, longitude: -123.0868 },
  MFR: { name: 'Medford', latitude: 42.3247, longitude: -122.8731 },
  RDM: { name: 'Bend/Redmond', latitude: 44.2541, longitude: -121.1500 },

  // Pennsylvania
  PHL: { name: 'Philadelphia', latitude: 39.9526, longitude: -75.1652 },
  PIT: { name: 'Pittsburgh', latitude: 40.4406, longitude: -79.9959 },
  ABE: { name: 'Allentown', latitude: 40.6521, longitude: -75.4404 },
  SCR: { name: 'Scranton', latitude: 41.4087, longitude: -75.6624 },
  MDT: { name: 'Harrisburg', latitude: 40.2732, longitude: -76.8844 },
  AVP: { name: 'Wilkes-Barre', latitude: 41.3385, longitude: -75.7233 },

  // Rhode Island
  PVD: { name: 'Providence', latitude: 41.8240, longitude: -71.4128 },

  // South Carolina
  CHS: { name: 'Charleston', latitude: 32.7765, longitude: -79.9311 },
  CAE: { name: 'Columbia', latitude: 34.0007, longitude: -81.0348 },
  GSP: { name: 'Greenville-Spartanburg', latitude: 34.8957, longitude: -82.2187 },
  MYR: { name: 'Myrtle Beach', latitude: 33.6891, longitude: -78.9283 },

  // South Dakota
  FSD: { name: 'Sioux Falls', latitude: 43.5460, longitude: -96.7313 },
  RAP: { name: 'Rapid City', latitude: 44.0805, longitude: -103.0570 },
  ABR: { name: 'Aberdeen', latitude: 45.4491, longitude: -98.4218 },

  // Tennessee
  BNA: { name: 'Nashville', latitude: 36.1627, longitude: -86.7816 },
  MEM: { name: 'Memphis', latitude: 35.1495, longitude: -90.0490 },
  TYS: { name: 'Knoxville', latitude: 35.9606, longitude: -83.9207 },
  CHA: { name: 'Chattanooga', latitude: 35.0456, longitude: -85.3097 },
  TRI: { name: 'Tri-Cities', latitude: 36.3382, longitude: -82.4074 },

  // Texas
  DFW: { name: 'Dallas-Fort Worth', latitude: 32.7767, longitude: -96.797 },
  DAL: { name: 'Dallas', latitude: 32.7767, longitude: -96.797 },
  IAH: { name: 'Houston', latitude: 29.7604, longitude: -95.3698 },
  HOU: { name: 'Houston', latitude: 29.7604, longitude: -95.3698 },
  AUS: { name: 'Austin', latitude: 30.2672, longitude: -97.7431 },
  SAT: { name: 'San Antonio', latitude: 29.4241, longitude: -98.4936 },
  ELP: { name: 'El Paso', latitude: 31.7619, longitude: -106.4850 },
  LBB: { name: 'Lubbock', latitude: 33.5779, longitude: -101.8553 },
  AMA: { name: 'Amarillo', latitude: 35.2220, longitude: -101.8313 },
  MAF: { name: 'Midland', latitude: 31.9726, longitude: -102.2024 },
  CRP: { name: 'Corpus Christi', latitude: 27.8006, longitude: -97.3964 },
  BRO: { name: 'Brownsville', latitude: 25.9017, longitude: -97.4327 },
  MFE: { name: 'McAllen', latitude: 26.2118, longitude: -98.2300 },
  TYR: { name: 'Tyler', latitude: 32.3541, longitude: -95.4024 },
  GGG: { name: 'Longview', latitude: 32.3841, longitude: -94.7115 },
  ACT: { name: 'Waco', latitude: 31.6113, longitude: -97.2305 },
  SJT: { name: 'San Angelo', latitude: 31.3577, longitude: -100.4963 },
  ABI: { name: 'Abilene', latitude: 32.4487, longitude: -99.7312 },
  GRK: { name: 'Killeen', latitude: 31.0674, longitude: -97.8286 },

  // Utah
  SLC: { name: 'Salt Lake City', latitude: 40.7608, longitude: -111.8910 },
  SGU: { name: 'St. George', latitude: 37.0965, longitude: -113.5910 },
  PVU: { name: 'Provo', latitude: 40.2194, longitude: -111.7231 },

  // Vermont
  BTV: { name: 'Burlington', latitude: 44.4759, longitude: -73.2121 },
  MPV: { name: 'Montpelier', latitude: 44.2034, longitude: -72.5623 },

  // Virginia
  DCA: { name: 'Washington DC', latitude: 38.9072, longitude: -77.0369 },
  IAD: { name: 'Washington DC', latitude: 38.9072, longitude: -77.0369 },
  ORF: { name: 'Norfolk', latitude: 36.8508, longitude: -76.2859 },
  RIC: { name: 'Richmond', latitude: 37.5407, longitude: -77.4360 },
  ROA: { name: 'Roanoke', latitude: 37.2709, longitude: -79.9753 },
  CHO: { name: 'Charlottesville', latitude: 38.1357, longitude: -78.4529 },

  // Washington
  SEA: { name: 'Seattle', latitude: 47.6062, longitude: -122.3321 },
  GEG: { name: 'Spokane', latitude: 47.6588, longitude: -117.4260 },
  BFI: { name: 'Seattle Boeing Field', latitude: 47.5299, longitude: -122.3018 },
  YKM: { name: 'Yakima', latitude: 46.5682, longitude: -120.5440 },
  PSC: { name: 'Tri-Cities', latitude: 46.2647, longitude: -119.1190 },
  BLI: { name: 'Bellingham', latitude: 48.7928, longitude: -122.5375 },

  // West Virginia
  CRW: { name: 'Charleston', latitude: 38.3498, longitude: -81.6329 },
  HTS: { name: 'Huntington', latitude: 38.3668, longitude: -82.5579 },
  MGW: { name: 'Morgantown', latitude: 39.6429, longitude: -79.9163 },

  // Wisconsin
  MKE: { name: 'Milwaukee', latitude: 43.0389, longitude: -87.9065 },
  MSN: { name: 'Madison', latitude: 43.0731, longitude: -89.4012 },
  GRB: { name: 'Green Bay', latitude: 44.5133, longitude: -88.1296 },
  ATW: { name: 'Appleton', latitude: 44.2581, longitude: -88.5197 },

  // Wyoming
  JAC: { name: 'Jackson Hole', latitude: 43.6066, longitude: -110.7377 },
  CPR: { name: 'Casper', latitude: 42.9080, longitude: -106.4647 },
  CYS: { name: 'Cheyenne', latitude: 41.1558, longitude: -104.8120 },
  COD: { name: 'Cody', latitude: 44.5202, longitude: -109.0238 },

  // Europe
  LHR: { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  LGW: { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  STN: { name: 'London', latitude: 51.5074, longitude: -0.1278 },
  CDG: { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  ORY: { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
  AMS: { name: 'Amsterdam', latitude: 52.3676, longitude: 4.9041 },
  FRA: { name: 'Frankfurt', latitude: 50.1109, longitude: 8.6821 },
  MAD: { name: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
  BCN: { name: 'Barcelona', latitude: 41.3851, longitude: 2.1734 },
  FCO: { name: 'Rome', latitude: 41.9028, longitude: 12.4964 },
  MXP: { name: 'Milan', latitude: 45.4642, longitude: 9.19 },
  ZRH: { name: 'Zurich', latitude: 47.3769, longitude: 8.5417 },
  VIE: { name: 'Vienna', latitude: 48.2082, longitude: 16.3738 },
  CPH: { name: 'Copenhagen', latitude: 55.6761, longitude: 12.5683 },
  ARN: { name: 'Stockholm', latitude: 59.3293, longitude: 18.0686 },
  OSL: { name: 'Oslo', latitude: 59.9139, longitude: 10.7522 },
  HEL: { name: 'Helsinki', latitude: 60.1699, longitude: 24.9384 },
  LIS: { name: 'Lisbon', latitude: 38.7223, longitude: -9.1393 },
  ATH: { name: 'Athens', latitude: 37.9838, longitude: 23.7275 },
  IST: { name: 'Istanbul', latitude: 41.0082, longitude: 28.9784 },
  PRG: { name: 'Prague', latitude: 50.0755, longitude: 14.4378 },
  BUD: { name: 'Budapest', latitude: 47.4979, longitude: 19.0402 },
  WAW: { name: 'Warsaw', latitude: 52.2297, longitude: 21.0122 },

  // Asia-Pacific
  NRT: { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  HND: { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
  ICN: { name: 'Seoul', latitude: 37.5665, longitude: 126.978 },
  PEK: { name: 'Beijing', latitude: 39.9042, longitude: 116.4074 },
  PVG: { name: 'Shanghai', latitude: 31.2304, longitude: 121.4737 },
  HKG: { name: 'Hong Kong', latitude: 22.3193, longitude: 114.1694 },
  SIN: { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  BKK: { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018 },
  KUL: { name: 'Kuala Lumpur', latitude: 3.139, longitude: 101.6869 },
  SYD: { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
  MEL: { name: 'Melbourne', latitude: -37.8136, longitude: 144.9631 },
  MNL: { name: 'Manila', latitude: 14.5995, longitude: 120.9842 },
  CGK: { name: 'Jakarta', latitude: -6.2088, longitude: 106.8456 },
  DEL: { name: 'New Delhi', latitude: 28.6139, longitude: 77.209 },
  BOM: { name: 'Mumbai', latitude: 19.076, longitude: 72.8777 },
  DXB: { name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },

  // Latin America
  GRU: { name: 'São Paulo', latitude: -23.5505, longitude: -46.6333 },
  GIG: { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 },
  MEX: { name: 'Mexico City', latitude: 19.4326, longitude: -99.1332 },
  BOG: { name: 'Bogotá', latitude: 4.711, longitude: -74.0721 },
  SCL: { name: 'Santiago', latitude: -33.4489, longitude: -70.6693 },
  EZE: { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816 },

  // Canada
  YYZ: { name: 'Toronto', latitude: 43.6532, longitude: -79.3832 },
  YVR: { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207 },
  YUL: { name: 'Montreal', latitude: 45.5017, longitude: -73.5673 },
};

export function getCityCoordinates(iataCode: string): CityCoordinates | null {
  return CITY_COORDINATES[iataCode.toUpperCase()] ?? null;
}

export function getCityName(iataCode: string): string {
  return CITY_COORDINATES[iataCode.toUpperCase()]?.name ?? iataCode;
}
