import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import orderReducer from '../Order/OrderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer
  },
});

export default store;
