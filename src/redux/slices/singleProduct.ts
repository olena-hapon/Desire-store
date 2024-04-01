import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../Types/Product";

type FetchProductSingle = {
  id: string | undefined,
};

export const fetchSingleProduct = createAsyncThunk('product/fetchProduct', async(params: FetchProductSingle) => {
  const { id } = params;
  const response = await axios.get(`https://65968bd96bb4ec36ca02dde0.mockapi.io/products/${id}`)
  
    return response.data
  }
)

type InitialState = {
  product: Product | undefined;
  status: string;
};

const initialState: InitialState = {
  product: {
    id: '',
    title: '',
    price: 0,
    discountPrice: 0,
    desc: '',
    isNew: false,
    category: '',
    subCategory: '',
    aviable: [{color: '', size: '', quantity: 0}],
    color: '',
    colors: [],
    images: [],
    img2: '',
    relatedProdId: '',
    relatedProdTitle: '',
  },
  status: 'loading',
}

const singleProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state, action: { payload: Product | undefined }) => {
      state.status = 'loading';
      state.product = action.payload;
    });

    // (state: WritableDraft<{ name: string }>)

    builder.addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
      state.status = 'succes';
      state.product= payload;
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action: { payload }) => {
      state.status = 'error';
      state.product = action.payload;
    });
  },
})

export default singleProductSlice.reducer;