import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface NavbarProps {
  companyPhone?: string;
}

export function Navbar({ companyPhone = '+91 98765 43210' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Office Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F28C28] rounded-lg p-1"
              id="navbar-brand-logo"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#171717] border border-white/15 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#F28C28] transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F28C28]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-white">
                  R<span className="text-[#F28C28]">G</span>
                </span>
                {/* Brand accent line */}
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#F28C28]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white uppercase group-hover:text-white/90 leading-tight">
                  RG <span className="text-[#F28C28]">BUILDERS</span>
                </span>
                <span className="text-[10px] tracking-widest text-zinc-300 uppercase font-semibold">
                  Engineers &middot; Contractors
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 relative ${
                    isActive(link.href)
                      ? 'text-[#F28C28] font-semibold'
                      : 'text-zinc-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F28C28] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/quote"
                id="navbar-quote-btn"
                className="inline-flex items-center gap-2 bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-[#F28C28]/20 transition-all duration-200 hover:shadow-[#F28C28]/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/quote"
                className="bg-[#F28C28] text-[#171717] font-heading font-bold text-xs px-3 py-1.5 rounded-md"
              >
                Get Quote
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-[#171717] border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center font-heading font-black text-white text-lg">
                    R<span className="text-[#F28C28]">G</span>
                  </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-white text-base leading-tight">RG <span className="text-[#F28C28]">BUILDERS</span></span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Engineers &amp; Contractors</span>
                </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#F28C28]/10 text-[#F28C28] font-bold border-l-4 border-[#F28C28]'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-col gap-4">
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${companyPhone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 text-zinc-400 hover:text-white text-xs font-mono py-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F28C28]" />
                <span>{companyPhone}</span>
              </a>

              <div className="text-center">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-500 hover:text-zinc-400 text-xs inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Company Staff Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
