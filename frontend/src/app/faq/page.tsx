'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "school",
    question: "What if my period starts when I am at school?",
    answer: "Don't worry! This happens to many girls. First, go to the restroom. If you don't have a pad with you, you can fold some toilet paper and place it inside your underwear as a temporary fix. Then, go to the school nurse, a female teacher, or the front office. They almost always have spare pads and will gladly help you without making a big deal of it. You are never in trouble for asking!"
  },
  {
    id: 2,
    category: "body",
    question: "Does having a period hurt?",
    answer: "The period itself does not hurt, but some girls experience 'cramps' (a dull, warm squeeze in the lower tummy or back). This happens because the uterus muscles are gently contracting. You can help soothe cramps by drinking warm water, resting with a hot water bottle on your stomach, or doing gentle stretches. If cramps make it hard to focus, let a parent or trusted adult know."
  },
  {
    id: 3,
    category: "school",
    question: "What if I leak blood onto my clothes?",
    answer: "Almost every girl and woman has had a leak! It is completely normal. If you notice a leak at school, you can tie a sweater or jacket around your waist to cover it. Go to the school nurse or a trusted teacher—they can help you find a change of clothes or contact a parent to bring you some fresh clothes. Remember, it is a very common accident, and nothing to be ashamed of!"
  },
  {
    id: 4,
    category: "general",
    question: "How do I talk to my mom, dad, or caregiver about this?",
    answer: "It can feel a little awkward at first, but remember that they have talked about or experienced this many times before! You can write them a quick note ('Hey, I think my period is starting, can we buy some pads?'), send them a text, or pull them aside when it's quiet. They will likely be very happy you told them and want to support you."
  },
  {
    id: 5,
    category: "body",
    question: "How much blood do I lose? Will I run out?",
    answer: "It might look like a lot, but you actually only lose about 2 to 4 tablespoons of blood during your entire period! Your body has plenty of blood and makes more every day, so you will never run out. It is just a tiny wash cycle."
  },
  {
    id: 6,
    category: "hygiene",
    question: "How do I choose between pads, tampons, or cups?",
    answer: "For beginners, sanitary pads are the easiest and most comfortable choice because they simply stick onto your underwear. As you get older and more comfortable with your body, you can try tampons (which go inside the vagina) or menstrual cups (soft silicone collectors). Try different things to see what you like best!"
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleAccordion = (id: number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center px-4 md:px-8 py-10 select-none">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="font-fredoka text-3xl md:text-5xl font-bold text-charcoal">
            Questions & Answers 🌙
          </h1>
          <p className="text-base md:text-lg text-warm-gray font-medium max-w-lg mx-auto">
            Find answers to common questions about periods. It's completely private and safe.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto w-full">
          <input
            type="text"
            placeholder="Search questions (e.g. 'school', 'cramps')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-primary/10 rounded-full py-3.5 pl-12 pr-6 text-sm font-semibold shadow-soft focus:outline-none focus:border-primary placeholder-warm-gray/50"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-warm-gray/50" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {['all', 'school', 'body', 'hygiene', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-fredoka font-bold transition-soft capitalize ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white text-warm-gray border border-primary/10 hover:border-primary/20'
              }`}
            >
              {cat === 'all' ? 'Show All' : cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-10 text-warm-gray/60 font-semibold bg-white rounded-3xl border border-primary/10">
              No questions found. Try searching something else! 🔎
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-primary/10 rounded-3xl overflow-hidden shadow-soft transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-fredoka text-base md:text-lg font-bold text-charcoal pr-4 flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-primary/5 text-xs md:text-sm text-warm-gray font-semibold leading-relaxed">
                      <p className="bg-cream/40 p-4 rounded-2xl border border-primary/5">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Safe Reassurance Widget */}
        <div className="bg-bubble-pink/30 border border-primary/10 rounded-3xl p-6 shadow-soft flex items-center gap-4 hover:scale-[1.01] transition-soft bouncy-hover">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-soft">
            <Sparkles className="w-6 h-6 text-primary fill-primary/10" />
          </div>
          <div className="space-y-1">
            <h4 className="font-fredoka text-base font-bold text-charcoal">Have a different question?</h4>
            <p className="text-xs text-warm-gray leading-relaxed font-semibold">
              If you have a question that isn't answered here, don't keep it to yourself! Ask a trusted adult, your school nurse, or an older female family member. They will be happy to explain and guide you.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
