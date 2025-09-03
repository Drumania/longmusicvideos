
'use client';

import { useAuth } from '@/context/AuthContext';
import { LogIn, LogOut, Plus, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { AddVideoModal } from './AddVideoModal';
import Link from 'next/link';
import { useCurrentPath } from '@/hooks/useCurrentPath';

export function Header() {
  const { user, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isHome, isTopVoted, isFavorites } = useCurrentPath();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 relative">
        {/* Logo */}
        <div className="flex items-center pl-5 gap-3">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            className="rounded-lg"
          />
          <div className="text-xl md:text-2xl font-bold text-white">LMV</div>
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
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
        
        {/* Desktop User Actions - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
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
              <span className="text-white">{user.displayName}</span>
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-gray-300"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={closeMobileMenu}>
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    width={24} 
                    height={24} 
                    className="rounded-lg"
                  />
                  <div className="text-lg font-bold text-white">LMV</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="text-white hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-8">
                <Link href="/" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isHome ? 'bg-teal-500/20 text-teal-300' : 'text-white hover:bg-gray-800'}`}>
                    Explore
                  </div>
                </Link>
                <Link href="/top-voted" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isTopVoted ? 'bg-teal-500/20 text-teal-300' : 'text-white hover:bg-gray-800'}`}>
                    Top Voted
                  </div>
                </Link>
                <Link href="/favorites" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isFavorites ? 'bg-teal-500/20 text-teal-300' : 'text-white hover:bg-gray-800'}`}>
                    My Favorites
                  </div>
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t border-gray-700 pt-6">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={40} height={40} className="rounded-full" />
                      <div>
                        <div className="text-white font-medium">{user.displayName}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                    <Button 
                      variant="default" 
                      onClick={() => {
                        setIsModalOpen(true);
                        closeMobileMenu();
                      }}
                      className="w-full gradient-primary hover:bg-teal-400 text-white transition-colors"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Video
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full text-white border-gray-600 hover:bg-gray-800"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="default" 
                    onClick={() => {
                      login();
                      closeMobileMenu();
                    }}
                    className="w-full gradient-primary hover:bg-teal-400 text-white transition-colors"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <AddVideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
