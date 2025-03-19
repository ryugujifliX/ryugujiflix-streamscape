
import React from 'react';
import { PlaySquare } from 'lucide-react';

interface VideoPlayerProps {
  animeTitle: string;
  episodeNumber: number;
  selectedServer: string;
  videoUrl: string | null;
  isLoadingStreams: boolean;
  isStreamError: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  animeTitle,
  episodeNumber,
  selectedServer,
  videoUrl,
  isLoadingStreams,
  isStreamError
}) => {
  return (
    <div className="relative w-full aspect-video bg-black animate-fade-in">
      <div className="absolute inset-0 flex items-center justify-center">
        {isLoadingStreams ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-ryugu-red border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/70">Loading stream...</p>
          </div>
        ) : isStreamError ? (
          <div className="flex flex-col items-center">
            <p className="text-white/70 mb-2">Error loading stream.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-ryugu-red rounded-md text-sm"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <PlaySquare size={48} className="text-ryugu-red mb-4" />
            <p className="text-white/70">{animeTitle} - Episode {episodeNumber}</p>
            <p className="text-white/50 text-sm">Playing on {selectedServer} server</p>
            {videoUrl && (
              <p className="text-white/30 text-xs mt-2">Stream URL: {videoUrl.substring(0, 30)}...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
