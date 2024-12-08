import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ( params, thunkAPI ) => {
    const {order, sortBy, category, search, currentPage} = params
    const {data} = await axios.get( `https://66ff45472b9aac9c997ebe81.mockapi.io/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }&${ search }` )

    return data
  },
)

const initialState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice( {
  name: "pizza",
  initialState,
  reducers: {
    setItems( state, action ) {
      state.items = action.payload;
    }
  },
  extraReducers: ( builder ) => {
    builder.addCase( fetchPizzas.fulfilled, ( state, action ) => {
      state.items = action.payload
      state.status = "success"
    } )

    builder.addCase( fetchPizzas.pending, ( state, action ) => {
      state.items = []
      state.status = "loading"
    } )

    builder.addCase( fetchPizzas.rejected, ( state ) => {
      state.items = []
      state.status = "error"
    } )
  },
} );
export const {setItems} = pizzaSlice.actions;
