"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { X, Minimize2, Maximize2, Expand, Shrink } from 'lucide-react';

interface FloatingVideoPlayerProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingVideoPlayer({ videoId, title, isOpen, onClose }: FloatingVideoPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const getPlayerSize = () => {
    if (isMaximized) {
      return 'fixed top-16 left-4 right-4 bottom-4 z-50';
    }
    if (isMinimized) {
      return 'fixed bottom-4 right-4 z-50 w-80 h-20';
    }
    return 'fixed bottom-4 right-4 z-50 w-96 h-64';
  };

  const playerContent = (
    <div className={`${getPlayerSize()} transition-all duration-300`}>
      <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-white text-sm font-medium truncate">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={() => {
                if (isMinimized) {
                  setIsMinimized(false);
                } else {
                  setIsMaximized(!isMaximized);
                }
              }}
            >
              {isMinimized ? <Expand className="h-3 w-3" /> : 
               isMaximized ? <Shrink className="h-3 w-3" /> : 
               <Expand className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        {!isMinimized && (
          <div className={`relative w-full ${isMaximized ? 'h-full' : 'h-48'}`}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Minimized state - just show title and controls */}
        {isMinimized && (
          <div className="flex items-center justify-between p-3 h-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
              </div>
              <span className="text-white text-sm truncate">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-white"
                onClick={() => setIsMinimized(false)}
              >
                <Expand className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-white"
                onClick={onClose}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(playerContent, document.body);
}
