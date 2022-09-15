import { configureStore } from '@reduxjs/toolkit';
import auth from './auth'
import product from './product';
import cart from './cart';
import orders from './orders';



export const store = configureStore({
  reducer: {
    auth,
    product,
    cart,
    orders
  },
});
