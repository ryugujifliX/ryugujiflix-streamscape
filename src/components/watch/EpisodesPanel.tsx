
import React from 'react';
import { Episode } from '../../services/api';

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
  return (
    <div className="mt-4 p-4 bg-white/5 rounded-lg max-h-60 overflow-y-auto animate-scale-in">
      <h3 className="text-sm font-medium mb-3">Episodes List</h3>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {episodes.map(episode => (
          <button
            key={episode.id}
            onClick={() => goToEpisode(episode.number)}
            className={`w-10 h-10 flex items-center justify-center rounded-md text-sm ${
              episode.number === currentEpisode.number 
                ? 'bg-ryugu-red text-white' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {episode.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPanel;
