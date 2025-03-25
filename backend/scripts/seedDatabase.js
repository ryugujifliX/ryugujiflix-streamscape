
const mongoose = require('mongoose');
const axios = require('axios');
const Anime = require('../models/animeModel');
const Episode = require('../models/episodeModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Helper function to map Jikan API status to our status format
const mapStatus = (status) => {
  if (status.includes("Airing") || status.includes("Currently")) return "Airing";
  if (status.includes("Finished") || status.includes("Complete")) return "Completed";
  return "Upcoming";
};

// Function to fetch and save anime from Jikan API
const fetchAndSaveAnime = async () => {
  try {
    // Fetch top anime
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=50');
    
    for (const item of response.data.data) {
      // Check if anime already exists
      const existingAnime = await Anime.findOne({ malId: item.mal_id });
      
      if (!existingAnime) {
        // Create new anime
        const anime = new Anime({
          title: item.title,
          description: item.synopsis || 'No description available',
          synopsis: item.synopsis || 'No synopsis available',
          image: item.images.jpg.large_image_url || item.images.jpg.image_url,
          banner: item.images.jpg.large_image_url || item.images.jpg.image_url,
          releaseYear: item.year || new Date(item.aired.from).getFullYear() || 2023,
          status: mapStatus(item.status),
          genres: item.genres.map(g => g.name),
          type: item.type || 'TV',
          episodes: item.episodes || 0,
          rating: item.score || 0,
          popularity: item.popularity || 0,
          studios: item.studios.map(s => s.name),
          duration: item.duration || '24 min',
          trailer: item.trailer?.url || '',
          malId: item.mal_id
        });
        
        const savedAnime = await anime.save();
        console.log(`Saved anime: ${savedAnime.title}`);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Fetch episodes
        await fetchAndSaveEpisodes(savedAnime._id, item.mal_id);
      } else {
        console.log(`Anime already exists: ${item.title}`);
      }
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Function to fetch and save episodes
const fetchAndSaveEpisodes = async (animeId, malId) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${malId}/episodes`);
    
    const episodes = response.data.data.map((ep, index) => ({
      animeId,
      number: ep.mal_id || index + 1,
      title: ep.title || `Episode ${ep.mal_id || index + 1}`,
      thumbnail: `https://via.placeholder.com/300x200/19171b/ffffff?text=Ep+${ep.mal_id || index + 1}`,
      duration: '24m',
      releaseDate: ep.aired || new Date().toISOString()
    }));
    
    if (episodes.length > 0) {
      await Episode.insertMany(episodes);
      console.log(`Saved ${episodes.length} episodes for anime ID: ${animeId}`);
    } else {
      // Create dummy episodes if none are available
      const dummyEpisodes = Array.from({ length: 12 }, (_, i) => ({
        animeId,
        number: i + 1,
        title: `Episode ${i + 1}`,
        thumbnail: `https://via.placeholder.com/300x200/19171b/ffffff?text=Ep+${i + 1}`,
        duration: '24m',
        releaseDate: new Date(2023, 0, i + 1).toISOString()
      }));
      
      await Episode.insertMany(dummyEpisodes);
      console.log(`Saved ${dummyEpisodes.length} dummy episodes for anime ID: ${animeId}`);
    }
  } catch (error) {
    console.error(`Error fetching episodes for anime ID ${animeId}:`, error);
  }
};

// Run the seeding function
fetchAndSaveAnime();
