import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Load env variables (ensures we can read the keys immediately)
dotenv.config();

// 1. Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure the Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mehedi-haque-archive', // The folder name in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Restrict file types
    transformation: [{ width: 1000, crop: 'limit' }], // Optional: Resize large images on upload
  },
});

// 3. Initialize Multer with this storage engine
const upload = multer({ storage });

export default upload;