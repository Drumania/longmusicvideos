"use client";

import { useVideoPlayer } from '@/context/VideoPlayerContext';
import { FloatingVideoPlayer } from './FloatingVideoPlayer';

export function GlobalVideoPlayer() {
  const { currentVideo, isPlayerOpen, closePlayer } = useVideoPlayer();

  return (
    <FloatingVideoPlayer
      videoId={currentVideo?.videoId || ''}
      title={currentVideo?.title || ''}
      isOpen={isPlayerOpen}
      onClose={closePlayer}
    />
  );
}
