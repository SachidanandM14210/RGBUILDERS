import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Building2, HelpCircle, PhoneCall } from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { Service } from '../types';

export function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getService(slug)
      .then((res) => {
        if (res.success && res.service) {
          setService(res.service);
        } else {
          setError('Service not found.');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load service details.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex items-center justify-center font-mono text-zinc-500">
        Loading service specifications...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-heading font-bold text-zinc-900 mb-4">Service Not Found</h2>
        <p className="text-zinc-600 mb-6">{error || 'The requested construction service could not be located.'}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-xl font-heading font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Solutions</span>
        </Link>
      </div>
    );
  }

  // Parse JSON features & steps
  let features: string[] = [];
  try {
    features = service.features ? JSON.parse(service.features) : [];
  } catch (e) {
    features = [];
  }

  let processSteps: string[] = [];
  try {
    processSteps = service.processSteps ? JSON.parse(service.processSteps) : [];
  } catch (e) {
    processSteps = [];
  }

  const handleRequestQuote = () => {
    navigate('/quote', {
      state: {
        prefilledType: service.title,
      }
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title={`${service.title} — RG BUILDERS ENGINEERS AND CONTRACTORS Solutions`}
        description={service.shortDesc}
      />

      {/* Hero Banner with Architectural Image */}
      <section className="bg-[#171717] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Solutions</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>RG BUILDERS ENGINEERS AND CONTRACTORS Service Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Details, Image, Scope */}
            <div className="lg:col-span-8 space-y-10">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E5E3DD] bg-zinc-900 h-96 sm:h-[440px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#171717] mb-4">
                  Engineering Scope &amp; Methodology
                </h2>
                <p className="text-zinc-700 text-base leading-relaxed whitespace-pre-line">
                  {service.fullDesc}
                </p>
              </div>

              {/* Key Technical Features */}
              {features.length > 0 && (
                <div className="p-8 rounded-3xl bg-white border border-[#E5E3DD] shadow-sm">
                  <h3 className="text-xl font-heading font-bold text-[#171717] mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#F28C28]" />
                    <span>Included Specifications &amp; Quality Benchmarks</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phased Workflow */}
              {processSteps.length > 0 && (
                <div>
                  <h3 className="text-2xl font-heading font-bold text-[#171717] mb-6">
                    Project Execution Journey
                  </h3>
                  <div className="space-y-3">
                    {processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white border border-[#E5E3DD] flex items-center gap-4 shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F28C28] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-zinc-800">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Columns: Sticky Quick Action Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 bg-[#171717] text-white p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F28C28] block mb-1">
                    Direct Quote Request
                  </span>
                  <h3 className="text-xl font-heading font-bold text-white">
                    Ready to build with this solution?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Submit your approximate plot or building parameters to receive an itemized proposal from our senior civil engineers.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <span>Request Quotation for {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/#cost-estimator"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-xl text-xs font-semibold border border-white/15 transition-colors"
                  >
                    <span>Use Cost Estimator</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
                    <span>Fixed Milestone Agreements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28C28]" />
                    <span>No Obligation Initial Consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
