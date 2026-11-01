import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { CompanySettings } from '../types';

interface FooterProps {
  settings?: CompanySettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone = settings?.phone || '+91 98765 43210';
  const email = settings?.email || 'contact@rgconstruction.com';
  const address = settings?.address || 'RG Tower, Plot 42, Civil & Architectural Enclave, Phase 2, Metro City, India';
  const hours = settings?.businessHours || 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: Closed';
  const whatsapp = settings?.whatsapp || '+919876543210';


  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects Portfolio', href: '/projects' },
    { name: 'Office Gallery', href: '/gallery' },
    { name: 'About RG Builders Engineers and Contractors', href: '/about' },
    { name: 'Request a Free Quote', href: '/quote' },
    { name: 'Frequently Asked Questions', href: '/#faq-section' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-[#101010] text-zinc-300 border-t border-zinc-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background architectural grid highlight */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-zinc-800/80">
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center gap-3 group inline-flex mb-5">
                <div className="w-11 h-11 rounded-lg bg-[#171717] border border-white/20 flex items-center justify-center font-heading font-black text-2xl text-white group-hover:border-[#F28C28] transition-colors">
                  R<span className="text-[#F28C28]">G</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-white tracking-tight uppercase block leading-tight">
                    RG <span className="text-[#F28C28]">BUILDERS</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold tracking-wider block">
                    Engineers &amp; Contractors
                  </span>
                  <span className="text-[10px] text-[#F28C28] uppercase font-semibold tracking-wider">
                    Building Dreams. Creating Landmarks.
                  </span>
                </div>
              </Link>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">
                From thoughtfully designed homes to ambitious commercial landmarks, RG BUILDERS ENGINEERS AND CONTRACTORS transforms architectural visions into durable, timeless structures built with integrity and craftsmanship.
              </p>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-zinc-200 block mb-0.5">Commitment to Transparency</span>
                  All demonstration project imagery, preliminary cost projections, and specifications are clearly identified. We build on trust.
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello RG BUILDERS ENGINEERS AND CONTRACTORS, I would like to discuss a construction project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-semibold px-3.5 py-2 rounded-lg border border-[#25D366]/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs px-3 py-2 rounded-lg hover:bg-zinc-900 transition-colors"
                title="Company Staff Management Console"
              >
                <span>Admin Login</span>
              </Link>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#F28C28] pl-2.5">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Information (Col 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#F28C28] pl-2.5">
              Headquarters
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">{address}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-xs hover:text-white font-mono">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-4 h-4 text-[#F28C28] shrink-0" />
                <a href={`mailto:${email}`} className="text-xs hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <Clock className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{hours}</span>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                to="/quote"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-2.5 px-4 rounded-lg shadow-md transition-all"
              >
                <span>Request a Free Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {currentYear} RG BUILDERS ENGINEERS AND CONTRACTORS. All rights reserved. Architectural and construction solutions.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-700">&middot;</span>
            <Link to="/terms-conditions" className="hover:text-zinc-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-zinc-700">&middot;</span>
            <Link to="/admin/login" className="hover:text-[#F28C28] transition-colors flex items-center gap-1">
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
