import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onQuickView?: (project: Project) => void;
}

export function ProjectCard({ project, onQuickView }: ProjectCardProps) {
  return (
    <article className="group relative bg-[#171717] rounded-2xl overflow-hidden border border-zinc-800 shadow-lg hover:shadow-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
      {/* Photograph Container */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-900">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/30 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-md bg-[#101010]/85 backdrop-blur-md border border-white/10 text-xs font-semibold text-zinc-200 tracking-wide uppercase">
            {project.category}
          </span>
        </div>

        {/* Quick View Modal Trigger */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
            title="Quick Preview"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Demonstration Model Badge */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="text-[10px] uppercase font-mono tracking-wider bg-black/80 text-zinc-300 px-2 py-0.5 rounded border border-white/10">
            {project.status}
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#F28C28] font-medium mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location}</span>
          </div>

          <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#F28C28] transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
            {project.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="text-xs font-mono text-zinc-400">
            {project.area}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold text-white group-hover:text-[#F28C28] transition-colors"
          >
            <span>View Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
