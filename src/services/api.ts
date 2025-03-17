
// Mock anime data API
// In a real implementation, this would be replaced with actual API calls

export interface Anime {
  id: number;
  title: string;
  image: string;
  coverImage?: string;
  description: string;
  episodes: number;
  genres: string[];
  releaseYear: number;
  status: 'Ongoing' | 'Completed';
  rating: number;
  type: 'TV' | 'Movie' | 'OVA';
  language?: 'Sub' | 'Dub' | 'Both';
}

export interface Episode {
  id: number;
  animeId: number;
  number: number;
  title: string;
  thumbnail: string;
  duration: number; // in minutes
  releaseDate: string;
}

// Sample anime data
const animeData: Anime[] = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    image: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
    coverImage: "https://cdn.oneesports.gg/cdn-data/2022/06/DemonSlayer_Season3_NewKey-1024x576.jpg",
    description: "A youth begins a quest to fight demons and save his sister after finding his family slaughtered and his sister turned into a demon.",
    episodes: 26,
    genres: ["Action", "Fantasy", "Adventure"],
    releaseYear: 2019,
    status: "Completed",
    rating: 8.7,
    type: "TV",
    language: "Both"
  },
  {
    id: 2,
    title: "Attack on Titan",
    image: "https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg",
    coverImage: "https://wallpapercave.com/wp/wp9990845.jpg",
    description: "After humanity is nearly destroyed and the survivors are forced to live in a city surrounded by three enormous walls, a young boy swears to enact revenge when a colossal Titan breaches the outermost wall and causes the death of his mother.",
    episodes: 87,
    genres: ["Action", "Drama", "Fantasy"],
    releaseYear: 2013,
    status: "Completed",
    rating: 9.0,
    type: "TV",
    language: "Both"
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "https://m.media-amazon.com/images/M/MV5BMTMwMDM4N2EtOTJiYy00OTQ0LThlZDYtYWUwOWFlY2IxZGVjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
    coverImage: "https://cdn.oneesports.gg/cdn-data/2023/02/JujutsuKaisen_Season2_Key-1024x538.jpg",
    description: "A high schooler gains the powers of a powerful curse and joins a school for sorcerers to exorcise deadly monsters.",
    episodes: 24,
    genres: ["Action", "Supernatural", "Horror"],
    releaseYear: 2020,
    status: "Ongoing",
    rating: 8.6,
    type: "TV",
    language: "Both"
  },
  {
    id: 4,
    title: "My Hero Academia",
    image: "https://m.media-amazon.com/images/I/81Pks1mKbaL._AC_UF1000,1000_QL80_.jpg",
    coverImage: "https://images.alphacoders.com/128/1289454.png",
    description: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya, a boy without powers, dreams of becoming a superhero himself. With the help of the greatest hero, he starts his journey into U.A. High School, a prestigious hero academy.",
    episodes: 113,
    genres: ["Action", "Superhero", "Comedy"],
    releaseYear: 2016,
    status: "Ongoing",
    rating: 8.4,
    type: "TV",
    language: "Both"
  },
  {
    id: 5,
    title: "One Punch Man",
    image: "https://m.media-amazon.com/images/M/MV5BMTNmZDE2NDEtNTg3MS00OTE1LThlZGUtOGZkZTg0NTUyNGVmXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_.jpg",
    coverImage: "https://images.alphacoders.com/678/678893.jpg",
    description: "The story of Saitama, a hero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge.",
    episodes: 24,
    genres: ["Action", "Comedy", "Superhero"],
    releaseYear: 2015,
    status: "Completed",
    rating: 8.8,
    type: "TV",
    language: "Both"
  },
  {
    id: 6,
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    coverImage: "https://images2.alphacoders.com/775/775277.jpg",
    description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.",
    episodes: 64,
    genres: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2009,
    status: "Completed",
    rating: 9.1,
    type: "TV",
    language: "Both"
  },
  {
    id: 7,
    title: "Chainsaw Man",
    image: "https://m.media-amazon.com/images/M/MV5BZjY5MDFhZTgtOGVhMi00NTUzLTk5NjktNmRlNWJlNzVmN2E5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg",
    coverImage: "https://www.hindustantimes.com/ht-img/img/2023/06/09/1600x900/chainsaw_man_part_2_1686274267349_1686274267591.png",
    description: "Young Denji has had a life of hardship and poverty, making ends meet by harvesting organs from demons and selling them with his pet companion Pochita. When the yakuza exploits Denji and kills him, he blends with Pochita to survive, becoming a human-demon hybrid that hunts down evil demons.",
    episodes: 12,
    genres: ["Action", "Gore", "Supernatural"],
    releaseYear: 2022,
    status: "Ongoing",
    rating: 8.5,
    type: "TV",
    language: "Both"
  },
  {
    id: 8,
    title: "Spy x Family",
    image: "https://m.media-amazon.com/images/M/MV5BNjRiM2E5NDgtZGNkYS00NWM3LTliNDEtMjcwMDNkZGE4YzlmXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg",
    coverImage: "https://images.alphacoders.com/123/1236374.jpg",
    description: "Master spy Twilight assumes the alias of 'Loid Forger' and begins searching for a family to help him with his undercover mission. He adopts a telepathic girl and marries a woman who turns out to be an assassin, neither aware of each other's secret lives.",
    episodes: 25,
    genres: ["Action", "Comedy", "Spy"],
    releaseYear: 2022,
    status: "Ongoing",
    rating: 8.7,
    type: "TV",
    language: "Both"
  },
  {
    id: 9,
    title: "Death Note",
    image: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
    coverImage: "https://images2.alphacoders.com/689/689058.jpg",
    description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name while picturing their face.",
    episodes: 37,
    genres: ["Mystery", "Psychological", "Thriller"],
    releaseYear: 2006,
    status: "Completed",
    rating: 8.9,
    type: "TV",
    language: "Both"
  },
  {
    id: 10,
    title: "One Piece",
    image: "https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    coverImage: "https://images8.alphacoders.com/124/1248970.jpg",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure, the 'One Piece'.",
    episodes: 1000,
    genres: ["Action", "Adventure", "Comedy"],
    releaseYear: 1999,
    status: "Ongoing",
    rating: 8.7,
    type: "TV",
    language: "Both"
  },
  {
    id: 11,
    title: "Naruto",
    image: "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    coverImage: "https://cdn.wallpapersafari.com/12/91/YFV5gS.jpg",
    description: "The story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
    episodes: 220,
    genres: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2002,
    status: "Completed",
    rating: 8.3,
    type: "TV",
    language: "Both"
  },
  {
    id: 12,
    title: "Your Name",
    image: "https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    coverImage: "https://images.alphacoders.com/736/736461.jpg",
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    episodes: 1,
    genres: ["Romance", "Fantasy", "Drama"],
    releaseYear: 2016,
    status: "Completed",
    rating: 8.9,
    type: "Movie",
    language: "Both"
  }
];

