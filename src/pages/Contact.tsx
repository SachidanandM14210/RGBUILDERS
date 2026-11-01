import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { CompanySettings } from '../types';

export function Contact() {
  const { settings } = useOutletContext<{ settings?: CompanySettings }>() || {};

  const phone = settings?.phone || '+91 98765 43210';
  const email = settings?.email || 'contact@rgconstruction.com';
  const address = settings?.address || 'RG Tower, Plot 42, Civil & Architectural Enclave, Phase 2, Metro City, India';
  const hours = settings?.businessHours || 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Closed';
  const whatsapp = settings?.whatsapp || '+919876543210';

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    subject: 'General Project Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.emailOrPhone.trim()) {
      setErrorMsg('Please provide a contact phone number or email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitContactMessage(formData);
      if (res.success) {
        setSuccessRef(res.refCode);
        setFormData({ name: '', emailOrPhone: '', subject: 'General Project Inquiry', message: '' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to dispatch your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const cleanWaNumber = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="pt-24 pb-20 bg-[#F7F6F2]">
      <SEO
        title="Contact Us — RG BUILDERS ENGINEERS AND CONTRACTORS | Building Dreams. Creating Landmarks"
        description="Get in touch with RG BUILDERS ENGINEERS AND CONTRACTORS. Connect with our senior project engineers, request architectural consultations, or visit our office."
      />

      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Direct Communication</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              LET'S BUILD SOMETHING <span className="text-[#F28C28]">MEANINGFUL.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Have an upcoming construction project, land development query, or architectural blueprint to discuss? Our project directors are ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Verified Contact Information & Architectural Map Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#171717] rounded-3xl p-8 text-white border border-zinc-800 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F28C28] block mb-1">
                    Corporate Office
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-white">RG BUILDERS ENGINEERS AND CONTRACTORS</h3>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-[#F28C28] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-0.5">Physical Headquarters</span>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">{address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-[#F28C28] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-0.5">Verified Phone Line</span>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-zinc-200 hover:text-white font-mono text-sm">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-[#F28C28] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-0.5">Official Inquiries</span>
                      <a href={`mailto:${email}`} className="text-zinc-200 hover:text-white text-sm">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-[#F28C28] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-0.5">Business Hours</span>
                      <p className="text-zinc-300 text-xs leading-relaxed">{hours}</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp CTA */}
                <div className="pt-4 border-t border-zinc-800">
                  <a
                    href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent('Hello RG BUILDERS ENGINEERS AND CONTRACTORS, I would like to schedule an architectural consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Consultation</span>
                  </a>
                </div>
              </div>

              {/* Architectural Map & Demonstration Location Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E5E3DD] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#171717] font-bold">
                    Office Location Map
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    Demonstration Coordinates
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-zinc-900 h-48 relative border border-zinc-200">
                  {/* Styled Architectural Map Canvas */}
                  <div className="w-full h-full bg-[#1b1e23] flex items-center justify-center relative p-4 text-center">
                    <div className="space-y-2 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-[#F28C28] text-black mx-auto flex items-center justify-center shadow-lg animate-bounce">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-heading font-bold text-white block">
                        RG Tower &middot; Metro Corridor
                      </span>
                      <span className="text-[11px] text-zinc-400 block font-mono">
                        Latitude: 12.9716° N | Longitude: 77.5946° E
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 mt-3 leading-relaxed">
                  Visitors are encouraged to schedule an appointment prior to arrival to ensure senior structural engineers are available for blueprint reviews.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Message Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E3DD] shadow-xl">
                <div className="mb-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F28C28] font-bold block mb-1">
                    Send a Message
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#171717]">
                    Technical Consultation Request
                  </h3>
                  <p className="text-sm text-zinc-600 mt-1">
                    Fill out the form below. We typically respond within 24 business hours.
                  </p>
                </div>

                {successRef ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-heading font-bold">Message Dispatched Successfully</h4>
                    <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Thank you for contacting RG BUILDERS ENGINEERS AND CONTRACTORS. Your inquiry has been registered under reference:
                    </p>
                    <div className="inline-block px-4 py-2 bg-emerald-100 rounded-lg font-mono font-bold text-emerald-900 text-base">
                      {successRef}
                    </div>
                    <p className="text-xs text-emerald-700">
                      A senior project associate will review your brief and contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccessRef(null)}
                      className="mt-4 text-xs font-bold text-[#171717] underline hover:text-[#F28C28]"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Your Full Name <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikramaditya Sharma"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Email Address or Phone Number <span className="text-[#F28C28]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        placeholder="e.g. vikram@example.com or +91 98765 43210"
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white transition-colors"
                      >
                        <option value="General Project Inquiry">General Project Inquiry</option>
                        <option value="Schedule Office Consultation">Schedule Office Consultation</option>
                        <option value="Architectural Blueprint Review">Architectural Blueprint Review</option>
                        <option value="Commercial Development Proposal">Commercial Development Proposal</option>
                        <option value="Renovation & Interior Remodeling">Renovation &amp; Interior Remodeling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                        Message &amp; Project Description <span className="text-[#F28C28]">*</span>
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please tell us about your plot location, proposed construction timeline, or specific questions..."
                        className="w-full bg-[#F7F6F2] border border-[#E5E3DD] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#F28C28] focus:bg-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#171717] hover:bg-black text-white font-heading font-bold py-4 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          <span>Send Message to RG BUILDERS ENGINEERS AND CONTRACTORS</span>
                          <Send className="w-4 h-4 text-[#F28C28]" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                  <span>Looking for an itemized estimate?</span>
                  <Link
                    to="/quote"
                    className="text-[#F28C28] font-heading font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Use Quotation System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
