
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingAnime } from '@/services/animeAPI';
import AnimeCard from '@/components/AnimeCard';
import { Loader2 } from 'lucide-react';

const Trending = () => {
  const { data: trendingAnime, isLoading, error } = useQuery({
    queryKey: ['trendingAnime'],
    queryFn: fetchTrendingAnime,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ryugu-red" />
      </div>
    );
  }

  if (error || !trendingAnime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-ryugu-red mb-4">Error</h2>
          <p className="text-white/70 mb-6">
            Failed to load trending anime. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ryugu-container py-8">
      <h1 className="text-3xl font-bold mb-8">Trending Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {trendingAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
