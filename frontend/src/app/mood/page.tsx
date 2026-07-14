'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Heart, Sparkles, Smile, Frown, Coffee, Moon, ShieldAlert, Award, SmilePlus } from 'lucide-react';
import gsap from 'gsap';

interface MoodEntry {
  date: string;
  mood: string;
  symptoms: string[];
  note: string;
}

const moods = [
  { id: 'happy', label: 'Happy', emoji: '😄', bg: 'bg-bubble-yellow border-amber-200 text-amber-700' },
  { id: 'calm', label: 'Calm', emoji: '😌', bg: 'bg-bubble-teal border-emerald-200 text-emerald-700' },
  { id: 'tired', label: 'Tired', emoji: '😴', bg: 'bg-bubble-purple border-purple-200 text-purple-700' },
  { id: 'sad', label: 'Sad/Moody', emoji: '😢', bg: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'grumpy', label: 'Grumpy', emoji: '😠', bg: 'bg-bubble-pink border-rose-200 text-rose-700' },
  { id: 'crampy', label: 'Crampy', emoji: '🤕', bg: 'bg-orange-50 border-orange-200 text-orange-700' },
];

const symptomsList = [
  { id: 'cramps', label: 'Tummy Cramps 🤕' },
  { id: 'headache', label: 'Headache 💆‍♀️' },
  { id: 'tiredness', label: 'Feeling Tired 🥱' },
  { id: 'bloating', label: 'Full Tummy 🎈' },
  { id: 'breakout', label: 'Skin Spotting 🌸' },
  { id: 'none', label: 'No Symptoms ✨' },
];

const selfCareChallenges = [
  "Wrap yourself in a warm blanket and read a page of your favorite book. 📖",
  "Sip a comforting mug of warm water, chamomile, or mint tea. 🍵",
  "Close your eyes and take 5 slow, deep breaths. Breathe in comfort, breathe out stress. 💨",
  "Draw a quick, happy doodle on a piece of paper! 🎨",
  "Do some light, gentle tummy stretches to relieve any tightness. 🧘‍♀️",
  "Write down one thing you really like about yourself. 📝",
];

