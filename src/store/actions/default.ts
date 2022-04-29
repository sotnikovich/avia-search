import { GET_FLIGHTS } from "../../constants";
import { FlightProps } from "../../types";

export const getFlights = (payload: Array<FlightProps>) => ({
  type: GET_FLIGHTS,
  payload,
});

export interface GetFlights {
  readonly type: typeof GET_FLIGHTS;
  payload: Array<FlightProps>;
}

export type InitActions = GetFlights;