import {
    FILTER_TRANSFER,
    SET_FLIGHTS,
    SORT_FLIGHT_BY_TIME,
    SORT_FLIGHT_DECREASE,
    SORT_FLIGHT_INCREASE,
    FILTER_MIN_PRICE,
    FILTER_MAX_PRICE,
    FILTER_AIRLINE,
  } from "../../constants";
  import { SortActions } from "../actions/sort";
  import { FlightProps } from "../../types";
  
  export type SortInitialState = {
    decreasePrice: boolean;
    increasePrice: boolean;
    timeDuration: boolean;
    isTransfer: boolean;
    isNoTransfer: boolean;
    minPrice: number;
    maxPrice: number;
    airlines: Array<string>;
    sortedFlights: Array<FlightProps>;
    checkedSort: string;
  };
  
  const initialState = {
    decreasePrice: false,
    increasePrice: true,
    timeDuration: false,
    isTransfer: false,
    isNoTransfer: false,
    minPrice: 0,
    maxPrice: 1000000,
    airlines: [],
    sortedFlights: [],
    checkedSort: "increase",
  };
  
  export const sortReducer = (
    state = initialState,
    action: SortActions
  ): SortInitialState => {
    switch (action.type) {
      case SET_FLIGHTS: {
        return {
          ...state,
          sortedFlights: action.payload,
        };
      }
      case SORT_FLIGHT_INCREASE: {
        return {
          ...state,
          decreasePrice: false,
          increasePrice: true,
          timeDuration: false,
          checkedSort: "increase",
        };
      }
      case SORT_FLIGHT_DECREASE: {
        return {
          ...state,
          decreasePrice: true,
          increasePrice: false,
          timeDuration: false,
          checkedSort: "decrease",
        };
      }
      case SORT_FLIGHT_BY_TIME: {
        return {
          ...state,
          decreasePrice: false,
          increasePrice: false,
          timeDuration: true,
          checkedSort: "duration",
        };
      }
      case FILTER_TRANSFER: {
        const { isTransfer, isNoTransfer } = action.payload;
        return {
          ...state,
          isTransfer: isTransfer,
          isNoTransfer: isNoTransfer,
        };
      }
      case FILTER_MIN_PRICE: {
        return {
          ...state,
          minPrice: action.payload,
        };
      }
      case FILTER_MAX_PRICE: {
        return {
          ...state,
          maxPrice: action.payload,
        };
      }
      case FILTER_AIRLINE: {
        const { payload } = action;
        const changedAirlines: string[] = state.airlines.includes(payload)
          ? state.airlines.filter((airline, i) => {
              if (i !== state.airlines.indexOf(payload)) return airline;
            })
          : [...state.airlines, payload];
        return {
          ...state,
          airlines: changedAirlines,
        };
      }
      default: {
        return state;
      }
    }
  };