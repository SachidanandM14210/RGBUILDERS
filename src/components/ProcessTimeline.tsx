import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Compass, FileSpreadsheet, HardHat, CheckCircle2, Key, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: '01',
    title: 'Initial Consultation',
    subtitle: 'Understanding Goals & Vision',
    icon: MessageSquare,
    description: 'We meet to understand your lifestyle requirements, spatial preferences, plot characteristics, timeline expectations, and initial budget boundaries.',
    deliverable: 'Initial Project Brief & Site Feasibility Notes'
  },
  {
    step: '02',
    title: 'Planning and Design',
    subtitle: 'Architectural Exploration',
    icon: Compass,
    description: 'Our architectural team develops the conceptual floor plans, 3D structural massing models, natural lighting orientations, and spatial layouts.',
    deliverable: 'Concept Blueprints & Photorealistic 3D Renders'
  },
  {
    step: '03',
    title: 'Estimate and Proposal',
    subtitle: 'Transparent Scope & Timeline',
    icon: FileSpreadsheet,
    description: 'We provide an itemized Bill of Quantities (BOQ), material specifications schedule, milestone payment schedule, and binding construction timeline.',
    deliverable: 'Detailed BOQ, Scope Contract & Gantt Chart'
  },
  {
    step: '04',
    title: 'Construction',
    subtitle: 'Precision Structural Execution',
    icon: HardHat,
    description: 'Civil and structural engineering teams execute ground breaking, foundation piling, reinforced concrete framing, and masonry under daily quality oversight.',
    deliverable: 'Weekly Digital Photo Logs & Milestone Sign-offs'
  },
  {
    step: '05',
    title: 'Quality Review',
    subtitle: 'Multi-Point Rigorous Audit',
    icon: CheckCircle2,
    description: 'Every plumbing line, electrical conduit, leveling tolerance, and surface finish undergoes strict snag-list testing before client walkthrough.',
    deliverable: 'Structural Integrity Certification & Snag Resolution'
  },
  {
    step: '06',
    title: 'Final Handover',
    subtitle: 'Keys & Documentation Transfer',
    icon: Key,
    description: 'We conduct the formal walkthrough, hand over all architectural as-built blueprints, warranty certificates, municipal approvals, and keys.',
    deliverable: 'Handover Dossier, Warranty Seals & Keys'
  }
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-[#171717] text-white relative overflow-hidden" id="process-section">
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/10">
            <span>Engineering Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-4">
            FROM FIRST IDEA TO FINAL HANDOVER.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Our systematic 6-step project lifecycle eliminates uncertainty, ensuring every milestone is delivered on schedule, on budget, and to architectural perfection.
          </p>
        </div>

        {/* Step Progress Bar (Desktop Interactive) */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-12 relative">
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-zinc-800 -z-0" />
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 flex flex-col items-center text-center p-3 rounded-xl transition-all duration-300 focus:outline-none ${
                  isSelected ? 'bg-white/10 shadow-lg scale-105' : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-sm mb-3 transition-colors ${
                    isSelected
                      ? 'bg-[#F28C28] text-[#171717] shadow-lg shadow-[#F28C28]/30'
                      : 'bg-[#222222] text-zinc-400 border border-zinc-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#F28C28] font-bold block mb-0.5">
                  STEP {s.step}
                </span>
                <span className="text-xs font-heading font-semibold text-white line-clamp-1">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop Step Highlight Card */}
        <div className="hidden lg:block bg-[#1f1f1f] rounded-2xl border border-zinc-800 p-8 shadow-2xl">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-2">
                <span>Phase {steps[activeStep].step}</span>
                <span>&middot;</span>
                <span>{steps[activeStep].subtitle}</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-3">
                <span className="font-mono text-[#F28C28] uppercase tracking-wider font-semibold">
                  Key Deliverable:
                </span>
                <span className="text-white font-medium">{steps[activeStep].deliverable}</span>
              </div>
            </div>
            <div className="col-span-4 flex flex-col justify-center items-center p-6 bg-black/30 rounded-xl border border-zinc-800/80 text-center">
              <span className="text-6xl font-heading font-black text-white/10 mb-2">
                {steps[activeStep].step}
              </span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
                Structured Governance
              </span>
              <Link
                to="/quote"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-2.5 px-4 rounded-lg transition-colors"
              >
                <span>Initiate This Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-6 relative pl-6 border-l-2 border-zinc-800">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative group">
                <div className="absolute -left-[35px] top-1 w-8 h-8 rounded-lg bg-[#222222] border border-zinc-700 flex items-center justify-center text-[#F28C28] text-xs font-bold">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="bg-[#1f1f1f] rounded-xl p-5 border border-zinc-800">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#F28C28] mb-1">
                    <span>STEP {s.step}</span>
                    <span>{s.subtitle}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{s.description}</p>
                  <div className="text-[11px] bg-black/40 p-2.5 rounded border border-zinc-800 text-zinc-300">
                    <strong className="text-[#F28C28]">Deliverable:</strong> {s.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
