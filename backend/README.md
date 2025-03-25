
# RyuguJiFlix Backend

This is the backend server for the RyuguJiFlix anime streaming platform. It provides API endpoints for the frontend application to fetch anime data, manage user watchlists, and track watch history.

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Create a `.env` file based on the example and configure your MongoDB connection
4. Seed the database with initial data:
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm run dev
   ```

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

## Models

- `Anime` - Stores anime information
- `Episode` - Stores episode information
- `User` - Stores user information including watchlist and watch history
