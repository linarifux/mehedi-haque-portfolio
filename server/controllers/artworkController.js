import Artwork from '../models/Artwork.js';

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
    const { title, category, publication, year, tags, description, isFeatured } = req.body;

    // validation: Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const artwork = new Artwork({
      title,
      image: {
        url: req.file.path,       // Cloudinary URL from Multer
        public_id: req.file.filename // Cloudinary ID (needed for deletion)
      },
      category,
      publication,
      year,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [], // Convert "satire, politics" string to array
      description,
      isFeatured: isFeatured === 'true', // Convert string "true" to boolean
    });

    const createdArtwork = await artwork.save();
    res.status(201).json(createdArtwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};