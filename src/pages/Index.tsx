
import React, { useState, useEffect } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import AnimeSection from '../components/AnimeSection';
import api, { Anime } from '../services/api';

const Index = () => {
  const [featuredAnime, setFeaturedAnime] = useState<Anime[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [recentAnime, setRecentAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [actionAnime, setActionAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [featured, trending, recent, popular, action] = await Promise.all([
          api.getFeaturedAnime(),
          api.getTrendingAnime(),
          api.getRecentAnime(),
          api.getPopularAnime(),
          api.getAnimeByGenre('Action')
        ]);

        setFeaturedAnime(featured);
        setTrendingAnime(trending);
        setRecentAnime(recent);
        setPopularAnime(popular);
        setActionAnime(action);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-ryugu-red border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroCarousel animeList={featuredAnime} />
      </section>

      {/* Anime Sections */}
      <div className="bg-ryugu-dark pb-12">
        <AnimeSection 
          title="Trending Now" 
          animeList={trendingAnime} 
          viewAllUrl="/trending" 
        />
        
        <AnimeSection 
          title="Recently Added" 
          animeList={recentAnime} 
          viewAllUrl="/recent" 
        />
        
        <AnimeSection 
          title="Most Popular" 
          animeList={popularAnime} 
          viewAllUrl="/popular" 
        />
        
        <AnimeSection 
          title="Action Anime" 
          animeList={actionAnime} 
          viewAllUrl="/genre/action" 
        />
      </div>
    </div>
  );
};

export default Index;
