import { useEffect, useState } from 'react'; // <-- Import useState
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtworks } from '../features/gallery/gallerySlice';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal'; // <-- Import the Modal
import { Loader2 } from 'lucide-react';

const ArtworkGrid = () => {
  const dispatch = useDispatch();
  const { artworks, isLoading, isError, message, selectedCategory } = useSelector(
    (state) => state.gallery
  );

  // State for the Lightbox
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    dispatch(fetchArtworks({ category: selectedCategory === 'All' ? '' : selectedCategory }));
  }, [dispatch, selectedCategory]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-gray-400" size={48} />
    </div>
  );

  if (isError) return <div className="text-center py-20 text-red-500">Error: {message}</div>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {artworks.map((artwork) => (
            <ArtworkCard 
              key={artwork._id} 
              artwork={artwork} 
              // Pass the click handler
              onClick={() => setSelectedArtwork(artwork)} 
            />
          ))}
        </div>
      </div>

      {/* Render Modal if artwork is selected */}
      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </>
  );
};

export default ArtworkGrid;