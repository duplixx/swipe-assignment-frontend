import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
    updateCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.updatedItem };
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
