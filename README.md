
# RyuguJiFlix - Anime Streaming Platform

RyuguJiFlix is a comprehensive anime streaming platform that provides users with access to trending, recent, and top-rated anime content.

## Project Overview

This application consists of:
- **Frontend**: React + TypeScript application with Vite
- **Backend**: Express.js API server with MongoDB database

## Setup Guide

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local installation or MongoDB Atlas account)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ryugujiflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at http://localhost:8080

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the backend directory
   - Add the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ryugujiflix
   NODE_ENV=development
   ```
   
   - If using MongoDB Atlas, replace the MONGODB_URI with your connection string

4. **Seed the database**
   ```bash
   npm run seed
   ```
   
   This will populate your database with initial anime data from the Jikan API.

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   The API will be available at http://localhost:5000

## API Endpoints

### Anime

- `GET /api/anime` - Get all anime with pagination
- `GET /api/anime/trending` - Get trending anime
- `GET /api/anime/recent` - Get recently updated anime
- `GET /api/anime/top-rated` - Get top rated anime
- `GET /api/anime/:id` - Get anime by ID
- `GET /api/anime/search/:query` - Search anime
- `GET /api/anime/genre/:genre` - Get anime by genre
- `GET /api/anime/type/:type` - Get anime by type (TV/Movie)

### Users

- `GET /api/users/profile/:id` - Get user profile
- `GET /api/users/watchlist/:userId` - Get user watchlist
- `POST /api/users/watchlist/:userId/add/:animeId` - Add anime to watchlist
- `DELETE /api/users/watchlist/:userId/remove/:animeId` - Remove anime from watchlist
- `POST /api/users/history/:userId` - Update watch history

## External APIs

The application uses two external APIs:

1. **Jikan API** (https://api.jikan.moe/v4/) - For anime metadata
2. **Consumet API** (https://api.consumet.org) - For streaming links

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - React Router for navigation
  - Tanstack Query for data fetching
  - Tailwind CSS for styling
  - shadcn/ui for UI components

- **Backend**:
  - Express.js
  - MongoDB with Mongoose
  - Axios for external API requests

## Project Structure

- `/src` - Frontend React application
- `/backend` - Express.js backend
  - `/models` - MongoDB models
  - `/routes` - API routes
  - `/scripts` - Database seeding scripts

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
   - Ensure MongoDB is running locally or your Atlas connection string is correct
   - Check for network issues if using Atlas

2. **API Rate Limiting**
   - The Jikan API has rate limits. If seeding fails, try again after a few minutes

3. **Missing Dependencies**
   - If you encounter module not found errors, run `npm install` again

## Deployment

For deployment:

1. **Frontend**:
   - Build the frontend with `npm run build`
   - Deploy the generated files to a static hosting service (Netlify, Vercel, etc.)

2. **Backend**:
   - Deploy to a Node.js hosting platform (Heroku, Railway, Render, etc.)
   - Configure environment variables for production
   - Set up a MongoDB Atlas database for production

