import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null, // Store user data (including role)
  loading: false,
  error: null,
  role: null, // Store user role
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.role = action.payload.role; // Store role from API
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
