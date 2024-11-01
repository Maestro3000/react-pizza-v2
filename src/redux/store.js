import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import counter from "./slices/counterSlice"
export const store = configureStore({
  reducer: {
    filter,
    counter,
  },
});
