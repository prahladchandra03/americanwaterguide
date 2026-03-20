'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

// --- CONFIGURATION ---
const WATER_AFFILIATE_LINK = "https://uswaterrevolution.com/#aff=prahladchandra1151d9";
const QUANTUM_AFFILIATE_LINK = "https://www.checkout-ds24.com/redir/611936/prahladchandra1151d9/";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

// --- FLOATING PARTICLES (client-only to avoid hydration mismatch) ---
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    w: number; h: number; l: string; t: string; bg: string; xOff: number; dur: number; del: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map((_, i) => ({
        w: Math.random() * 4 + 1,
        h: Math.random() * 4 + 1,
        l: `${Math.random() * 100}%`,
        t: `${Math.random() * 100}%`,
        bg: i % 2 === 0
          ? `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`
          : `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`,
        xOff: Math.random() * 60 - 30,
        dur: Math.random() * 8 + 6,
        del: Math.random() * 5,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: p.bg }}
          animate={{ y: [0, -150, 0], x: [0, p.xOff, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" as const }}
        />
      ))}
    </div>
  );
}

// --- NAVBAR ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Water System', href: '#water' },
    { label: 'Quantum Course', href: '#quantum' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-2xl shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]">
              <path d="M12 2L3 7V12C3 17.52 7.02 22.12 12 24C16.98 22.12 21 17.52 21 12V7L12 2Z" fill="#1e293b" stroke="#EAB308" strokeWidth="1.5"/>
              <path d="M12 6C12 6 7 11 7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 11 12 6 12 6Z" fill="#3B82F6"/>
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-wide group-hover:text-yellow-400 transition-colors">American Water</span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-gray-500">Independence Guide</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={QUANTUM_AFFILIATE_LINK}
            target="_blank"
            className="ml-3 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 btn-premium"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={QUANTUM_AFFILIATE_LINK}
                target="_blank"
                className="block text-center px-5 py-3 font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg mt-2"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// --- ANIMATED COUNTER ---
