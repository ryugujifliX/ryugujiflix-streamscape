
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
                  server: 'GogoAnime',
                  url: `https://example.com/gogo/${animeId}/ep-${episodeNumber}`,
                  quality: '1080p'
                },
                {
                  server: 'AnimePahe',
                  url: `https://example.com/animepahe/${animeId}/episode/${episodeNumber}`,
                  quality: '720p'
                },
                {
                  server: 'Backup',
                  url: `https://example.com/backup/${animeId}/${episodeNumber}`,
                  quality: '480p'
                }
              ],
              subtitles: [
                { lang: 'English', url: `https://example.com/subs/en/${animeId}/${episodeNumber}` },
                { lang: 'Spanish', url: `https://example.com/subs/es/${animeId}/${episodeNumber}` }
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
            title: "Demon Slayer: Kimetsu no Yaiba",
            image: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
            releaseYear: 2019,
            score: 8.7
          },
          {
            id: 2,
            title: "Attack on Titan",
            image: "https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg",
            releaseYear: 2013,
            score: 9.0
          }
        ].filter(anime => 
          anime.title.toLowerCase().includes(query.toLowerCase())
        )
      };
    }
  }
];
