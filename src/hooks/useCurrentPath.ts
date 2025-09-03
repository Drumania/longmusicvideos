"use client";

import { usePathname } from 'next/navigation';

export function useCurrentPath() {
  const pathname = usePathname();
  
  return {
    isHome: pathname === '/',
    isTopVoted: pathname === '/top-voted',
    isFavorites: pathname === '/favorites',
    currentPath: pathname
  };
}
