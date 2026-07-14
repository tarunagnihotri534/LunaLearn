'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Info, Sparkles, ShowerHead, BookOpen, Droplet, Shield, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<'basics' | 'hygiene' | 'myths'>('basics');
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate tab content switches
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 select-none">
      <div className="max-w-4xl w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal">
            Educational Center
          </h1>
          <p className="text-base md:text-lg text-warm-gray font-medium max-w-xl mx-auto">
            Everything you need to know about periods, hygiene, and growing up in a friendly, easy-to-understand way.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-white/60 p-1.5 rounded-2xl border border-primary/10 max-w-lg mx-auto shadow-soft">
          <button
            onClick={() => setActiveTab('basics')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-soft ${
              activeTab === 'basics'
                ? 'bg-primary text-white shadow-soft'
                : 'text-warm-gray hover:text-primary'
            }`}
          >
            The Basics
          </button>
          <button
            onClick={() => setActiveTab('hygiene')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-soft ${
              activeTab === 'hygiene'
                ? 'bg-primary text-white shadow-soft'
                : 'text-warm-gray hover:text-primary'
            }`}
          >
            Hygiene & Care
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-soft ${
              activeTab === 'myths'
                ? 'bg-primary text-white shadow-soft'
                : 'text-warm-gray hover:text-primary'
            }`}
          >
            Myths vs Facts
          </button>
        </div>

        {/* Active Tab Content container */}
        <div ref={tabContentRef} className="w-full">
          {activeTab === 'basics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basics Left / Intro */}
              <div className="md:col-span-2 bg-white border border-primary/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-soft">
                <div className="space-y-3">
                  <span className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 fill-primary/15" />
                    How the Body Grows
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
                    What is a Period?
                  </h2>
                  <p className="text-sm md:text-base text-warm-gray font-medium leading-relaxed">
                    A period (also called <strong>menstruation</strong>) is when a small amount of blood and soft tissue gently flows out of the vagina. It happens once a month for most girls and women. It is a completely natural part of growing up, showing that your body is developing beautifully and healthily!
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-charcoal">
                    Why do periods happen?
                  </h3>
                  <p className="text-sm md:text-base text-warm-gray font-medium leading-relaxed">
                    Inside your body is a cozy place called the <strong>uterus</strong> (womb). Every month, the uterus prepares a tiny, soft lining—like a fluffy cushion. If your body doesn't need this cushion (which is most of the time when you are young), the uterus gently washes it away. That lining is what leaves the body as a period.
                  </p>
                </div>

                <div className="bg-bubble-pink/30 border border-primary/10 rounded-2xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-primary flex items-center gap-2">
                    <Info className="w-5 h-5 shrink-0" />
                    What is normal?
                  </h4>
                  <ul className="text-xs md:text-sm text-warm-gray font-semibold space-y-1.5 list-disc list-inside">
                    <li>Your first period might only last a few days or up to a week.</li>
                    <li>The color can be bright red, pinkish, or even dark brown.</li>
                    <li>For the first few years, your cycle might be irregular (it might skip months or happen at different times). This is completely normal!</li>
                  </ul>
                </div>
              </div>

              {/* Basics Right / Visual Card */}
              <div className="bg-white border border-primary/10 rounded-3xl p-6 shadow-soft flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-36 h-36 rounded-full bg-bubble-pink flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary/40 animate-pulse" />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-soft">
                    <Droplet className="w-5 h-5 text-primary fill-primary/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-charcoal">
                    Every Body is Unique
                  </h3>
                  <p className="text-xs md:text-sm text-warm-gray font-medium leading-relaxed">
                    Most girls get their first period between ages 9 and 15. There is no "perfect" age. Whenever your body is ready, that is the perfect time for you!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hygiene' && (
            <div className="space-y-8">
              {/* Hygiene Products Section */}
              <div className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary shrink-0" /> Hygiene Products for Beginners
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* CSS Pad Illustration and info */}
                  <div className="flex flex-col sm:flex-row gap-6 items-center bg-bubble-pink/20 p-5 rounded-2xl border border-primary/5">
                    <div className="pad-illustration shrink-0">
                      <div className="pad-wing-left"></div>
                      <div className="pad-wing-right"></div>
                      <div className="w-full h-full rounded-[27px] border-dashed border-2 border-primary/20 flex flex-col items-center justify-center text-center text-xs text-primary/60">
                        <span>Soft &</span>
                        <span>Cozy</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-primary">Sanitary Pads</h4>
                      <p className="text-xs md:text-sm text-warm-gray font-medium leading-relaxed">
                        Pads are the easiest option when starting! They are soft cotton layers that stick inside your underwear to catch the period flow. They come in different sizes: "panty liners" for light days, and thicker "maxi pads" or "overnight pads" for heavier days.
                      </p>
                    </div>
                  </div>

                  {/* Hygiene habits list */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-charcoal">Daily Care Guide</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-bubble-purple flex items-center justify-center shrink-0 text-secondary-hover">
                          <Clock className="w-4 h-4 text-secondary-hover" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-charcoal">Change regularly</h5>
                          <p className="text-xs text-warm-gray font-medium">Change your pad every 4 to 6 hours to feel fresh and avoid leaks, even if it isn't full.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-bubble-teal flex items-center justify-center shrink-0 text-emerald-600">
                          <Trash2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-charcoal">Wrap and toss</h5>
                          <p className="text-xs text-warm-gray font-medium">Fold the used pad, wrap it in toilet paper (or its wrapper), and throw it in the trash. Never flush pads down the toilet!</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-bubble-yellow flex items-center justify-center shrink-0 text-amber-600">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-charcoal">Wash hands</h5>
                          <p className="text-xs text-warm-gray font-medium">Always wash your hands with soap before and after changing your hygiene product.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Banner */}
              <div className="bg-bubble-teal/30 border border-accent/20 rounded-3xl p-6 shadow-soft flex flex-col sm:flex-row gap-4 items-center">
                <ShowerHead className="w-10 h-10 text-emerald-600 shrink-0" />
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-lg font-bold text-charcoal">Bathing & Freshness</h4>
                  <p className="text-xs md:text-sm text-warm-gray font-medium">
                    Taking a regular bath or shower during your period is perfectly safe and actually helps you feel fresh, relaxed, and can soothe cramps! Use mild soap and warm water only.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'myths' && (
            <div className="space-y-6">
              {/* Myth/Fact Grid */}
              {[
                {
                  myth: "Everyone will be able to see that I am on my period.",
                  fact: "Nobody can tell! Period pads are designed to fit discreetly inside your underwear. Unless you choose to tell your friends, it is your private secret.",
                },
                {
                  myth: "I can't take a bath, swim, or play sports.",
                  fact: "You absolutely can! Swimming (using a tampon or menstrual cup) and physical exercise are perfectly fine. Moving around can actually help release natural happy chemicals in your body to reduce tummy aches.",
                },
                {
                  myth: "A period means I am sick or injured.",
                  fact: "No! Period blood is not from a cut or injury. It is just your body cleaning out the cushion lining that it didn't use. It is a sign that your body is strong, healthy, and growing up normally.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-primary/10 rounded-3xl p-6 shadow-soft space-y-4 hover:scale-[1.01] transition-soft">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
                    <XCircle className="w-5 h-5 shrink-0" />
                    Myth: "{item.myth}"
                  </div>
                  <div className="pl-7 border-l-2 border-emerald-300 flex items-start gap-2.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-lg block text-emerald-600 mb-1">Fact:</span>
                      <p className="text-xs md:text-sm text-warm-gray font-medium leading-relaxed">{item.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Book Reading Card */}
        <div className="bg-gradient-to-br from-bubble-pink via-white to-bubble-purple rounded-3xl p-6 md:p-8 shadow-soft border border-primary/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-primary/5 pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-primary-light rounded-3xl flex items-center justify-center shadow-bubble shrink-0">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                <Sparkles className="w-3.5 h-3.5" /> Featured Reading
              </p>
              <h3 className="text-2xl font-bold text-charcoal">
                The Period Book
              </h3>
              <p className="text-sm text-warm-gray font-medium leading-relaxed max-w-lg">
                A friendly, chapter-by-chapter guide through puberty, periods, hygiene, emotions, and growing up — written by Karen Gravelle. 7 easy chapters, perfect for reading at your own pace.
              </p>
            </div>
            <Link
              href="/book"
              id="read-book-link"
              className="bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-full font-bold text-base shadow-bubble bouncy-hover transition-soft shrink-0 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Start Reading
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
