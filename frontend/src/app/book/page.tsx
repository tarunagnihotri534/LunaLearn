'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, List, X, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

const chapters = [
  {
    id: 1,
    title: 'Introduction to Puberty and Menstruation',
    subtitle: 'What to Expect',
    emoji: '🌸',
    color: 'bg-bubble-pink',
    borderColor: 'border-primary/30',
    content: [
      {
        type: 'intro',
        text: 'Puberty marks a significant phase in a young person\'s life, filled with numerous physical, emotional, and psychological changes. "The Period Book" by Karen Gravelle dives into this transformative period, particularly focusing on the onset of menstruation, an integral aspect of the female reproductive system.',
      },
      {
        type: 'paragraph',
        text: 'Puberty brings about a myriad of changes, including the development of secondary sexual characteristics like breast growth, body hair development, and changes in body shape. These changes can sometimes be bewildering and can evoke a mix of emotions, from excitement to anxiety. Gravelle takes great care in explaining these transformations in a reassuring and straightforward manner, helping young readers to understand what is happening to their bodies and why.',
      },
      {
        type: 'paragraph',
        text: 'Central to this phase of growth for many girls is the commencement of menstruation. Gravelle introduces menstruation as a natural process linked to the reproductive system. She explains it in a way that demystifies the topic, making it less daunting for those who are about to experience it for the first time. Menstruation is portrayed not just as a biological process but as a sign of growing up and becoming an adult. The book emphasizes that it is a normal and healthy part of life.',
      },
      {
        type: 'highlight',
        text: 'To help ease any anxieties about menstruation, Gravelle includes first-hand accounts from other girls who have experienced it. These stories are particularly effective in creating a sense of camaraderie and understanding. They remind young readers that they are not alone in their experiences. Hearing from peers who have navigated these changes can provide reassurance and a sense of connection, reducing feelings of isolation and fear.',
      },
      {
        type: 'paragraph',
        text: 'Overall, "The Period Book" does an excellent job of introducing puberty and menstruation in an engaging, supportive, and insightful manner. It ensures that young readers are equipped with the knowledge they need to approach this stage of life with confidence and understanding.',
      },
    ],
  },
  {
    id: 2,
    title: 'Understanding Your Menstrual Cycle',
    subtitle: 'The Science Behind Periods',
    emoji: '🔬',
    color: 'bg-bubble-purple',
    borderColor: 'border-secondary/40',
    content: [
      {
        type: 'intro',
        text: 'The menstrual cycle is a complex process divided into distinct phases: menstruation, the follicular phase, ovulation, and the luteal phase. Each phase plays a vital role in the reproductive system and is regulated by various hormones that ensure a smooth transition from one stage to another.',
      },
      {
        type: 'section',
        heading: 'The Menstruation Phase',
        text: 'Menstruation marks the beginning of the menstrual cycle and typically lasts between three to seven days. This phase involves the shedding of the uterine lining, which exits the body through the vagina. The onset of menstruation signifies that the body has not undergone fertilization during the previous cycle. During this phase, levels of estrogen and progesterone are low, which triggers the shedding process.',
      },
      {
        type: 'section',
        heading: 'The Follicular Phase',
        text: 'Following menstruation is the follicular phase, a period of preparation for potential fertilization. This phase begins on the first day of menstruation and continues until ovulation. During the follicular phase, the pituitary gland releases follicle-stimulating hormone (FSH), which stimulates the ovaries to produce several follicles. Each follicle contains an immature egg, but usually only one follicle will mature completely. As this dominant follicle grows, it secretes estrogen, which helps regenerate the uterine lining that was shed during menstruation.',
      },
      {
        type: 'section',
        heading: 'Ovulation',
        text: 'Ovulation is the midpoint of the menstrual cycle, typically occurring around day 14 in a 28-day cycle. During ovulation, a surge in luteinizing hormone (LH) causes the mature follicle to release its egg into the fallopian tube. This is the phase when a female is most fertile. The egg will travel through the fallopian tube towards the uterus, and if sperm is present, fertilization can occur. Ovulation is often accompanied by mild physical signs, such as a slight increase in body temperature and changes in cervical mucus, which becomes clearer and more slippery.',
      },
      {
        type: 'section',
        heading: 'The Luteal Phase',
        text: 'After ovulation, the cycle enters the luteal phase, which lasts approximately 14 days. During this phase, the ruptured follicle transforms into the corpus luteum, a structure that secretes progesterone. Progesterone continues to thicken the uterine lining, preparing it to support a fertilized egg. If fertilization does not take place, the corpus luteum breaks down, causing a decrease in progesterone and estrogen levels. This drop in hormones signals the body to begin menstruation, and the cycle starts anew.',
      },
      {
        type: 'highlight',
        text: 'Understanding the menstrual cycle\'s phases and the hormones involved helps demystify the process, alleviating anxiety and promoting body literacy. Rather than viewing menstruation as a monthly challenge, it becomes possible to see it as a natural and essential aspect of reproductive health.',
      },
      {
        type: 'paragraph',
        text: 'The menstrual cycle can be accompanied by various symptoms and experiences. Many individuals report premenstrual symptoms (PMS) such as bloating, breast tenderness, and mood swings before menstruation begins. During menstruation itself, common symptoms include cramps, fatigue, and back pain. The physical and emotional changes are primarily caused by fluctuating hormone levels, which can impact different bodily systems.',
      },
    ],
  },
  {
    id: 3,
    title: 'Practical Tips for Managing Your Period',
    subtitle: 'Hygiene and Comfort',
    emoji: '🛡️',
    color: 'bg-bubble-teal',
    borderColor: 'border-accent/40',
    content: [
      {
        type: 'intro',
        text: 'This chapter focuses on practical tips for managing your period, offering valuable guidance on hygiene and comfort.',
      },
      {
        type: 'section',
        heading: 'Choosing the Right Menstrual Product',
        text: 'One of the first steps in managing your period effectively is choosing the right menstrual product. "The Period Book" explains the different types of menstrual products available, such as pads, tampons, and menstrual cups. Pads come in various thicknesses and lengths, suitable for different flow levels and times of day. Tampons are inserted into the vagina to absorb menstrual flow internally and also come in different absorbency levels. Menstrual cups, a reusable alternative, collect menstrual blood rather than absorb it and can be worn for longer periods, usually up to 12 hours.',
      },
      {
        type: 'section',
        heading: 'Hygiene Practices',
        text: 'Hygiene practices are paramount during menstruation. The book underscores the importance of changing menstrual products regularly to prevent odor and reduce the risk of infections. It instructs readers to wash their hands before and after changing pads, tampons, or menstrual cups. Additionally, for those using menstrual cups, the book advises sterilizing the cup before the first use each cycle and cleaning it appropriately after each removal.',
      },
      {
        type: 'section',
        heading: 'Managing Cramps and Discomfort',
        text: 'Besides managing menstrual flow, dealing with common menstrual discomforts like cramps and mood swings is crucial for overall well-being. "The Period Book" provides several tips for alleviating cramps, ranging from over-the-counter pain relievers to natural methods. For example, applying a heating pad to the lower abdomen can help relax the muscles and reduce pain. Gentle exercises like walking or stretching can also ease cramps by increasing blood circulation. Hydration and proper nutrition, including the intake of foods rich in iron and calcium, are recommended to combat fatigue and maintain overall health.',
      },
      {
        type: 'highlight',
        text: 'The book also offers strategies for handling the emotional ups and downs that can accompany menstruation. It encourages readers to track their cycle and note any recurring patterns in mood or symptoms. By doing so, they can better prepare for and manage these changes each month.',
      },
    ],
  },
  {
    id: 4,
    title: 'Emotional and Social Aspects of Menstruation',
    subtitle: 'Coping With Changes',
    emoji: '💛',
    color: 'bg-bubble-yellow',
    borderColor: 'border-amber-200/50',
    content: [
      {
        type: 'intro',
        text: 'Navigating the emotional and social aspects of menstruation can be challenging, especially during adolescence, when many other changes are occurring simultaneously. Mood swings are a common experience during menstruation due to fluctuating hormone levels. These mood changes can sometimes result in feelings of irritability, sadness, or anxiety. It is important to understand that these emotions are a natural part of the menstrual cycle and can be managed with healthy coping strategies.',
      },
      {
        type: 'section',
        heading: 'Self-Awareness and Self-Care',
        text: 'One way to manage emotional changes is through self-awareness and self-care. Recognizing that your feelings may be influenced by your menstrual cycle can help you be more patient with yourself. Engaging in activities that you enjoy and that relax you, such as reading, listening to music, or spending time with friends, can significantly improve your mood. Practicing mindfulness and relaxation techniques, like meditation or deep-breathing exercises, can also help in managing stress and emotional fluctuations.',
      },
      {
        type: 'section',
        heading: 'Body Image and Self-Esteem',
        text: 'Body image and self-esteem can be particularly sensitive areas during puberty, as young individuals are more conscious of their physical changes. Menstruation may add to these concerns, especially with the societal stigma and taboos still surrounding periods in many cultures. It\'s important to foster a positive body image by focusing on what your body can do rather than just how it looks. Celebrating the wonderful and unique aspects of yourself can build self-confidence. Understanding that menstruation is a normal and healthy part of growing up is crucial for maintaining a positive self-image.',
      },
      {
        type: 'section',
        heading: 'Open Communication',
        text: 'Communication is key when dealing with periods, and talking openly with family and friends about menstruation can alleviate feelings of embarrassment or isolation. It may feel awkward at first, but discussing your experiences and feelings can provide emotional support and practical advice. Parents, siblings, and close friends can be valuable sources of comfort and understanding. Moreover, sharing your experiences with peers who are also going through similar changes can foster a sense of solidarity and support.',
      },
      {
        type: 'highlight',
        text: 'Periods are a natural part of life, and with understanding and support, they become a less stressful and more normalized aspect of growing up. By employing self-care strategies, maintaining positive body image, and fostering open communication, you can manage the emotional changes and enhance your social interactions during this time.',
      },
    ],
  },
  {
    id: 5,
    title: 'Special Situations and Troubleshooting',
    subtitle: 'When Things Go Awry',
    emoji: '🔧',
    color: 'bg-bubble-pink',
    borderColor: 'border-primary/20',
    content: [
      {
        type: 'intro',
        text: 'As young individuals navigate the complexities of puberty and menstruation, various situations and issues can arise that may cause concern or confusion. This chapter addresses these special situations and offers vital information for troubleshooting when things don\'t go as expected.',
      },
      {
        type: 'section',
        heading: 'Irregular Periods',
        text: 'Irregular periods are quite common, especially in the first few years after menstruation begins. It\'s important to understand that the menstrual cycle can take some time to become regular. Factors such as stress, diet, and significant weight changes can impact cycle regularity. Tracking periods on a calendar or using an app can help in recognizing patterns or irregularities. If periods become excessively erratic or if there are concerns about what is normal, consulting a healthcare provider can provide clarity and reassurance.',
      },
      {
        type: 'section',
        heading: 'Managing Pain (Dysmenorrhea)',
        text: 'Excessive menstrual pain, known as dysmenorrhea, is another issue that many face. While some discomfort is normal, severe pain that disrupts daily activities is not. Over-the-counter pain medications like ibuprofen can be helpful, as can lifestyle adjustments such as regular exercise, applying heat to the abdomen, and maintaining a diet rich in anti-inflammatory foods. If the pain remains severe or worsens, it might be indicative of conditions like endometriosis or fibroids, and a medical evaluation is necessary.',
      },
      {
        type: 'section',
        heading: 'Heavy Periods and Other Concerns',
        text: 'Other menstrual issues include heavy periods (menorrhagia), where bleeding is abnormally heavy or prolonged. This can lead to anemia or severe fatigue and requires medical attention to manage and treat effectively. Similarly, if periods skip for several months without reason, it\'s advisable to consult with a healthcare provider to rule out any potential health concerns such as hormonal imbalances or thyroid issues.',
      },
      {
        type: 'section',
        heading: 'Dispelling Myths',
        text: 'Dispelling myths and addressing common misconceptions about menstruation is also critical. Many myths can contribute to unnecessary anxiety or shame. For example, it\'s false that you cannot swim or exercise during your period, that menstrual blood is impure, or that one\'s period should sync with others. Understanding the truth helps in reducing stigma and promoting a healthier, more knowledgeable approach to one\'s body and menstrual health.',
      },
      {
        type: 'highlight',
        text: 'Knowing when to seek medical advice is crucial for ensuring proper menstrual health. Symptoms such as severe pain, very irregular cycles, excessively heavy bleeding, or absence of periods for several months should never be ignored. Healthcare providers can offer the necessary guidance and treatment to manage these issues.',
      },
    ],
  },
  {
    id: 6,
    title: 'Growing Up',
    subtitle: 'Embracing Changes and Moving Forward',
    emoji: '🌟',
    color: 'bg-bubble-purple',
    borderColor: 'border-secondary/30',
    content: [
      {
        type: 'intro',
        text: 'As young readers navigate the journey through puberty and menstruation, one of the most crucial aspects is developing a sense of body confidence and acceptance. This period of significant change can often lead to feelings of insecurity and self-doubt. However, understanding and embracing these changes can foster a healthier relationship with one\'s body.',
      },
      {
        type: 'section',
        heading: 'Building Body Confidence',
        text: 'Building body confidence starts with education and awareness. By learning about the processes happening within their bodies, young readers can demystify menstruation and reduce any associated stigma or embarrassment. Knowledge empowers them to take control and feel more assured about their bodily functions. Knowing what to expect and how to manage their periods equips them with the tools to confidently handle these changes.',
      },
      {
        type: 'section',
        heading: 'Accepting Your Body',
        text: 'Acceptance of one\'s body is another key factor. Society often imposes unrealistic beauty standards, which can negatively impact self-esteem. It\'s essential to understand that bodies come in various shapes, sizes, and forms, and there is no single definition of beauty. Embracing one\'s individual traits and learning to appreciate the body\'s capabilities fosters a positive body image. Encouraging young readers to celebrate their uniqueness and focus on what their bodies can do, rather than solely how they look, can be incredibly beneficial.',
      },
      {
        type: 'section',
        heading: 'Empowerment Through Knowledge',
        text: 'Empowerment through knowledge is a recurring theme in "The Period Book." By being well-informed about their menstrual cycle and bodily changes, young readers can make better health and lifestyle choices. This includes understanding the importance of nutrition, staying active, and practicing good hygiene. Maintaining a balanced diet, engaging in regular physical activity, and getting adequate rest are all key components of a healthy lifestyle during this transformative time.',
      },
      {
        type: 'highlight',
        text: 'It is important to recognize that every individual\'s experience with puberty and menstruation is unique, and the changes occurring are a normal and natural part of growing up. Embracing these changes with an open mind and a compassionate attitude toward oneself creates a foundation for lasting well-being.',
      },
    ],
  },
  {
    id: 7,
    title: 'Conclusion',
    subtitle: 'Celebrating Your Journey Through Puberty',
    emoji: '🎉',
    color: 'bg-bubble-teal',
    borderColor: 'border-accent/30',
    content: [
      {
        type: 'intro',
        text: 'The journey through puberty and menstruation is a deeply personal and significant chapter in every young person\'s life. "The Period Book" by Karen Gravelle serves as a gentle, informative, and empowering companion throughout this journey.',
      },
      {
        type: 'section',
        heading: 'What You\'ve Learned',
        text: 'Across the chapters of this book, we\'ve explored the biological foundations of puberty, the science of the menstrual cycle, and practical strategies for managing periods with confidence and dignity. We\'ve examined the emotional ups and downs that accompany these changes and the importance of open communication with trusted friends, family, and healthcare providers.',
      },
      {
        type: 'section',
        heading: 'You Are Not Alone',
        text: 'One of the most powerful messages of this book is that you are never alone. Every girl and woman has walked or is walking this same path. The experiences you are having — the questions, the uncertainties, the moments of wonder — are shared by millions across the world. There is a global community of people who understand and support you.',
      },
      {
        type: 'highlight',
        text: 'Puberty is not something that happens to you — it is something that happens with you, as your body grows, matures, and prepares you for the amazing journey ahead. Celebrate every milestone, be gentle with yourself on difficult days, and remember: you are doing an incredible job just by being you.',
      },
      {
        type: 'section',
        heading: 'Moving Forward',
        text: 'As you move forward, carry with you the knowledge that your body is remarkable. It is capable of extraordinary things. The changes you experience during puberty are signs of strength, not weakness. With information, support, and self-compassion, you are well-equipped to embrace this chapter of your life with confidence, curiosity, and joy.',
      },
      {
        type: 'paragraph',
        text: 'Thank you for reading. Here\'s to your journey — may it be filled with kindness, understanding, and an abundance of self-love. 💖',
      },
    ],
  },
];

