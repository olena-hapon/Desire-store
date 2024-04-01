import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  category: string;
  subCategory: string;
  isNew: boolean | string;
  isSales: number | string;
  page: number;
  filterColors: string[];
  filterSizes: string[];
  modal: boolean;
  menuMobile: boolean;
  menuSearch: boolean;
  sort : {
    name: string,
    sortBy: string,
    order: string,
  };
}

const initialState:InitialState = {
  category: '',
  subCategory: '',
  isNew: true,
  isSales: '',
  page: 1,
  filterColors: [],
  filterSizes: [],
  modal: false,
  menuMobile: false,
  menuSearch: false,
  sort : {
    name: '',
    sortBy: 'discountPrice',
    order: '',
  },
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSubCategory(state, action) {
      state.subCategory = action.payload
    },
    setIsNew(state, action) {
      state.isNew = action.payload
    },
    setSales(state, action) {
      state.isSales = action.payload
    },
    setColors(state, action) {
      // state.filterColors = action.payload;
      const findColor = state.filterColors.find(
        color => color === action.payload
      )

      if (findColor) {
        state.filterColors = state.filterColors.filter(color =>
          color !== action.payload
        )
        console.log(action.payload)
      } else {
        state.filterColors.push(action.payload)
      }
    },
    deleteColors(state) {
      state.filterColors = [];
    },

    setSizes(state, action) {
      // state.filterSizes = action.payload;
      const findSizes = state.filterSizes.find(
        size => size === action.payload
      )

      if (findSizes) {
        state.filterSizes = state.filterSizes.filter(size =>
          size !== action.payload
        )
      } else {
        state.filterSizes.push(action.payload)
      }
    },

    deleteSizes(state) {
      state.filterSizes = [];
    },

    setSort(state, action) {
      state.sort= action.payload;
    },

    setFromSearch(state, action) {
      state.category = action.payload.category;
      state.subCategory = action.payload.subCategory;
      state.filterSizes = action.payload.filterSizes;
      state.filterColors = action.payload.filterColors;
      state.sort.order = action.payload.sort;
      state.isNew = action.payload.isNew;
      state.isSales = action.payload.isSales;
    },

    setModal(state, action) {
      state.modal = action.payload;
    },

    setToogleMenuMobile(state, action) {
      state.menuMobile = action.payload;
    },

    setToogleNenuSearch(state, action) {
      state.menuSearch = action.payload;
    }
  },
});

export const { setCategory, setSubCategory, setIsNew, setSales, setColors, deleteColors,setSizes, deleteSizes, setSort, setFromSearch, setModal, setToogleMenuMobile, setToogleNenuSearch } = filtersSlice.actions;

export default filtersSlice.reducer;