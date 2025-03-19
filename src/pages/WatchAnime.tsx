
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List, Heart, Share2, Settings, PlaySquare } from 'lucide-react';
import api, { Anime, Episode } from '../services/api';
import { useStreamingLinks } from '../services/animeAPI';
import { useToast } from '../components/ui/use-toast';

const WatchAnime = () => {
  const { id, episodeNumber } = useParams<{ id: string, episodeNumber: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [selectedServer, setSelectedServer] = useState("GogoAnime");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Convert params to numbers
  const animeId = id ? parseInt(id) : 0;
  const epNumber = episodeNumber ? parseInt(episodeNumber) : 0;

  // Fetch streaming links using React Query
  const { 
    data: streamingData, 
    isLoading: isLoadingStreams, 
    isError: isStreamError 
  } = useStreamingLinks(animeId, epNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || !episodeNumber) return;
        
        // Fetch anime and episodes data
        const animeData = await api.getAnimeById(animeId);
        const episodesData = await api.getEpisodes(animeId);
        
        if (animeData && episodesData) {
          setAnime(animeData);
          setEpisodes(episodesData);
          
          // Find current episode
          const episode = episodesData.find(ep => ep.number === epNumber);
          if (episode) {
            setCurrentEpisode(episode);
          } else if (episodesData.length > 0) {
            // If episode not found, redirect to first episode
            navigate(`/anime/${animeId}/watch/1`);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching watch data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, episodeNumber, navigate, animeId, epNumber]);

  // Set video URL when streaming data or selected server changes
  useEffect(() => {
    if (streamingData && streamingData.sources.length > 0) {
      const source = streamingData.sources.find(s => s.server === selectedServer) || streamingData.sources[0];
      setVideoUrl(source.url);
    }
  }, [streamingData, selectedServer]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-ryugu-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading video player...</p>
        </div>
      </div>
    );
  }
  
  if (!anime || !currentEpisode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Episode Not Found</h1>
          <p className="text-white/70 mb-6">The episode you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="ryugu-button">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const currentEpisodeIndex = episodes.findIndex(ep => ep.number === currentEpisode.number);
  const hasPrevEpisode = currentEpisodeIndex > 0;
  const hasNextEpisode = currentEpisodeIndex < episodes.length - 1;
  
  const goToEpisode = (episodeNumber: number) => {
    navigate(`/anime/${anime.id}/watch/${episodeNumber}`);
    setShowEpisodes(false);
  };
  
  const goToPreviousEpisode = () => {
    if (hasPrevEpisode) {
      const prevEpisode = episodes[currentEpisodeIndex - 1];
      goToEpisode(prevEpisode.number);
    }
  };
  
  const goToNextEpisode = () => {
    if (hasNextEpisode) {
      const nextEpisode = episodes[currentEpisodeIndex + 1];
      goToEpisode(nextEpisode.number);
    }
  };
  
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowEpisodes(false);
  };
  
  const toggleEpisodes = () => {
    setShowEpisodes(!showEpisodes);
    setShowSettings(false);
  };

  const handleServerChange = (server: string) => {
    setSelectedServer(server);
    if (streamingData) {
      const source = streamingData.sources.find(s => s.server === server);
      if (source) {
        setVideoUrl(source.url);
        toast({
          title: "Server Changed",
          description: `Now playing from ${server}`,
          duration: 2000,
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Section */}
      <div className="relative w-full bg-black">
        {/* Video Player (Placeholder) */}
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
                <p className="text-white/70">{anime.title} - Episode {currentEpisode.number}</p>
                <p className="text-white/50 text-sm">Playing on {selectedServer} server</p>
                {videoUrl && (
                  <p className="text-white/30 text-xs mt-2">Stream URL: {videoUrl.substring(0, 30)}...</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Player Controls */}
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
          
          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg animate-scale-in">
              <h3 className="text-sm font-medium mb-3">Video Settings</h3>
              
              <div className="space-y-4">
                {/* Server Selection */}
                <div>
                  <label className="text-xs text-white/60 block mb-2">Select Server</label>
                  <div className="flex flex-wrap gap-2">
                    {streamingData && streamingData.sources.map(source => (
                      <button
                        key={source.server}
                        onClick={() => handleServerChange(source.server)}
                        className={`px-3 py-1 text-xs rounded-md ${
                          selectedServer === source.server 
                            ? 'bg-ryugu-red text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {source.server} {source.quality && `(${source.quality})`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quality Selection */}
                <div>
                  <label className="text-xs text-white/60 block mb-2">Video Quality</label>
                  <div className="flex flex-wrap gap-2">
                    {["1080p", "720p", "480p", "360p", "Auto"].map(quality => (
                      <button
                        key={quality}
                        className={`px-3 py-1 text-xs rounded-md ${
                          quality === "1080p" 
                            ? 'bg-ryugu-red text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Playback Settings */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded bg-white/10 border-white/30 text-ryugu-red mr-2" />
                    <span className="text-xs">Auto Play</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded bg-white/10 border-white/30 text-ryugu-red mr-2" />
                    <span className="text-xs">Auto Next</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Episodes Panel */}
          {showEpisodes && (
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
          )}
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="ryugu-container py-8">
        <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {episodes.slice(0, 6).map(episode => (
            <Link 
              key={episode.id} 
              to={`/anime/${anime.id}/watch/${episode.number}`}
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
    </div>
  );
};

export default WatchAnime;
