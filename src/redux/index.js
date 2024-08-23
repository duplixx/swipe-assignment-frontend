import { combineReducers } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
