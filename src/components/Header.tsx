
'use client';

import { useAuth } from '@/context/AuthContext';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useCurrentPath } from '@/hooks/useCurrentPath';

export function Header() {
  const { user, login, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isHome, isTopVoted, isFavorites } = useCurrentPath();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 relative bg-card border-b">
        {/* Logo */}
        <div className="flex items-center pl-5 gap-3">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            className="rounded-lg"
          />
          <div className="text-xl md:text-2xl font-bold text-foreground">Guidelines</div>
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-foreground cursor-pointer hover:text-muted-foreground">
              <span className={isHome ? "text-primary" : "text-foreground"}>Explore</span>
            </Button>
          </Link>
          <Link href="/top-voted">
            <Button variant="ghost" className="text-foreground cursor-pointer hover:text-muted-foreground">
              <span className={isTopVoted ? "text-primary" : "text-foreground"}>Top Voted</span>
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="ghost" className="text-foreground cursor-pointer hover:text-muted-foreground">
              <span className={isFavorites ? "text-primary" : "text-foreground"}>My Favorites</span>
            </Button>
          </Link>
        </div>
        
        {/* Desktop User Actions - hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={32} height={32} className="rounded-full" />
              <span className="text-foreground">{user.displayName}</span>
              <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground cursor-pointer hover:text-foreground">
                <LogOut />
              </Button>
            </div>
          ) : (
            <Button variant="secondary" onClick={login} className="bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
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
          className="md:hidden text-foreground hover:text-muted-foreground"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/50" onClick={closeMobileMenu}>
          <div className="absolute right-0 top-0 h-full w-80 bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
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
                  <div className="text-lg font-bold text-foreground">Guidelines</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="text-foreground hover:text-muted-foreground"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-8">
                <Link href="/" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isHome ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-muted'}`}>
                    Explore
                  </div>
                </Link>
                <Link href="/top-voted" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isTopVoted ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-muted'}`}>
                    Top Voted
                  </div>
                </Link>
                <Link href="/favorites" onClick={closeMobileMenu}>
                  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${isFavorites ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-muted'}`}>
                    My Favorites
                  </div>
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="border-t border-border pt-6">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Image src={user.photoURL || '/default-avatar.png'} alt={user.displayName || 'User'} width={40} height={40} className="rounded-full" />
                      <div>
                        <div className="text-foreground font-medium">{user.displayName}</div>
                        <div className="text-muted-foreground text-sm">{user.email}</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full text-foreground border-border hover:bg-muted"
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
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
    </>
  );
}
