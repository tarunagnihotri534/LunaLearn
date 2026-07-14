'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Calendar as CalendarIcon, Info, Plus, Trash2, ChevronLeft, ChevronRight, HelpCircle, Heart } from 'lucide-react';

interface PeriodLog {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string | null; // YYYY-MM-DD
  flow: 'light' | 'medium' | 'heavy';
  notes: string;
}

export default function TrackerPage() {
  const { user, loginAnonymously, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<PeriodLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Calendar states
  const [currentDate, setCurrentDate] = useState(new Date());

  // Load period logs
  useEffect(() => {
    if (authLoading) return;

    const fetchLogs = async () => {
      setLoading(true);
      if (user && !user.isOffline && db) {
        try {
          const q = query(collection(db, 'users', user.uid, 'periods'), orderBy('startDate', 'desc'));
          const snap = await getDocs(q);
          const loadedLogs: PeriodLog[] = [];
          snap.forEach((docSnap) => {
            const data = docSnap.data();
            loadedLogs.push({
              id: docSnap.id,
              startDate: data.startDate,
              endDate: data.endDate || null,
              flow: data.flow || 'medium',
              notes: data.notes || '',
            });
          });
          setLogs(loadedLogs);
        } catch (e) {
          console.error("Error loading period logs from Firestore:", e);
        }
      } else {
        // Load from LocalStorage
        try {
          const stored = localStorage.getItem('youareokay_offline_periods');
          if (stored) {
            setLogs(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Error loading offline period logs:", e);
        }
      }
      setLoading(false);
    };

    fetchLogs();
  }, [user, authLoading]);

  // Handle anonymous signup if user opens tracker without session
  const handleAutoSignup = async () => {
    try {
      await loginAnonymously();
    } catch (e) {
      console.error("Auto login failed:", e);
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startDate) {
      setError('Please choose a start date.');
      return;
    }

    if (endDate && endDate < startDate) {
      setError('The end date cannot be before the start date.');
      return;
    }

    let activeUser = user;
    if (!activeUser) {
      try {
        activeUser = await loginAnonymously();
      } catch (err) {
        setError('Could not establish a secure session. Please try again.');
        return;
      }
    }

    const newLogData = {
      startDate,
      endDate: endDate || null,
      flow,
      notes: notes.trim(),
    };

    if (activeUser && !activeUser.isOffline && db) {
      try {
        const docRef = await addDoc(collection(db, 'users', activeUser.uid, 'periods'), newLogData);
        setLogs((prev) => [{ id: docRef.id, ...newLogData }, ...prev]);
      } catch (err) {
        console.error("Error saving log to Firebase:", err);
        setError('Failed to save data. Try again.');
        return;
      }
    } else {
      // LocalStorage save
      const localId = 'local-period-' + Math.random().toString(36).substring(2, 9);
      const newLog = { id: localId, ...newLogData };
      const updated = [newLog, ...logs].sort((a, b) => b.startDate.localeCompare(a.startDate));
      localStorage.setItem('youareokay_offline_periods', JSON.stringify(updated));
      setLogs(updated);
    }

    // Reset Form
    setStartDate('');
    setEndDate('');
    setFlow('medium');
    setNotes('');
  };

  const handleDeleteLog = async (id: string) => {
    if (!user) return;

    if (!user.isOffline && db) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'periods', id));
        setLogs((prev) => prev.filter((log) => log.id !== id));
      } catch (err) {
        console.error("Error deleting log:", err);
      }
    } else {
      // LocalStorage delete
      const updated = logs.filter((log) => log.id !== id);
      localStorage.setItem('youareokay_offline_periods', JSON.stringify(updated));
      setLogs(updated);
    }
  };

  // Custom Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper to check if a day is marked as period
  const getDayStatus = (dayNum: number) => {
    const formattedDay = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    
    for (const log of logs) {
      if (log.startDate === formattedDay) return 'start';
      if (log.endDate === formattedDay) return 'end';
      if (log.endDate && formattedDay > log.startDate && formattedDay < log.endDate) return 'during';
      if (!log.endDate && log.startDate === formattedDay) return 'start';
    }
    return null;
  };

  // Cycle Estimation Logic
  const calculateCycleInfo = () => {
    if (logs.length < 2) return null;
    
    // Sort logs ascending
    const sorted = [...logs].sort((a, b) => a.startDate.localeCompare(b.startDate));
    let totalDays = 0;
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i - 1].startDate);
      const currDate = new Date(sorted[i].startDate);
      const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalDays += diffDays;
    }
    
    const averageCycleLength = Math.round(totalDays / (sorted.length - 1));
    
    // Get last start date
    const lastStart = new Date(sorted[sorted.length - 1].startDate);
    const nextEstimatedStart = new Date(lastStart);
    nextEstimatedStart.setDate(lastStart.getDate() + averageCycleLength);
    
    return {
      averageLength: averageCycleLength,
      nextDate: nextEstimatedStart.toISOString().split('T')[0],
    };
  };

  const cycleInfo = calculateCycleInfo();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 select-none">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Explanations */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-primary/10 rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="font-fredoka text-2xl font-bold text-charcoal flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-primary" />
              Log Your Dates
            </h2>
            <p className="text-xs text-warm-gray font-medium leading-relaxed">
              Logging is private. Keep track of when your period started and ended to help see patterns.
            </p>

            {!user && (
              <div className="bg-bubble-pink/20 border border-primary/5 rounded-2xl p-4 text-center space-y-3">
                <p className="text-xs text-warm-gray font-semibold">
                  You are tracking offline. Create a secure anonymous profile to sync your data.
                </p>
                <button
                  onClick={handleAutoSignup}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-fredoka font-bold py-2 px-4 rounded-full transition-soft"
                >
                  Create Session
                </button>
              </div>
            )}

            <form onSubmit={handleAddLog} className="space-y-4">
              {error && (
                <div className="text-xs text-red-500 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-xs font-fredoka font-bold text-charcoal">When did it start?</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-cream/50 border border-primary/10 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-fredoka font-bold text-charcoal">When did it end? (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-cream/50 border border-primary/10 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  placeholder="Still bleeding"
                />
                <span className="text-[10px] text-warm-gray/70">Leave blank if it's still ongoing!</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-fredoka font-bold text-charcoal">How was the flow?</label>
                <div className="flex gap-2">
                  {(['light', 'medium', 'heavy'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFlow(level)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-fredoka font-bold border transition-soft capitalize ${
                        flow === level
                          ? 'bg-primary text-white border-primary shadow-soft'
                          : 'bg-white text-warm-gray border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-fredoka font-bold text-charcoal">Notes / Symptoms (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-cream/50 border border-primary/10 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-primary resize-none"
                  placeholder="e.g. Cramps on day 1, tired."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-full font-fredoka text-sm font-bold shadow-bubble transition-soft flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Save Entry
              </button>
            </form>
          </div>

          {/* Teen cycles educational tips */}
          <div className="bg-bubble-teal/30 border border-accent/20 rounded-3xl p-5 space-y-3 shadow-soft">
            <h4 className="font-fredoka text-base font-bold text-charcoal flex items-center gap-1.5">
              <Info className="w-5 h-5 text-emerald-600 shrink-0" />
              Teens & Irregular Periods
            </h4>
            <p className="text-xs text-warm-gray leading-relaxed font-semibold">
              When you first start your period, your body is still adjusting! It is very common for cycles to be irregular. A period might arrive in 21 days, 45 days, or even skip a month. That is completely normal and does not mean anything is wrong.
            </p>
          </div>
        </div>

        {/* Right Column: Custom Calendar & History list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Calendar Card */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 shadow-soft space-y-6">
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between border-b border-primary/5 pb-4">
              <h3 className="font-fredoka text-xl font-bold text-charcoal flex items-center gap-1.5">
                📅 {monthNames[month]} {year}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-primary/10 hover:bg-primary-light text-primary transition-soft"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-primary/10 hover:bg-primary-light text-primary transition-soft"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-xs font-fredoka font-bold text-warm-gray/60 py-1">
                  {d}
                </div>
              ))}

              {/* Blank spacers for start alignment */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="py-2"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const status = getDayStatus(dayNum);
                
                let highlightClass = "";
                if (status === 'start') highlightClass = "bg-primary text-white rounded-l-full rounded-r-none font-bold";
                else if (status === 'end') highlightClass = "bg-primary text-white rounded-r-full rounded-l-none font-bold";
                else if (status === 'during') highlightClass = "bg-bubble-pink text-primary font-semibold";
                
                return (
                  <div
                    key={`day-${dayNum}`}
                    className={`py-2 text-xs md:text-sm font-medium relative flex items-center justify-center transition-soft select-none ${highlightClass} ${
                      !status ? 'hover:bg-primary-light hover:text-primary rounded-full cursor-pointer' : ''
                    }`}
                    onClick={() => {
                      if (!status) {
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                        setStartDate(dateStr);
                      }
                    }}
                  >
                    <span>{dayNum}</span>
                    {/* Small dot for flow level */}
                    {status === 'start' && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Color Legend */}
            <div className="flex gap-4 text-xs font-fredoka font-semibold justify-center pt-2 border-t border-primary/5">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-primary rounded-full"></span>
                <span>Start/End Day</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 bg-bubble-pink rounded-full"></span>
                <span>Period Days</span>
              </div>
            </div>
          </div>

          {/* Guidelines and estimation banner */}
          {cycleInfo && (
            <div className="bg-bubble-purple border border-secondary/20 rounded-3xl p-6 shadow-soft flex items-center gap-4 hover:scale-[1.01] transition-soft bouncy-hover">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-soft">
                <Heart className="w-6 h-6 text-secondary-hover fill-secondary-hover/10" />
              </div>
              <div className="space-y-1">
                <h4 className="font-fredoka text-lg font-bold text-charcoal">Estimated Next Period</h4>
                <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-semibold">
                  Based on your average cycle of <strong>{cycleInfo.averageLength} days</strong>, your next period might start around <strong>{cycleInfo.nextDate}</strong>.
                  <br />
                  <span className="text-[10px] text-warm-gray/70 italic">*Note: This is a rough estimation. Adolescents often skip weeks, which is healthy and normal.</span>
                </p>
              </div>
            </div>
          )}

          {/* Period History Log List */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="font-fredoka text-lg font-bold text-charcoal">History Log</h3>
            
            {loading ? (
              <div className="text-center py-6 text-xs text-warm-gray font-semibold">Loading logs...</div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 text-xs text-warm-gray/60 font-semibold border-2 border-dashed border-primary/5 rounded-2xl">
                No logs recorded yet. Use the form on the left to add your first period dates!
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div key={log.id} className="flex justify-between items-center bg-cream/40 border border-primary/5 rounded-2xl p-4 hover:scale-[1.005] transition-soft shadow-soft">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary-light text-primary font-bold font-fredoka px-2 py-0.5 rounded-full capitalize">
                          {log.flow} Flow
                        </span>
                        <span className="text-[10px] text-warm-gray/60 font-semibold">
                          Saved ID: {log.id.slice(0,6)}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal font-semibold">
                        {log.startDate} {log.endDate ? `to ${log.endDate}` : '(ongoing)'}
                      </p>
                      {log.notes && (
                        <p className="text-xs text-warm-gray/80 italic font-medium">"{log.notes}"</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-2 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 transition-soft shrink-0"
                      title="Delete log"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
