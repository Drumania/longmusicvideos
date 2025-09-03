
import { Header } from "@/components/Header";
import { VideoCard, Video } from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { app } from "@/lib/firebase"; // Import the initialized Firebase app
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Link from "next/link"; // Import the Link component

// Fetch videos from Firestore
async function getVideos() {
  const db = getFirestore(app);
  const videosCollection = collection(db, "videos");
  const videoSnapshot = await getDocs(videosCollection);
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
      } as Video;
  });
  return videoList;
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <div className="flex justify-center gap-4 mb-8">
            <Button variant="secondary">Explore</Button>
            <Link href="/top-voted">
                <Button variant="ghost">Top Voted</Button>
            </Link>
            <Link href="/favorites">
                <Button variant="ghost">My Favorites</Button>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.documentId} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}
