
// Mock API service for anime data
// This would be replaced with actual API calls to your Flask backend in production

export interface Anime {
  id: number;
  title: string;
  image: string;
  synopsis: string;
  rating: number;
  releaseYear: number;
  type: 'TV' | 'Movie' | 'OVA' | 'Special';
  episodes: number;
  studios: string[];
  genres: string[];
  duration: string;
  status: 'Airing' | 'Completed' | 'Upcoming';
  banner?: string;
}

export interface Episode {
  id: number;
  animeId: number;
  number: number;
  title: string;
  thumbnail: string;
  duration: number;
  released: string;
}

// Mock data for anime
const mockAnime: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Attack+on+Titan",
    banner: "https://via.placeholder.com/1280x720/19171b/ffffff?text=Attack+on+Titan+Banner",
    synopsis: "Several hundred years ago, humans were nearly exterminated by giants. Giants are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source.",
    rating: 9.1,
    releaseYear: 2013,
    type: 'TV',
    episodes: 25,
    studios: ['Wit Studio', 'MAPPA'],
    genres: ['Action', 'Drama', 'Fantasy'],
    duration: '24 min',
    status: 'Completed'
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Demon+Slayer",
    synopsis: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    rating: 8.7,
    releaseYear: 2019,
    type: 'TV',
    episodes: 26,
    studios: ['ufotable'],
    genres: ['Action', 'Fantasy', 'Historical'],
    duration: '23 min',
    status: 'Airing'
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=One+Piece",
    synopsis: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
    rating: 8.9,
    releaseYear: 1999,
    type: 'TV',
    episodes: 1000,
    studios: ['Toei Animation'],
    genres: ['Action', 'Adventure', 'Comedy'],
    duration: '24 min',
    status: 'Airing'
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=My+Hero+Academia",
    synopsis: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk.",
    rating: 8.5,
    releaseYear: 2016,
    type: 'TV',
    episodes: 113,
    studios: ['Bones'],
    genres: ['Action', 'Comedy', 'Superpower'],
    duration: '23 min',
    status: 'Airing'
  },
  {
    id: 5,
    title: "Jujutsu Kaisen",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Jujutsu+Kaisen",
    synopsis: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul.",
    rating: 8.8,
    releaseYear: 2020,
    type: 'TV',
    episodes: 24,
    studios: ['MAPPA'],
    genres: ['Action', 'Fantasy', 'Supernatural'],
    duration: '23 min',
    status: 'Airing'
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Fullmetal+Alchemist",
    synopsis: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
    rating: 9.2,
    releaseYear: 2009,
    type: 'TV',
    episodes: 64,
    studios: ['Bones'],
    genres: ['Action', 'Adventure', 'Drama'],
    duration: '24 min',
    status: 'Completed'
  },
  {
    id: 7,
    title: "Naruto",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Naruto",
    synopsis: "Naruto Uzumaki, an adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
    rating: 8.3,
    releaseYear: 2002,
    type: 'TV',
    episodes: 220,
    studios: ['Pierrot'],
    genres: ['Action', 'Adventure', 'Fantasy'],
    duration: '23 min',
    status: 'Completed'
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Death+Note",
    synopsis: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
    rating: 9.0,
    releaseYear: 2006,
    type: 'TV',
    episodes: 37,
    studios: ['Madhouse'],
    genres: ['Mystery', 'Psychological', 'Supernatural'],
    duration: '23 min',
    status: 'Completed'
  },
  {
    id: 9,
    title: "Spy x Family",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Spy+x+Family",
    synopsis: "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.",
    rating: 8.6,
    releaseYear: 2022,
    type: 'TV',
    episodes: 25,
    studios: ['Wit Studio', 'CloverWorks'],
    genres: ['Action', 'Comedy', 'Slice of Life'],
    duration: '24 min',
    status: 'Airing'
  },
  {
    id: 10,
    title: "Your Name",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Your+Name",
    synopsis: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    rating: 8.9,
    releaseYear: 2016,
    type: 'Movie',
    episodes: 1,
    studios: ['CoMix Wave Films'],
    genres: ['Drama', 'Romance', 'Supernatural'],
    duration: '106 min',
    status: 'Completed'
  }
];

// Mock episodes data
const mockEpisodes: Record<number, Episode[]> = {
  1: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    animeId: 1,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/320x180/19171b/ffffff?text=AoT+Ep+${i + 1}`,
    duration: 24,
    released: `2013-${Math.floor(i / 4) + 4}-${(i % 4) * 7 + 1}`
  })),
  
  2: Array.from({ length: 26 }, (_, i) => ({
    id: i + 100,
    animeId: 2,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/320x180/19171b/ffffff?text=DS+Ep+${i + 1}`,
    duration: 23,
    released: `2019-${Math.floor(i / 4) + 4}-${(i % 4) * 7 + 1}`
  }))
};

// Mock API functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all anime
const getAllAnime = async (): Promise<Anime[]> => {
  await delay(1000); // Simulate network delay
  return [...mockAnime];
};

// Get anime by ID
const getAnimeById = async (id: number): Promise<Anime | null> => {
  await delay(800);
  const anime = mockAnime.find(a => a.id === id);
  return anime || null;
};

// Get featured anime (for hero carousel)
const getFeaturedAnime = async (): Promise<Anime[]> => {
  await delay(800);
  return mockAnime.slice(0, 5);
};

// Get trending anime
const getTrendingAnime = async (): Promise<Anime[]> => {
  await delay(600);
  return mockAnime.sort(() => Math.random() - 0.5).slice(0, 8);
};

// Get recent anime
const getRecentAnime = async (): Promise<Anime[]> => {
  await delay(700);
  return mockAnime.sort(() => Math.random() - 0.5).slice(0, 8);
};

// Get popular anime
const getPopularAnime = async (): Promise<Anime[]> => {
  await delay(500);
  return mockAnime.sort((a, b) => b.rating - a.rating).slice(0, 8);
};

// Get anime by genre
const getAnimeByGenre = async (genre: string): Promise<Anime[]> => {
  await delay(900);
  return mockAnime.filter(anime => anime.genres.includes(genre));
};

// Search anime
const searchAnime = async (query: string): Promise<Anime[]> => {
  await delay(700);
  const lowerQuery = query.toLowerCase();
  return mockAnime.filter(anime => 
    anime.title.toLowerCase().includes(lowerQuery) || 
    anime.genres.some(g => g.toLowerCase().includes(lowerQuery))
  );
};

// Get episodes for an anime
const getEpisodes = async (animeId: number): Promise<Episode[]> => {
  await delay(600);
  return mockEpisodes[animeId] || [];
};

// Get a specific episode
const getEpisode = async (animeId: number, episodeNumber: number): Promise<Episode | null> => {
  await delay(500);
  const episodes = mockEpisodes[animeId] || [];
  const episode = episodes.find(e => e.number === episodeNumber);
  return episode || null;
};

export default {
  getAllAnime,
  getAnimeById,
  getFeaturedAnime,
  getTrendingAnime,
  getRecentAnime,
  getPopularAnime,
  getAnimeByGenre,
  searchAnime,
  getEpisodes,
  getEpisode
};
