import { AddtoCart } from "../../Types/AddtoCart";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  totalPrice: number,
  items: AddtoCart[],
};

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

const cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.size === action.payload.size
      )

      if (!findItem) {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      } else {
        findItem.count ++
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    deleteItems(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.size === action.payload.size
      )

      state.items = state.items.filter(item => item !== findItem)

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    increaseItem(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.size === action.payload.size
      )

      if (findItem) {
        findItem.count += 1
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },

    decraseItem(state, action) {
      const findItem = state.items.find(
        item => item.id === action.payload.id
        && item.color === action.payload.color
        && item.size === action.payload.size
      )

      if (findItem) {
        findItem.count -= 1
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    }
  }
})

export const { addItems, deleteItems, increaseItem, decraseItem } = cartslice.actions;
export default cartslice.reducer;