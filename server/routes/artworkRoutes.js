import express from 'express';
import { getArtworks, createArtwork, deleteArtwork } from '../controllers/artworkController.js'; // Import deleteArtwork
import upload from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getArtworks)
  .post(protect, admin, upload.single('image'), createArtwork);

// New Route for ID-specific operations
router.route('/:id')
  .delete(protect, admin, deleteArtwork); // <-- Protected Delete Route

export default router;