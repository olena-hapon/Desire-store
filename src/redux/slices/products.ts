/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../Types/Product";
import { error } from "console";

type FetchProducrsAtgs = {
  category: string,
  subCategory: string,
  isNew: boolean | string,
  isSales: number | string,
  page: number,
  searchValue: string,
  sort : {
    name: string,
    sortBy: string,
    order: string,
  };
}

 export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params: FetchProducrsAtgs) => {
  const { category, subCategory, isNew, isSales, page, sort, searchValue } = params;
    const response = await axios.get(`https://65968bd96bb4ec36ca02dde0.mockapi.io/products?category=${category}&subCategory=${subCategory}&isNew=${isNew}&sales=${isSales}&sortBy=${sort.sortBy}&order=${sort.order}&title=${searchValue}`);
    return response.data
  }
)

type InitialState = {
  products: Product[];
  status: string;
};

const initialState: InitialState = {
  products: [],
  status: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.products= [];
      });
  
      builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = 'succes';
        state.products= payload;
      });
  
      builder.addCase(fetchProducts.rejected, (state) => {
        state.status = 'error';
        console.log(state.status)
        state.products = [];
      });
    },
})

export default productsSlice.reducer;