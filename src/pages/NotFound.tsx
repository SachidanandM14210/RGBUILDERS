import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <SEO title="Page Not Found (404) — RG BUILDERS ENGINEERS AND CONTRACTORS" />

      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6 bg-zinc-900/80 p-8 sm:p-12 rounded-3xl border border-zinc-800 backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#171717] border border-zinc-700 mx-auto flex items-center justify-center text-[#F28C28]">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#F28C28] font-bold block mb-1">
            Structural Error 404
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight">
            SITE OFF THE BLUEPRINT
          </h1>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            The architectural coordinates you entered do not correspond to any active structure in our registry.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-3 px-6 rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs py-3 px-6 rounded-xl border border-white/10 transition-colors"
          >
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
