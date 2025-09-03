
import { Header } from "@/components/Header";
import { VideoCard, Video } from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { adminDb } from "@/lib/firebase-admin";
import Link from "next/link";
import { Award } from 'lucide-react';

// Fetch top-voted videos from Firestore
async function getTopVotedVideos() {
  const videosCollection = adminDb.collection("videos");
  // Query to order by votes in descending order and limit to the top 20
  const videoSnapshot = await videosCollection.orderBy("votes", "desc").limit(20).get();
  
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

export default async function TopVotedPage() {
  const videos = await getTopVotedVideos();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <div className="flex justify-center gap-4 mb-8">
            <Link href="/">
                <Button variant="ghost">Explore</Button>
            </Link>
            <Button variant="secondary">Top Voted</Button>
            <Link href="/favorites">
                <Button variant="ghost">My Favorites</Button>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <div key={video.documentId} className="relative">
              {index < 3 && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
