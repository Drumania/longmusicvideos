"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface VideoPlayerContextType {
  currentVideo: {
    videoId: string;
    title: string;
  } | null;
  isPlayerOpen: boolean;
  openPlayer: (videoId: string, title: string) => void;
  closePlayer: () => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [currentVideo, setCurrentVideo] = useState<{ videoId: string; title: string } | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const openPlayer = (videoId: string, title: string) => {
    setCurrentVideo({ videoId, title });
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setCurrentVideo(null);
    setIsPlayerOpen(false);
  };

  return (
    <VideoPlayerContext.Provider value={{
      currentVideo,
      isPlayerOpen,
      openPlayer,
      closePlayer,
    }}>
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
}
