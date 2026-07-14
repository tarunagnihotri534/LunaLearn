'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, HelpCircle, Smile, Heart, Sparkles, Users, BookMarked } from 'lucide-react';
import gsap from 'gsap';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // Set attribute programmatically for browser compliance
      videoRef.current.setAttribute('muted', '');
      videoRef.current.play().catch((err) => {
        console.warn("Video auto-play failed, browser might require user interaction first:", err);
      });
    }
  }, []);

  useEffect(() => {
    // Basic GSAP entrance animations
    const ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // Staggered slide up for cards
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 0.4,
          }
        );
      }

      // Continuous floating animation for background decorative bubbles
      gsap.to('.bubble-1', {
        y: -15,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
      gsap.to('.bubble-2', {
        y: 20,
        x: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      name: 'Educational Hub',
      desc: 'Learn what periods are, why they happen, and basic hygiene in a simple, friendly way.',
      icon: BookOpen,
      href: '/learn',
      color: 'bg-bubble-pink text-primary border-primary/10',
      iconBg: 'bg-white',
    },
    {
      name: 'Cozy Tracker',
      desc: 'A simple, stress-free calendar to log your dates without complicated medical math.',
      icon: Calendar,
      href: '/tracker',
      color: 'bg-bubble-purple text-secondary-hover border-secondary/15',
      iconBg: 'bg-white',
    },
    {
      name: 'Mood Journal',
      desc: 'Log how you feel today and receive a warm, comforting note built just for you.',
      icon: Smile,
      href: '/mood',
      color: 'bg-bubble-teal text-emerald-600 border-accent/20',
      iconBg: 'bg-white',
    },
    {
      name: 'Friendly FAQs',
      desc: 'Get helpful, straightforward answers to questions girls often have about periods.',
      icon: HelpCircle,
      href: '/faq',
      color: 'bg-bubble-yellow text-amber-600 border-amber-200/50',
      iconBg: 'bg-white',
    },
    {
      name: 'The Period Book',
      desc: 'Read 7 friendly chapters from "The Period Book" — your personal guide through puberty.',
      icon: BookMarked,
      href: '/book',
      color: 'bg-bubble-pink text-primary border-primary/15',
      iconBg: 'bg-white',
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 md:py-16 overflow-hidden select-none"
    >
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="/7719713-hd_2048_1080_25fps.mp4" type="video/mp4" />
        </video>
        {/* Minimal edge overlay for text legibility */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* Background Decorative Bubbles */}
      <div className="bubble-1 absolute top-20 left-[10%] w-24 h-24 rounded-full bg-bubble-pink/40 blur-sm pointer-events-none z-0"></div>
      <div className="bubble-2 absolute bottom-20 right-[8%] w-32 h-32 rounded-full bg-bubble-purple/30 blur-md pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-[85%] w-16 h-16 rounded-full bg-bubble-teal/40 blur-sm pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-12 z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-light border border-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-semibold tracking-wide shadow-soft">
            <Sparkles className="w-4 h-4 fill-primary/10 animate-pulse" />
            Your Private, Friendly Comfort Space
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Growing up is a beautiful{' '}
            <span className="text-primary underline decoration-bubble-pink decoration-wavy decoration-3 underline-offset-8">
              journey
            </span>
          </h1>
          <p className="text-lg md:text-xl text-warm-gray font-medium leading-relaxed max-w-2xl mx-auto">
            YouAreOkay is here to help you understand your body, handle changes with confidence, and feel completely supported every single day.
          </p>
        </div>

        {/* Cozy Reassurance Greeting Banner */}
        <div className="w-full max-w-3xl bg-white border border-primary/15 rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden flex flex-col md:flex-row items-center gap-6 text-left hover:scale-[1.01] transition-soft bouncy-hover">
          <div className="absolute top-0 right-0 w-24 h-24 bg-bubble-pink/20 rounded-bl-full pointer-events-none"></div>
          <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
            <Heart className="w-8 h-8 text-primary fill-primary/10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-charcoal">
              A Quick Reminder For You...
            </h3>
            <p className="text-sm md:text-base text-warm-gray leading-relaxed font-medium">
              You are amazing, your body is doing exactly what it's supposed to do, and there is absolutely nothing to fear. Periods are natural, healthy, and a sign of growing up!
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.name}
                href={feat.href}
                className={`group flex items-start gap-5 p-6 rounded-3xl border text-left bg-white shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-black/5 group-hover:scale-115 transition-soft ${feat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-charcoal group-hover:text-primary transition-soft flex items-center gap-1.5">
                    {feat.name}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Informative Section Link (Parents) */}
        <div className="pt-6">
          <Link
            href="/parents"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover bg-primary-light/50 border border-primary/10 hover:border-primary/20 px-6 py-2.5 rounded-full transition-soft"
          >
            <Users className="w-4 h-4" />
            Are you a parent, guardian, or teacher? Read our Guide
          </Link>
        </div>
        
      </div>
    </div>
  );
}
