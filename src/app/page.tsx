
import { Header } from "@/components/Header";
import { VideoCard, Video } from "@/components/VideoCard";
import { adminDb } from "@/lib/firebase-admin";
import { FirebaseDebug } from "@/components/FirebaseDebug";

// Fetch videos from Firestore
async function getVideos() {
  const videosCollection = adminDb.collection("videos");
  const videoSnapshot = await videosCollection.get();
  const videoList = videoSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
          documentId: doc.id, 
          id: data.id, 
          title: data.title,
          channel: data.channel,
          thumbnail: data.thumbnail,
          votes: data.votes,
          favorites: data.favorites || [],
          createdAt: data.createdAt?.toDate() || null,
      } as Video;
  });
  
  // Ordenar por fecha de creación descendente (más recientes primero)
  return videoList.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.documentId} video={video} />
          ))}
        </div>
      </main>
      <FirebaseDebug />
    </div>
  );
}
