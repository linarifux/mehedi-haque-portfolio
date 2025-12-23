import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'; 
import { setCategory, fetchArtworks } from '../features/gallery/gallerySlice';
import { Menu, X } from 'lucide-react';

const categories = ['All', 'Political Satire', 'Comic Strip', 'Character Design', 'Unmad Cover', 'Illustration'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.gallery);
  const location = useLocation(); 

  const handleCategoryClick = (cat) => {
    dispatch(setCategory(cat));
    dispatch(fetchArtworks({ category: cat === 'All' ? '' : cat }));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <h1 className="text-2xl font-bold font-serif tracking-tighter text-gray-900">
              MEHEDI<span className="text-red-600">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Archive</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            
            <Link to="/login" className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Category Filter Bar (Only visible on Home Page) */}
        {location.pathname === '/' && (
          <div className="hidden md:flex justify-center space-x-6 py-2 border-t border-gray-50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`${
                  selectedCategory === cat
                    ? 'text-red-600 font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                } text-xs uppercase tracking-wider transition-colors duration-200`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block py-2 text-base font-medium text-gray-900">Archive</Link>
            <Link to="/about" className="block py-2 text-base font-medium text-gray-600">About</Link>
            <Link to="/contact" className="block py-2 text-base font-medium text-gray-600">Contact</Link>
          </div>
          {/* Mobile Categories (Only on Home) */}
          {location.pathname === '/' && (
            <div className="px-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Filters</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { handleCategoryClick(cat); setIsOpen(false); }}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      selectedCategory === cat 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;