import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRISE_DESC = "price",
  PRISE_ASC = "-price"
}

export type Sort = {
  name: string,
  sortProperty: SortPropertyEnum,
}

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  value: string;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  value: "",
  sort: {
    name: "популярности (DESC)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};


export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setListSortItems(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;

    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: "популярности",
          sortProperty: SortPropertyEnum.RATING_DESC
        }
      }
    },
  },
});

export const {setCategoryId, setListSortItems, setCurrentPage, setFilters} =
  filterSlice.actions;
