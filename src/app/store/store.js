import { configureStore } from '@reduxjs/toolkit';
import auth from './auth'
import product from './product';

export const store = configureStore({
  reducer: {
    auth,
    product,
  },
});
