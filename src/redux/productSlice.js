import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    deleteItem: (state, action) => {
      return state.filter((item) => item.itemId !== action.payload);
    },
    updateItem: (state, action) => {
      const index = state.findIndex(
        (item) => item.itemId === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedItem;
      }

    },
  },
});
export const fetchAllProducts = (state) => state.items;
export const { updateProduct, addProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;