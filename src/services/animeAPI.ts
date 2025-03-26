
import { Anime } from "./api";
import streamingService from "./streamingService";

// Fetch anime by ID
export const fetchAnimeById = async (id: number | string): Promise<Anime> => {
  try {
    // Real API integration with Jikan API
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch anime details');
    }
    
    const data = await response.json();
    const anime = data.data;
    
    // Map Jikan API response to our Anime interface
    return {
      id: Number(id),
      title: anime.title,
      description: anime.synopsis || 'No description available',
      synopsis: anime.synopsis || 'No synopsis available',
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      banner: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      releaseYear: anime.year || new Date(anime.aired.from).getFullYear() || 2023,
      status: mapStatus(anime.status),
      genres: anime.genres.map((g: any) => g.name),
      type: anime.type || 'TV',
      episodes: anime.episodes || 0,
      rating: anime.score || 0,
      popularity: anime.popularity || 0,
      studios: anime.studios.map((s: any) => s.name),
      duration: anime.duration || '24 min',
      trailer: anime.trailer?.url || '',
      episodeList: await getEpisodeList(id),
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    
    // Return mock data as fallback
    return getFallbackAnimeById(Number(id));
  }
};

// Helper function to map Jikan API status to our status format
const mapStatus = (status: string): "Airing" | "Completed" | "Upcoming" => {
  if (status.includes("Airing") || status.includes("Currently")) return "Airing";
  if (status.includes("Finished") || status.includes("Complete")) return "Completed";
  return "Upcoming";
};

// Helper function to get episode list
const getEpisodeList = async (id: number | string): Promise<any[]> => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    if (!response.ok) throw new Error('Failed to fetch episodes');
    
    const data = await response.json();
    
    return data.data.map((ep: any) => ({
      id: ep.mal_id,
      number: ep.mal_id,
      title: ep.title || `Episode ${ep.mal_id}`,
      thumbnail: `https://via.placeholder.com/300x200/19171b/ffffff?text=Ep+${ep.mal_id}`, // Placeholder as Jikan doesn't provide episode thumbnails
      duration: '24m',
      releaseDate: ep.aired || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching episodes:', error);
    // Return mock episode list
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Episode ${i + 1}`,
      thumbnail: `https://via.placeholder.com/300x200/19171b/ffffff?text=Ep+${i + 1}`,
      duration: '24m',
      releaseDate: new Date(2023, 0, i + 1).toISOString()
    }));
  }
};

// Fallback function for anime details
const getFallbackAnimeById = (id: number): Anime => {
  return {
    id: id,
    title: id === 1 ? 'Attack on Titan' : id === 2 ? 'Demon Slayer' : 'One Piece',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: `https://via.placeholder.com/500x750/19171b/ffffff?text=Anime+${id}`,
    banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${id}`,
    releaseYear: 2013,
    status: 'Airing',
    genres: ['Action', 'Drama', 'Fantasy'],
    type: 'TV',
    episodes: 25,
    rating: 9.1,
    popularity: 1,
    studios: ['Wit Studio', 'MAPPA'],
    duration: '24 min',
    trailer: 'https://www.youtube.com/watch?v=MGRm4IzK1SQ',
    episodeList: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Episode ${i + 1}`,
      thumbnail: `https://via.placeholder.com/300x200/19171b/ffffff?text=Ep+${i + 1}`,
      duration: '24m',
      releaseDate: new Date(2023, 0, i + 1).toISOString()
    })),
  };
};

