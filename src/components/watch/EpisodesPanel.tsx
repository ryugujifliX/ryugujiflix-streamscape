
import React, { useState } from 'react';
import { Episode } from '../../services/api';
import { Grid3X3, List, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EpisodesPanelProps {
  episodes: Episode[];
  currentEpisode: Episode;
  goToEpisode: (episodeNumber: number) => void;
}

const EpisodesPanel: React.FC<EpisodesPanelProps> = ({ 
  episodes, 
  currentEpisode, 
  goToEpisode 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayCount, setDisplayCount] = useState(24); // Number of episodes to display initially

  const loadMore = () => {
    setDisplayCount(prev => prev + 24);
  };

  const renderEpisodeNumber = (episode: Episode) => {
    return (
      <div 
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          episode.number === currentEpisode.number ? "scale-100" : "hover:scale-105",
          viewMode === 'grid' ? "w-12 h-12 rounded-md" : "w-full h-16 rounded-lg"
        )}
      >
        <button
          onClick={() => goToEpisode(episode.number)}
          className={cn(
            "w-full h-full flex items-center justify-center transition-colors",
            episode.number === currentEpisode.number 
              ? 'bg-ryugu-red text-white' 
              : 'bg-white/10 hover:bg-white/20'
          )}
        >
          {viewMode === 'grid' ? (
            <span className="text-sm font-medium">{episode.number}</span>
          ) : (
            <div className="flex items-center justify-between w-full px-3">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-full",
                  episode.number === currentEpisode.number 
                    ? 'bg-white/20' 
                    : 'bg-ryugu-red/20'
                )}>
                  <Play size={12} className={episode.number === currentEpisode.number ? "text-white" : "text-ryugu-red"} />
                </div>
                <span className="text-sm font-medium">Episode {episode.number}</span>
              </div>
              <span className="text-xs text-white/60">{episode.duration} min</span>
            </div>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="mt-4 p-4 bg-black/80 backdrop-blur-sm rounded-lg max-h-80 overflow-y-auto animate-scale-in border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Episodes List</h3>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded-md transition-colors",
              viewMode === 'grid' ? 'bg-ryugu-red text-white' : 'bg-white/10 hover:bg-white/20'
            )}
          >
            <Grid3X3 size={14} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "w-7 h-7 flex items-center justify-center rounded-md transition-colors",
              viewMode === 'list' ? 'bg-ryugu-red text-white' : 'bg-white/10 hover:bg-white/20'
            )}
          >
            <List size={14} />
          </button>
        </div>
      </div>
      
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2" 
          : "flex flex-col space-y-2"
      )}>
        {episodes.slice(0, displayCount).map(episode => renderEpisodeNumber(episode))}
      </div>
      
      {/* Load More Button */}
      {displayCount < episodes.length && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={loadMore}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
          >
            Load More Episodes
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodesPanel;
