'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

// --- CONFIGURATION ---
const AFFILIATE_LINK = "https://uswaterrevolution.com/#aff=prahladchandra1151d9"; 

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// --- SVG LOGO COMPONENT ---
const BrandLogo = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="relative w-16 h-16 mb-2">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
        <path d="M12 2L3 7V12C3 17.52 7.02 22.12 12 24C16.98 22.12 21 17.52 21 12V7L12 2Z" fill="#1e293b" stroke="#EAB308" strokeWidth="2"/>
        <path d="M12 6C12 6 7 11 7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 11 12 6 12 6ZM12 17C10.34 17 9 15.66 9 14C9 12.5 11 9.5 12 8.5C13 9.5 15 12.5 15 14C15 15.66 13.66 17 12 17Z" fill="#3B82F6"/>
      </svg>
    </div>
    <h2 className="text-2xl font-serif font-bold text-white tracking-widest uppercase border-b-2 border-yellow-500 pb-1">
      Joseph's Well
    </h2>
    <p className="text-[10px] text-gray-400 tracking-[0.2em] mt-1 uppercase">Survival Water Systems</p>
  </div>
);

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [email, setEmail] = useState('');

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- EMAIL SUBMIT LOGIC ---
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Yahan tum baad me API call kar sakte ho email save karne ke liye
      console.log("Email captured:", email);
      
      // User ko Affiliate Offer par bhejo
      window.location.href = AFFILIATE_LINK;
    }
  };

  // --- LANGUAGE CHANGE LOGIC ---
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageCode = e.target.value;
    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (googleSelect) {
      googleSelect.value = languageCode;
      googleSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-gray-200 font-sans selection:bg-red-900 selection:text-white overflow-x-hidden relative">
      
      {/* --- GOOGLE TRANSLATE SCRIPT --- */}
      <Script 
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
        strategy="lazyOnload" 
      />
      <Script id="google-translate-init" strategy="lazyOnload">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en', 
              includedLanguages: 'en,es',
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}
      </Script>

      <div id="google_translate_element" className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"></div>

      {/* --- TOP TICKER --- */}
      <div className="bg-red-700 text-white text-xs md:text-sm font-bold py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50 shadow-lg flex justify-between items-center pr-2">
        <div className="flex-1 overflow-hidden">
            <motion.div 
            animate={{ x: ["100%", "-100%"] }} 
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="inline-block whitespace-nowrap"
            >
            ⚠️ BREAKING: NASA CONFIRMS "MEGADROUGHT" • WATER RATIONING EXPECTED IN 2026 • 40,000+ PATRIOTS PREPARING NOW •
            </motion.div>
        </div>
      </div>

      {/* --- CUSTOM LANGUAGE DROPDOWN --- */}
      <div className="absolute top-12 right-4 z-40">
         <div className="relative">
            <select 
              onChange={handleLanguageChange}
              className="appearance-none bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-md py-2 pl-3 pr-8 text-sm font-bold shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer transition-colors"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
         </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10 mt-6">

        {/* --- BRAND LOGO --- */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="mb-10"
        >
          <BrandLogo />
        </motion.div>

        {/* --- HERO SECTION --- */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <div className="inline-block bg-yellow-500/10 border border-yellow-500/50 rounded px-3 py-1 mb-4">
            <span className="text-yellow-400 text-xs md:text-sm font-bold uppercase tracking-widest">
              As Predicted in Scripture & Confirmed by NASA
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white font-serif drop-shadow-2xl">
            The <span className="text-red-500">"100-Year Megadrought"</span> Is Here.
            <br className="hidden md:block" />
            <span className="text-gray-300 text-2xl md:text-4xl block mt-2 font-medium">
              Are You Prepared?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
            "While the government denies it, a humble carpenter from Arizona named <strong className="text-white">John Gilmore</strong> has discovered a forgotten 'Biblical' device that generates 50 gallons of water a day... out of thin air."
          </p>
        </motion.div>

        {/* --- VSL VIDEO MOCKUP --- */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl group">
            <Link href={AFFILIATE_LINK} target="_blank">
              <div className="aspect-video relative overflow-hidden">
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all z-20">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.8)] border-4 border-white/20"
                    >
                      <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </motion.div>
                    <p className="mt-4 text-white font-bold text-lg uppercase tracking-wider bg-black/70 px-6 py-2 rounded-full border border-gray-500">
                      Click To Watch Video
                    </p>
                 </div>
                 
                 <Image 
                   src="/product-mockup.png" 
                   alt="Joseph's Well System" 
                   width={800} 
                   height={450} 
                   className="object-cover w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-700"
                   priority
                 />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* --- EMAIL OPT-IN BOX (NEW) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border border-slate-600 rounded-xl p-6 md:p-8 text-center shadow-xl mb-12 max-w-2xl mx-auto"
        >
           <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
             Where Should We Send Your Private Access Link?
           </h3>
           <p className="text-gray-400 text-sm mb-6">
             Enter your best email to verify you are a real person and unlock the video instantly.
           </p>

           <form onSubmit={handleEmailSubmit} className="flex flex-col space-y-4">
              <input 
                type="email" 
                required 
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-lg shadow-lg shadow-red-600/30 uppercase tracking-widest transition-transform transform active:scale-95"
              >
                Unlock Video Now &raquo;
              </button>
           </form>
           
           <p className="mt-4 text-[10px] text-gray-500 flex justify-center items-center">
             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
             We respect your privacy. No spam. Unsubscribe anytime.
           </p>
        </motion.div>

        {/* --- THE STORY --- */}
        <div className="max-w-2xl mx-auto space-y-8 mb-16">
          <Section title="The Red Horse Is Riding">
            <p className="text-gray-300 leading-relaxed mb-4">
              If you're a man of faith, you know the signs. <strong className="text-white">War. Famine. Drought.</strong> 
              The second seal has been opened.
            </p>
            <p className="text-gray-300 leading-relaxed">
              NASA calls it a "Megadrought." Scripture calls it Judgment. 
              But just like Joseph in Egypt, God has provided a way for the faithful to prepare.
            </p>
          </Section>

          {/* ... Baki ka content same hai ... */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <BenefitCard icon="💧" title="50 Gallons Daily" desc="Generate endless fresh water on demand." />
            <BenefitCard icon="🔋" title="100% Off-Grid" desc="Works without city electricity. Solar ready." />
            <BenefitCard icon="🛠️" title="DIY Friendly" desc="Build it with basic hardware store parts." />
            <BenefitCard icon="🛡️" title="Invisible" desc="No loud generators. Your neighbors won't know." />
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden"
        >
          {/* ... CTA Content ... */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-red-600/10 blur-3xl rounded-full pointer-events-none"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            See How To Build "Joseph's Well" Today
          </h2>
          <p className="text-gray-400 mb-8 relative z-10">
            Join 40,000+ Patriots. Secure your family's future before the taps run dry.
          </p>
          
          <Link href={AFFILIATE_LINK} target="_blank">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xl py-5 px-10 rounded-lg shadow-lg shadow-red-600/30 uppercase tracking-wider w-full md:w-auto relative z-10 transition-colors"
            >
              Watch The Free Presentation &raquo;
            </motion.button>
          </Link>
          <p className="mt-4 text-xs text-gray-500">100% Secure • Money Back Guarantee via DigiStore24</p>
        </motion.div>

        {/* --- FAQ SECTION --- */}
        <div className="mt-16 border-t border-slate-800 pt-10">
          <h3 className="text-center text-xl font-bold text-gray-400 mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <FaqItem question="Does this really work in the desert?" answer="Yes. The technology was developed in Israel and tested in Arizona. It extracts moisture from humidity in the air." />
            <FaqItem question="Is it legal to build?" answer="Absolutely. It is a DIY device for personal use on your own property." />
            <FaqItem question="Do I need to be an engineer?" answer="No. The guide is designed for regular folks. If you can use a screwdriver, you can build this." />
          </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#05080a] py-8 text-center border-t border-slate-800 mt-10 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-500 mb-6">
            <Link href="/privacy-policy" className="hover:text-white underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white underline">Terms of Service</Link>
            <Link href="#" className="hover:text-white underline">Disclaimer</Link>
          </div>
          <p className="text-[10px] text-gray-600">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way.
          </p>
          <p className="text-xs text-gray-500 mt-4">© 2026 American Water Independence. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-yellow-500"
    >
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-start space-x-3"
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-xs text-gray-400 leading-tight mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left p-4 bg-slate-800 text-gray-200 font-medium flex justify-between items-center hover:bg-slate-700 transition"
      >
        {question}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-900 text-gray-400 text-sm leading-relaxed border-t border-slate-700">
          {answer}
        </div>
      )}
    </div>
  );
}