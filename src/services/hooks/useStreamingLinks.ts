
import { useQuery } from '@tanstack/react-query';
import { getStreamingLinks, StreamData } from '../streamingService';
import { toast } from '../../components/ui/use-toast';

export const useStreamingLinks = (animeId: number | undefined, episodeNumber: number | undefined) => {
  return useQuery<StreamData>({
    queryKey: ['streamingLinks', animeId, episodeNumber],
    queryFn: async () => {
      if (!animeId || !episodeNumber) {
        throw new Error('Anime ID and Episode Number are required');
      }
      
      try {
        const data = await getStreamingLinks(animeId, episodeNumber);
        
        // Log the received data for debugging
        console.log('Streaming links received:', data);
        
        // Verify if we have valid sources
        if (!data.sources || data.sources.length === 0) {
          console.warn('No streaming sources found for this episode');
          toast({
            title: "No sources available",
            description: "Couldn't find streaming sources for this episode",
            variant: "destructive"
          });
        }
        
        return data;
      } catch (error) {
        console.error('Error in useStreamingLinks:', error);
        throw error;
      }
    },
    enabled: !!animeId && !!episodeNumber,
  });
};

export default useStreamingLinks;
