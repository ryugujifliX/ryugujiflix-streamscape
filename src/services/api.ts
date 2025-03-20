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
  coverImage?: string;
  description?: string;
  language?: string;
  popularity?: number;
  trailer?: string;
  episodeList?: any[];
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

export interface WatchHistoryItem {
  animeId: number;
  episodeId: number;
  timestamp: number; // Seconds watched
  completed: boolean;
  lastWatched: string; // ISO date string
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  watchlist: number[]; // Anime IDs
  watchHistory: WatchHistoryItem[];
  createdAt: string;
}

const mockAnime: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Attack+on+Titan",
    banner: "https://via.placeholder.com/1280x720/19171b/ffffff?text=Attack+on+Titan+Banner",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Attack+on+Titan+Cover",
    synopsis: "Several hundred years ago, humans were nearly exterminated by giants. Giants are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source.",
    description: "Several hundred years ago, humans were nearly exterminated by giants. Giants are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source.",
    rating: 9.1,
    releaseYear: 2013,
    type: 'TV',
    episodes: 25,
    studios: ['Wit Studio', 'MAPPA'],
    genres: ['Action', 'Drama', 'Fantasy'],
    duration: '24 min',
    status: 'Completed',
    language: 'Japanese',
    popularity: 9,
    trailer: 'https://www.youtube.com/watch?v=example1',
    episodeList: [
      { id: 1, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=AoT+Ep+1', duration: 24, released: '2013-01-01' },
      { id: 2, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=AoT+Ep+2', duration: 24, released: '2013-01-02' }
    ]
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Demon+Slayer",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Demon+Slayer+Cover",
    synopsis: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    description: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    rating: 8.7,
    releaseYear: 2019,
    type: 'TV',
    episodes: 26,
    studios: ['ufotable'],
    genres: ['Action', 'Fantasy', 'Historical'],
    duration: '23 min',
    status: 'Airing',
    language: 'Japanese',
    popularity: 8,
    trailer: 'https://www.youtube.com/watch?v=example2',
    episodeList: [
      { id: 100, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=DS+Ep+1', duration: 23, released: '2019-01-01' },
      { id: 101, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=DS+Ep+2', duration: 23, released: '2019-01-02' }
    ]
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=One+Piece",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=One+Piece+Cover",
    synopsis: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
    description: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
    rating: 8.9,
    releaseYear: 1999,
    type: 'TV',
    episodes: 1000,
    studios: ['Toei Animation'],
    genres: ['Action', 'Adventure', 'Comedy'],
    duration: '24 min',
    status: 'Airing',
    language: 'Japanese',
    popularity: 7,
    trailer: 'https://www.youtube.com/watch?v=example3',
    episodeList: [
      { id: 200, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=OP+Ep+1', duration: 24, released: '2020-01-01' },
      { id: 201, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=OP+Ep+2', duration: 24, released: '2020-01-02' }
    ]
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=My+Hero+Academia",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=My+Hero+Academia+Cover",
    synopsis: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk.",
    description: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya has dreams of one day becoming a Hero, despite being bullied by his classmates for not having a Quirk.",
    rating: 8.5,
    releaseYear: 2016,
    type: 'TV',
    episodes: 113,
    studios: ['Bones'],
    genres: ['Action', 'Comedy', 'Superpower'],
    duration: '23 min',
    status: 'Airing',
    language: 'Japanese',
    popularity: 6,
    trailer: 'https://www.youtube.com/watch?v=example4',
    episodeList: [
      { id: 300, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=MHA+Ep+1', duration: 23, released: '2021-01-01' },
      { id: 301, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=MHA+Ep+2', duration: 23, released: '2021-01-02' }
    ]
  },
  {
    id: 5,
    title: "Jujutsu Kaisen",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Jujutsu+Kaisen",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Jujutsu+Kaisen+Cover",
    synopsis: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul.",
    description: "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul.",
    rating: 8.8,
    releaseYear: 2020,
    type: 'TV',
    episodes: 24,
    studios: ['MAPPA'],
    genres: ['Action', 'Fantasy', 'Supernatural'],
    duration: '23 min',
    status: 'Airing',
    language: 'Japanese',
    popularity: 5,
    trailer: 'https://www.youtube.com/watch?v=example5',
    episodeList: [
      { id: 400, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=JJK+Ep+1', duration: 23, released: '2020-01-01' },
      { id: 401, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=JJK+Ep+2', duration: 23, released: '2020-01-02' }
    ]
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Fullmetal+Alchemist",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Fullmetal+Alchemist+Cover",
    synopsis: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
    description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
    rating: 9.2,
    releaseYear: 2009,
    type: 'TV',
    episodes: 64,
    studios: ['Bones'],
    genres: ['Action', 'Adventure', 'Drama'],
    duration: '24 min',
    status: 'Completed',
    language: 'Japanese',
    popularity: 4,
    trailer: 'https://www.youtube.com/watch?v=example6',
    episodeList: [
      { id: 500, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=FA+Ep+1', duration: 24, released: '2010-01-01' },
      { id: 501, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=FA+Ep+2', duration: 24, released: '2010-01-02' }
    ]
  },
  {
    id: 7,
    title: "Naruto",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Naruto",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Naruto+Cover",
    synopsis: "Naruto Uzumaki, an adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
    description: "Naruto Uzumaki, an adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.",
    rating: 8.3,
    releaseYear: 2002,
    type: 'TV',
    episodes: 220,
    studios: ['Pierrot'],
    genres: ['Action', 'Adventure', 'Fantasy'],
    duration: '23 min',
    status: 'Completed',
    language: 'Japanese',
    popularity: 3,
    trailer: 'https://www.youtube.com/watch?v=example7',
    episodeList: [
      { id: 600, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=Naruto+Ep+1', duration: 23, released: '2003-01-01' },
      { id: 601, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=Naruto+Ep+2', duration: 23, released: '2003-01-02' }
    ]
  },
  {
    id: 8,
    title: "Death Note",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Death+Note",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Death+Note+Cover",
    synopsis: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
    description: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
    rating: 9.0,
    releaseYear: 2006,
    type: 'TV',
    episodes: 37,
    studios: ['Madhouse'],
    genres: ['Mystery', 'Psychological', 'Supernatural'],
    duration: '23 min',
    status: 'Completed',
    language: 'Japanese',
    popularity: 2,
    trailer: 'https://www.youtube.com/watch?v=example8',
    episodeList: [
      { id: 700, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=DN+Ep+1', duration: 23, released: '2007-01-01' },
      { id: 701, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=DN+Ep+2', duration: 23, released: '2007-01-02' }
    ]
  },
  {
    id: 9,
    title: "Spy x Family",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Spy+x+Family",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Spy+x+Family+Cover",
    synopsis: "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.",
    description: "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.",
    rating: 8.6,
    releaseYear: 2022,
    type: 'TV',
    episodes: 25,
    studios: ['Wit Studio', 'CloverWorks'],
    genres: ['Action', 'Comedy', 'Slice of Life'],
    duration: '24 min',
    status: 'Airing',
    language: 'Japanese',
    popularity: 1,
    trailer: 'https://www.youtube.com/watch?v=example9',
    episodeList: [
      { id: 800, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=Spy+x+Family+Ep+1', duration: 24, released: '2023-01-01' },
      { id: 801, number: 2, title: 'Episode 2', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=Spy+x+Family+Ep+2', duration: 24, released: '2023-01-02' }
    ]
  },
  {
    id: 10,
    title: "Your Name",
    image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Your+Name",
    coverImage: "https://via.placeholder.com/1920x1080/19171b/ffffff?text=Your+Name+Cover",
    synopsis: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    rating: 8.9,
    releaseYear: 2016,
    type: 'Movie',
    episodes: 1,
    studios: ['CoMix Wave Films'],
    genres: ['Drama', 'Romance', 'Supernatural'],
    duration: '106 min',
    status: 'Completed',
    language: 'Japanese',
    popularity: 0,
    trailer: 'https://www.youtube.com/watch?v=example10',
    episodeList: [
      { id: 900, number: 1, title: 'Episode 1', thumbnail: 'https://via.placeholder.com/320x180/19171b/ffffff?text=Your+Name+Ep+1', duration: 106, released: '2016-01-01' }
    ]
  }
];

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
  })),

  3: Array.from({ length: 40 }, (_, i) => ({
    id: i + 200,
    animeId: 3,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/320x180/19171b/ffffff?text=OP+Ep+${i + 1}`,
    duration: 24,
    released: `2020-${Math.floor(i / 4) + 1}-${(i % 4) * 7 + 1}`
  })),

  4: Array.from({ length: 30 }, (_, i) => ({
    id: i + 300,
    animeId: 4,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/320x180/19171b/ffffff?text=MHA+Ep+${i + 1}`,
    duration: 23,
    released: `2021-${Math.floor(i / 4) + 1}-${(i % 4) * 7 + 1}`
  })),

  5: Array.from({ length: 24 }, (_, i) => ({
    id: i + 400,
    animeId: 5,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/320x180/19171b/ffffff?text=JJK+Ep+${i + 1}`,
    duration: 23,
    released: `2020-${Math.floor(i / 4) + 4}-${(i % 4) * 7 + 1}`
  }))
};

const mockUsers: Record<string, User> = {
  "user1": {
    id: "user1",
    username: "animeExplorer",
    email: "explorer@example.com",
    avatar: "https://via.placeholder.com/100x100/19171b/ffffff?text=AE",
    watchlist: [1, 3, 5],
    watchHistory: [
      {
        animeId: 1,
        episodeId: 1,
        timestamp: 780,
        completed: true,
        lastWatched: "2023-06-15T14:30:00Z"
      },
      {
        animeId: 1,
        episodeId: 2,
        timestamp: 450,
        completed: false,
        lastWatched: "2023-06-16T19:15:00Z"
      }
    ],
    createdAt: "2023-01-01T12:00:00Z"
  },
  "user2": {
    id: "user2",
    username: "otakuMaster",
    email: "otaku@example.com",
    avatar: "https://via.placeholder.com/100x100/19171b/ffffff?text=OM",
    watchlist: [2, 4, 6],
    watchHistory: [],
    createdAt: "2023-02-15T09:30:00Z"
  }
};

let currentUser: User | null = null;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getAllAnime = async (): Promise<Anime[]> => {
  await delay(1000);
  return [...mockAnime];
};

const getAnimeById = async (id: number): Promise<Anime | null> => {
  await delay(800);
  const anime = mockAnime.find(a => a.id === id);
  return anime || null;
};

const getFeaturedAnime = async (): Promise<Anime[]> => {
  await delay(800);
  return mockAnime.slice(0, 5);
};

const getTrendingAnime = async (): Promise<Anime[]> => {
  await delay(600);
  return mockAnime.sort(() => Math.random() - 0.5).slice(0, 8);
};

const getRecentAnime = async (): Promise<Anime[]> => {
  await delay(700);
  return mockAnime.sort(() => Math.random() - 0.5).slice(0, 8);
};

const getPopularAnime = async (): Promise<Anime[]> => {
  await delay(500);
  return mockAnime.sort((a, b) => b.rating - a.rating).slice(0, 8);
};

const getAnimeByGenre = async (genre: string): Promise<Anime[]> => {
  await delay(900);
  return mockAnime.filter(anime => anime.genres.includes(genre));
};

const searchAnime = async (query: string): Promise<Anime[]> => {
  await delay(700);
  const lowerQuery = query.toLowerCase();
  return mockAnime.filter(anime => 
    anime.title.toLowerCase().includes(lowerQuery) || 
    anime.genres.some(g => g.toLowerCase().includes(lowerQuery))
  );
};

const getEpisodes = async (animeId: number): Promise<Episode[]> => {
  await delay(600);
  return mockEpisodes[animeId] || [];
};

const getEpisode = async (animeId: number, episodeNumber: number): Promise<Episode | null> => {
  await delay(500);
  const episodes = mockEpisodes[animeId] || [];
  const episode = episodes.find(e => e.number === episodeNumber);
  return episode || null;
};

const loginUser = async (email: string, password: string): Promise<User | null> => {
  await delay(800);
  
  const user = Object.values(mockUsers).find(u => u.email === email);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

const registerUser = async (username: string, email: string, password: string): Promise<User | null> => {
  await delay(1000);
  
  if (Object.values(mockUsers).some(u => u.email === email)) {
    return null;
  }
  
  const newUser: User = {
    id: `user${Date.now()}`,
    username,
    email,
    avatar: `https://via.placeholder.com/100x100/19171b/ffffff?text=${username.substring(0, 2).toUpperCase()}`,
    watchlist: [],
    watchHistory: [],
    createdAt: new Date().toISOString()
  };
  
  mockUsers[newUser.id] = newUser;
  
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  
  return newUser;
};

const logoutUser = async (): Promise<boolean> => {
  await delay(300);
  currentUser = null;
  localStorage.removeItem('currentUser');
  return true;
};

const getCurrentUser = async (): Promise<User | null> => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  
  return currentUser;
};

const addToWatchlist = async (animeId: number): Promise<boolean> => {
  await delay(500);
  
  if (!currentUser) return false;
  
  if (!currentUser.watchlist.includes(animeId)) {
    currentUser.watchlist.push(animeId);
    
    mockUsers[currentUser.id] = currentUser;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return true;
  }
  
  return false;
};

const removeFromWatchlist = async (animeId: number): Promise<boolean> => {
  await delay(500);
  
  if (!currentUser) return false;
  
  currentUser.watchlist = currentUser.watchlist.filter(id => id !== animeId);
  
  mockUsers[currentUser.id] = currentUser;
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  return true;
};

const getWatchlist = async (): Promise<Anime[]> => {
  await delay(700);
  
  if (!currentUser) return [];
  
  return mockAnime.filter(anime => currentUser!.watchlist.includes(anime.id));
};

const updateWatchHistory = async (animeId: number, episodeId: number, timestamp: number, completed: boolean): Promise<boolean> => {
  await delay(500);
  
  if (!currentUser) return false;
  
  const existingIndex = currentUser.watchHistory.findIndex(
    item => item.animeId === animeId && item.episodeId === episodeId
  );
  
  const historyItem: WatchHistoryItem = {
    animeId,
    episodeId,
    timestamp,
    completed,
    lastWatched: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    currentUser.watchHistory[existingIndex] = historyItem;
  } else {
    currentUser.watchHistory.push(historyItem);
  }
  
  mockUsers[currentUser.id] = currentUser;
  
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  return true;
};

const getWatchHistory = async (): Promise<{anime: Anime, episode: Episode, progress: WatchHistoryItem}[]> => {
  await delay(700);
  
  if (!currentUser) return [];
  
  const historyItems = await Promise.all(
    currentUser.watchHistory.map(async (item) => {
      const anime = await getAnimeById(item.animeId);
      const episodes = await getEpisodes(item.animeId);
      const episode = episodes.find(e => e.id === item.episodeId);
      
      if (anime && episode) {
        return {
          anime,
          episode,
          progress: item
        };
      }
      
      return null;
    })
  );
  
  return historyItems.filter(item => item !== null) as {anime: Anime, episode: Episode, progress: WatchHistoryItem}[];
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
  getEpisode,
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  updateWatchHistory,
  getWatchHistory
};
