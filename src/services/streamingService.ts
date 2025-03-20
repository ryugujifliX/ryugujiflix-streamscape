
import { toast } from "../components/ui/use-toast";

export interface StreamSource {
  server: string;
  url: string;
  quality: string;
}

export interface StreamData {
  id: number;
  sources: StreamSource[];
  subtitles: Subtitle[];
}

export interface Subtitle {
  lang: string;
  url: string;
}

// Server options
export const SERVERS = {
  VIDSTREAMING: "VidStreaming",
  GOGO: "GogoAnime",
  JIKAN: "Jikan",
  BACKUP: "Backup"
};

// Function to get streaming links for an episode
export const getStreamingLinks = async (animeId: number, episodeNumber: number): Promise<StreamData> => {
  try {
    // Real API integration with Consumet API
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${animeId}-episode-${episodeNumber}`);
    
    if (!response.ok) {
      // If real API fails, fall back to mock data
      console.warn("Failed to fetch real streaming data, using fallback data");
      return getFallbackStreamingLinks(animeId, episodeNumber);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our StreamData interface
    return {
      id: episodeNumber,
      sources: data.sources.map((source: any) => ({
        server: source.isM3U8 ? "HLS" : source.name || SERVERS.VIDSTREAMING,
        url: source.url,
        quality: source.quality || "Auto"
      })),
      subtitles: data.subtitles?.map((sub: any) => ({
        lang: sub.lang,
        url: sub.url
      })) || []
    };
  } catch (error) {
    console.error("Error fetching streaming links:", error);
    toast({
      title: "Error",
      description: "Failed to load streaming sources. Using fallback data.",
      variant: "destructive"
    });
    
    // Return mock data as fallback
    return getFallbackStreamingLinks(animeId, episodeNumber);
  }
};

// Fallback function to get mock streaming links
const getFallbackStreamingLinks = (animeId: number, episodeNumber: number): StreamData => {
  // Simulate network delay
  return {
    id: episodeNumber,
    sources: [
      {
        server: SERVERS.VIDSTREAMING,
        url: `https://example.com/vidstreaming/${animeId}/episode-${episodeNumber}`,
        quality: "1080p"
      },
      {
        server: SERVERS.GOGO,
        url: `https://example.com/gogo/${animeId}/ep-${episodeNumber}`,
        quality: "720p"
      },
      {
        server: SERVERS.JIKAN,
        url: `https://example.com/jikan/${animeId}/episode/${episodeNumber}`,
        quality: "480p"
      },
      {
        server: SERVERS.BACKUP,
        url: `https://example.com/backup/${animeId}/${episodeNumber}`,
        quality: "360p"
      }
    ],
    subtitles: [
      { lang: "English", url: `https://example.com/subs/en/${animeId}/${episodeNumber}` },
      { lang: "Spanish", url: `https://example.com/subs/es/${animeId}/${episodeNumber}` },
      { lang: "Japanese", url: `https://example.com/subs/jp/${animeId}/${episodeNumber}` }
    ]
  };
};

// Function to report a broken link
export const reportBrokenLink = async (animeId: number, episodeNumber: number, server: string): Promise<boolean> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Reported broken link for Anime ${animeId}, Episode ${episodeNumber}, Server ${server}`);
    
    toast({
      title: "Thank you!",
      description: "We've received your report and will fix the issue soon.",
    });
    
    return true;
  } catch (error) {
    console.error("Error reporting broken link:", error);
    toast({
      title: "Error",
      description: "Failed to submit your report. Please try again.",
      variant: "destructive"
    });
    
    return false;
  }
};

// Function to add a new streaming source
export const addStreamingSource = async (
  animeId: number, 
  episodeNumber: number, 
  server: string, 
  url: string,
  quality: string
): Promise<boolean> => {
  // This would be an admin function in a real app
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  console.log(`Added new streaming source: ${server} for Anime ${animeId}, Episode ${episodeNumber}`);
  
  return true;
};

export const streamingService = {
  getStreamingData: getStreamingLinks,
  reportBrokenLink,
  addStreamingSource,
  SERVERS
};

export default streamingService;
