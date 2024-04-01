import { json } from "stream/consumers";
import { Product } from "../../Types/Product";
import { createSlice } from "@reduxjs/toolkit";

type FavoritesState = {
  favoritesItem: Product[];
};

const initialState: FavoritesState = {
  favoritesItem: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const findItem = state.favoritesItem.find(
        item => item.id === action.payload.id,
      )

      if (findItem) {
        state.favoritesItem = state.favoritesItem.filter(item => item.id !== action.payload.id)
      } else {
        state.favoritesItem.push(action.payload)
      }
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;