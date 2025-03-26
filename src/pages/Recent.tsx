
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentAnime } from '@/services/localAPI';
import { fetchRecentAnime as fetchRecentAnimeJikan } from '@/services/animeAPI';
import AnimeCard from '@/components/AnimeCard';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Anime } from '@/services/api';

const Recent = () => {
  const [useLocalAPI, setUseLocalAPI] = useState(true);
  
  const { 
    data: recentAnime, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['recentAnime', useLocalAPI],
    queryFn: () => useLocalAPI ? fetchRecentAnime() : fetchRecentAnimeJikan(),
    retry: 1,
  });

  // Fallback to external API if local API fails
  useEffect(() => {
    if (error && useLocalAPI) {
      console.log('Local API failed, falling back to Jikan API');
      setUseLocalAPI(false);
    }
  }, [error, useLocalAPI]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ryugu-red" />
      </div>
    );
  }

  if (error && !useLocalAPI) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-ryugu-red mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ryugu-red mb-4">Error Loading Data</h2>
          <p className="text-white/70 mb-6">
            We're having trouble connecting to our servers. This might be due to network issues or server maintenance.
          </p>
          <Button 
            onClick={() => {
              setUseLocalAPI(true);
              refetch();
            }}
            className="bg-ryugu-red hover:bg-ryugu-red/80"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  const animeList: Anime[] = recentAnime || [];

  return (
    <div className="ryugu-container py-8">
      <h1 className="text-3xl font-bold mb-8">Recently Updated Anime</h1>
      
      {!useLocalAPI && (
        <div className="bg-amber-900/30 border border-amber-800/50 rounded-md p-4 mb-6">
          <p className="text-amber-200 text-sm">
            Using external API data source. Some features may be limited.
          </p>
        </div>
      )}
      
      {animeList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/70">No recent anime found. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recent;
