
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWatchlist } from '@/services/animeAPI';
import AnimeCard from '@/components/AnimeCard';
import { Loader2 } from 'lucide-react';
import { isAuthenticated } from '@/services/authService';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Watchlist = () => {
  const { data: watchlistAnime, isLoading, error } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchlist,
    enabled: isAuthenticated(),
  });

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-ryugu-red mb-4">Login Required</h2>
          <p className="text-white/70 mb-6">
            You need to be logged in to view your watchlist.
          </p>
          <Link to="/login">
            <Button variant="default">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ryugu-red" />
      </div>
    );
  }

  if (error || !watchlistAnime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-ryugu-red mb-4">Error</h2>
          <p className="text-white/70 mb-6">
            Failed to load your watchlist. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ryugu-container py-8">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
      {watchlistAnime.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-white/70 mb-6">Your watchlist is empty.</p>
          <Link to="/">
            <Button variant="default">Browse Anime</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlistAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
