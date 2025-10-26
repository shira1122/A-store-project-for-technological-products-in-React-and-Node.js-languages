import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//  שלב 1: thunk להתחברות
export const login = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  שלב 2: thunk להרשמה – תוסיפי מתחת ל־
export const register = createAsyncThunk(
  'user/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:4000/api/user/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//  סטייט ראשוני
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

//  יצירת הסלייס
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // התחברות
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  הרשמה – מוסיפים כאן מתחת ל־login
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;