export default function BookPage() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const chapter = chapters[activeChapter];

  const goTo = (idx: number) => {
    setActiveChapter(idx);
    setTocOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeChapter]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-cream">
      {/* Book Header Bar */}
      <div ref={headerRef} className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-primary/10 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3">
          <Link
            href="/learn"
            className="p-2 rounded-full hover:bg-primary-light text-warm-gray hover:text-primary transition-soft shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <BookOpen className="w-5 h-5 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="font-fredoka text-xs text-warm-gray truncate">The Period Book · Karen Gravelle</p>
              <p className="font-fredoka text-sm font-bold text-charcoal truncate">
                Ch. {chapter.id}: {chapter.title}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hidden md:flex items-center gap-1">
            {chapters.map((_, i) => (
              <button
                key={i}
                id={`ch-dot-${i}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-soft ${
                  i === activeChapter
                    ? 'w-6 h-2.5 bg-primary'
                    : 'w-2.5 h-2.5 bg-primary/20 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <button
            id="toc-toggle"
            onClick={() => setTocOpen(!tocOpen)}
            className="p-2 rounded-full hover:bg-primary-light text-warm-gray hover:text-primary transition-soft shrink-0"
          >
            {tocOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          </button>
        </div>

        {/* Table of Contents Dropdown */}
        {tocOpen && (
          <div className="border-t border-primary/10 bg-white/95 backdrop-blur-md max-h-[60vh] overflow-y-auto">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
              <p className="font-fredoka text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Table of Contents
              </p>
              <div className="space-y-1">
                {chapters.map((ch, i) => (
                  <button
                    key={ch.id}
                    id={`toc-ch-${ch.id}`}
                    onClick={() => goTo(i)}
                    className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 transition-soft ${
                      i === activeChapter
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary-light text-charcoal'
                    }`}
                  >
                    <span className="text-xl shrink-0">{ch.emoji}</span>
                    <div>
                      <p className={`font-fredoka text-xs font-bold uppercase tracking-wide ${i === activeChapter ? 'text-white/70' : 'text-warm-gray'}`}>
                        Chapter {ch.id}
                      </p>
                      <p className={`font-fredoka text-sm font-bold ${i === activeChapter ? 'text-white' : 'text-charcoal'}`}>
                        {ch.title}
                      </p>
                      <p className={`text-xs ${i === activeChapter ? 'text-white/70' : 'text-warm-gray'}`}>
                        {ch.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-10">
        <div ref={contentRef}>
          {/* Chapter Hero */}
          <div className={`${chapter.color} rounded-3xl p-8 md:p-12 mb-10 shadow-soft border ${chapter.borderColor} relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full bg-white/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-full bg-white/10 pointer-events-none" />
            <p className="font-fredoka text-sm font-bold uppercase tracking-widest text-charcoal/60 mb-2">
              Chapter {chapter.id} of {chapters.length}
            </p>
            <div className="text-6xl mb-4">{chapter.emoji}</div>
            <h1 className="font-fredoka text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-2">
              {chapter.title}
            </h1>
            <p className="font-fredoka text-lg text-charcoal/70 font-semibold">
              {chapter.subtitle}
            </p>
          </div>

          {/* Chapter Content */}
          <div className="space-y-6">
            {chapter.content.map((block, idx) => {
              if (block.type === 'intro') {
                return (
                  <div key={idx} className="text-lg md:text-xl text-warm-gray font-medium leading-relaxed border-l-4 border-primary pl-6 py-2">
                    {block.text}
                  </div>
                );
              }
              if (block.type === 'section') {
                return (
                  <div key={idx} className="bg-white border border-primary/10 rounded-3xl p-6 md:p-8 shadow-soft space-y-3">
                    <h2 className="font-fredoka text-xl md:text-2xl font-bold text-charcoal">
                      {block.heading}
                    </h2>
                    <p className="text-sm md:text-base text-warm-gray font-medium leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }
              if (block.type === 'highlight') {
                return (
                  <div key={idx} className="bg-primary-light border border-primary/20 rounded-3xl p-6 md:p-8 shadow-soft">
                    <div className="flex gap-3 items-start">
                      <Sparkles className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <p className="text-sm md:text-base text-charcoal font-semibold leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="text-sm md:text-base text-warm-gray font-medium leading-relaxed px-2">
                    {block.text}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Chapter Navigation */}
          <div className="flex items-center justify-between mt-14 pt-8 border-t border-primary/10">
            <button
              id="prev-chapter"
              onClick={() => goTo(Math.max(0, activeChapter - 1))}
              disabled={activeChapter === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-fredoka font-bold text-sm bg-white border border-primary/15 shadow-soft transition-soft hover:bg-primary-light hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed text-charcoal"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-center">
              <p className="font-fredoka text-xs text-warm-gray">
                {activeChapter + 1} of {chapters.length}
              </p>
            </div>

            {activeChapter < chapters.length - 1 ? (
              <button
                id="next-chapter"
                onClick={() => goTo(Math.min(chapters.length - 1, activeChapter + 1))}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-fredoka font-bold text-sm bg-primary text-white shadow-bubble transition-soft hover:bg-primary-hover"
              >
                Next Chapter
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/learn"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-fredoka font-bold text-sm bg-primary text-white shadow-bubble transition-soft hover:bg-primary-hover"
              >
                All Done! 🎉
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
