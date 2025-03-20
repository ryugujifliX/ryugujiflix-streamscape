
import { useQuery } from '@tanstack/react-query';
import { getStreamingLinks, StreamData } from '../streamingService';

export const useStreamingLinks = (animeId: number | undefined, episodeNumber: number | undefined) => {
  return useQuery<StreamData>({
    queryKey: ['streamingLinks', animeId, episodeNumber],
    queryFn: () => {
      if (!animeId || !episodeNumber) {
        throw new Error('Anime ID and Episode Number are required');
      }
      return getStreamingLinks(animeId, episodeNumber);
    },
    enabled: !!animeId && !!episodeNumber,
  });
};

export default useStreamingLinks;
