
const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  animeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Composite index to ensure unique episode numbers per anime
episodeSchema.index({ animeId: 1, number: 1 }, { unique: true });

module.exports = mongoose.model('Episode', episodeSchema);
