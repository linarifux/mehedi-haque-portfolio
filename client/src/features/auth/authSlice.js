import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// Check local storage for user (so they stay logged in on refresh)
const user = JSON.parse(localStorage.getItem("user"));

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      // Note: We use the '/register' endpoint now
      const response = await axios.post(
        `${API_URL}/register`,
        user
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
