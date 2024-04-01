import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  id: number,
  title: string,
  subcat: [{name: string, id: number}, {name: string, id: number}],
}

 export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    const response = await axios.get(`https://65968bd96bb4ec36ca02dde0.mockapi.io/category`);
    return response.data
  }
)
type InitialState = {
  category: Category[];
  status: string;
}

const initialState: InitialState = {
  category: [],
  status: 'loading',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCategory.pending, (state) => {
        state.status = 'loading';
        state.category= [];
      });
  
      builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
        state.status = 'succes';
        state.category= payload;
      });
  
      builder.addCase(fetchCategory.rejected, (state) => {
        state.status = 'error';
        state.category = [];
      });
    },
})

export default categorySlice.reducer;