// Fetch trending anime
export const fetchTrendingAnime = async (): Promise<Anime[]> => {
  try {
    // Real API integration with Jikan API
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending anime');
    }
    
    const data = await response.json();
    
    // Map Jikan API response to our Anime interface
    return data.data.slice(0, 10).map((anime: any) => ({
      id: anime.mal_id,
      title: anime.title,
      description: anime.synopsis || 'No description available',
      synopsis: anime.synopsis || 'No synopsis available',
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      banner: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      releaseYear: anime.year || new Date(anime.aired.from).getFullYear() || 2023,
      status: mapStatus(anime.status),
      genres: anime.genres.map((g: any) => g.name),
      type: anime.type || 'TV',
      episodes: anime.episodes || 0,
      rating: anime.score || 0,
      popularity: anime.popularity || 0,
      studios: anime.studios.map((s: any) => s.name),
      duration: anime.duration || '24 min',
      trailer: anime.trailer?.url || '',
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    
    // Return mock data as fallback
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Trending Anime ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: `https://via.placeholder.com/240x360/19171b/ffffff?text=Trending+${i + 1}`,
      banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${i + 1}`,
      releaseYear: 2020 + Math.floor(i / 3),
      status: i % 3 === 0 ? 'Airing' : i % 3 === 1 ? 'Completed' : 'Upcoming',
      genres: ['Action', 'Adventure', 'Fantasy'],
      type: i % 5 === 0 ? 'Movie' : 'TV',
      episodes: i % 5 === 0 ? 1 : 12,
      rating: 8 + Math.random(),
      popularity: i + 1,
      studios: ['Studio MAPPA'],
      duration: '24 min',
      trailer: 'https://www.youtube.com/watch?v=example',
      episodeList: [],
    }));
  }
};

// Fetch recent anime
export const fetchRecentAnime = async (): Promise<Anime[]> => {
  try {
    // Real API integration with Jikan API
    const response = await fetch('https://api.jikan.moe/v4/seasons/now');
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent anime');
    }
    
    const data = await response.json();
    
    // Map Jikan API response to our Anime interface
    return data.data.slice(0, 10).map((anime: any) => ({
      id: anime.mal_id,
      title: anime.title,
      description: anime.synopsis || 'No description available',
      synopsis: anime.synopsis || 'No synopsis available',
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      banner: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      releaseYear: anime.year || new Date(anime.aired.from).getFullYear() || 2023,
      status: mapStatus(anime.status),
      genres: anime.genres.map((g: any) => g.name),
      type: anime.type || 'TV',
      episodes: anime.episodes || 0,
      rating: anime.score || 0,
      popularity: anime.popularity || 0,
      studios: anime.studios.map((s: any) => s.name),
      duration: anime.duration || '24 min',
      trailer: anime.trailer?.url || '',
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching recent anime:', error);
    
    // Return mock data as fallback
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 11,
      title: `Recent Anime ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: `https://via.placeholder.com/240x360/19171b/ffffff?text=Recent+${i + 1}`,
      banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${i + 11}`,
      releaseYear: 2023,
      status: 'Airing',
      genres: ['Comedy', 'Slice of Life', 'Romance'],
      type: 'TV',
      episodes: 12,
      rating: 7.5 + Math.random(),
      popularity: i + 11,
      studios: ['Studio Bones'],
      duration: '23 min',
      trailer: 'https://www.youtube.com/watch?v=example',
      episodeList: [],
    }));
  }
};

// Fetch user watchlist
export const fetchWatchlist = async (): Promise<Anime[]> => {
  try {
    // This would normally be an API call to your backend
    const response = await fetch('/api/user/watchlist', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    
    const data = await response.json();
    const animeIds = data.data || [1, 2]; // Default to some IDs if empty
    
    // Fetch details for each anime ID
    const animeList = await Promise.all(
      animeIds.map((id: number) => fetchAnimeById(id))
    );
    
    return animeList;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
};

// Fetch episode stream data
export const fetchEpisodeStream = async (animeId: number | string, episodeNumber: number | string) => {
  return streamingService.getStreamingData(Number(animeId), Number(episodeNumber));
};

// Export the useStreamingLinks hook
export { useStreamingLinks } from './hooks/useStreamingLinks';

export default {
  fetchAnimeById,
  fetchTrendingAnime,
  fetchRecentAnime,
  fetchWatchlist,
  fetchEpisodeStream
};