function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- TESTIMONIAL CARD ---
function TestimonialCard({ name, role, text, initials }: { name: string; role: string; text: string; initials: string }) {
  return (
    <motion.div variants={fadeInUp} className="glass rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-500 group">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">&quot;{text}&quot;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
          {initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// --- FAQ ITEM ---
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeInUp} className="glass rounded-xl overflow-hidden group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5 transition-all"
      >
        <span className="text-white font-medium text-sm md:text-base pr-4">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-violet-400 text-xl flex-shrink-0 font-light"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- LANGUAGE SELECTOR ---
function LanguageSelector() {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (googleSelect) {
      googleSelect.value = e.target.value;
      googleSelect.dispatchEvent(new Event("change"));
    }
  };

  return (
    <select
      onChange={handleChange}
      className="appearance-none bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg py-1.5 pl-3 pr-7 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer transition-all"
    >
      <option value="en">🇺🇸 EN</option>
      <option value="es">🇪🇸 ES</option>
    </select>
  );
}


// ==================== MAIN PAGE ====================
export default function Home() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Email captured:", email);
      window.location.href = WATER_AFFILIATE_LINK;
    }
  };

  return (
    <div className="min-h-screen bg-[#050a10] text-gray-200 font-sans overflow-x-hidden relative">
      <FloatingParticles />

      {/* Google Translate */}
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="lazyOnload" />
      <Script id="google-translate-init" strategy="lazyOnload">{`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false }, 'google_translate_element');
        }
      `}</Script>
      <div id="google_translate_element" className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"></div>

      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden noise-overlay">
        {/* Background Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm text-gray-300 font-medium">Exclusive Offers • Limited Time Only</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-white">Secure Your </span>
              <span className="text-gradient-blue">Future</span>
              <br />
              <span className="text-white">With </span>
              <span className="text-gradient-violet">Knowledge & Independence</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              From generating water out of thin air to mastering quantum computing &amp; the new financial system — 
              arm yourself with the tools that define tomorrow.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#water">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/25 btn-premium tracking-wide"
                >
                  💧 Water Independence
                </motion.button>
              </Link>
              <Link href="#quantum">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-violet-600/25 btn-premium tracking-wide"
                >
                  🧠 Quantum Finance Course
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: 40000, suffix: '+', label: 'Patriots Prepared' },
              { value: 40, suffix: ' Gal', label: 'Daily Water Output' },
              { value: 60, suffix: ' Day', label: 'Money-Back Guarantee' },
              { value: 98, suffix: '%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCT 1: JOSEPH'S WELL / WATER SYSTEM ===== */}
      <section id="water" className="relative py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-blue-400 mb-4">Product #1</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white mb-5">
              Joseph&apos;s Well — <span className="text-gradient-blue">Air Fountain System</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The DIY blueprints that show you how to build a device generating <strong className="text-white">up to 40 gallons of fresh water daily</strong> from thin air. 
              Built using simple hardware store parts. Only <strong className="text-white">$67</strong> for complete digital plans + bonus guide.
            </motion.p>
          </motion.div>

          {/* Video + Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Video Mockup */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                <Link href={WATER_AFFILIATE_LINK} target="_blank" className="block relative">
                  <div className="relative glass rounded-2xl overflow-hidden">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all z-20">
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 2.5 }}
                          className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.7)] border-2 border-white/20"
                        >
                          <svg className="w-8 h-8 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </motion.div>
                        <p className="mt-4 text-white font-bold text-sm uppercase tracking-widest bg-black/60 px-5 py-2 rounded-full border border-white/10">
                          Watch Free Presentation
                        </p>
                      </div>
                      <Image src="/product-mockup.png" alt="Joseph's Well System" width={800} height={450} className="object-cover w-full h-full opacity-50 group-hover:scale-105 transition-transform duration-700" priority />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Story + Benefits */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} className="flex flex-col justify-center">
              <div className="glass rounded-2xl p-6 md:p-8 mb-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-white mb-3">The Megadrought Is Here</h3>
                <p className="text-gray-300 leading-relaxed text-sm mb-3">
                  NASA confirms a &quot;100-Year Megadrought.&quot; Water rationing is expected in 2026. But <strong className="text-white">John Gilmore</strong> discovered a God-sent device born in the deserts of Israel — pulling fresh water from thin air.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Like Joseph in Egypt who prepared for famine, this system helps the faithful prepare for what&apos;s coming. No electricity needed. No plumbing. Just pure water independence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '💧', title: '40 Gal/Day', desc: 'Fresh water from thin air' },
                  { icon: '🔋', title: '100% Off-Grid', desc: 'No electricity needed' },
                  { icon: '🛠️', title: 'DIY Plans', desc: 'Complete blueprints for $67' },
                  { icon: '🛡️', title: '60-Day Guarantee', desc: 'Full money-back via ClickBank' },
                ].map((b, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }} className="glass rounded-xl p-4 hover:border-blue-500/30 transition-all">
                    <span className="text-2xl">{b.icon}</span>
                    <h4 className="text-white font-bold text-sm mt-2">{b.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Email Opt-In + Timer */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-yellow-600 rounded-2xl blur opacity-20"></div>
              <div className="relative glass rounded-2xl p-8 text-center">
                {/* Timer */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">⏰ Offer Expires In:</span>
                  <span className="font-mono text-2xl font-extrabold text-white bg-red-600/20 px-4 py-1 rounded-lg border border-red-500/30">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Get Instant Access to the Water System Guide
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Enter your email to verify you&apos;re a real person and unlock the private video presentation.
                </p>

                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your best email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 btn-premium uppercase tracking-wider whitespace-nowrap"
                  >
                    Unlock Now »
                  </motion.button>
                </form>

                <p className="mt-3 text-[10px] text-gray-600 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  100% Secure • 60-Day Money-Back via ClickBank • No spam.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCT 2: QUANTUM COMPUTING SYSTEM ===== */}
      <section id="quantum" className="relative py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-violet-400 mb-4">Product #2</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white mb-5">
              Quantum Computing &amp; <span className="text-gradient-violet">The New Financial System</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              An in-depth educational video series that reveals how quantum technology will transform global finance. 
              Real-time transactions, unbreakable encryption, decentralized value distribution.
            </motion.p>
          </motion.div>

          {/* Product Image + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Product Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative glass rounded-2xl overflow-hidden animate-float">
                  <Image 
                    src="/quantum-product.png" 
                    alt="Quantum Computing System" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover" 
                  />
                </div>
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col justify-center space-y-4">
              {[
                { icon: '🧬', title: 'Quantum Computing Fundamentals', desc: 'Learn qubits, superposition, and entanglement in plain language with stunning visual animations.' },
                { icon: '💰', title: 'New Monetary Distribution System', desc: 'Discover how quantum tech is set to transform banking, transactions, and global finance infrastructure.' },
                { icon: '🔐', title: 'Quantum Encryption & Security', desc: 'Understand unbreakable quantum encryption and how it secures the future financial ecosystem.' },
                { icon: '📊', title: 'Real-Time Financial Processing', desc: 'See how quantum algorithms enable instant settlements and decentralized value distribution.' },
                { icon: '🎓', title: 'Expert-Led Video Series', desc: 'Engaging visuals, clear storytelling, and expert insights make complex ideas accessible to everyone.' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass rounded-xl p-5 flex items-start gap-4 hover:border-violet-500/30 transition-all duration-300 group cursor-default"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{feature.icon}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pricing Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 rounded-2xl blur opacity-30 animate-gradient"></div>
              <div className="relative glass-strong rounded-2xl p-8 text-center">
                <div className="inline-block bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-violet-500/30 mb-6">
                  Complete Video Course
                </div>

                <div className="mb-6">
                  <span className="text-gray-500 line-through text-lg">$4,999</span>
                  <div className="text-5xl font-extrabold text-white mt-1">
                    $2,499
                  </div>
                  <p className="text-gray-400 text-sm mt-2">One-time payment • Lifetime access</p>
                </div>

                <div className="space-y-3 text-left mb-8">
                  {[
                    'Full Quantum Computing Video Series',
                    'Monetary Distribution System Breakdown',
                    'Expert-Led Lessons with Animations',
                    'Lifetime Access & Future Updates',
                    '60-Day Money-Back Guarantee',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href={QUANTUM_AFFILIATE_LINK} target="_blank">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-violet-500/25 btn-premium uppercase tracking-wider"
                  >
                    Enroll Now — Get Instant Access »
                  </motion.button>
                </Link>

                <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                    Secure Checkout
                  </span>
                  <span>•</span>
                  <span>DigiStore24 Protected</span>
                  <span>•</span>
                  <span>60-Day Refund</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="reviews" className="relative py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">Social Proof</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white mb-5">
              What Our <span className="text-gradient-blue">Members</span> Say
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Michael Rodriguez"
              role="CTO, Technology Lab"
              initials="MR"
              text="This course transformed how we approach advanced computation. The clarity on quantum computing has significantly improved our data processing capabilities."
            />
            <TestimonialCard
              name="Sarah Johnson"
              role="Financial Controller"
              initials="SJ"
              text="The quantum computing video series is incredibly valuable. Real-world case studies helped me apply new approaches to complex data analysis right away."
            />
            <TestimonialCard
              name="David Chen"
              role="E-commerce Owner"
              initials="DC"
              text="The practical frameworks alone are worth the investment. I've saved dozens of hours on data processing, and our models are now far more precise."
            />
          </motion.div>

          {/* Trust Badges */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: '🛡️', label: '60-Day Guarantee' },
              { icon: '🔒', label: 'Secure Checkout' },
              { icon: '⚡', label: 'Instant Access' },
              { icon: '🌍', label: '40K+ Members' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-xl">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="relative py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeInUp} className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Got Questions?</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-3">
            <FaqItem question="Does the Joseph's Well water system really work in the desert?" answer="Yes. The technology was born in the deserts of Israel. It extracts moisture from humidity in the air, generating up to 40 gallons per day even in drought conditions." />
            <FaqItem question="How much does Joseph's Well cost?" answer="The complete digital blueprints are just $67, including a bonus guide 'The Deadly Agents Hidden In Your Water'. A hard copy is also available for $67 + $9.95 S&H. 60-Day money-back guarantee via ClickBank." />
            <FaqItem question="Do I need engineering skills?" answer="No. The DIY plans are designed for regular folks. If you can follow simple instructions, you can build this system." />
            <FaqItem question="What is the Quantum Computing course about?" answer="It's an in-depth educational video series covering how quantum technology will transform global finance — from real-time transactions to quantum encryption and decentralized monetary systems." />
            <FaqItem question="Who is the Quantum course for?" answer="Both curious minds and professionals. The series uses clear explanations, engaging visuals, and expert-led lessons to make complex ideas accessible." />
            <FaqItem question="Is there a money-back guarantee?" answer="Yes! Joseph's Well has a 60-Day Money-Back Guarantee via ClickBank. The Quantum Computing course has a 60-Day Guarantee via DigiStore24. Full refund, no questions asked." />
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-extrabold text-white mb-5">
              Ready to Take Control of Your <span className="text-gradient-violet">Future</span>?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Don&apos;t wait until it&apos;s too late. Whether you need water independence or financial knowledge — the time to act is now.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={WATER_AFFILIATE_LINK} target="_blank">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-blue-600/25 btn-premium uppercase tracking-wider animate-glow"
                >
                  💧 Get Water System Guide
                </motion.button>
              </Link>
              <Link href={QUANTUM_AFFILIATE_LINK} target="_blank">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-violet-600/25 btn-premium uppercase tracking-wider animate-glow-violet"
                >
                  🧠 Enroll in Quantum Course
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M12 2L3 7V12C3 17.52 7.02 22.12 12 24C16.98 22.12 21 17.52 21 12V7L12 2Z" fill="#1e293b" stroke="#EAB308" strokeWidth="1.5"/>
                <path d="M12 6C12 6 7 11 7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 11 12 6 12 6Z" fill="#3B82F6"/>
              </svg>
              <span className="text-sm text-gray-500">© 2026 American Water Independence. All Rights Reserved.</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Disclaimer</Link>
              <LanguageSelector />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-700 max-w-2xl mx-auto leading-relaxed">
              This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. 
              FACEBOOK is a trademark of FACEBOOK, Inc. Individual results may vary. The products featured on this page are sold through DigiStore24 and third-party platforms.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div className="glass-strong border-t border-white/10 px-4 py-3 flex gap-2">
          <Link href={WATER_AFFILIATE_LINK} target="_blank" className="flex-1">
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-lg btn-premium uppercase tracking-wider">
              💧 Water System
            </button>
          </Link>
          <Link href={QUANTUM_AFFILIATE_LINK} target="_blank" className="flex-1">
            <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-xs rounded-lg btn-premium uppercase tracking-wider">
              🧠 Quantum Course
            </button>
          </Link>
        </div>
      </div>

      {/* ===== ENGAGEMENT TOOLS ===== */}
      <ScrollProgressBar />
      <SocialProofPopup />
      <ExitIntentPopup />
    </div>
  );
}

