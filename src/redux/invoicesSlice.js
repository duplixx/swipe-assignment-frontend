import { createSlice } from '@reduxjs/toolkit';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id,
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateProductInInvoices: (state, action) => {
      const updatedProduct = action.payload;
      return state.map((invoice) => ({
        ...invoice,
        items: invoice.items.map((item) =>
          item.productId === updatedProduct.id
            ? { ...item, ...updatedProduct }
            : item,
        ),
      }));
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateProductInInvoices,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
