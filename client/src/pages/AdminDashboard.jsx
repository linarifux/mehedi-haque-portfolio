import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for the Cloudinary upload
import { createArtwork, deleteArtwork, fetchArtworks } from '../features/gallery/gallerySlice';
import { logout } from '../features/auth/authSlice';
import { Trash2, Upload, LogOut, Image as ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  // Upload State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Political Satire');
  const [year, setYear] = useState(new Date().getFullYear());
  
  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false); // Local state for image upload progress

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { artworks, isLoading, isError, message } = useSelector((state) => state.gallery);

  // Auth Check & Initial Fetch
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchArtworks({ category: '' }));
    }
  }, [user, navigate, dispatch]);

  // Helper: Handle File Selection & Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview instantly
    }
  };

  // Helper: Upload to Cloudinary (Client-Side)
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET); 
    formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new Error('Image upload failed');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return alert("Please select an image");
    }

    setUploadingImage(true);

    try {
      // 1. Upload Image to Cloudinary first
      const imageUrl = await uploadToCloudinary(imageFile);

      // 2. Prepare Data (JSON object, NOT FormData)
      const artworkData = {
        title,
        category,
        year,
        image: imageUrl, // Send the URL string
      };

      // 3. Dispatch to Redux (Your slice should handle JSON automatically)
      await dispatch(createArtwork(artworkData)).unwrap();
      
      // 4. Reset form on success
      setTitle('');
      setCategory('Political Satire');
      setImageFile(null);
      setPreview('');
      alert("Artwork Published Successfully!");
      
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload artwork. " + (error.message || message));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this artwork? This cannot be undone.')) {
      dispatch(deleteArtwork(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user && user.name}</p>
          </div>
          <button 
            onClick={() => dispatch(logout())} 
            className="flex items-center px-4 py-2 bg-white text-red-600 rounded-lg shadow-sm hover:bg-red-50 transition"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Upload Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Upload size={20} className="mr-2" /> Upload New Art
            </h2>
            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none" placeholder="e.g. Traffic Jam 2024" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none">
                  <option>Political Satire</option>
                  <option>Comic Strip</option>
                  <option>Character Design</option>
                  <option>Unmad Cover</option>
                  <option>Illustration</option>
                  <option>Sketch</option>
                </select>
              </div>

               {/* Year Input (Added missing field from logic) */}
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none" />
              </div>

              {/* Image Input & Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {preview ? (
                    <img src={preview} alt="Preview" className="mx-auto h-32 object-contain" />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <ImageIcon size={24} className="mb-2"/>
                      <span className="text-xs">Click to select image</span>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={uploadingImage || isLoading}
                className={`w-full py-3 rounded-lg font-medium transition text-white
                  ${(uploadingImage || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                {uploadingImage ? 'Uploading Image...' : isLoading ? 'Saving to DB...' : 'Publish Artwork'}
              </button>
            </form>
          </div>

          {/* RIGHT: Management Table */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6">Manage Archive ({artworks.length})</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-100 text-sm uppercase tracking-wider">
                    <th className="py-3 font-medium">Preview</th>
                    <th className="py-3 font-medium">Details</th>
                    <th className="py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {artworks.map((art) => (
                    <tr key={art._id} className="hover:bg-gray-50 transition">
                      <td className="py-4">
                        <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                          {/* Access the URL safely */}
                          <img src={art.image?.url || art.image} alt={art.title} className="h-full w-full object-cover" />
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="font-semibold text-gray-900">{art.title}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{art.category}</span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDelete(art._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-2"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {artworks.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-gray-400">No artworks found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;