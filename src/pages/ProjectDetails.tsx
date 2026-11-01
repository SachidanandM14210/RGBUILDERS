import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Layers, ShieldCheck, CheckCircle2, Building, Eye } from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { Project } from '../types';

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProject(slug)
      .then((res) => {
        if (res.success && res.project) {
          setProject(res.project);
          setActiveImage(res.project.coverImage);
        } else {
          setError('Project not found.');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load project details.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex items-center justify-center font-mono text-zinc-500">
        Loading project portfolio specifications...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-heading font-bold text-zinc-900 mb-4">Project Not Located</h2>
        <p className="text-zinc-600 mb-6">{error || 'The requested project could not be found.'}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 rounded-xl font-heading font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  let gallery: string[] = [];
  try {
    gallery = project.galleryImages ? JSON.parse(project.galleryImages) : [project.coverImage];
  } catch (e) {
    gallery = [project.coverImage];
  }

  const handleInquireSimilar = () => {
    navigate('/quote', {
      state: {
        prefilledType: project.category === 'Villas' ? 'Luxury Villa Construction' : project.category,
        prefilledArea: project.area,
        prefilledDescription: `Interested in engineering specifications similar to ${project.title}.`
      }
    });
  };

  return (
    <div className="pt-24 pb-20 bg-[#101010] text-white min-h-screen">
      <SEO
        title={`${project.title} — RG BUILDERS ENGINEERS AND CONTRACTORS Project Showcase`}
        description={project.summary}
      />

      {/* Top Breadcrumb & Title Area */}
      <section className="py-12 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#F28C28] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-md bg-[#F28C28] text-black text-xs font-bold uppercase">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {project.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
                {project.title}
              </h1>
            </div>

            <button
              type="button"
              onClick={handleInquireSimilar}
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>Build a Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Photographic Feature */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 h-[480px] sm:h-[620px] relative">
            <img
              src={activeImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#F28C28]" /> {project.location}</span>
              <span>{project.area}</span>
            </div>
          </div>

          {/* Thumbnails Gallery */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-28 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === imgUrl ? 'border-[#F28C28] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specifications & Overview */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Overview & Architectural Concept */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {project.designConcept && (
                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800">
                  <h3 className="text-xl font-heading font-bold text-white mb-3 text-[#F28C28]">
                    Architectural Design Concept
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.designConcept}
                  </p>
                </div>
              )}

              {project.scope && (
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    Project Scope of Execution
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {project.scope}
                  </p>
                </div>
              )}

              {project.materials && (
                <div className="p-6 rounded-2xl bg-black/40 border border-zinc-800">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-[#F28C28] mb-2">
                    Materials &amp; Structural Specifications
                  </h4>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                    {project.materials}
                  </p>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Technical Metadata Sheet */}
            <div className="lg:col-span-4">
              <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800 p-8 space-y-6">
                <h3 className="font-heading font-bold text-lg text-white border-b border-zinc-800 pb-3">
                  Project Fact Sheet
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Typology</span>
                    <span className="text-white font-medium text-sm">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Location</span>
                    <span className="text-white font-medium text-sm">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Built-up Footprint</span>
                    <span className="text-white font-medium text-sm">{project.area}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Client Profile</span>
                    <span className="text-white font-medium text-sm">{project.client || 'Private Client'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Completion Status</span>
                    <span className="text-[#F28C28] font-medium text-sm">{project.status}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-0.5">Delivery Year</span>
                    <span className="text-white font-medium text-sm">{project.completionYear || '2025'}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={handleInquireSimilar}
                    className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation with these Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
