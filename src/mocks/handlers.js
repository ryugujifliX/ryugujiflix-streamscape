
// This file simulates a backend API server for local development
// In a production environment, this would be replaced with an actual backend server

export const handlers = [
  {
    url: '/api/stream/:animeId/:episodeNumber',
    method: 'GET',
    response: (params) => {
      const { animeId, episodeNumber } = params.path;
      
      // Simulate latency
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: {
              id: parseInt(episodeNumber),
              sources: [
                {
                  server: 'VidStreaming',
                  url: `https://example.com/vidstreaming/${animeId}/episode-${episodeNumber}`,
                  quality: '1080p'
                },
                {
                  server: 'GogoAnime',
                  url: `https://example.com/gogo/${animeId}/ep-${episodeNumber}`,
                  quality: '720p'
                },
                {
                  server: 'Jikan',
                  url: `https://example.com/jikan/${animeId}/episode/${episodeNumber}`,
                  quality: '480p'
                },
                {
                  server: 'Backup',
                  url: `https://example.com/backup/${animeId}/${episodeNumber}`,
                  quality: '360p'
                }
              ],
              subtitles: [
                { lang: 'English', url: `https://example.com/subs/en/${animeId}/${episodeNumber}` },
                { lang: 'Spanish', url: `https://example.com/subs/es/${animeId}/${episodeNumber}` },
                { lang: 'Japanese', url: `https://example.com/subs/jp/${animeId}/${episodeNumber}` }
              ]
            }
          });
        }, 800);
      });
    }
  },
  
  {
    url: '/api/search',
    method: 'GET',
    response: (req) => {
      const query = new URL(req.url).searchParams.get('q') || '';
      
      // Return search results based on local data
      return {
        statusCode: 200,
        data: [
          {
            id: 1,
            title: "Attack on Titan",
            image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Attack+on+Titan",
            releaseYear: 2013,
            score: 9.1
          },
          {
            id: 2,
            title: "Demon Slayer: Kimetsu no Yaiba",
            image: "https://via.placeholder.com/240x360/19171b/ffffff?text=Demon+Slayer",
            releaseYear: 2019,
            score: 8.7
          },
          {
            id: 3,
            title: "One Piece",
            image: "https://via.placeholder.com/240x360/19171b/ffffff?text=One+Piece",
            releaseYear: 1999,
            score: 8.9
          }
        ].filter(anime => 
          anime.title.toLowerCase().includes(query.toLowerCase())
        )
      };
    }
  },
  
  // Authentication endpoints
  {
    url: '/api/auth/login',
    method: 'POST',
    response: (req) => {
      // Simulate successful login
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: {
              token: 'mock_jwt_token_' + Date.now(),
              user: {
                id: 'user123',
                username: 'DemoUser',
                email: 'demo@example.com',
                avatar: 'https://via.placeholder.com/150/19171b/ffffff?text=DU',
                watchlist: [1, 2, 5],
                watchHistory: []
              }
            }
          });
        }, 700);
      });
    }
  },
  
  {
    url: '/api/auth/register',
    method: 'POST',
    response: (req) => {
      // Simulate successful registration
      const body = JSON.parse(req.body);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: {
              token: 'mock_jwt_token_' + Date.now(),
              user: {
                id: 'user_' + Date.now(),
                username: body.username || 'NewUser',
                email: body.email || 'newuser@example.com',
                avatar: `https://via.placeholder.com/150/19171b/ffffff?text=${(body.username || 'NU').substring(0, 2).toUpperCase()}`,
                watchlist: [],
                watchHistory: []
              }
            }
          });
        }, 1000);
      });
    }
  },
  
  // User data endpoints
  {
    url: '/api/user/watchlist',
    method: 'GET',
    response: () => {
      // Simulate getting user watchlist
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: [1, 2, 5] // Anime IDs in watchlist
          });
        }, 600);
      });
    }
  },
  
  {
    url: '/api/user/watchlist/add',
    method: 'POST',
    response: () => {
      // Simulate adding to watchlist
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: { success: true }
          });
        }, 400);
      });
    }
  },
  
  {
    url: '/api/user/watchlist/remove',
    method: 'POST',
    response: () => {
      // Simulate removing from watchlist
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: { success: true }
          });
        }, 400);
      });
    }
  },
  
  {
    url: '/api/user/history',
    method: 'GET',
    response: () => {
      // Simulate getting watch history
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: [
              {
                animeId: 1,
                episodeId: 1,
                timestamp: 350,
                completed: true,
                lastWatched: new Date().toISOString()
              },
              {
                animeId: 2,
                episodeId: 1,
                timestamp: 780,
                completed: false,
                lastWatched: new Date(Date.now() - 86400000).toISOString() // 1 day ago
              }
            ]
          });
        }, 700);
      });
    }
  },
  
  {
    url: '/api/user/history/update',
    method: 'POST',
    response: () => {
      // Simulate updating watch history
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            data: { success: true }
          });
        }, 300);
      });
    }
  }
];
