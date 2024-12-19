import {createSlice} from "@reduxjs/toolkit";

export type SearchType = {
  value: string
}

const initialState: SearchType = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.value = action.payload;
    },
  },
});
export const {setSearchValue} = searchSlice.actions;
