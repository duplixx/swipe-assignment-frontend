import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.updatedItem };
      }
    },
  },
});
export const fetchAllProducts = (state) => state.items;
export const { updateProduct, addProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
