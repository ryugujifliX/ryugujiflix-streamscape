
const express = require('express');
const router = express.Router();
const Anime = require('../models/animeModel');
const Episode = require('../models/episodeModel');

// Get all anime with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const anime = await Anime.find()
      .sort({ popularity: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Anime.countDocuments();
    
    res.json({
      anime,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trending anime
router.get('/trending', async (req, res) => {
  try {
    const trending = await Anime.find()
      .sort({ popularity: 1 })
      .limit(10);
    
    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent anime
router.get('/recent', async (req, res) => {
  try {
    const recent = await Anime.find({ status: 'Airing' })
      .sort({ updatedAt: -1 })
      .limit(10);
    
    res.json(recent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top rated anime
router.get('/top-rated', async (req, res) => {
  try {
    const topRated = await Anime.find()
      .sort({ rating: -1 })
      .limit(10);
    
    res.json(topRated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get anime by ID
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    
    // Get episodes for this anime
    const episodes = await Episode.find({ animeId: anime._id }).sort({ number: 1 });
    
    res.json({
      ...anime._doc,
      episodeList: episodes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search anime
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const anime = await Anime.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).limit(24);
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get anime by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const anime = await Anime.find({
      genres: { $in: [genre] }
    });
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get anime by type (TV or Movie)
router.get('/type/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const anime = await Anime.find({ type });
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
