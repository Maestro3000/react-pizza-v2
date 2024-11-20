import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/Cart/index.js";
import { filterSlice } from "./slices/Filter/index.js";
import { searchSlice } from "./slices/Search";
import { pizzaSlice } from "./slices/Pizza/index.js"

const rootReducer = combineReducers( {
  [cartSlice.name]: cartSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [pizzaSlice.name]: pizzaSlice.reducer,

} );

export const store = configureStore( {
  reducer: rootReducer,
} );
