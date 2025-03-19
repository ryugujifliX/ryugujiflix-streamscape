
import { useQuery } from '@tanstack/react-query';
import { toast } from '../components/ui/use-toast';

// Types
interface StreamingSource {
  server: string;
  url: string;
  quality?: string;
}

interface EpisodeStreaming {
  id: number;
  sources: StreamingSource[];
  subtitles?: { lang: string; url: string }[];
}

// Base API URL - replace with your actual backend URL when deployed
const API_BASE_URL = '/api';

// Function to fetch streaming links for a specific episode
const fetchStreamingLinks = async (animeId: number, episodeNumber: number): Promise<EpisodeStreaming> => {
  try {
    // In a real implementation, this would be an actual API call to your backend
    // For now, we'll simulate the response
    
    // Simulate network request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response based on anime ID and episode number
    const mockSources: StreamingSource[] = [
      {
        server: 'GogoAnime',
        url: `https://example.com/gogo/${animeId}/ep-${episodeNumber}`,
        quality: '1080p'
      },
      {
        server: 'AnimePahe',
        url: `https://example.com/animepahe/${animeId}/episode/${episodeNumber}`,
        quality: '720p'
      },
      {
        server: 'Backup',
        url: `https://example.com/backup/${animeId}/${episodeNumber}`,
        quality: '480p'
      }
    ];
    
    return {
      id: episodeNumber,
      sources: mockSources,
      subtitles: [
        { lang: 'English', url: `https://example.com/subs/en/${animeId}/${episodeNumber}` },
        { lang: 'Spanish', url: `https://example.com/subs/es/${animeId}/${episodeNumber}` }
      ]
    };
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    throw new Error('Failed to fetch streaming links');
  }
};

// React Query hook for getting streaming links
export const useStreamingLinks = (animeId: number, episodeNumber: number) => {
  return useQuery({
    queryKey: ['streamingLinks', animeId, episodeNumber],
    queryFn: () => fetchStreamingLinks(animeId, episodeNumber),
    onError: (error) => {
      toast({
        title: 'Error fetching streaming links',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Function to search anime (would connect to backend in real implementation)
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

export default {
  useStreamingLinks,
  searchAnime
};
