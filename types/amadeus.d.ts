declare module 'amadeus' {
  interface AmadeusOptions {
    clientId: string;
    clientSecret: string;
    hostname?: 'test' | 'production';
  }

  class Amadeus {
    constructor(options: AmadeusOptions);
    shopping: {
      flightOffersSearch: {
        get(params: Record<string, string>): Promise<{ data: unknown[] }>;
      };
      hotelOffersSearch: {
        get(params: Record<string, string>): Promise<{ data: unknown[] }>;
      };
    };
    referenceData: {
      locations: {
        hotels: {
          byGeocode: {
            get(params: Record<string, unknown>): Promise<{ data: unknown[] }>;
          };
        };
      };
    };
  }

  export default Amadeus;
}
