import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Maximize2,
  X,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { GalleryItem } from '../types';

export function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    api.getGallery().then((res) => {
      if (res.success) {
        setGallery(res.gallery);
      }
      setLoading(false);
    }).catch((err) => {
      console.error('Failed to load gallery:', err);
      setLoading(false);
    });
  }, []);

  const dynamicCategories = ['All', ...Array.from(new Set(gallery.map((g) => g.category || 'Office')))];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return (item.category || 'Office').toLowerCase() === selectedCategory.toLowerCase();
  });

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else if (lightboxIndex === 0) {
      setLightboxIndex(filteredItems.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else if (lightboxIndex === filteredItems.length - 1) {
      setLightboxIndex(0);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#101010] text-white min-h-screen">
      <SEO
        title="Our Office & Studios Gallery — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Experience our corporate headquarters, architectural design studios, structural engineering consultancies, and material selection suites."
      />

      {/* Hero Header Section */}
      <section className="py-20 relative overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate Headquarters &amp; Studios</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              OUR OFFICE &amp; <span className="text-[#F28C28]">DESIGN STUDIOS.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Step inside our modern architectural drafting studios, structural engineering consultation chambers, material display rooms, and executive boardrooms.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="py-8 bg-[#171717] border-b border-zinc-800 sticky top-16 z-20 backdrop-blur-md bg-[#171717]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {dynamicCategories.map((cat) => {
                const count = cat === 'All'
                  ? gallery.length
                  : gallery.filter((g) => (g.category || 'Office').toLowerCase() === cat.toLowerCase()).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#F28C28] text-[#171717] font-bold shadow-lg shadow-[#F28C28]/20'
                        : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Office Spaces' : cat}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${selectedCategory === cat ? 'bg-black/20 text-black' : 'bg-black/40 text-zinc-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-zinc-400 font-mono hidden md:block">
              Showing {filteredItems.length} of {gallery.length} office spaces
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24 text-zinc-500 font-mono">Loading office gallery...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-28 text-zinc-500">
              <Building2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-base text-zinc-400">No office photos found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="mt-3 text-[#F28C28] text-xs font-bold underline"
              >
                View all office photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-[#171717] rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-[#F28C28]/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-zinc-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md bg-[#F28C28] text-black">
                        {item.category || 'Office'}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-black">
                      <Maximize2 className="w-4 h-4 text-[#F28C28]" />
                    </div>

                    {/* Bottom overlay copy */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#F28C28] transition-colors leading-snug mb-1.5">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            title="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 text-white hover:bg-[#F28C28] hover:text-black transition-all"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 text-white hover:bg-[#F28C28] hover:text-black transition-all"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-4xl w-full bg-[#171717] rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain max-h-[65vh]"
              />
            </div>

            <div className="p-6 sm:p-8 bg-[#171717] border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#F28C28] text-black">
                  {activeLightboxItem.category || 'Office'}
                </span>
                <span className="text-zinc-500 text-xs font-mono">
                  Photo {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                {activeLightboxItem.title}
              </h2>
              {activeLightboxItem.description && (
                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  {activeLightboxItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Office Visit & Consultation Call to Action */}
      <section className="mt-12 py-16 bg-[#171717] border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F28C28] font-bold block mb-1">
              In-Person Architectural Consultations
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              VISIT OUR OFFICE IN PERSON
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Meet our principal architects and civil engineers at our corporate office, inspect structural drawings, and review custom material samples over coffee.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="bg-[#F28C28] hover:bg-[#E07B17] text-black font-heading font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <span>Schedule Office Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
