import mongoose from 'mongoose';

const artworkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    // We store the Cloudinary URL and ID so we can delete it later if needed
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      // Enums ensure data consistency
      enum: ['Political Satire', 'Comic Strip', 'Character Design', 'Illustration', 'Unmad Cover', 'Sketch'],
    },
    publication: {
      type: String,
      default: 'Personal Work', 
      // Examples: "Daily New Age", "Dhaka Comics", "Kishore Alo"
    },
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    tags: [String], // Allows searching by specific topics like "Traffic", "Elections", "Rain"
    description: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false, // Set to true to show on the Home page slider
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Artwork = mongoose.model('Artwork', artworkSchema);

export default Artwork;