
"use client";

import { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, ThumbsUp, Youtube } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import { addVote, toggleFavorite } from '@/app/actions'; // Import Server Actions
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useVideoPlayer } from '@/context/VideoPlayerContext';

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
  const { openPlayer } = useVideoPlayer();

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
    <Card className="bg-gray-800/50 border-gray-700/50 overflow-hidden rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:bg-gray-800/70 transition-all duration-300 flex flex-col group">
        <div className="relative aspect-video">
            <Image 
              src={video.thumbnail} 
              alt={video.title} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                 <button 
                   onClick={() => openPlayer(video.id, video.title)}
                   className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform'
                 >
                    <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                </button>
            </div>
            {/* YouTube icon overlay */}
            <div className="absolute top-3 right-3">
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="icon" 
                  className="h-8 w-8 bg-red-600/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </a>
            </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-gray-400 text-xs mb-3 truncate">{video.channel}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:text-rose-500 disabled:opacity-50 transition-colors"
                onClick={handleFavorite}
                disabled={!user || isProcessing}
              >
                <Heart className={cn("h-4 w-4", isFavorited && "fill-current text-rose-500")} />
              </Button>
              <div className='flex items-center gap-1'>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-green-500 disabled:opacity-50 transition-colors"
                  onClick={handleVote}
                  disabled={!user || isProcessing}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="text-xs text-gray-300 font-medium">{video.votes}</span>
              </div>
            </div>
          </div>
        </div>
    </Card>
  );
}
