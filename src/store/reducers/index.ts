import { combineReducers } from "redux";

import { initReducer, InitInitialState } from "./init";
import { sortReducer, SortInitialState } from "./sort";

export type CommonReducersType = {
  init: InitInitialState;
  sort: SortInitialState;
};

export const rootReducer = combineReducers({
  init: initReducer,
  sort: sortReducer,
});