import express from 'express';
import { getArtworks, createArtwork } from '../controllers/artworkController.js';
import upload from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // <-- Import middleware

const router = express.Router();

router.route('/')
  .get(getArtworks)
  // Now this route is LOCKED. Only a logged-in Admin can access it.
  .post(protect, admin, upload.single('image'), createArtwork); 

export default router;