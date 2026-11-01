import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle,
  HelpCircle,
  Users,
  HardHat,
  Eye,
  Clock,
  Compass,
  Building,
  PhoneCall,
  ArrowUpRight,
  Maximize2,
  X
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';
import { ProjectCard } from '../components/ProjectCard';
import { api } from '../lib/api';
import { FAQ, Testimonial, Project, GalleryItem } from '../types';

export function Home() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    api.getFaqs().then((res) => { if (res.success) setFaqs(res.faqs); });
    api.getTestimonials().then((res) => { if (res.success) setTestimonials(res.testimonials); });
    api.getProjects().then((res) => { if (res.success) setProjects(res.projects); });
    api.getGallery().then((res) => { if (res.success) setGallery(res.gallery); });
  }, []);

  return (
    <>
      <SEO
        title="RG BUILDERS ENGINEERS AND CONTRACTORS — Building Dreams. Creating Landmarks | Premium Architecture & Construction"
        description="RG BUILDERS ENGINEERS AND CONTRACTORS delivers luxury residential buildings, modern commercial architecture, and turnkey engineering solutions built on trust and precision."
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* PURPOSE Section */}
      <section className="py-16 bg-[#171717] relative overflow-hidden" id="purpose-section">
        <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">

            {/* Label */}
            <div className="lg:w-56 shrink-0">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-1 h-8 bg-[#F28C28] rounded-full" />
                <span className="font-heading font-black text-3xl text-white uppercase tracking-widest">
                  PURPOSE
                </span>
              </div>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest pl-3">
                What we do
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-20 bg-zinc-700 shrink-0" />

            {/* Purpose Items */}
            <div className="flex flex-wrap gap-3 flex-1">
              {[
                { label: 'Building Plans' },
                { label: 'Designing' },
                { label: 'Estimation' },
                { label: 'Supervision' },
                { label: 'Construction Works' },
                { label: 'And More...' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 bg-white/5 border border-white/10 hover:border-[#F28C28]/50 hover:bg-[#F28C28]/5 transition-all duration-200 rounded-xl px-4 py-3 group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#F28C28] group-hover:scale-125 transition-transform shrink-0" />
                  <span className="font-heading font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full tagline */}
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm font-mono tracking-wider">
              Undertaking{' '}
              <span className="text-[#F28C28] font-semibold">Building Plans</span>,{' '}
              <span className="text-[#F28C28] font-semibold">Designing</span>,{' '}
              <span className="text-[#F28C28] font-semibold">Estimation</span>,{' '}
              <span className="text-[#F28C28] font-semibold">Supervision</span>,{' '}
              <span className="text-[#F28C28] font-semibold">Construction Works</span>{' '}
              etc.
            </p>
          </div>
        </div>
      </section>

      {/* 2. About RG Builders Engineers and Contractors Section */}
      <section className="py-24 bg-[#F7F6F2] relative overflow-hidden" id="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Architectural Image & Blueprint Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5E3DD] bg-zinc-900 group">
                <img
                  src="/images/residence.jpg"
                  alt="RG BUILDERS ENGINEERS AND CONTRACTORS Architectural Craftsmanship"
                  className="w-full h-[480px] sm:h-[560px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  <span className="text-xs font-mono text-[#F28C28] uppercase tracking-wider block mb-1">
                    Architectural Excellence
                  </span>
                  <p className="text-sm font-light text-zinc-200">
                    Precision engineering meets enduring aesthetics in every custom residential and commercial landmark we build.
                  </p>
                </div>
              </div>

              {/* Floating Monogram Accent */}
              <div className="hidden sm:flex absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-[#171717] border-2 border-[#F28C28] items-center justify-center shadow-2xl text-white font-heading font-black text-3xl">
                R<span className="text-[#F28C28]">G</span>
              </div>
            </div>

            {/* Right: Heading, Description & Three Visual Principles */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717]/5 text-xs font-mono text-[#171717] uppercase tracking-wider mb-4 border border-[#E5E3DD]">
                <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>Our Heritage &amp; Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#171717] tracking-tight leading-tight mb-6">
                MORE THAN BUILDINGS.{' '}
                <span className="text-[#F28C28]">WE BUILD TRUST.</span>
              </h2>

              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-8">
                At RG BUILDERS ENGINEERS AND CONTRACTORS, every project begins with a vision. Our approach combines thoughtful planning, quality-focused execution, and careful attention to detail to create spaces designed around the people who use them.
              </p>

              {/* Three Visual Principles */}
              <div className="space-y-4 mb-10">
                <div className="p-4 rounded-xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] text-[#F28C28] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-[#171717] uppercase tracking-wide">
                      QUALITY FIRST
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                      Focus on workmanship, certified grade materials, and exacting structural tolerances.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] text-[#F28C28] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-[#171717] uppercase tracking-wide">
                      BUILT ON TRUST
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                      Maintain transparent communication, transparent itemized BOQs, and fixed milestone pricing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171717] text-[#F28C28] font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-[#171717] uppercase tracking-wide">
                      DESIGNED TO LAST
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                      Prioritize practical design, seismic safety, long-term durability, and enduring architectural value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#171717] hover:bg-black text-white font-heading font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 text-[#F28C28]" />
                </Link>

                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#171717] hover:text-[#F28C28] px-4 py-3.5 transition-colors"
                >
                  <span>Request a Technical Brief</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Showcase */}
      <section className="py-24 bg-[#101010] text-white relative overflow-hidden" id="projects-section">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architectural Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                OUR FEATURED <span className="text-[#F28C28]">LANDMARKS.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
                Discover our signature residential villas, turnkey developments, and commercial facilities crafted to rigorous civil engineering standards.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#E07B17] text-black font-heading font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#F28C28]/20 shrink-0 self-start md:self-auto"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 text-zinc-500 font-mono text-sm">
              Loading featured projects...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Choose RG Builders Engineers and Contractors */}
      <section className="py-24 bg-[#F7F6F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: 6 Core Reasons Grid (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 text-xs font-mono text-[#171717] uppercase tracking-wider mb-3">
                <span>The RG Builders Engineers and Contractors Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#171717] tracking-tight mb-4">
                BUILT AROUND YOUR EXPECTATIONS.
              </h2>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-10">
                We believe exceptional architecture starts with respect for the client. Here is why homeowners, entrepreneurs, and institutions entrust their visions to RG BUILDERS ENGINEERS AND CONTRACTORS.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Quality-Focused Execution',
                    desc: 'Zero tolerance for substandard concrete mixes, compromised steel rebar, or shortcuts in structural integrity.',
                    icon: ShieldCheck
                  },
                  {
                    title: 'Transparent Communication',
                    desc: 'Regular photographic progress logs, documented material test certifications, and clear milestone invoicing.',
                    icon: Eye
                  },
                  {
                    title: 'Practical & Thoughtful Planning',
                    desc: 'Optimized natural light pathways, cross ventilation, structural efficiency, and long-term functional comfort.',
                    icon: Compass
                  },
                  {
                    title: 'Customer-Centered Approach',
                    desc: 'Direct access to senior project engineers and designated liaison managers from day one to handover.',
                    icon: Users
                  },
                  {
                    title: 'Safety-Conscious Work Practices',
                    desc: 'Mandatory PPE enforcement, scaffolding certifications, and strict hazard prevention on every job site.',
                    icon: HardHat
                  },
                  {
                    title: 'Attention to Detail',
                    desc: 'From laser-level terrazzo lines to seamless acoustic glazing, architectural precision is our benchmark.',
                    icon: CheckCircle
                  }
                ].map((reason, idx) => {
                  const Icon = reason.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-[#E5E3DD] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#171717] text-[#F28C28] flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#171717] mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-3 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-[#F28C28]/25 transition-all hover:-translate-y-0.5"
                >
                  <span>Let's Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Architectural Construction Site Photography (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E5E3DD] bg-zinc-900 group">
                <img
                  src="/images/site.jpg"
                  alt="RG BUILDERS ENGINEERS AND CONTRACTORS Site Management"
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>On-Site Governance</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Active site monitoring ensures material slump testing, curing verification, and safety protocols adhere strictly to national engineering codes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Office Showcase Gallery */}
      <section className="py-24 bg-[#141414] text-white relative overflow-hidden" id="gallery-section">
        <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Corporate Headquarters &amp; Studios</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                EXPLORE OUR <span className="text-[#F28C28]">OFFICE &amp; STUDIOS.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
                Step inside our architectural drafting studios, structural engineering consultation chambers, and executive meeting spaces.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-heading font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all shrink-0 self-start md:self-auto"
            >
              <span>Explore Office Gallery ({gallery.length})</span>
              <ArrowRight className="w-4 h-4 text-[#F28C28]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to="/gallery"
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#F28C28]/50 transition-all duration-300 flex flex-col shadow-lg"
              >
                <div className="relative h-60 overflow-hidden bg-black">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F28C28] text-black">
                      {item.category || 'Office'}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-[#F28C28] transition-colors leading-snug line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section (Clearly identified demonstration content) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-3">
              <span>Client Perspectives</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#171717] tracking-tight mb-3">
              CLIENT TESTIMONIALS &amp; REVIEWS
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              We uphold genuine transparency. Demonstration feedback below illustrates the standard of communication, craftsmanship, and accountability our clients experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-2xl bg-[#F7F6F2] border border-[#E5E3DD] shadow-sm flex flex-col justify-between hover:border-[#F28C28]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F28C28] mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-zinc-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;{t.feedback}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E3DD] flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#171717]">{t.clientName}</h4>
                    <span className="text-xs text-zinc-500">{t.projectType} &middot; {t.location}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-600">
                    Demo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (Interactive Accordion) */}
      <section className="py-24 bg-[#171717] text-white relative overflow-hidden" id="faq-section">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-3 border border-white/10">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clarity &amp; Confidence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Find clear, straightforward answers about our construction methodologies, preliminary estimation, design consultations, and project timelines.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#202020] border border-zinc-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-[#F28C28]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-xs text-zinc-400">
            Have a custom query regarding your specific plot or building?{' '}
            <Link to="/contact" className="text-[#F28C28] font-bold underline ml-1">
              Speak directly with an engineer
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="py-20 bg-[#F28C28] text-[#171717] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest font-bold block mb-1 text-black/80">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight leading-tight">
              READY TO BUILD SOMETHING EXTRAORDINARY?
            </h2>
            <p className="text-sm sm:text-base font-medium text-black/80 mt-2">
              Request a free technical quotation or schedule a consultation with our senior architectural team today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/quote"
              id="cta-free-quote-btn"
              className="bg-[#171717] hover:bg-black text-white font-heading font-bold text-sm px-8 py-4 rounded-xl shadow-xl transition-transform hover:-translate-y-0.5"
            >
              Request a Free Quote
            </Link>
            <Link
              to="/contact"
              className="bg-white/30 hover:bg-white/40 text-black border border-black/20 font-heading font-bold text-sm px-7 py-4 rounded-xl transition-colors"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
