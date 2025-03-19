
import { useQuery } from '@tanstack/react-query';
import { toast } from '../components/ui/use-toast';
import streamingService, { StreamData } from './streamingService';

// React Query hook for getting streaming links
export const useStreamingLinks = (animeId: number, episodeNumber: number) => {
  return useQuery({
    queryKey: ['streamingLinks', animeId, episodeNumber],
    queryFn: () => streamingService.getStreamingLinks(animeId, episodeNumber),
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching streaming links',
          description: error.message || 'Unknown error occurred',
          variant: 'destructive',
        });
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Function to search anime 
export const searchAnime = async (query: string) => {
  // This would be replaced with an actual API call in production
  console.log(`Searching for: ${query}`);
  // For now, we'll just return results from our local API
  return fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .catch(err => {
      console.error('Error searching anime:', err);
      return [];
    });
};

// Function to report a broken stream
export const reportBrokenStream = async (animeId: number, episodeNumber: number, server: string) => {
  return streamingService.reportBrokenLink(animeId, episodeNumber, server);
};

export default {
  useStreamingLinks,
  searchAnime,
  reportBrokenStream
};
