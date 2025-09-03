
'use client';

import { useAuth } from '@/context/AuthContext';
import { LogIn, LogOut, Plus } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { AddVideoModal } from './AddVideoModal';
import Link from 'next/link';
import { useCurrentPath } from '@/hooks/useCurrentPath';

export function Header() {
  const { user, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isHome, isTopVoted, isFavorites } = useCurrentPath();

  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={32} 
          height={32} 
          className="rounded-lg"
        />
        <div className="text-2xl font-bold text-white">LMV</div>
      </div>
      
      {/* Navigation filters - centered */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" className="text-white cursor-pointer hover:text-gray-300">
            <span className={isHome ? "text-teal-300" : "text-white"}>Explore</span>
          </Button>
        </Link>
        <Link href="/top-voted">
          <Button variant="ghost" className="text-white cursor-pointer hover:text-gray-300">
            <span className={isTopVoted ? "text-teal-300" : "text-white"}>Top Voted</span>
          </Button>
        </Link>
        <Link href="/favorites">
          <Button variant="ghost" className="text-white cursor-pointer hover:text-gray-300">
            <span className={isFavorites ? "text-teal-300" : "text-white"}>My Favorites</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="icon" 
              onClick={() => setIsModalOpen(true)}
              className="gradient-primary hover:bg-teal-400 text-white cursor-pointer rounded-full transition-colors"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={32} height={32} className="rounded-full" />
            <span className="text-white hidden sm:block">{user.displayName}</span>
            <Button variant="ghost" size="icon" onClick={logout} className="text-gray-400 cursor-pointer hover:text-white">
                <LogOut />
            </Button>
          </div>
        ) : (
            <Button variant="secondary" onClick={login} className="gradient-primary cursor-pointer hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                <LogIn className="h-5 w-5 mr-2"/>
                Login
            </Button>
        )}
      </div>
      <AddVideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
