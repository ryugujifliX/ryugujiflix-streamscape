
import { Anime } from "./api";
import { streamingService } from "./streamingService";

// Fetch anime by ID
export const fetchAnimeById = async (id: number | string): Promise<Anime> => {
  // This would normally be an API call to your backend
  // For now, we'll return mock data
  const response = await fetch(`/api/anime/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime details');
  }
  
  // For demo purposes, let's create mock data
  const anime: Anime = {
    id: Number(id),
    title: id === '1' ? 'Attack on Titan' : id === '2' ? 'Demon Slayer' : 'One Piece',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl nec ultricies ultricies, nunc nisl ultricies nisl, nec ultricies nisl nisl nec ultricies ultricies.',
    image: `https://via.placeholder.com/500x750/19171b/ffffff?text=Anime+${id}`,
    banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${id}`,
    releaseYear: 2013,
    status: 'Airing',
    genres: ['Action', 'Drama', 'Fantasy'],
    type: 'TV',
    episodes: 25,
    score: 9.1,
    popularity: 1,
    studios: ['Wit Studio', 'MAPPA'],
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
  
  return anime;
};

// Fetch trending anime
export const fetchTrendingAnime = async (): Promise<Anime[]> => {
  // This would normally be an API call to your backend
  // For now, we'll return mock data
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Trending Anime ${i + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: `https://via.placeholder.com/240x360/19171b/ffffff?text=Trending+${i + 1}`,
    banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${i + 1}`,
    releaseYear: 2020 + Math.floor(i / 3),
    status: i % 3 === 0 ? 'Airing' : i % 3 === 1 ? 'Completed' : 'Upcoming',
    genres: ['Action', 'Adventure', 'Fantasy'],
    type: i % 5 === 0 ? 'Movie' : 'TV',
    episodes: i % 5 === 0 ? 1 : 12,
    score: 8 + Math.random(),
    popularity: i + 1,
    studios: ['Studio MAPPA'],
    trailer: 'https://www.youtube.com/watch?v=example',
    episodeList: [],
  }));
};

// Fetch recent anime
export const fetchRecentAnime = async (): Promise<Anime[]> => {
  // This would normally be an API call to your backend
  // For now, we'll return mock data
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    title: `Recent Anime ${i + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: `https://via.placeholder.com/240x360/19171b/ffffff?text=Recent+${i + 1}`,
    banner: `https://via.placeholder.com/1920x1080/19171b/ffffff?text=Banner+${i + 11}`,
    releaseYear: 2023,
    status: 'Airing',
    genres: ['Comedy', 'Slice of Life', 'Romance'],
    type: 'TV',
    episodes: 12,
    score: 7.5 + Math.random(),
    popularity: i + 11,
    studios: ['Studio Bones'],
    trailer: 'https://www.youtube.com/watch?v=example',
    episodeList: [],
  }));
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
  return streamingService.getStreamingData(animeId, episodeNumber);
};

export default {
  fetchAnimeById,
  fetchTrendingAnime,
  fetchRecentAnime,
  fetchWatchlist,
  fetchEpisodeStream
};
