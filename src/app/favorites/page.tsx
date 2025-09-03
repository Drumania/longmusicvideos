
"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { VideoCard, Video } from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { app } from "@/lib/firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) {
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      const videosCollection = collection(db, "videos");
      // Query for videos where the 'favorites' array contains the user's UID
      const q = query(videosCollection, where("favorites", "array-contains", user.uid));
      
      const videoSnapshot = await getDocs(q);
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

      setVideos(videoList);
      setLoading(false);
    }

    fetchFavorites();
  }, [user]); // Rerun when the user changes

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <div className="flex justify-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost">Explore</Button>
          </Link>
          <Link href="/top-voted">
            <Button variant="ghost">Top Voted</Button>
          </Link>
          <Button variant="secondary">My Favorites</Button>
        </div>
        
        {loading && <p className='text-center'>Loading your favorite videos...</p>}

        {!loading && !user && (
            <div className='text-center bg-gray-800 p-8 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Please Log In</h2>
                <p>You need to be logged in to see your favorite videos.</p>
            </div>
        )}

        {!loading && user && videos.length === 0 && (
            <div className='text-center bg-gray-800 p-8 rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>No Favorites Yet</h2>
                <p>You haven&apos;t added any videos to your favorites. Click the heart icon on a video to save it here.</p>
            </div>
        )}
        
        {!loading && user && videos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {videos.map((video) => (
                <VideoCard key={video.documentId} video={video} />
            ))}
            </div>
        )}
      </main>
    </div>
  );
}
