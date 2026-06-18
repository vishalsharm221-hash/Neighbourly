'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  ShoppingBag,
  Briefcase,
  Calendar,
  MessageSquare,
  Bell,
  User,
  MapPin,
  Store
} from 'lucide-react';

interface SidebarItem {
  label: string;
  icon: React.FC<any>;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Communities', icon: Users, href: '/communities' },
  { label: 'Marketplace', icon: ShoppingBag, href: '/marketplace' },
  { label: 'Services', icon: Briefcase, href: '/services' },
  { label: 'Businesses', icon: Store, href: '/businesses' },
  { label: 'Jobs', icon: Briefcase, href: '/jobs' },
  { label: 'Events', icon: Calendar, href: '/events' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen bg-white border-r border-border-light shadow-sidebar fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border-light">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-text">Neighbourly</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Location Context */}
      <div className="p-4 border-t border-border-light">
        <div className="bg-surface rounded-xl p-4">
          <p className="text-xs font-medium text-text-muted uppercase mb-2">Your Neighborhood</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-primary-600" />
            <span>Delhi &gt; Rohini &gt; Sector 24</span>
          </div>
        </div>
      </div>
    </aside>
  );
};