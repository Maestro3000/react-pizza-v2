import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cartSlice} from "./slices/Cart";
import {filterSlice} from "./slices/Filter";
import {searchSlice} from "./slices/Search";
import {pizzaSlice} from "./slices/Pizza";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [pizzaSlice.name]: pizzaSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()