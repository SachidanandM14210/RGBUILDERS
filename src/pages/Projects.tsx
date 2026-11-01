import { useState, useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { Project } from '../types';
import { Search, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects().then((res) => {
      if (res.success) {
        setProjects(res.projects);
      }
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Villas', 'Renovation', 'Architectural Design', 'Turnkey Construction'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#101010] text-white min-h-screen">
      <SEO
        title="Featured Projects Portfolio — RG BUILDERS ENGINEERS AND CONTRACTORS"
        description="Browse RG BUILDERS ENGINEERS AND CONTRACTORS's portfolio of luxury residential villas, commercial landmarks, architectural transformations, and structural engineering projects."
      />

      {/* Header Banner */}
      <section className="py-20 relative overflow-hidden border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F28C28] uppercase tracking-wider mb-4 border border-white/15">
              <span>Architectural Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-4">
              OUR WORK SPEAKS <span className="text-[#F28C28]">FOR ITSELF.</span>
            </h1>
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              Explore our landmark residential villas, modern corporate facilities, and architectural renovations. Every project is engineered with unwavering structural discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-[#171717] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#F28C28] text-[#171717] shadow-md font-bold'
                      : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#101010] border border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F28C28]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demonstration Notice Banner */}
          <div className="mb-10 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-[#F28C28] shrink-0" />
            <span>
              <strong>Demonstration Portfolio:</strong> The following projects represent architectural models and engineering capabilities. RG BUILDERS ENGINEERS AND CONTRACTORS will replace these with actual commissioned builds as projects complete their confidentiality embargoes.
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-zinc-500 font-mono">Loading architectural projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24 text-zinc-500">
              <p className="text-base">No projects match the selected criteria.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-[#F28C28] text-xs font-bold underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
