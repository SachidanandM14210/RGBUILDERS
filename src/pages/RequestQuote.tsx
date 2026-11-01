import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Printer
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';

export function RequestQuote() {
  const location = useLocation();
  const prefilled = (location.state as any) || {};

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectLocation: prefilled.prefilledLocation || '',
    projectType: prefilled.prefilledType || 'New House Construction',
    plotArea: prefilled.prefilledArea || '',
    budget: 'Not Yet Decided',
    expectedStartDate: 'Next 30–60 Days',
    projectDescription: prefilled.prefilledDescription || '',
    preferredContactMethod: 'Phone',
    agreePrivacy: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    refCode: string;
    enquiryId: number;
    whatsappNumber: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectTypes = [
    'New House Construction',
    'Villa Construction',
    'Commercial Building',
    'Renovation',
    'Architectural Design',
    'Turnkey Construction',
    'Other'
  ];

  const budgetOptions = [
    'Under ₹10 Lakhs',
    '₹10–25 Lakhs',
    '₹25–50 Lakhs',
    '₹50 Lakhs–₹1 Crore',
    'Above ₹1 Crore',
    'Not Yet Decided'
  ];

  const startDateOptions = [
    'Immediately (Within 15 days)',
    'Next 30–60 Days',
    'Within 3 to 6 Months',
    'Planning Phase (6+ Months)',
    'Flexible'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number (minimum 8 digits).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.projectLocation.trim()) {
      setErrorMessage('Project or plot location is required.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      setErrorMessage('Please provide a brief description of your project requirements.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMessage('You must acknowledge our privacy notice to proceed.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        plotArea: formData.plotArea,
        budget: formData.budget,
        expectedStartDate: formData.expectedStartDate,
        projectDescription: formData.projectDescription,
        preferredContactMethod: formData.preferredContactMethod,
      });

      if (res.success) {
        setSuccessData({
          refCode: res.refCode,
          enquiryId: res.enquiryId,
          whatsappNumber: res.whatsappNumber,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while transmitting your request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Request a Free Quote &amp; Project Enquiry — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Request a preliminary construction quote from RG BUILDERS ENGINEERS AND CONTRACTORS. Submit your project requirements to receive an itemized estimation from our senior civil engineers."
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Transparent Project Planning</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              PROJECT ENQUIRY &amp; <span className="text-[#F28C28]">FREE QUOTATION</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
              Every landmark starts with a blueprint. Share your site parameters and architectural goals below to receive a customized technical proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Body */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {successData ? (
            /* Success State */
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5E3DD] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                  Submission Verified
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#171717]">
                  Your Project Quotation Request is Registered!
                </h2>
                <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
                  Our senior structural estimators are reviewing your parameters. An itemized proposal will be compiled for your review.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#171717] text-white border border-zinc-800 shadow-lg">
                <span className="text-xs font-mono text-zinc-400 block mb-1">Official Reference Code:</span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F28C28] tracking-wider">
                  {successData.refCode}
                </div>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  Please preserve this code for all project correspondence.
                </span>
              </div>

              {/* Summary Breakdown */}
              <div className="max-w-md mx-auto text-left bg-zinc-50 p-5 rounded-2xl border border-zinc-200 text-xs text-zinc-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Applicant:</span>
                  <span className="font-semibold text-zinc-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Project Type:</span>
                  <span className="font-semibold text-zinc-900">{formData.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Site Location:</span>
                  <span className="font-semibold text-zinc-900">{formData.projectLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Planned Start:</span>
                  <span className="font-semibold text-zinc-900">{formData.expectedStartDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/${successData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello RG BUILDERS ENGINEERS AND CONTRACTORS, I have submitted quote request ${successData.refCode} for ${formData.projectType} at ${formData.projectLocation}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-heading font-semibold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Summary</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSuccessData(null)}
                  className="w-full sm:w-auto text-xs text-zinc-500 hover:text-zinc-900 underline py-2"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E3DD] shadow-xl">
              {/* Pre-fill Notice if passed from Cost Estimator */}
              {prefilled.estimatedRange && (
                <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4">
                  <div>
                    <strong className="block text-sm text-amber-950 font-heading">
                      Preliminary Projection Imported: {prefilled.estimatedRange}
                    </strong>
                    <span>Your built-up area and specification level have been pre-filled below.</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 font-mono text-[10px] font-bold">
                    PRE-FILLED
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Contact Information */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#171717] pb-3 border-b border-zinc-200 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#171717] text-[#F28C28] text-xs font-mono flex items-center justify-center">1</span>
                    <span>Client Contact Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Full Name <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Sharma"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Phone Number <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Email Address <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. vikram@example.com"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Project Parameters */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#171717] pb-3 border-b border-zinc-200 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#171717] text-[#F28C28] text-xs font-mono flex items-center justify-center">2</span>
                    <span>Project &amp; Site Parameters</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Project Location / City <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                        placeholder="e.g. North Hill Sector 12, Metro City"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Project Type <span className="text-[#F28C28]">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Approximate Plot / Building Area
                      </label>
                      <input
                        type="text"
                        value={formData.plotArea}
                        onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                        placeholder="e.g. 2,500 sq.ft."
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Target Starting Date
                      </label>
                      <select
                        value={formData.expectedStartDate}
                        onChange={(e) => setFormData({ ...formData, expectedStartDate: e.target.value })}
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      >
                        {startDateOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Project Description & Communication Preferences */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#171717] pb-3 border-b border-zinc-200 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#171717] text-[#F28C28] text-xs font-mono flex items-center justify-center">3</span>
                    <span>Project Vision &amp; Requirements</span>
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Project Description &amp; Specific Requirements <span className="text-[#F28C28]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Please describe your vision, number of floors, preferred architectural style, special foundation needs, or materials..."
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Phone', 'WhatsApp', 'Email', 'In-Person Meeting'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                              formData.preferredContactMethod === method
                                ? 'bg-[#171717] text-[#F28C28] border-[#171717]'
                                : 'bg-[#F7F6F2] text-zinc-700 border-[#E5E3DD] hover:border-zinc-400'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy & Legal Acknowledgment */}
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-start gap-3 text-xs text-zinc-600">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-zinc-300 text-[#F28C28] focus:ring-[#F28C28]"
                  />
                  <label htmlFor="privacy-consent" className="cursor-pointer">
                    I acknowledge that the preliminary budget categories provided are editable demonstration benchmarks. RG BUILDERS ENGINEERS AND CONTRACTORS will compile an official, itemized Bill of Quantities (BOQ) tailored to my structural blueprints. My contact details will be processed securely in accordance with the{' '}
                    <Link to="/privacy-policy" className="underline font-bold text-zinc-800">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  id="quote-form-submit-btn"
                  className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-black text-base py-4 px-8 rounded-xl shadow-xl shadow-[#F28C28]/25 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Registering Technical Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Quotation Request</span>
                      <Send className="w-5 h-5 text-[#171717]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
