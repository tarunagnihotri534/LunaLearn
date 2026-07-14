'use client';

import React from 'react';
import { Heart, Users, MessageCircle, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function ParentsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 select-none">
      <div className="max-w-4xl w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-secondary/30 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary-hover text-sm font-semibold tracking-wide shadow-soft">
            <Users className="w-4 h-4" />
            Support & Guidance Library
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-charcoal">
            Guide for Parents & Teachers
          </h1>
          <p className="text-base md:text-lg text-warm-gray font-medium max-w-xl mx-auto">
            Practical advice on how to support young girls through their first menstruation with positivity, comfort, and zero shame.
          </p>
        </div>

        {/* Core Guide Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: How to Talk */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-4 hover:scale-[1.005] transition-soft">
            <div className="w-12 h-12 rounded-2xl bg-bubble-pink text-primary flex items-center justify-center shadow-soft">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal">Starting the Conversation</h3>
            <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-semibold">
              Don't wait for them to ask! Start talking about periods before they get their first one. Frame it as an exciting, healthy milestone of growing up.
            </p>
            <ul className="text-xs text-warm-gray font-semibold space-y-2 list-disc list-inside bg-cream/40 p-4 rounded-xl border border-primary/5">
              <li>Use simple, accurate terminology (uterus, vagina, lining).</li>
              <li>Keep it relaxed—chat while driving or cooking to lessen intensity.</li>
              <li>Share your own stories or memories to normalize the experience.</li>
              <li>Reassure them that they can ask you anything at any time.</li>
            </ul>
          </div>

          {/* Card 2: Period Kit */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-4 hover:scale-[1.005] transition-soft">
            <div className="w-12 h-12 rounded-2xl bg-bubble-purple text-secondary-hover flex items-center justify-center shadow-soft">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal">Assembling a Period Kit</h3>
            <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-semibold">
              Help them prepare a small, cute cosmetic pouch to keep in their school backpack. Knowing they have supplies reduces anxiety immensely.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-warm-gray font-semibold bg-cream/40 p-4 rounded-xl border border-primary/5">
              <div className="flex items-center gap-1.5">• 2-3 Regular Pads</div>
              <div className="flex items-center gap-1.5">• Spare Underwear</div>
              <div className="flex items-center gap-1.5">• Flushable Wipes</div>
              <div className="flex items-center gap-1.5">• A small zip-lock bag</div>
              <div className="col-span-2 text-[10px] text-warm-gray/70 mt-1.5 italic">
                *The zip-lock bag is for carrying any soiled underwear home safely.
              </div>
            </div>
          </div>

          {/* Card 3: Emotional Support */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-4 hover:scale-[1.005] transition-soft">
            <div className="w-12 h-12 rounded-2xl bg-bubble-teal text-emerald-600 flex items-center justify-center shadow-soft">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal">Nurturing Confidence</h3>
            <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-semibold">
              Adolescence is a time of vulnerability. Help separate biological changes from social stigma or embarrassment.
            </p>
            <ul className="text-xs text-warm-gray font-semibold space-y-2 list-disc list-inside bg-cream/40 p-4 rounded-xl border border-primary/5">
              <li>Address myths actively (e.g. assure them they aren't dirty).</li>
              <li>Discuss physical symptoms (cramps, fatigue) as normal muscle tasks.</li>
              <li>Dismantle secrecy: talk about periods openly around male family members to prevent double standards.</li>
            </ul>
          </div>

          {/* Card 4: Medical Indicators */}
          <div className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-4 hover:scale-[1.005] transition-soft">
            <div className="w-12 h-12 rounded-2xl bg-bubble-yellow text-amber-600 flex items-center justify-center shadow-soft">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-charcoal">When to Consult a Doctor</h3>
            <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-semibold">
              While irregular cycles are normal in the first few years, keep an eye out for indicators that require professional consultation:
            </p>
            <ul className="text-xs text-warm-gray font-semibold space-y-2 list-disc list-inside bg-cream/40 p-4 rounded-xl border border-primary/5">
              <li>Severe cramps that do not improve with warmth or over-the-counter relief.</li>
              <li>Bleeding that is extremely heavy (needing to change a pad every hour).</li>
              <li>Periods that last longer than 7 consecutive days.</li>
              <li>Having no period by age 15.</li>
            </ul>
          </div>

        </div>

        {/* Global Medical Disclaimer Box */}
        <div className="bg-bubble-pink/30 border border-primary/15 rounded-3xl p-6 shadow-soft flex items-start gap-4 hover:scale-[1.01] transition-soft bouncy-hover">
          <Heart className="w-6 h-6 text-primary fill-primary/10 shrink-0 mt-1" />
          <div className="space-y-1.5 text-left">
            <h4 className="text-base font-bold text-charcoal">A note on medical advice:</h4>
            <p className="text-xs text-warm-gray leading-relaxed font-semibold">
              YouAreOkay's goal is to offer emotional comfort, hygiene details, and cycle awareness to reduce fear. This information is educational and should never replace clinical consultations with a pediatrician, gynecologist, or healthcare professional.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
