
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, Share2, Plus, Star, Calendar, Clock, Film } from 'lucide-react';
import api, { Anime, Episode } from '../services/api';
import AnimeSection from '../components/AnimeSection';

const AnimeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [relatedAnime, setRelatedAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        
        const animeId = parseInt(id);
        const animeData = await api.getAnimeById(animeId);
        
        if (animeData) {
          setAnime(animeData);
          
          // Fetch episodes and related anime in parallel
          const [eps, related] = await Promise.all([
            api.getEpisodes(animeId),
            api.getAnimeByGenre(animeData.genres[0] || 'Action')
          ]);
          
          setEpisodes(eps);
          setRelatedAnime(related.filter(a => a.id !== animeId));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    // Here you would add logic to update user's watchlist in a real app
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-ryugu-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading anime details...</p>
        </div>
      </div>
    );
  }
  
  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Anime Not Found</h1>
          <p className="text-white/70 mb-6">The anime you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="ryugu-button">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-ryugu-dark z-10"
          />
          <img
            src={anime.coverImage || anime.image}
            alt={anime.title}
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="ryugu-container flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8">
            {/* Anime Poster */}
            <div className="w-40 md:w-56 shrink-0 rounded-lg overflow-hidden shadow-xl border border-white/10 animate-scale-in">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Details */}
            <div className="animate-slide-up">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{anime.title}</h1>
              
              {/* Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/80 mb-6">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                  <span>{anime.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-white/60 mr-1" />
                  <span>{anime.releaseYear}</span>
                </div>
                <div className="flex items-center">
                  <Film size={16} className="text-white/60 mr-1" />
                  <span>{anime.type}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="text-white/60 mr-1" />
                  <span>{anime.episodes} {anime.type === 'Movie' ? 'Movie' : 'Episodes'}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  anime.status === 'Ongoing' ? 'bg-green-600/80' : 'bg-blue-600/80'
                }`}>
                  {anime.status}
                </span>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres.map((genre) => (
                  <Link 
                    key={genre} 
                    to={`/genre/${genre.toLowerCase()}`}
                    className="px-3 py-1 bg-white/10 hover:bg-ryugu-red/80 backdrop-blur-sm rounded-full text-xs transition-colors"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {episodes.length > 0 ? (
                  <Link 
                    to={`/anime/${anime.id}/watch/1`} 
                    className="ryugu-button"
                  >
                    <Play size={18} className="mr-2" />
                    Watch Now
                  </Link>
                ) : (
                  <button className="ryugu-button opacity-50 cursor-not-allowed">
                    <Play size={18} className="mr-2" />
                    Coming Soon
                  </button>
                )}
                
                <button 
                  onClick={toggleWatchlist}
                  className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border transition-colors ${
                    isInWatchlist 
                      ? 'bg-ryugu-red/20 border-ryugu-red text-ryugu-red' 
                      : 'bg-white/10 hover:bg-white/20 border-white/10'
                  }`}
                >
                  {isInWatchlist ? (
                    <>
                      <Heart size={18} className="mr-2" fill="currentColor" />
                      Added to Watchlist
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2" />
                      Add to Watchlist
                    </>
                  )}
                </button>
                
                <button 
                  className="inline-flex items-center justify-center rounded-md w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-ryugu-dark">
        <div className="ryugu-container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Synopsis & Episodes */}
            <div className="lg:col-span-2 space-y-8 animate-slide-up animate-delay-100">
              {/* Synopsis */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Synopsis</h2>
                <p className="text-white/80 leading-relaxed">
                  {anime.description}
                </p>
              </div>
              
              {/* Episodes */}
              {episodes.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">Episodes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {episodes.map((episode) => (
                      <Link 
                        key={episode.id} 
                        to={`/anime/${anime.id}/watch/${episode.number}`}
                        className="flex bg-white/5 hover:bg-ryugu-red/10 rounded-lg overflow-hidden border border-white/5 hover:border-ryugu-red/30 transition-all"
                      >
                        <div className="relative w-24 h-16 md:w-28 md:h-20 flex-shrink-0">
                          <img 
                            src={episode.thumbnail} 
                            alt={`Episode ${episode.number}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                            <Play size={20} />
                          </div>
                        </div>
                        <div className="p-3 flex flex-col justify-center">
                          <h3 className="font-medium text-sm">Episode {episode.number}</h3>
                          <p className="text-xs text-white/60">{episode.duration} min</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column: Info & Related */}
            <div className="space-y-8 animate-slide-up animate-delay-200">
              {/* Information */}
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <h2 className="text-lg font-semibold mb-4">Information</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-white/60">Type</span>
                    <span>{anime.type}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Episodes</span>
                    <span>{anime.episodes}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Status</span>
                    <span>{anime.status}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/60">Released</span>
                    <span>{anime.releaseYear}</span>
                  </li>
                  {anime.language && (
                    <li className="flex justify-between">
                      <span className="text-white/60">Language</span>
                      <span>{anime.language}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <span className="text-white/60">Rating</span>
                    <span className="flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
                      {anime.rating.toFixed(1)}
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Random Screenshot */}
              <div className="rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={anime.coverImage || anime.image} 
                  alt={`${anime.title} Screenshot`}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Anime */}
        {relatedAnime.length > 0 && (
          <AnimeSection 
            title="You May Also Like" 
            animeList={relatedAnime} 
          />
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
