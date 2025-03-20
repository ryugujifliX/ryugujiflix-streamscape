
import React, { useEffect, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // When videoUrl changes, update the video player
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
      videoRef.current.load();
      
      // Try to play the video (may be prevented by browser autoplay policies)
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [videoUrl]);

  return (
    <div className="relative w-full aspect-video bg-black animate-fade-in">
      {isLoadingStreams ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-ryugu-red border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/70">Loading stream...</p>
          </div>
        </div>
      ) : isStreamError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <p className="text-white/70 mb-2">Error loading stream.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-ryugu-red rounded-md text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      ) : videoUrl ? (
        <>
          <video 
            ref={videoRef}
            className="w-full h-full" 
            controls
            poster={`https://via.placeholder.com/1280x720/19171b/ffffff?text=${animeTitle}+-+Episode+${episodeNumber}`}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded text-xs">
            {selectedServer} Server
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <PlaySquare size={48} className="text-ryugu-red mb-4" />
            <p className="text-white/70">{animeTitle} - Episode {episodeNumber}</p>
            <p className="text-white/50 text-sm">No streaming source available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
