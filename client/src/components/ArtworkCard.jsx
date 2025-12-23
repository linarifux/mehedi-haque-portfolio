const ArtworkCard = ({ artwork, onClick }) => { // <-- Receive onClick prop
  return (
    <div 
      onClick={onClick} // <-- Attach onClick here
      className="group relative break-inside-avoid mb-6 cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        <img
          src={artwork.image.url}
          alt={artwork.title}
          className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
            {artwork.category}
          </p>
          <h3 className="text-white text-lg font-semibold leading-tight">
            {artwork.title}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{artwork.year}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;