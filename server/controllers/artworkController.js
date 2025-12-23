import Artwork from '../models/Artwork.js';
// REMOVED: import { v2 as cloudinary } from 'cloudinary'; 
// We removed the import above so Vercel doesn't crash.

// @desc    Fetch all artworks (with optional category filter)
// @route   GET /api/artworks
// @access  Public
export const getArtworks = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i', // Case insensitive
          },
        }
      : {};

    // Filter by category if provided
    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const artworks = await Artwork.find({ ...keyword, ...categoryFilter }).sort({ createdAt: -1 }); // Newest first
    
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new artwork
// @route   POST /api/artworks
// @access  Private (Admin only)
export const createArtwork = async (req, res) => {
  try {
    // 1. Accept 'image' from the body (It's now a URL string from React)
    const { title, category, publication, year, tags, description, isFeatured, image } = req.body;

    // validation: Check if image URL exists
    if (!image) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const artwork = new Artwork({
      title,
      // We adapt the structure to match your Schema.
      // Since client-side upload doesn't give a public_id easily, we just save the URL.
      image: {
        url: image, 
        public_id: null // Set to null because we aren't handling deletion via API anymore
      },
      category,
      publication,
      year,
      // Handle tags whether they come as a string (from FormData) or Array (from JSON)
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []), 
      description,
      isFeatured: isFeatured === 'true' || isFeatured === true, 
    });

    const createdArtwork = await artwork.save();
    res.status(201).json(createdArtwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};


// @desc    Delete an artwork
// @route   DELETE /api/artworks/:id
// @access  Private (Admin)
export const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (artwork) {
      // NOTE: We no longer delete the image from Cloudinary here to prevent backend crashes.
      // We only delete the database record. The image stays in Cloudinary storage (which is safe/cheap).

      // Delete from Database
      await artwork.deleteOne();
      
      res.json({ message: 'Artwork removed from database' });
    } else {
      res.status(404);
      throw new Error('Artwork not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};