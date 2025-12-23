import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your backend
const API_URL = 'http://localhost:5000/api/artworks';

// 1. Thunk to Fetch Artworks
export const fetchArtworks = createAsyncThunk(
  'gallery/fetchArtworks',
  async ({ category, keyword } = {}, thunkAPI) => {
    try {
      // Build query string (e.g., ?category=Satire&keyword=politics)
      let query = '?';
      if (category) query += `category=${category}&`;
      if (keyword) query += `keyword=${keyword}`;

      const response = await axios.get(API_URL + query);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. The Slice
const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    artworks: [],
    isLoading: false,
    isError: false,
    message: '',
    // Filter State
    selectedCategory: 'All', 
    searchKeyword: '',
  },
  reducers: {
    // Actions to update filters manually
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    resetGallery: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artworks = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setCategory, setSearchKeyword, resetGallery } = gallerySlice.actions;
export default gallerySlice.reducer;