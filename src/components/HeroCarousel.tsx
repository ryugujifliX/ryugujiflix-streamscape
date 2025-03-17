
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Anime } from '../services/api';

interface HeroCarouselProps {
  animeList: Anime[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ animeList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animeList.length);
    
    // Reset the transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + animeList.length) % animeList.length);
    
    // Reset the transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset the transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  
  if (!animeList.length) {
    return null;
  }
  
  const currentAnime = animeList[currentIndex];
  
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image with overlay */}
      {animeList.map((anime, index) => (
        <div
          key={anime.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(25, 23, 27, 0.3), rgba(25, 23, 27, 0.5), #19171b)'
            }}
          />
          <img
            src={anime.coverImage || anime.image}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="ryugu-container">
          <div className="max-w-2xl animate-fade-in">
            {/* Title */}
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-500 ${
                isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {currentAnime.title}
            </h1>
            
            {/* Info */}
            <div 
              className={`flex items-center space-x-4 text-sm md:text-base text-white/80 mb-6 transition-all duration-500 delay-100 ${
                isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              <span className="bg-ryugu-red px-2 py-1 rounded text-white">
                {currentAnime.rating.toFixed(1)}
              </span>
              <span>{currentAnime.releaseYear}</span>
              <span>{currentAnime.type}</span>
              <span>{currentAnime.episodes} {currentAnime.type === 'Movie' ? 'Movie' : 'Episodes'}</span>
            </div>
            
            {/* Genres */}
            <div 
              className={`flex flex-wrap gap-2 mb-6 transition-all duration-500 delay-200 ${
                isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {currentAnime.genres.map((genre) => (
                <span 
                  key={genre} 
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <p 
              className={`text-white/80 mb-8 line-clamp-3 md:line-clamp-4 max-w-xl transition-all duration-500 delay-300 ${
                isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {currentAnime.description}
            </p>
            
            {/* Buttons */}
            <div 
              className={`flex space-x-4 transition-all duration-500 delay-400 ${
                isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              <Link 
                to={`/anime/${currentAnime.id}/watch/1`} 
                className="ryugu-button"
              >
                <Play size={18} className="mr-2" />
                Watch Now
              </Link>
              <Link 
                to={`/anime/${currentAnime.id}`} 
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
              >
                <Info size={18} className="mr-2" />
                Details
              </Link>
              <button 
                className="inline-flex items-center justify-center rounded-md w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                aria-label="Add to watchlist"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-2">
        {animeList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-ryugu-red w-6' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HeroCarousel;
