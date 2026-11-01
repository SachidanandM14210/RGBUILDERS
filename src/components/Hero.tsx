import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, CheckCircle2, Building, Shield, Award } from 'lucide-react';

export function Hero() {
  const scrollToContent = () => {
    const el = document.getElementById('about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#101010]">
      {/* Background Architectural Photograph with subtle zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/images/hero.jpg"
            alt="RG BUILDERS ENGINEERS AND CONTRACTORS Luxury Architectural Villa"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
        {/* Layered cinematic gradients for extreme luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/60 to-black/75" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
      </div>

      {/* Blueprint Grid Lines & Architectural Accents */}
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center lg:text-left flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Architectural Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-zinc-300 mb-6 uppercase tracking-widest font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
            <span>DESIGN &middot; ENGINEERING &middot; CONSTRUCTION</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-6"
          >
            BUILDING THE FUTURE,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#F28C28]">
              ONE FOUNDATION
            </span>{' '}
            AT A TIME.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-10"
          >
            From thoughtfully designed homes to ambitious commercial spaces, RG BUILDERS ENGINEERS AND CONTRACTORS transforms your vision into structures built to last.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5"
          >
            <Link
              to="/quote"
              id="hero-primary-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-base px-8 py-4 rounded-xl shadow-2xl shadow-[#F28C28]/25 transition-all duration-300 hover:shadow-[#F28C28]/40 hover:-translate-y-1 active:translate-y-0"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

          </motion.div>

          {/* Trust Highlights Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F28C28]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-white text-sm block">Quality-First</span>
                <span className="text-zinc-400 text-xs">Standardized Materials</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F28C28]">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-white text-sm block">Turnkey Ready</span>
                <span className="text-zinc-400 text-xs">Design to Handover</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F28C28]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-white text-sm block">Transparent Pricing</span>
                <span className="text-zinc-400 text-xs">Milestone Contracts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-zinc-400 hover:text-white transition-colors flex flex-col items-center gap-1 group focus:outline-none"
        aria-label="Scroll to learn more"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 group-hover:text-[#F28C28] transition-colors">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#F28C28]" />
      </button>
    </section>
  );
}
