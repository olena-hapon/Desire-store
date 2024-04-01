import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import category from "./slices/category";
import products from "./slices/products";
import filters from "./slices/filter";
import singleProduct from "./slices/singleProduct";
import favorites from "./slices/favorites";
import cart from "./slices/cartSlice";
import search from "./slices/search";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/";
import user from "./slices/user";

const persistConfigOne = {
  key: 'local',
  storage,
  blacklist : ['category', 'products', 'filters', 'singleProduct', 'user']
};

const myCombineReducer = combineReducers({
  category,
  products,
  filters,
  singleProduct,
  favorites,
  cart,
  search,
  user,
})

const localStorageReducer = persistReducer(persistConfigOne, myCombineReducer)

export const basicStoreConfig = configureStore({
  reducer: localStorageReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const store = configureStore({
//   reducer: {
//     category,
//     products,
//     filters,
//     singleProduct,
//     favorites,
//     cart,
//   }
// });

export type RootState = ReturnType<typeof basicStoreConfig.getState>;
export type AppDispatch = typeof basicStoreConfig.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;