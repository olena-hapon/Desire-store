import { createSlice } from '@reduxjs/toolkit';

type SearchState = {
  searchValue: string;
};

const initialState:SearchState = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.searchValue = action.payload;
      console.log(state.searchValue)
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;