export default function MoodPage() {
  const { user, loginAnonymously } = useAuth();
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Feedback card state
  const [feedback, setFeedback] = useState<{
    message: string;
    challenge: string;
    moodEmoji: string;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedback && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [feedback]);

  const handleSymptomToggle = (id: string) => {
    if (id === 'none') {
      setSelectedSymptoms(['none']);
      return;
    }
    
    setSelectedSymptoms((prev) => {
      const filtered = prev.filter(x => x !== 'none');
      if (filtered.includes(id)) {
        return filtered.filter((x) => x !== id);
      } else {
        return [...filtered, id];
      }
    });
  };

  const getReassuranceMessage = (moodId: string) => {
    switch (moodId) {
      case 'happy':
        return "It's wonderful to feel happy! Your happy energy is like sunshine. Keep shining and sharing your smiles! 🌟";
      case 'calm':
        return "Peaceful and calm is a lovely space to be. It is perfect for resting and listening to what your body needs. 🍃";
      case 'tired':
        return "Your body is working hard growing up! Feeling extra tired is completely normal, especially around your period. Give yourself permission to take a long nap or just rest. 🛌";
      case 'sad':
        return "Changing hormones can make you feel sad, teary, or emotional for no clear reason. This is 100% normal and happens to almost all girls! Be extra kind to yourself today. 🌸";
      case 'grumpy':
        return "Feeling easily annoyed or grumpy is very common. Your body is navigating new hormones. Take a break, listen to your favorite song, and remember this feeling will pass! 💕";
      case 'crampy':
        return "Tummy cramps can be uncomfortable. Try placing a warm hot-water bottle on your stomach, resting on your side with knees curled up, or doing very light stretches. You are so brave! 🤕";
      default:
        return "You are doing amazing. Keep listening to your body and taking care of yourself! 💖";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    setSubmitting(true);
    let activeUser = user;
    if (!activeUser) {
      try {
        activeUser = await loginAnonymously();
      } catch (err) {
        console.error(err);
        setSubmitting(false);
        return;
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const logData = {
      date: todayStr,
      mood: selectedMood,
      symptoms: selectedSymptoms,
      note: note.trim(),
    };

    if (activeUser && !activeUser.isOffline && db) {
      try {
        await addDoc(collection(db, 'users', activeUser.uid, 'moods'), logData);
      } catch (err) {
        console.error("Firestore mood log error:", err);
      }
    } else {
      // LocalStorage save
      try {
        const stored = localStorage.getItem('youareokay_offline_moods') || '[]';
        const parsed = JSON.parse(stored);
        // Remove existing for today if exists, then save
        const filtered = parsed.filter((entry: any) => entry.date !== todayStr);
        filtered.push(logData);
        localStorage.setItem('youareokay_offline_moods', JSON.stringify(filtered));
      } catch (err) {
        console.error("LocalStorage mood log error:", err);
      }
    }

    // Set comforting feedback content
    const moodObj = moods.find(m => m.id === selectedMood);
    const randomChallenge = selfCareChallenges[Math.floor(Math.random() * selfCareChallenges.length)];
    
    setFeedback({
      message: getReassuranceMessage(selectedMood),
      challenge: randomChallenge,
      moodEmoji: moodObj?.emoji || '🌸',
    });

    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 select-none">
      <div className="max-w-4xl w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-fredoka text-3xl md:text-5xl font-bold text-charcoal">
            Daily Feelings Check-In 🌸
          </h1>
          <p className="text-base md:text-lg text-warm-gray font-medium max-w-xl mx-auto">
            How are you feeling physically and emotionally today? Share it privately and receive a warm hug from YouAreOkay.
          </p>
        </div>

        {/* Form and Feedback Split */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          
          {/* Check-In Form (3/5 width on desktop) */}
          <form onSubmit={handleSubmit} className="md:col-span-3 bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
            
            {/* Step 1: Mood select */}
            <div className="space-y-3">
              <label className="font-fredoka text-lg font-bold text-charcoal flex items-center gap-1.5">
                <Smile className="w-5 h-5 text-primary" />
                1. How is your mood today?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedMood(m.id);
                      setFeedback(null); // Clear previous feedback on selection change
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-1 transition-all bouncy-hover ${
                      selectedMood === m.id
                        ? `${m.bg} scale-102`
                        : 'bg-white border-primary/10 hover:border-primary/20 text-warm-gray'
                    }`}
                  >
                    <span className="text-3xl">{m.emoji}</span>
                    <span className="text-xs font-fredoka font-bold">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Physical symptoms */}
            <div className="space-y-3">
              <label className="font-fredoka text-lg font-bold text-charcoal flex items-center gap-1.5">
                <Heart className="w-5 h-5 text-primary fill-primary/10" />
                2. Do you have any physical symptoms? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {symptomsList.map((sym) => {
                  const active = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => handleSymptomToggle(sym.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-fredoka font-bold text-center transition-soft ${
                        active
                          ? 'bg-primary text-white border-primary shadow-soft'
                          : 'bg-white text-warm-gray border-primary/15 hover:border-primary/30'
                      }`}
                    >
                      {sym.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Journal Note */}
            <div className="space-y-3">
              <label className="font-fredoka text-lg font-bold text-charcoal flex items-center gap-1.5">
                <SmilePlus className="w-5 h-5 text-primary" />
                3. Private Journal note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-cream/50 border border-primary/10 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary resize-none"
                placeholder="Write down any thoughts. Everything stays private on your device."
              />
            </div>

            <button
              type="submit"
              disabled={!selectedMood || submitting}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/40 text-white py-3 rounded-full font-fredoka text-sm font-bold shadow-bubble bouncy-hover transition-soft"
            >
              {submitting ? 'Saving Check-In...' : 'Save and Get Reassurance'}
            </button>
          </form>

          {/* Reassurance Response Card (2/5 width on desktop) */}
          <div className="md:col-span-2 space-y-6">
            {feedback ? (
              <div
                ref={cardRef}
                className="bg-white border border-primary/15 rounded-3xl p-6 md:p-8 shadow-soft space-y-6 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-bubble-purple to-accent"></div>
                
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto text-4xl shadow-soft">
                  {feedback.moodEmoji}
                </div>

                <div className="space-y-3">
                  <h3 className="font-fredoka text-xl font-bold text-charcoal">
                    YouAreOkay's Warm Hug 💖
                  </h3>
                  <p className="text-xs md:text-sm text-warm-gray font-semibold leading-relaxed">
                    {feedback.message}
                  </p>
                </div>

                <div className="bg-bubble-teal/20 border border-accent/25 rounded-2xl p-5 text-left space-y-2.5">
                  <span className="font-fredoka text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4 fill-emerald-600/10" />
                    Today's Self-Care Challenge
                  </span>
                  <p className="text-xs text-warm-gray font-medium leading-relaxed">
                    {feedback.challenge}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/40 border border-dashed border-primary/20 rounded-3xl p-8 text-center space-y-4">
                <span className="text-5xl block animate-bounce">💌</span>
                <h3 className="font-fredoka text-lg font-bold text-charcoal/70">
                  Waiting for your check-in...
                </h3>
                <p className="text-xs text-warm-gray font-medium leading-relaxed max-w-xs mx-auto">
                  Fill out the form on the left and submit it to unlock your personalized self-care tip and reassurance note.
                </p>
              </div>
            )}
            
            {/* Safe Helpline/Discussions card */}
            <div className="bg-white border border-primary/10 rounded-3xl p-5 space-y-3 shadow-soft">
              <h4 className="font-fredoka text-sm font-bold text-charcoal flex items-center gap-1.5">
                🌸 Need to talk to someone?
              </h4>
              <p className="text-xs text-warm-gray leading-relaxed font-semibold">
                If you ever feel very anxious, confused, or physically unwell, it is always a good idea to chat with a trusted adult like a parent, school counselor, teacher, or older sibling. They care about you and can help you feel better!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
