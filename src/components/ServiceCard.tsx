import { Link } from 'react-router-dom';
import { ArrowUpRight, Home, Building2, Compass, Hammer, ClipboardCheck, KeyRound } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

const iconMap: Record<string, any> = {
  Home,
  Building2,
  Compass,
  Hammer,
  ClipboardCheck,
  KeyRound,
};

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Building2;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E5E3DD] shadow-sm hover:shadow-xl hover:border-[#F28C28]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Preview with Architectural Vignette */}
      <div className="relative h-56 overflow-hidden bg-zinc-900">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Floating Category Icon */}
        <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-[#171717]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F28C28] shadow-lg">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-heading font-bold text-[#171717] mb-2.5 group-hover:text-[#F28C28] transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed mb-6">
            {service.shortDesc}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#171717] group-hover:text-[#F28C28] transition-colors"
          >
            <span>Explore Service</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            RG&middot;SOLUTIONS
          </span>
        </div>
      </div>
    </div>
  );
}
