
import { Anime } from "./api";

const API_URL = "http://localhost:5000/api";

// Fetch anime by ID
export const fetchAnimeById = async (id: number | string): Promise<Anime> => {
  try {
    const response = await fetch(`${API_URL}/anime/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch anime details');
    }
    
    const data = await response.json();
    
    return {
      id: data._id,
      title: data.title,
      description: data.description,
      synopsis: data.synopsis,
      image: data.image,
      banner: data.banner,
      releaseYear: data.releaseYear,
      status: data.status,
      genres: data.genres,
      type: data.type,
      episodes: data.episodes,
      rating: data.rating,
      popularity: data.popularity,
      studios: data.studios,
      duration: data.duration,
      trailer: data.trailer,
      episodeList: data.episodeList?.map((ep: any) => ({
        id: ep._id,
        number: ep.number,
        title: ep.title,
        thumbnail: ep.thumbnail,
        duration: ep.duration,
        releaseDate: ep.releaseDate
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
};

// Fetch trending anime
export const fetchTrendingAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch(`${API_URL}/anime/trending`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending anime');
    }
    
    const data = await response.json();
    
    return data.map((anime: any) => ({
      id: anime._id,
      title: anime.title,
      description: anime.description,
      synopsis: anime.synopsis,
      image: anime.image,
      banner: anime.banner,
      releaseYear: anime.releaseYear,
      status: anime.status,
      genres: anime.genres,
      type: anime.type,
      episodes: anime.episodes,
      rating: anime.rating,
      popularity: anime.popularity,
      studios: anime.studios,
      duration: anime.duration,
      trailer: anime.trailer,
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    throw error;
  }
};

// Fetch recent anime
export const fetchRecentAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch(`${API_URL}/anime/recent`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent anime');
    }
    
    const data = await response.json();
    
    return data.map((anime: any) => ({
      id: anime._id,
      title: anime.title,
      description: anime.description,
      synopsis: anime.synopsis,
      image: anime.image,
      banner: anime.banner,
      releaseYear: anime.releaseYear,
      status: anime.status,
      genres: anime.genres,
      type: anime.type,
      episodes: anime.episodes,
      rating: anime.rating,
      popularity: anime.popularity,
      studios: anime.studios,
      duration: anime.duration,
      trailer: anime.trailer,
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching recent anime:', error);
    throw error;
  }
};

// Fetch anime by search query
export const fetchAnimeBySearch = async (query: string): Promise<Anime[]> => {
  try {
    // Check if query is empty
    if (!query.trim()) {
      return [];
    }

    const response = await fetch(`${API_URL}/anime/search/${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    
    const data = await response.json();
    
    return data.map((anime: any) => ({
      id: anime._id,
      title: anime.title,
      description: anime.description,
      synopsis: anime.synopsis,
      image: anime.image,
      banner: anime.banner,
      releaseYear: anime.releaseYear,
      status: anime.status,
      genres: anime.genres,
      type: anime.type,
      episodes: anime.episodes,
      rating: anime.rating,
      popularity: anime.popularity,
      studios: anime.studios,
      duration: anime.duration,
      trailer: anime.trailer,
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

// Fetch user watchlist
export const fetchWatchlist = async (userId: string): Promise<Anime[]> => {
  try {
    const response = await fetch(`${API_URL}/users/watchlist/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }
    
    const data = await response.json();
    
    return data.map((anime: any) => ({
      id: anime._id,
      title: anime.title,
      description: anime.description,
      synopsis: anime.synopsis,
      image: anime.image,
      banner: anime.banner,
      releaseYear: anime.releaseYear,
      status: anime.status,
      genres: anime.genres,
      type: anime.type,
      episodes: anime.episodes,
      rating: anime.rating,
      popularity: anime.popularity,
      studios: anime.studios,
      duration: anime.duration,
      trailer: anime.trailer,
      episodeList: [],
    }));
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    throw error;
  }
};

// Add anime to watchlist
export const addToWatchlist = async (userId: string, animeId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users/watchlist/${userId}/add/${animeId}`, {
      method: 'POST',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
};

// Remove anime from watchlist
export const removeFromWatchlist = async (userId: string, animeId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users/watchlist/${userId}/remove/${animeId}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
};

// Update user watch history
export const updateWatchHistory = async (
  userId: string, 
  animeId: string, 
  episodeId: string, 
  timestamp: number, 
  completed: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users/history/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        animeId,
        episodeId,
        timestamp,
        completed
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error updating watch history:', error);
    return false;
  }
};

export default {
  fetchAnimeById,
  fetchTrendingAnime,
  fetchRecentAnime,
  fetchAnimeBySearch,
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchHistory
};
