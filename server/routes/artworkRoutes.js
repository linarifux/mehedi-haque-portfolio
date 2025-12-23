import express from 'express';
import { getArtworks, createArtwork, deleteArtwork } from '../controllers/artworkController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// REMOVED: import upload from '../config/cloudinary.js'; 
// We no longer handle file parsing on the backend.

const router = express.Router();

router.route('/')
  .get(getArtworks)
  .post(protect, admin, createArtwork); // <-- Clean: No upload middleware needed

// New Route for ID-specific operations
router.route('/:id')
  .delete(protect, admin, deleteArtwork);

export default router;