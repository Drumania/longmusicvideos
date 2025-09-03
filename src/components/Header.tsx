
'use client';

import { useAuth } from '@/context/AuthContext';
import { Search, LogIn, LogOut, Plus } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { AddVideoModal } from './AddVideoModal';
import Link from 'next/link';

export function Header() {
  const { user, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={32} 
          height={32} 
          className="rounded-lg"
        />
        <div className="text-2xl font-bold text-white">Lofi Video Directory</div>
      </div>
      
      {/* Navigation filters - centered */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="secondary">Explore</Button>
        </Link>
        <Link href="/top-voted">
          <Button variant="ghost">Top Voted</Button>
        </Link>
        <Link href="/favorites">
          <Button variant="ghost">My Favorites</Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search />
        </Button>
        {user ? (
          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="icon" 
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={32} height={32} className="rounded-full" />
            <span className="text-white hidden sm:block">{user.displayName}</span>
            <Button variant="ghost" size="icon" onClick={logout} className="text-gray-400 hover:text-white">
                <LogOut />
            </Button>
          </div>
        ) : (
            <Button variant="secondary" onClick={login} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                <LogIn className="h-5 w-5 mr-2"/>
                Login
            </Button>
        )}
      </div>
      <AddVideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
