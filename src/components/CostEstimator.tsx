import { useState } from 'react';
import { Calculator, ArrowRight, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CostEstimatorProps {
  rates?: {
    standard: number;
    premium: number;
    luxury: number;
  };
}

export function CostEstimator({
  rates = {
    standard: 1850,
    premium: 2400,
    luxury: 3200,
  }
}: CostEstimatorProps) {
  const navigate = useNavigate();

  const [projectType, setProjectType] = useState('New House Construction');
  const [areaInput, setAreaInput] = useState<string>('2500');
  const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');
  const [specification, setSpecification] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [location, setLocation] = useState('');

  // Conversion calculations
  const parsedArea = parseFloat(areaInput) || 0;
  // Convert sqm to sqft for calculation if needed
  const areaInSqFt = unit === 'sqm' ? parsedArea * 10.7639 : parsedArea;

  const baseRate = rates[specification] || rates.premium;
  const estimatedMin = Math.round(areaInSqFt * baseRate * 0.95);
  const estimatedMax = Math.round(areaInSqFt * baseRate * 1.08);

  const formatCurrency = (val: number) => {
    if (isNaN(val) || val <= 0) return '—';
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleProceedToQuote = () => {
    navigate('/quote', {
      state: {
        prefilledType: projectType,
        prefilledArea: `${parsedArea} ${unit === 'sqft' ? 'Sq. Ft.' : 'Sq. Metres'}`,
        prefilledLocation: location,
        prefilledSpec: specification,
        estimatedRange: `${formatCurrency(estimatedMin)} – ${formatCurrency(estimatedMax)}`
      }
    });
  };

  return (
    <section className="py-20 bg-[#F7F6F2] relative overflow-hidden" id="cost-estimator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171717] rounded-3xl p-8 sm:p-12 text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Form Controls (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
                <Calculator className="w-3.5 h-3.5" />
                <span>Preliminary Planning Tool</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight mb-3">
                PROJECT COST ESTIMATOR
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-8">
                Calculate an indicative budget projection based on your approximate built-up area and chosen specification standards.
              </p>

              <div className="space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#222222] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F28C28]"
                  >
                    <option value="New House Construction">New House Construction</option>
                    <option value="Luxury Villa Construction">Luxury Villa Construction</option>
                    <option value="Commercial Building">Commercial Building</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                    <option value="Architectural Design & Blueprint">Architectural Design & Blueprint</option>
                    <option value="Turnkey Construction">Turnkey Construction</option>
                  </select>
                </div>

                {/* Built-Up Area & Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Approximate Built-up Area
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="1000000"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      placeholder="e.g. 2500"
                      className="w-full bg-[#222222] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F28C28]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      Measurement Unit
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-[#222222] p-1 rounded-xl border border-zinc-700">
                      <button
                        type="button"
                        onClick={() => setUnit('sqft')}
                        className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                          unit === 'sqft' ? 'bg-[#F28C28] text-[#171717]' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Sq. Ft.
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit('sqm')}
                        className={`py-2 text-xs font-semibold rounded-lg transition-colors ${
                          unit === 'sqm' ? 'bg-[#F28C28] text-[#171717]' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Sq. Metres
                      </button>
                    </div>
                  </div>
                </div>

                {/* Specification Level */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Construction Specification Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        key: 'standard',
                        label: 'Standard',
                        desc: 'Sturdy structural build, standard vitrified flooring, branded fixtures.'
                      },
                      {
                        key: 'premium',
                        label: 'Premium',
                        desc: 'Thermal glazing, Italian marble accents, designer teak joinery.'
                      },
                      {
                        key: 'luxury',
                        label: 'Luxury / Landmark',
                        desc: 'Bespoke cantilever engineering, smart automation, imported stones.'
                      }
                    ].map((spec) => (
                      <button
                        key={spec.key}
                        type="button"
                        onClick={() => setSpecification(spec.key as any)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          specification === spec.key
                            ? 'bg-[#F28C28]/15 border-[#F28C28] text-white shadow-md'
                            : 'bg-[#222222] border-zinc-750 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading font-bold text-sm text-white capitalize">{spec.label}</span>
                          {specification === spec.key && <span className="w-2 h-2 rounded-full bg-[#F28C28]" />}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight">{spec.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Location */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                    Proposed Site Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. North Hill Sector 12, Metro City"
                    className="w-full bg-[#222222] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F28C28]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Indicative Projection Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-[#121212] rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Preliminary Projection
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] bg-[#F28C28]/20 text-[#F28C28] font-bold">
                    Non-Binding
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-xs text-zinc-400 block mb-1">Estimated Budget Range:</span>
                  <div className="text-3xl sm:text-4xl font-heading font-black text-white text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#F28C28]">
                    {formatCurrency(estimatedMin)} – {formatCurrency(estimatedMax)}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 mt-1 block">
                    Calculated for {parsedArea} {unit === 'sqft' ? 'Sq. Ft.' : 'Sq. Metres'} ({Math.round(areaInSqFt)} sq.ft. equivalent)
                  </span>
                </div>

                {/* Scope Breakdown */}
                <div className="space-y-2.5 py-4 border-y border-zinc-800 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Base Rate Baseline:</span>
                    <span className="font-mono text-white">₹{baseRate} / sq.ft.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Selected Tier:</span>
                    <span className="font-semibold text-[#F28C28] uppercase">{specification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Core Engineering:</span>
                    <span className="text-zinc-200">Earthquake-resistant RCC Included</span>
                  </div>
                </div>

                {/* Important Disclaimer Note */}
                <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Notice:</strong> This projection is preliminary and based on general industry benchmarks. Actual rates depend on soil geotechnical tests, architectural blueprints, steel market indices, and municipal requirements.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={handleProceedToQuote}
                  id="estimator-quote-btn"
                  className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-[#F28C28]/30"
                >
                  <span>Request Official Itemized Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
