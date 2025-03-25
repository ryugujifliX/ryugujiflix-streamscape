
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Airing', 'Completed', 'Upcoming'],
    required: true
  },
  genres: [{
    type: String,
    required: true
  }],
  type: {
    type: String,
    required: true
  },
  episodes: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  popularity: {
    type: Number,
    default: 0
  },
  studios: [{
    type: String
  }],
  duration: {
    type: String
  },
  trailer: {
    type: String
  },
  malId: {
    type: Number,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);
