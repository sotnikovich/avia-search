import { GET_FLIGHTS } from "../constants";
import { FlightProps } from "../types/types";

export const getFlights = (payload: Array<FlightProps>) => ({
  type: GET_FLIGHTS,
  payload,
});

export interface GetFlights {
  readonly type: typeof GET_FLIGHTS;
  payload: Array<FlightProps>;
}

export type InitActions = GetFlights;

import {
  SET_FLIGHTS,
  SORT_FLIGHT_DECREASE,
  SORT_FLIGHT_BY_TIME,
  SORT_FLIGHT_INCREASE,
  FILTER_TRANSFER,
  FILTER_MAX_PRICE,
  FILTER_MIN_PRICE,
  FILTER_AIRLINE,
} from "../constants";

export const sortFlightIncrease = () => ({ type: SORT_FLIGHT_INCREASE });
export const sortFlightDecrease = () => ({ type: SORT_FLIGHT_DECREASE });
export const sortFlightDuration = () => ({ type: SORT_FLIGHT_BY_TIME });
export const setFlights = (payload: Array<FlightProps>) => ({
  type: SET_FLIGHTS,
  payload,
});

export const filterTransfer = (payload: {
  isTransfer: boolean;
  isNoTransfer: boolean;
}) => ({
  type: FILTER_TRANSFER,
  payload,
});

export const filterMinPrice = (payload: number) => ({
  type: FILTER_MIN_PRICE,
  payload,
});

export const filterMaxPrice = (payload: number) => ({
  type: FILTER_MAX_PRICE,
  payload,
});

export const filterAirline = (payload: string) => ({
  type: FILTER_AIRLINE,
  payload,
});

export interface ISortFlightDecrease {
  readonly type: typeof SORT_FLIGHT_DECREASE;
}

export interface ISortFlightIncrease {
  readonly type: typeof SORT_FLIGHT_INCREASE;
}

export interface ISortFlightDuration {
  readonly type: typeof SORT_FLIGHT_BY_TIME;
}

export interface ISetFlights {
  readonly type: typeof SET_FLIGHTS;
  readonly payload: Array<FlightProps>;
}

export interface IFilterTransfer {
  readonly type: typeof FILTER_TRANSFER;
  readonly payload: {
    isTransfer: boolean;
    isNoTransfer: boolean;
  };
}

export interface IFilterMinPrice {
  readonly type: typeof FILTER_MIN_PRICE;
  readonly payload: number;
}

export interface IFilterMaxPrice {
  readonly type: typeof FILTER_MAX_PRICE;
  readonly payload: number;
}

export interface IFilterAirline {
  readonly type: typeof FILTER_AIRLINE;
  readonly payload: string;
}

export type SortActions =
  | ISortFlightDecrease
  | ISortFlightIncrease
  | ISortFlightDuration
  | IFilterTransfer
  | ISetFlights
  | IFilterMinPrice
  | IFilterMaxPrice
  | IFilterAirline;
