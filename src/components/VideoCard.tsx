
"use client";

import { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, ThumbsUp, Youtube } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import { addVote, toggleFavorite } from '@/app/actions'; // Import Server Actions
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface Video {
    documentId: string; // Firestore document ID
    id: string; // YouTube video ID
    title: string;
    channel: string;
    thumbnail: string;
    votes: number;
    favorites: string[]; // Array of user UIDs who have favorited it
}

export function VideoCard({ video }: { video: Video }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if the current user has favorited this video
  const isFavorited = user ? video.favorites.includes(user.uid) : false;

  const handleVote = async () => {
    if (!user || isProcessing) return;
    setIsProcessing(true);
    await addVote(video.documentId);
    setIsProcessing(false);
  };

  const handleFavorite = async () => {
    if (!user || isProcessing) return;
    setIsProcessing(true);
    await toggleFavorite(video.documentId, user.uid, isFavorited);
    setIsProcessing(false);
  };

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 flex flex-col">
        <div className="relative">
            <Image src={video.thumbnail} alt={video.title} width={400} height={225} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                 <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
                    <PlayCircle className="h-12 w-12 text-white hover:text-cyan-400 transition-colors" />
                </a>
            </div>
        </div>
      <CardHeader className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-white truncate">{video.title}</CardTitle>
        <p className="text-sm text-gray-400">{video.channel}</p>
      </CardHeader>
      <CardFooter className="p-4 flex justify-between items-center bg-gray-800/50 mt-auto">
        <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex items-center gap-2 text-gray-400 hover:text-rose-500 disabled:opacity-50 transition-colors"
              onClick={handleFavorite}
              disabled={!user || isProcessing}
            >
              <Heart className={cn("h-5 w-5", isFavorited && "fill-current text-rose-500")} />
            </Button>
            <div className='flex items-center gap-1'>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-green-500 disabled:opacity-50 transition-colors"
                  onClick={handleVote}
                  disabled={!user || isProcessing}
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-300 font-medium">{video.votes}</span>
            </div>
        </div>
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                <Youtube className="h-5 w-5 mr-2" />
                YouTube
            </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
