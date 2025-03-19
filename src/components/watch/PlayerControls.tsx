
import React from 'react';
import { ChevronLeft, ChevronRight, List, Heart, Share2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Episode } from '../../services/api';

interface PlayerControlsProps {
  anime: {
    id: number;
    title: string;
  };
  currentEpisode: Episode;
  hasPrevEpisode: boolean;
  hasNextEpisode: boolean;
  goToPreviousEpisode: () => void;
  goToNextEpisode: () => void;
  toggleSettings: () => void;
  toggleEpisodes: () => void;
  showSettings: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ 
  anime, 
  currentEpisode, 
  hasPrevEpisode, 
  hasNextEpisode,
  goToPreviousEpisode,
  goToNextEpisode,
  toggleSettings,
  toggleEpisodes,
  showSettings
}) => {
  return (
    <div className="bg-black p-4 border-b border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Episode Info */}
        <div className="flex items-center">
          <div>
            <Link 
              to={`/anime/${anime.id}`}
              className="text-lg font-medium hover:text-ryugu-red transition-colors"
            >
              {anime.title}
            </Link>
            <p className="text-white/60 text-sm">Episode {currentEpisode.number}</p>
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToPreviousEpisode}
            className={`px-3 py-1 flex items-center rounded-md ${
              hasPrevEpisode 
                ? 'bg-white/10 hover:bg-ryugu-red/80 transition-colors' 
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
            disabled={!hasPrevEpisode}
          >
            <ChevronLeft size={16} className="mr-1" />
            <span className="text-sm">Prev</span>
          </button>
          
          <button 
            onClick={toggleEpisodes}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md flex items-center transition-colors"
          >
            <List size={16} className="mr-1" />
            <span className="text-sm">Episodes</span>
          </button>
          
          <button 
            onClick={goToNextEpisode}
            className={`px-3 py-1 flex items-center rounded-md ${
              hasNextEpisode 
                ? 'bg-white/10 hover:bg-ryugu-red/80 transition-colors' 
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
            disabled={!hasNextEpisode}
          >
            <span className="text-sm">Next</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-ryugu-red/80 transition-colors">
            <Heart size={16} />
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-ryugu-red/80 transition-colors">
            <Share2 size={16} />
          </button>
          
          <button 
            onClick={toggleSettings}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              showSettings ? 'bg-ryugu-red' : 'bg-white/10 hover:bg-ryugu-red/80'
            }`}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
