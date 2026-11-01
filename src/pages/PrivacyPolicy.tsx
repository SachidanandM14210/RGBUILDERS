import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Privacy Policy — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Learn how RG BUILDERS ENGINEERS AND CONTRACTORS handles client confidential project details, architectural blueprints, and personal data."
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
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono text-[#F28C28]">
            Effective Date: January 1, 2026 &middot; Version 2.4
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E3DD] shadow-sm prose prose-zinc max-w-none text-zinc-700 text-sm leading-relaxed space-y-6">
          <p>
            At <strong>RG BUILDERS ENGINEERS AND CONTRACTORS</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we recognize that building a home or commercial property involves sharing sensitive architectural, financial, and spatial details. This Privacy Policy details our strict standards for collecting, protecting, and managing your information.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            1. Information We Collect
          </h2>
          <p>
            When you engage with our quotation system, cost estimators, or contact forms, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact identifiers: Full name, phone number, email address.</li>
            <li>Project specifics: Plot location, anticipated built-up area, desired architectural typology, and approximate budget bracket.</li>
            <li>Communications: Records of technical inquiries, consultation notes, and blueprint requirements.</li>
          </ul>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            2. Purpose of Processing
          </h2>
          <p>
            We process your information exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Formulate tailored structural, architectural, and financial proposals (Bills of Quantities).</li>
            <li>Coordinate site visits, soil inspections, and architectural design workshops.</li>
            <li>Provide project status alerts via phone, email, or authorized WhatsApp integrations.</li>
          </ul>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            3. Data Non-Disclosure &amp; Confidentiality
          </h2>
          <p>
            We do not sell, rent, or monetize client project information to third-party marketing brokers. Architectural blueprints and site locations remain strictly confidential and are shared solely with authorized structural engineers and statutory municipal clearance personnel directly assigned to your project.
          </p>

          <h2 className="text-xl font-heading font-bold text-[#171717] pt-4 border-t border-zinc-100">
            4. Data Retention &amp; Rights
          </h2>
          <p>
            You may at any time request an export or permanent purge of your project inquiry record from our administrative database by contacting <a href="mailto:privacy@rgconstruction.com" className="text-[#F28C28] font-bold">privacy@rgconstruction.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
