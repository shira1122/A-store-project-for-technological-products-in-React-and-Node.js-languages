// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// שליפת כל ההזמנות
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const res = await axios.get('http://localhost:4000/api/orders');
  return res.data;
});

// שליפת הזמנות לפי אימייל
export const fetchOrdersByEmail = createAsyncThunk(
  'order/fetchOrdersByEmail',
  async (email) => {
    const res = await axios.get(`http://localhost:4000/api/orders/byemail?email=${email}`);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrdersByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrdersByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
