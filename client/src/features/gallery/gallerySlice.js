import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for your backend
const API_URL = `${import.meta.env.VITE_API_URL}/api/artworks`;

// 1. Thunk to Fetch Artworks
export const fetchArtworks = createAsyncThunk(
  "gallery/fetchArtworks",
  async ({ category, keyword } = {}, thunkAPI) => {
    try {
      // Build query string (e.g., ?category=Satire&keyword=politics)
      let query = "?";
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

// Thunk to create Artworks
export const createArtwork = createAsyncThunk(
  "gallery/createArtwork",
  async (artworkData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // No need to set Content-Type for FormData, axios does it automatically
        },
      };

      const response = await axios.post(API_URL, artworkData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. Thunk to Delete Artwork
export const deleteArtwork = createAsyncThunk(
  "gallery/deleteArtwork",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(`${API_URL}/${id}`, config);
      return id; // Return the ID so we can remove it from the state
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. The Slice
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    artworks: [],
    isLoading: false,
    isError: false,
    message: "",
    // Filter State
    selectedCategory: "All",
    searchKeyword: "",
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
      state.message = "";
    },
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
      })
      .addCase(createArtwork.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new artwork to the top of the list immediately
        state.artworks.unshift(action.payload);
        state.message = "Upload Successful!";
      })
      .addCase(createArtwork.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted item from the list instantly
        state.artworks = state.artworks.filter(
          (art) => art._id !== action.payload
        );
        state.message = "Artwork Deleted";
      });
  },
});

export const { setCategory, setSearchKeyword, resetGallery } =
  gallerySlice.actions;
export default gallerySlice.reducer;
