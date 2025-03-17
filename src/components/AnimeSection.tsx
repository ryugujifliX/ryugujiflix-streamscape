
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimeCard from './AnimeCard';
import type { Anime } from '../services/api';

interface AnimeSectionProps {
  title: string;
  animeList: Anime[];
  viewAllUrl?: string;
}

const AnimeSection: React.FC<AnimeSectionProps> = ({ title, animeList, viewAllUrl }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!animeList.length) {
    return null;
  }

  return (
    <section className="ryugu-section">
      <div className="ryugu-container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
          {viewAllUrl && (
            <a href={viewAllUrl} className="text-sm text-ryugu-red hover:text-white transition-colors">
              View All
            </a>
          )}
        </div>

        <div className="relative group">
          {/* Navigation buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-ryugu-red/90 -translate-x-5 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-ryugu-red/90 translate-x-5 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Carousel */}
          <div 
            ref={carouselRef} 
            className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {animeList.map((anime, index) => (
              <div key={anime.id} className="flex-shrink-0 w-[160px] md:w-[200px]">
                <AnimeCard anime={anime} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeSection;
