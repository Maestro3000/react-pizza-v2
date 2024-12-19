import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type CartItem = {
  id: number | string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export interface CartSliceState {
  categoryId: number;
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  categoryId: 0,
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum - -obj.price * obj.count;
      }, 0);
      // @ts-ignore
      if (findItem.count.id === 0) {
        state.totalPrice = 0;
      }
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;
