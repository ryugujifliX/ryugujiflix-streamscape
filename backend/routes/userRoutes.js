
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('watchlist');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user watchlist
router.get('/watchlist/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('watchlist');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add anime to watchlist
router.post('/watchlist/:userId/add/:animeId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if anime already in watchlist
    if (!user.watchlist.includes(req.params.animeId)) {
      user.watchlist.push(req.params.animeId);
      await user.save();
    }
    
    res.json({ message: 'Anime added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove anime from watchlist
router.delete('/watchlist/:userId/remove/:animeId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.watchlist = user.watchlist.filter(
      animeId => animeId.toString() !== req.params.animeId
    );
    
    await user.save();
    res.json({ message: 'Anime removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update watch history
router.post('/history/:userId', async (req, res) => {
  try {
    const { animeId, episodeId, timestamp, completed } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if this episode is already in watch history
    const historyIndex = user.watchHistory.findIndex(
      h => h.animeId.toString() === animeId && h.episodeId.toString() === episodeId
    );
    
    if (historyIndex > -1) {
      // Update existing history entry
      user.watchHistory[historyIndex].timestamp = timestamp;
      user.watchHistory[historyIndex].completed = completed;
      user.watchHistory[historyIndex].lastWatched = new Date();
    } else {
      // Add new history entry
      user.watchHistory.push({
        animeId,
        episodeId,
        timestamp,
        completed,
        lastWatched: new Date()
      });
    }
    
    await user.save();
    res.json({ message: 'Watch history updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
