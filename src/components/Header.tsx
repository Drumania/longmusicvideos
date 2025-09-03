
'use client';

import { useAuth } from '@/context/AuthContext';
import { UserCircle, Search, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="text-2xl font-bold text-white">Lofi Video Directory</div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search />
        </Button>
        {user ? (
          <div className="flex items-center gap-2">
            <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
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
    </header>
  );
}
