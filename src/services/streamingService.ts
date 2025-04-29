
import { createClient } from '@supabase/supabase-js'
import { toast } from "../components/ui/use-toast"

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
  BACKUP: "Backup",
  LOCAL: "Local MP4"
};

// Function to get streaming links for an episode
export const getStreamingLinks = async (animeId: number, episodeNumber: number): Promise<StreamData> => {
  try {
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )

    const { data, error } = await supabase.functions.invoke('streaming', {
      body: { animeId, episodeNumber }
    })

    if (error) {
      console.error('Error fetching streaming data:', error)
      return getFallbackStreamingLinks(animeId, episodeNumber)
    }

    // Add local MP4 option if it exists
    const localMp4Path = `/videos/anime-${animeId}-episode-${episodeNumber}.mp4`;
    
    // Check if the local MP4 file exists
    try {
      const fileExists = await fetch(localMp4Path, { method: 'HEAD' })
        .then(res => res.ok)
        .catch(() => false);
      
      if (fileExists) {
        // Add the local MP4 as the first source
        data.sources.unshift({
          server: SERVERS.LOCAL,
          url: localMp4Path,
          quality: "Local"
        });
      }
    } catch (err) {
      console.log('Local MP4 check failed:', err);
    }

    return data;
  } catch (error) {
    console.error('Error fetching streaming links:', error);
    toast({
      title: "Error",
      description: "Failed to load streaming sources. Using fallback data.",
      variant: "destructive"
    });
    
    return getFallbackStreamingLinks(animeId, episodeNumber);
  }
};

// Fallback function to get mock streaming links
const getFallbackStreamingLinks = (animeId: number, episodeNumber: number): StreamData => {
  // Check for local MP4 file
  const localMp4Path = `/videos/anime-${animeId}-episode-${episodeNumber}.mp4`;
  const sources = [
    {
      server: SERVERS.LOCAL,
      url: localMp4Path,
      quality: "Local"
    },
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
  ];

  return {
    id: episodeNumber,
    sources: sources,
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
