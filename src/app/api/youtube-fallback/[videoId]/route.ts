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
    // Método alternativo: hacer scraping de la página de YouTube
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const html = await response.text();
    
    // Extraer título del video
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : 'Video de YouTube';
    
    // Extraer descripción (primeros 200 caracteres)
    const descMatch = html.match(/"shortDescription":"([^"]+)"/);
    const description = descMatch ? descMatch[1].substring(0, 200) + '...' : 'Descripción no disponible';
    
    // Extraer canal
    const channelMatch = html.match(/"ownerText":\{"runs":\[\{"text":"([^"]+)"/);
    const channel = channelMatch ? channelMatch[1] : 'Canal desconocido';
    
    // Thumbnail por defecto
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return NextResponse.json({
      title: title,
      description: description,
      videoId: videoId,
      thumbnail: thumbnail,
      channel: channel,
    });
  } catch (error) {
    console.error('Error fetching video data (fallback):', error);
    return NextResponse.json(
      { error: 'Failed to fetch video data' },
      { status: 500 }
    );
  }
}
