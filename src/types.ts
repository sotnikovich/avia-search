export type FlightProps = {
    airline: string;
    amount: string;
    forwardFlight: FlightLeg;
    backFlight: FlightLeg;
  };
  
  export type FlightLeg = {
    airline: string;
    departureCity: string;
    departureAirport: string;
    departureAirportUid: string;
    arrivalCity: string;
    arrivalAirport: string;
    arrivalAirportUid: string;
    isTranfer: boolean;
    duration: number;
    arrivalDate: string;
    departureDate: string;
  };
  
  export type Filters = {
    sort: string;
    filter: {
      transfer: boolean;
      noTransfer: boolean;
    };
    price: {
      from: number;
      till: number;
    };
  };

