'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, MessageSquare, User, MapPin, Bell } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Neighbourly</span>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className={`flex items-center gap-2 transition-colors ${pathname === '/dashboard' ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'}`}>
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link href="/marketplace" className={`flex items-center gap-2 transition-colors ${pathname === '/marketplace' ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'}`}>
                <ShoppingBag className="w-5 h-5" />
                <span>Marketplace</span>
              </Link>
              <Link href="/messages" className={`flex items-center gap-2 transition-colors ${pathname === '/messages' ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'}`}>
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login" className="btn-secondary py-2">
                Log In
              </Link>
              <Link href="/auth/signup" className="btn-primary py-2">
                Join
              </Link>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <>
                <button className="p-2 rounded-full hover:bg-background transition-colors">
                  <Bell className="w-5 h-5 text-text-secondary" />
                </button>
                <Link href="/profile" className="p-1 border-2 border-transparent hover:border-primary rounded-full transition-all">
                  <div className="w-10 h-10 bg-primaryLight rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
