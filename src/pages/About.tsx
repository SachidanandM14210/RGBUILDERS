import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, HeartHandshake, Building2, HardHat, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export function About() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="About Us — RG BUILDERS ENGINEERS AND CONTRACTORS | Building Dreams. Creating Landmarks"
        description="Discover the architectural philosophy, civil engineering standards, and commitment to transparency that drives RG BUILDERS ENGINEERS AND CONTRACTORS."
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Our Identity &amp; Purpose</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              MORE THAN BUILDINGS.{' '}
              <span className="text-[#F28C28]">WE BUILD TRUST.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              At RG BUILDERS ENGINEERS AND CONTRACTORS, every project begins with a vision. Our approach combines thoughtful planning, quality-focused execution, and careful attention to detail to create spaces designed around the people who use them.
            </p>
          </div>
        </div>
      </section>

      {/* Core Brand Narrative & Architectural Visuals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E5E3DD] bg-zinc-900 group">
                <img
                  src="/images/residence.jpg"
                  alt="Architectural Construction Standards"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E3DD] shadow-sm">
                <div className="text-xs font-mono uppercase tracking-wider text-[#F28C28] font-semibold mb-2">
                  Brand Philosophy
                </div>
                <blockquote className="text-sm text-zinc-700 italic leading-relaxed">
                  &ldquo;A building is not merely reinforced steel and poured concrete; it is a permanent backdrop to human lives, dreams, and enterprise. We construct with that gravity in mind.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#171717] tracking-tight mb-6">
                ARCHITECTURAL PRECISION &middot; CIVIL INTEGRITY
              </h2>

              <p className="text-zinc-700 text-base leading-relaxed mb-6">
                RG BUILDERS ENGINEERS AND CONTRACTORS was established with a singular directive: to bridge the gap between ambitious architectural imagination and uncompromised on-ground civil execution. Far too often in the building industry, design vision is diluted during construction. We eliminate that divide by housing architectural concepts, structural calculations, and site management under unified leadership.
              </p>

              <p className="text-zinc-700 text-base leading-relaxed mb-8">
                Whether creating a cantilevered luxury residence, executing a high-traffic commercial workspace, or revitalizing a heritage duplex, we approach every blueprint with reverence for precision, safety, and durability.
              </p>

              {/* Three Visual Principles Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#F28C28] font-heading font-black text-base flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#171717]">QUALITY FIRST</h3>
                    <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                      Rigorous material testing, branded structural rebar, controlled water-cement ratios, and laser-accurate leveling tolerances.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#F28C28] font-heading font-black text-base flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#171717]">BUILT ON TRUST</h3>
                    <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                      Unambiguous contracts, itemized bills of quantities (BOQ), milestone-based disbursements, and transparent progress reports with zero hidden surprises.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5E3DD] shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#F28C28] font-heading font-black text-base flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#171717]">DESIGNED TO LAST</h3>
                    <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                      Seismic-compliant engineering, advanced moisture and waterproofing barriers, thermal efficiency, and timeless structural proportions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-20 bg-white border-y border-[#E5E3DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#171717] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F28C28]/10 rounded-full blur-2xl" />
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#F28C28] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">OUR MISSION</h3>
              <p className="text-zinc-300 text-base leading-relaxed">
                To engineer and construct residential, commercial, and architectural landmarks of exceptional durability and beauty, providing clients with complete transparency, uncompromising safety, and single-point turnkey accountability.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F6F2] border border-[#E5E3DD] text-[#171717]">
              <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#F28C28] flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4">OUR VISION</h3>
              <p className="text-zinc-700 text-base leading-relaxed">
                To be recognized as a premier construction and architectural engineering firm admired for design integrity, sustainable building practices, and lasting client relationships founded on unwavering trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Quality Protocols */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-heading font-extrabold text-[#171717] tracking-tight mb-3">
              SAFETY-CONSCIOUS WORK PRACTICES
            </h2>
            <p className="text-zinc-600 text-base">
              Construction excellence is incomplete without zero-compromise occupational safety on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E3DD]">
              <HardHat className="w-8 h-8 text-[#F28C28] mb-4" />
              <h4 className="font-heading font-bold text-base text-[#171717] mb-2">
                Mandatory Site Safety
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Daily safety briefings, certified scaffolding structures, fall arrest systems, and strict PPE compliance across all workers and visitors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E3DD]">
              <ShieldCheck className="w-8 h-8 text-[#F28C28] mb-4" />
              <h4 className="font-heading font-bold text-base text-[#171717] mb-2">
                Certified Material Sourcing
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All raw materials (cement, structural steel, aggregates, ready-mix concrete) are procured from verified manufacturers with mill test certificates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E3DD]">
              <HeartHandshake className="w-8 h-8 text-[#F28C28] mb-4" />
              <h4 className="font-heading font-bold text-base text-[#171717] mb-2">
                Client-Centric Management
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dedicated project managers maintain continuous open communication, site walkthroughs, and prompt resolution of technical queries.
              </p>
            </div>
          </div>

          <div className="mt-14 p-8 rounded-3xl bg-[#171717] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-1">Have an architectural concept ready?</h3>
              <p className="text-zinc-400 text-sm">Schedule a technical consultation with our engineering team.</p>
            </div>
            <Link
              to="/quote"
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold px-7 py-3.5 rounded-xl shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Get Free Technical Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
