
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { animeId, episodeNumber } = await req.json()
    
    // Make the API call to Consumet
    const response = await fetch(
      `https://api.consumet.org/anime/gogoanime/watch/${animeId}-episode-${episodeNumber}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch streaming data')
    }

    const data = await response.json()

    // Transform the response to match our interface
    const streamData = {
      id: episodeNumber,
      sources: data.sources.map((source: any) => ({
        server: source.isM3U8 ? "HLS" : source.name || "VidStreaming",
        url: source.url,
        quality: source.quality || "Auto"
      })),
      subtitles: data.subtitles?.map((sub: any) => ({
        lang: sub.lang,
        url: sub.url
      })) || []
    }

    return new Response(
      JSON.stringify(streamData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
