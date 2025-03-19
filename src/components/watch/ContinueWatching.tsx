
import React from 'react';
import { Link } from 'react-router-dom';
import { Episode } from '../../services/api';

interface ContinueWatchingProps {
  animeId: number;
  episodes: Episode[];
  currentEpisode: Episode;
}

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ 
  animeId, 
  episodes, 
  currentEpisode 
}) => {
  return (
    <div className="ryugu-container py-8">
      <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {episodes.slice(0, 6).map(episode => (
          <Link 
            key={episode.id} 
            to={`/anime/${animeId}/watch/${episode.number}`}
            className={`block rounded-lg overflow-hidden border ${
              episode.number === currentEpisode.number
                ? 'border-ryugu-red'
                : 'border-white/10 hover:border-white/30'
            } transition-all`}
          >
            <div className="relative aspect-video">
              <img 
                src={episode.thumbnail} 
                alt={`Episode ${episode.number}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-2">
                  <div className="text-xs font-medium">Episode {episode.number}</div>
                  <div className="text-xs text-white/60">{episode.duration} min</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
