
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { Anime, Episode } from '../services/api';
import { useStreamingLinks } from '../services/animeAPI';
import VideoPlayer from '../components/watch/VideoPlayer';
import PlayerControls from '../components/watch/PlayerControls';
import SettingsPanel from '../components/watch/SettingsPanel';
import EpisodesPanel from '../components/watch/EpisodesPanel';
import ContinueWatching from '../components/watch/ContinueWatching';

const WatchAnime = () => {
  const { id, episodeNumber } = useParams<{ id: string, episodeNumber: string }>();
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player Section */}
      <div className="relative w-full bg-black">
        {/* Video Player */}
        <VideoPlayer 
          animeTitle={anime.title}
          episodeNumber={currentEpisode.number}
          selectedServer={selectedServer}
          videoUrl={videoUrl}
          isLoadingStreams={isLoadingStreams}
          isStreamError={isStreamError}
        />
        
        {/* Player Controls */}
        <PlayerControls 
          anime={anime}
          currentEpisode={currentEpisode}
          hasPrevEpisode={hasPrevEpisode}
          hasNextEpisode={hasNextEpisode}
          goToPreviousEpisode={goToPreviousEpisode}
          goToNextEpisode={goToNextEpisode}
          toggleSettings={toggleSettings}
          toggleEpisodes={toggleEpisodes}
          showSettings={showSettings}
        />
        
        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel 
            streamingData={streamingData}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
            setVideoUrl={setVideoUrl}
          />
        )}
        
        {/* Episodes Panel */}
        {showEpisodes && (
          <EpisodesPanel 
            episodes={episodes}
            currentEpisode={currentEpisode}
            goToEpisode={goToEpisode}
          />
        )}
      </div>
      
      {/* Recommendations Section */}
      <ContinueWatching 
        animeId={anime.id}
        episodes={episodes}
        currentEpisode={currentEpisode}
      />
    </div>
  );
};

export default WatchAnime;
