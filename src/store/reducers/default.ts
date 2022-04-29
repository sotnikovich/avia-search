import { GET_FLIGHTS } from "../../constants";
import { FlightProps } from "../../types";
import { InitActions } from "../actions/default";

export type InitInitialState = {
  flights: Array<FlightProps>;
};
const initialState = {
  flights: [],
};

export const initReducer = (
  state = initialState,
  action: InitActions
): InitInitialState => {
  switch (action.type) {
    case GET_FLIGHTS: {
      return {
        ...state,
        flights: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};