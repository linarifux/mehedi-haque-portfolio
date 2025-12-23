import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../features/gallery/gallerySlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
  },
});