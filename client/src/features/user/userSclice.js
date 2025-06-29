import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './userThunk'; 
import toast from 'react-hot-toast';

const initialState = {
  user: JSON.parse(localStorage.getItem('userId')) || null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userId', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('userId');
      toast.success("LogOut");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;