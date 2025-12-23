import { X, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';

const ArtworkModal = ({ artwork, onClose }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop (Dark Overlay) */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section (Scrollable if tall comic strip) */}
        <div className="flex-1 bg-gray-100 overflow-y-auto flex items-center justify-center p-4">
          <img 
            src={artwork.image.url} 
            alt={artwork.title} 
            className="w-auto h-auto max-w-full max-h-full object-contain shadow-lg" 
          />
        </div>

        {/* Details Sidebar (Right side on desktop, Bottom on mobile) */}
        <div className="w-full md:w-80 bg-white p-6 md:border-l border-gray-100 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full mb-3">
              {artwork.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
              {artwork.title}
            </h2>
            {artwork.description && (
              <p className="text-gray-600 text-sm mt-2">{artwork.description}</p>
            )}
          </div>

          <div className="space-y-4 mt-auto">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={16} className="mr-2" />
              <span>{artwork.year}</span>
            </div>
            
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex items-start">
                <Tag size={16} className="mr-2 mt-1 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;