
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

// Mock API endpoints
const API_BASE_URL = "/api";

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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock response - this would be a fetch call to your backend in production
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
  } catch (error) {
    console.error("Error fetching streaming links:", error);
    toast({
      title: "Error",
      description: "Failed to load streaming sources. Please try again.",
      variant: "destructive"
    });
    throw new Error("Failed to fetch streaming links");
  }
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

export default {
  getStreamingLinks,
  reportBrokenLink,
  addStreamingSource,
  SERVERS
};