// Sample episodes
const episodesData: Record<number, Episode[]> = {
  1: Array.from({ length: 26 }, (_, i) => ({
    id: 100 + i,
    animeId: 1,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/400x225.png?text=Demon+Slayer+Ep+${i + 1}`,
    duration: 24,
    releaseDate: `2019-${Math.floor(i / 4) + 4}-${(i % 4) * 7 + 1}`
  })),
  2: Array.from({ length: 25 }, (_, i) => ({
    id: 200 + i,
    animeId: 2,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/400x225.png?text=Attack+on+Titan+Ep+${i + 1}`,
    duration: 24,
    releaseDate: `2013-${Math.floor(i / 4) + 4}-${(i % 4) * 7 + 1}`
  })),
  3: Array.from({ length: 24 }, (_, i) => ({
    id: 300 + i,
    animeId: 3,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://via.placeholder.com/400x225.png?text=Jujutsu+Kaisen+Ep+${i + 1}`,
    duration: 24,
    releaseDate: `2020-${Math.floor(i / 4) + 10}-${(i % 4) * 7 + 1}`
  }))
};

// API service
const api = {
  // Get featured anime for the hero carousel
  getFeaturedAnime: (): Promise<Anime[]> => {
    return Promise.resolve(animeData.slice(0, 5));
  },

  // Get trending anime
  getTrendingAnime: (): Promise<Anime[]> => {
    return Promise.resolve(animeData.slice(0, 8));
  },

  // Get recently added anime
  getRecentAnime: (): Promise<Anime[]> => {
    return Promise.resolve([...animeData].sort(() => 0.5 - Math.random()).slice(0, 8));
  },

  // Get popular anime
  getPopularAnime: (): Promise<Anime[]> => {
    return Promise.resolve([...animeData].sort((a, b) => b.rating - a.rating).slice(0, 8));
  },

  // Get anime by genre
  getAnimeByGenre: (genre: string): Promise<Anime[]> => {
    const filteredAnime = animeData.filter(anime => anime.genres.includes(genre));
    return Promise.resolve(filteredAnime.slice(0, 8));
  },

  // Get anime by ID
  getAnimeById: (id: number): Promise<Anime | undefined> => {
    const anime = animeData.find(a => a.id === id);
    return Promise.resolve(anime);
  },

  // Get episodes by anime ID
  getEpisodes: (animeId: number): Promise<Episode[]> => {
    return Promise.resolve(episodesData[animeId] || []);
  },

  // Get episode by ID
  getEpisodeById: (animeId: number, episodeId: number): Promise<Episode | undefined> => {
    const episodes = episodesData[animeId] || [];
    return Promise.resolve(episodes.find(e => e.id === episodeId));
  },

  // Search anime by title
  searchAnime: (query: string): Promise<Anime[]> => {
    const filteredAnime = animeData.filter(anime => 
      anime.title.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filteredAnime);
  }
};

export default api;
