import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';


const API_URL = `${import.meta.env.VITE_API_URL}`;

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, userData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem("userId", JSON.stringify(res.data.userId));
      // toast.success("Logged in successfully");
      return res.data;
    } catch (err) {
      // toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);