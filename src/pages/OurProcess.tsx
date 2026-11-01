import { Link } from 'react-router-dom';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { SEO } from '../components/SEO';
import { ArrowRight, ShieldCheck, CheckCircle2, ClipboardCheck, Sparkles, HardHat } from 'lucide-react';

export function OurProcess() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Our Construction Process — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Explore RG BUILDERS ENGINEERS AND CONTRACTORS's systematic 6-step delivery framework: from initial consultation and 3D architectural blueprints to final handover."
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Delivery Framework</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              FROM FIRST IDEA TO <span className="text-[#F28C28]">FINAL HANDOVER.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Construction is a symphony of architecture, civil engineering, and meticulous logistics. Our 6-phase governance model guarantees absolute clarity at every milestone.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Timeline */}
      <ProcessTimeline />

      {/* Quality Gate Guarantee */}
      <section className="py-20 bg-white border-t border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-heading font-extrabold text-[#171717] tracking-tight mb-3">
              THE 5-POINT QUALITY GATE SYSTEM
            </h2>
            <p className="text-zinc-600 text-base">
              No subsequent construction phase begins until the preceding phase passes certified structural verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F7F6F2] border border-[#E5E3DD]">
              <div className="text-xs font-mono text-[#F28C28] font-bold mb-1">GATE 01</div>
              <h3 className="font-heading font-bold text-base text-[#171717] mb-2">Soil &amp; Footing Audit</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Geotechnical laboratory analysis determines precise rebar placement and concrete foundation depth before column framing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F6F2] border border-[#E5E3DD]">
              <div className="text-xs font-mono text-[#F28C28] font-bold mb-1">GATE 02</div>
              <h3 className="font-heading font-bold text-base text-[#171717] mb-2">Rebar &amp; Shuttering Sign-off</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Prior to every concrete pour, structural engineers independently check steel tie spacing, cover blocks, and formwork alignment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F6F2] border border-[#E5E3DD]">
              <div className="text-xs font-mono text-[#F28C28] font-bold mb-1">GATE 03</div>
              <h3 className="font-heading font-bold text-base text-[#171717] mb-2">Waterproofing Pressure Test</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Terraces, wet areas, and basements undergo 72-hour standing water ponding tests before tiling or interior plastering.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-[#171717] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-1">Experience this disciplined execution on your project</h3>
              <p className="text-zinc-400 text-sm">Schedule your Step 01 Initial Consultation today.</p>
            </div>
            <Link
              to="/quote"
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
