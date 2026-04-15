import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/ProductReducer';
import userReducer from '../reducers/UserReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
