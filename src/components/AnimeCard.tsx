
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import type { Anime } from '../services/api';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, index = 0 }) => {
  return (
    <Link 
      to={`/anime/${anime.id}`} 
      className={`ryugu-card ryugu-card-hover group animate-fade-in animate-delay-${index % 5}00`}
    >
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
        {/* Image */}
        <img 
          src={anime.image} 
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        
        {/* Rating */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md flex items-center">
          <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-xs font-medium">{anime.rating.toFixed(1)}</span>
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2 bg-ryugu-red/80 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-medium">{anime.type}</span>
        </div>
        
        {/* Play button (shown on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-ryugu-red/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
            <Play size={20} fill="white" />
          </div>
        </div>
        
        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-ryugu-red transition-colors">
            {anime.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1 text-xs text-white/70">
            <span>{anime.releaseYear}</span>
            <span>•</span>
            <span>{anime.episodes} {anime.type === 'Movie' ? 'Movie' : 'Episodes'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