// ==================== ENGAGEMENT TOOLS ====================

// --- 1. SCROLL PROGRESS BAR (top of page) ---
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

// --- 2. SOCIAL PROOF NOTIFICATION POPUPS ---
function SocialProofPopup() {
  const [show, setShow] = useState(false);
  const [currentNotif, setCurrentNotif] = useState(0);

  const notifications = [
    { name: 'Robert M.', location: 'Texas', product: "Joseph's Well Plans", time: '2 min ago' },
    { name: 'Sarah K.', location: 'Florida', product: 'Quantum Computing Course', time: '5 min ago' },
    { name: 'James W.', location: 'Arizona', product: "Joseph's Well Plans", time: '8 min ago' },
    { name: 'Maria G.', location: 'California', product: 'Quantum Computing Course', time: '12 min ago' },
    { name: 'David L.', location: 'Ohio', product: "Joseph's Well Plans", time: '15 min ago' },
    { name: 'Jennifer R.', location: 'New York', product: 'Quantum Computing Course', time: '18 min ago' },
    { name: 'Michael T.', location: 'Georgia', product: "Joseph's Well Plans", time: '22 min ago' },
    { name: 'Lisa C.', location: 'Pennsylvania', product: 'Quantum Computing Course', time: '25 min ago' },
    { name: 'Chris B.', location: 'Nevada', product: "Joseph's Well Plans", time: '30 min ago' },
    { name: 'Amanda S.', location: 'Michigan', product: 'Quantum Computing Course', time: '34 min ago' },
  ];

  useEffect(() => {
    // First popup after 15 seconds
    const initialDelay = setTimeout(() => {
      setShow(true);
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 15000);

    // Then cycle every 30-50 seconds
    const interval = setInterval(() => {
      setCurrentNotif(prev => (prev + 1) % notifications.length);
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }, 30000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notif = notifications[currentNotif];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-20 md:bottom-6 left-4 z-[55] max-w-xs"
        >
          <div className="glass-strong rounded-xl p-4 shadow-2xl border border-white/10 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg flex-shrink-0">
              ✓
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {notif.name} from {notif.location}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                Just purchased <span className="text-cyan-400">{notif.product}</span>
              </p>
              <p className="text-gray-600 text-[10px] mt-1">{notif.time}</p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-gray-600 hover:text-white text-xs flex-shrink-0 ml-1"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- 3. EXIT-INTENT POPUP ---
function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !hasShown.current) {
        hasShown.current = true;
        setShow(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShow(false)} />

      {/* Popup */}
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative glass-strong rounded-2xl p-8 max-w-md w-full text-center border border-red-500/20 shadow-2xl"
      >
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-2xl font-extrabold text-white mb-2">
          Wait! Don&apos;t Leave Yet...
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          You&apos;re about to miss exclusive access to life-changing resources. 
          Over <strong className="text-white">40,000+ people</strong> have already taken action. 
          Are you sure you want to leave empty-handed?
        </p>

        <div className="space-y-3">
          <Link href={WATER_AFFILIATE_LINK} target="_blank" className="block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl btn-premium uppercase tracking-wider text-sm"
              onClick={() => setShow(false)}
            >
              💧 Yes! Show Me The Water System ($67)
            </motion.button>
          </Link>
          <Link href={QUANTUM_AFFILIATE_LINK} target="_blank" className="block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold rounded-xl btn-premium uppercase tracking-wider text-sm"
              onClick={() => setShow(false)}
            >
              🧠 Show Me Quantum Finance Course
            </motion.button>
          </Link>
          <button
            onClick={() => setShow(false)}
            className="text-gray-600 text-xs hover:text-gray-400 transition-colors mt-2"
          >
            No thanks, I&apos;ll pass on securing my future...
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}