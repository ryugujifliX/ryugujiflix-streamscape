
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentAnime } from '@/services/localAPI';
import AnimeCard from '@/components/AnimeCard';
import { Loader2 } from 'lucide-react';

const Recent = () => {
  const { data: recentAnime, isLoading, error } = useQuery({
    queryKey: ['recentAnime'],
    queryFn: fetchRecentAnime,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ryugu-red" />
      </div>
    );
  }

  if (error || !recentAnime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-ryugu-red mb-4">Error</h2>
          <p className="text-white/70 mb-6">
            Failed to load recent anime. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ryugu-container py-8">
      <h1 className="text-3xl font-bold mb-8">Recently Updated Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {recentAnime.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Recent;
