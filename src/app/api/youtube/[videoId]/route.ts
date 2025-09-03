import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params;
  
  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
  }

  try {
    // Usar la API de YouTube Data v3
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error('YouTube API key not configured');
      return NextResponse.json({ 
        error: 'YouTube API key not configured. Please add YOUTUBE_API_KEY to your environment variables.' 
      }, { status: 500 });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error:', response.status, errorText);
      return NextResponse.json({ 
        error: `YouTube API error: ${response.status} - ${errorText}` 
      }, { status: response.status });
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Video not found or is private' }, { status: 404 });
    }

    const video = data.items[0];
    const snippet = video.snippet;

    // Extraer los primeros 200 caracteres de la descripción
    const description = snippet.description ? snippet.description.substring(0, 200) + '...' : '';

    return NextResponse.json({
      title: snippet.title,
      description: description,
      videoId: videoId,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      channel: snippet.channelTitle,
    });
  } catch (error) {
    console.error('Error fetching YouTube video data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video data' },
      { status: 500 }
    );
  }
}
