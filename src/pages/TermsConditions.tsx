import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function TermsConditions() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Terms &amp; Conditions — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Review the terms of service, preliminary estimation disclaimers, and engagement principles of RG BUILDERS ENGINEERS AND CONTRACTORS."
      />

      <section className="bg-[#171717] text-white py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-2">
            TERMS &amp; CONDITIONS
          </h1>
          <p className="text-xs font-mono text-[#F28C28]">
            Last Updated: January 2026 &middot; Construction &amp; Engineering Terms
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E3DD] shadow-sm text-zinc-700 text-sm leading-relaxed space-y-6">
          <p>
            Welcome to the digital portal of <strong>RG BUILDERS ENGINEERS AND CONTRACTORS</strong>. By browsing this website, requesting project quotations, or utilizing our interactive preliminary cost estimator, you agree to comply with the terms set forth below.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            1. Nature of Preliminary Quotations &amp; Estimators
          </h2>
          <p>
            Any preliminary calculations produced by the online Project Cost Estimator or example budget categories are strictly indicative and non-binding. Binding construction agreements are established solely upon completion of geotechnical soil investigations, signed architectural blueprints, and a formally executed Bill of Quantities (BOQ) contract.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            2. Demonstration Imagery &amp; Architectural Concepts
          </h2>
          <p>
            Certain images and project references across this platform represent architectural models, demonstration renderings, and structural case studies designed to illustrate engineering methodologies and aesthetic standards. They do not represent completed client projects unless explicitly verified in writing.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            3. Intellectual Property
          </h2>
          <p>
            All custom graphics, architectural photographs, brand marks, and software layouts displayed on this website are the intellectual property of RG BUILDERS ENGINEERS AND CONTRACTORS and may not be copied or repurposed without written authorization.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            4. Dispute Resolution
          </h2>
          <p>
            All commercial inquiries and future structural contracts are governed in accordance with the applicable laws of the jurisdiction in which construction execution takes place.
          </p>
        </div>
      </section>
    </div>
  );
}
