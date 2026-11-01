import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ServiceCard } from '../components/ServiceCard';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { Service } from '../types';
import { ArrowRight, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServices().then((res) => {
      if (res.success) {
        setServices(res.services);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Construction Solutions & Services — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Explore RG BUILDERS ENGINEERS AND CONTRACTORS's end-to-end solutions: Residential building, commercial developments, architectural design, renovation, project management, and turnkey execution."
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Engineering Expertise</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              COMPLETE CONSTRUCTION <span className="text-[#F28C28]">SOLUTIONS.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              We provide integrated, end-to-end architectural and civil construction services tailored to the highest engineering standards and transparent client agreements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-zinc-500 font-mono">Loading RG Builders Engineers and Contractors Solutions...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          )}

          {/* Pricing Model Transparency Box */}
          <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E3DD] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-2 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Fair &amp; Transparent Contracts</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#171717] mb-3">
                  Scope-Defined Milestone Execution
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  We reject ambiguous cost approximations. Every service proposal begins with a comprehensive site review and structural bill of quantities (BOQ) with guaranteed milestones. You know precisely what materials are utilized and what stage payments are due before groundbreaking commences.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-700">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#F28C28]" /> Standardized BOQ</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#F28C28]" /> Soil Geotechnical Testing</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#F28C28]" /> Stage-wise Sign-offs</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  to="/quote"
                  className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-center py-3.5 px-6 rounded-xl text-sm shadow-md transition-all"
                >
                  Request a Solution Quote
                </Link>
                <Link
                  to="/#cost-estimator"
                  className="w-full bg-[#171717] hover:bg-black text-white font-heading font-semibold text-center py-3 px-6 rounded-xl text-xs transition-colors"
                >
                  Use Online Cost Estimator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
