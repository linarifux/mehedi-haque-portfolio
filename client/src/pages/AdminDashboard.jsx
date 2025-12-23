import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createArtwork, deleteArtwork, fetchArtworks } from '../features/gallery/gallerySlice';
import { logout } from '../features/auth/authSlice';
import { Trash2, Upload, LogOut, Image as ImageIcon } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Political Satire');
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { artworks, isLoading } = useSelector((state) => state.gallery);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchArtworks({ category: '' }));
    }
  }, [user, navigate, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        return toast.error("File too large! Max 5MB.");
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
      return toast.error("Please select an image first!");
    }

    const uploadPromise = new Promise(async (resolve, reject) => {
      setUploadingImage(true);
      try {
        const imageUrl = await uploadToCloudinary(imageFile);

        const artworkData = {
          title,
          category,
          year,
          image: imageUrl,
        };

        await dispatch(createArtwork(artworkData)).unwrap();
        
        setTitle('');
        setCategory('Political Satire');
        setImageFile(null);
        setPreview('');
        setYear(new Date().getFullYear());
        
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      } finally {
        setUploadingImage(false);
      }
    });

    toast.promise(uploadPromise, {
      loading: 'Uploading to cloud...',
      success: 'Artwork Published Successfully!',
      error: (err) => `Failed: ${err.message || 'Something went wrong'}`,
    });
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-800 text-sm">
          Are you sure you want to delete this?
        </p>
        <div className="flex justify-end gap-3 mt-1">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id); // Close the confirmation
              
              // Trigger the actual delete action
              const deletePromise = dispatch(deleteArtwork(id)).unwrap();
              
              toast.promise(deletePromise, {
                loading: 'Deleting artwork...',
                success: 'Artwork deleted successfully',
                error: 'Failed to delete artwork',
              });
            }}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000, // Keeps it open longer so user can decide
      position: 'top-center', // Puts it in the center for attention
      style: {
        border: '1px solid #E5E7EB',
        padding: '16px',
        background: '#fff',
      },
      icon: '⚠️',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user && user.name}</p>
          </div>
          <button 
            onClick={() => {
              dispatch(logout());
              toast.success("Logged out successfully");
            }} 
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

               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none" />
              </div>

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
                {uploadingImage ? 'Uploading...' : isLoading ? 'Saving...' : 'Publish Artwork'}
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