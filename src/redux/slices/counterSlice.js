import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  arrPizzas: [],
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addPizza: (state, { payload }) => {
      state.arrPizzas = [...state.arrPizzas, payload];
    },
    removePizza: (state, { payload }) => {
      state.arrPizzas = state.arrPizzas.filter((_, i) => i !== state.arrPizzas.indexOf(payload));
    },
  },
});

export const { addPizza, removePizza } = counterSlice.actions;
export default counterSlice.reducer;
