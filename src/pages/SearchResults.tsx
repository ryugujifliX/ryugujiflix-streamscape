
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { fetchAnimeBySearch } from '../services/localAPI';
import { Loader2 } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: animeResults, isLoading, error } = useQuery({
    queryKey: ['animeSearch', query],
    queryFn: () => fetchAnimeBySearch(query),
    enabled: !!query,
  });

  return (
    <div className="py-24 md:py-32 container mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Search Results: <span className="text-ryugu-red">{query}</span>
      </h1>
      <p className="text-white/60 mb-8">
        {isLoading ? 'Searching...' : 
          animeResults?.length 
            ? `Found ${animeResults.length} results for "${query}"`
            : `No results found for "${query}"`}
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-ryugu-red" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500">Error loading search results. Please try again.</p>
        </div>
      ) : animeResults?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {animeResults.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-white/60">No anime found matching your search term. Try a different keyword.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
