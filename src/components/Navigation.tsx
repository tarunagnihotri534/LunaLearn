'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Calendar, Heart, HelpCircle, LogOut, Smile, Users, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const pathname = usePathname();
  const { user, loading, loginAnonymously, logoutUser } = useAuth();
  const [authActionLoading, setAuthActionLoading] = useState(false);

  const handleGetStarted = async () => {
    setAuthActionLoading(true);
    try {
      await loginAnonymously();
    } catch (e) {
      console.error(e);
    } finally {
      setAuthActionLoading(false);
    }
  };

  const navItems = [
    { name: 'Learn', href: '/learn', icon: BookOpen, color: 'hover:text-primary hover:bg-primary-light text-warm-gray' },
    { name: 'Tracker', href: '/tracker', icon: Calendar, color: 'hover:text-primary hover:bg-primary-light text-warm-gray' },
    { name: 'Mood Log', href: '/mood', icon: Smile, color: 'hover:text-primary hover:bg-primary-light text-warm-gray' },
    { name: 'FAQs', href: '/faq', icon: HelpCircle, color: 'hover:text-primary hover:bg-primary-light text-warm-gray' },
    { name: 'Parents', href: '/parents', icon: Users, color: 'hover:text-primary hover:bg-primary-light text-warm-gray' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Desktop Top Navbar */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-soft flex items-center justify-between px-6 md:px-12 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center group-hover:scale-110 transition-soft">
            <Heart className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">
            YouAreOkay
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-soft ${
                  active
                    ? 'bg-primary text-white shadow-bubble'
                    : `text-charcoal/80 ${item.color}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Anonymous Auth Action */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-2 bg-primary-light/80 border border-primary/20 rounded-full py-1.5 pl-3 pr-2 shadow-soft">
              <span className="text-xs font-semibold text-primary flex items-center gap-1.5 select-none">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                {user.username}
              </span>
              <button
                onClick={logoutUser}
                title="Sign out of anonymous session"
                className="p-1 rounded-full text-primary hover:bg-primary/10 transition-soft"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              disabled={authActionLoading}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-semibold shadow-bubble bouncy-hover transition-soft"
            >
              {authActionLoading ? 'Creating Session...' : 'Get Started'}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md border-t border-primary/10 shadow-lg flex items-center justify-around px-2 z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-soft ${
                active
                  ? 'text-primary scale-110'
                  : 'text-warm-gray hover:text-primary/70'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold mt-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navigation;
