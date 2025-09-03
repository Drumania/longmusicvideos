import { NextResponse } from "next/server";
import admin from "firebase-admin";

// --- Types ---
interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
}

interface YouTubeVideoItem {
  id: string;
  snippet?: {
    title?: string;
    channelId?: string;
    channelTitle?: string;
    thumbnails?: Record<string, any>;
    publishedAt?: string;
    liveBroadcastContent?: string;
  };
  contentDetails?: {
    duration?: string;
  };
  statistics?: {
    viewCount?: string;
  };
  status?: {
    embeddable?: boolean;
  };
}

interface YouTubeVideosResponse {
  items?: YouTubeVideoItem[];
}

// --- Firebase Admin init (una sola vez) ---
const svc = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: svc!,
    }),
  });
}
const db = admin.firestore();

// --- Helpers ---
const YT_API = "https://www.googleapis.com/youtube/v3";

function parseISO8601Duration(d: string): number {
  // PT1H23M45S -> seconds
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h = m?.[1] ? parseInt(m[1]) : 0;
  const min = m?.[2] ? parseInt(m[2]) : 0;
  const s = m?.[3] ? parseInt(m[3]) : 0;
  return h * 3600 + min * 60 + s;
}

export async function GET() {
  try {
    const key = process.env.YT_API_KEY!;
    const q = [
      "lofi",
      "synthwave",
      "vaporwave",
      "retrowave",
      "study",
      "sleep"
    ].join(" OR ");

    // 1) search.list (solo IDs recientes)
    const publishedAfter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const searchURL = `${YT_API}/search?part=id&maxResults=50&type=video&videoEmbeddable=true&videoCategoryId=10&order=date&publishedAfter=${encodeURIComponent(publishedAfter)}&q=${encodeURIComponent(q)}&key=${key}`;
    const searchRes = await fetch(searchURL);
    const searchJson: YouTubeSearchResponse = await searchRes.json();
    const ids: string[] = (searchJson.items || []).map((i) => i.id.videoId).filter(Boolean);

    if (!ids.length) return NextResponse.json({ inserted: 0, reason: "no-results" });

    // 2) videos.list (detalles para filtrar)
    const chunks: string[][] = [];
    for (let i = 0; i < ids.length; i += 50) chunks.push(ids.slice(i, i + 50));

    const details: YouTubeVideoItem[] = [];
    for (const c of chunks) {
      const url = `${YT_API}/videos?part=snippet,contentDetails,statistics,status&id=${c.join(",")}&key=${key}`;
      const r = await fetch(url);
      const j: YouTubeVideosResponse = await r.json();
      details.push(...(j.items || []));
    }

    // 3) filtros de calidad
    const filtered = details
      .filter(v => v?.status?.embeddable)
      .filter(v => !v?.snippet?.liveBroadcastContent || v.snippet.liveBroadcastContent === "none")
      .filter(v => parseISO8601Duration(v?.contentDetails?.duration || "PT0S") >= 3600);

    // 4) inserta hasta 10 nuevos en Firestore (evita duplicados)
    let inserted = 0;
    for (const v of filtered) {
      if (inserted >= 10) break;
      const ref = db.collection("videos").doc(v.id);
      const snap = await ref.get();
      if (snap.exists) continue;

      // Extraer descripción (primeros 200 caracteres)
      const description = v.snippet?.description ? v.snippet.description.substring(0, 200) + '...' : '';
      
      // Obtener thumbnail de alta calidad
      const thumbnail = v.snippet?.thumbnails?.high?.url || 
                       v.snippet?.thumbnails?.medium?.url || 
                       v.snippet?.thumbnails?.default?.url || 
                       `https://i.ytimg.com/vi/${v.id}/hq720.jpg`;

      await ref.set({
        id: v.id, // YouTube video ID (campo principal)
        title: v.snippet?.title ?? "",
        channel: v.snippet?.channelTitle ?? "", // Nombre del canal
        thumbnail: thumbnail, // URL del thumbnail
        description: description, // Descripción truncada
        votes: 0, // Inicializar votos en 0
        favorites: [], // Array vacío de favoritos
        createdAt: admin.firestore.FieldValue.serverTimestamp(), // Fecha de creación
        // Campos adicionales para referencia
        channelId: v.snippet?.channelId ?? "",
        duration: v.contentDetails?.duration ?? "",
        publishedAt: v.snippet?.publishedAt ?? null,
        viewCount: Number(v.statistics?.viewCount ?? 0),
        embeddable: true,
        source: "cron",
        ingestedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      inserted++;
    }

    return NextResponse.json({ inserted, scanned: details.length });
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}