import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../features/data-fetch/data-action';

export const store = configureStore({
  reducer: {
    fetchData : dataSlice,
  },
});
