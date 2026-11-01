import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  HelpCircle,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  X,
  Save,
  Search,
  Filter,
  Upload,
  AlertCircle,
  Images,
  Camera,
  ImagePlus,
  Loader2,
  Star
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { api } from '../lib/api';
import { Enquiry, Project, FAQ, CompanySettings, GalleryItem } from '../types';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'projects' | 'gallery' | 'faqs' | 'settings'>('overview');

  // Stats state
  const [stats, setStats] = useState<any>(null);
  const [statusBreakdown, setStatusBreakdown] = useState<{ status: string; count: number }[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Gallery state (Office)
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  const [editingGalleryItem, setEditingGalleryItem] = useState<Partial<GalleryItem> | null>(null);
  const [isNewGalleryModalOpen, setIsNewGalleryModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // FAQs state
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);

  // Settings state
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const loadDashboardData = async () => {
    try {
      const dash = await api.getDashboardStats();
      if (dash.success) {
        setStats(dash.stats);
        setStatusBreakdown(dash.statusBreakdown);
        setRecentEnquiries(dash.recentEnquiries);
      }
      const prj = await api.getProjects();
      if (prj.success) setProjects(prj.projects);

      const gal = await api.getGallery();
      if (gal.success) setGallery(gal.gallery);

      const fq = await api.getFaqs();
      if (fq.success) setFaqs(fq.faqs);

      const set = await api.getCompanySettings();
      if (set.success) setSettings(set.settings);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadEnquiries = async () => {
    try {
      const res = await api.getEnquiries(enquiryStatusFilter, enquirySearch);
      if (res.success) {
        setEnquiries(res.enquiries);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'enquiries') {
      loadEnquiries();
    }
  }, [activeTab, enquiryStatusFilter, enquirySearch]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await api.updateEnquiryStatus(id, newStatus);
      if (res.success) {
        notify(`Enquiry status updated to "${newStatus}"`);
        loadEnquiries();
        loadDashboardData();
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(res.enquiry);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      const res = await api.updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, editingNotes);
      if (res.success) {
        setSelectedEnquiry(res.enquiry);
        notify('Internal notes saved.');
        loadEnquiries();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save notes.');
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm('Are you certain you want to remove this enquiry?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        notify('Enquiry deleted.');
        setSelectedEnquiry(null);
        loadEnquiries();
        loadDashboardData();
      }
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        notify('Project updated successfully.');
      } else {
        await api.createProject(editingProject);
        notify('New project added to portfolio.');
      }
      setEditingProject(null);
      setIsNewProjectModalOpen(false);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Save failed.');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      notify('Project removed from portfolio.');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'project' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        if (target === 'project' && editingProject) {
          setEditingProject({ ...editingProject, coverImage: res.url });
        } else if (target === 'gallery' && editingGalleryItem) {
          setEditingGalleryItem({ ...editingGalleryItem, imageUrl: res.url });
        }
        notify('Photo uploaded successfully.');
      }
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem) return;
    if (!editingGalleryItem.title || !editingGalleryItem.imageUrl) {
      alert('Title and Image are required.');
      return;
    }

    try {
      if (editingGalleryItem.id) {
        await api.updateGalleryItem(editingGalleryItem.id, editingGalleryItem);
        notify('Gallery showcase photo updated successfully.');
      } else {
        await api.createGalleryItem(editingGalleryItem);
        notify('New photo added to showcase gallery.');
      }
      setEditingGalleryItem(null);
      setIsNewGalleryModalOpen(false);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Save failed.');
    }
  };

  const handleDeleteGalleryItem = async (id: number) => {
    if (!confirm('Are you sure you want to remove this photo from the gallery?')) return;
    try {
      await api.deleteGalleryItem(id);
      notify('Photo removed from gallery.');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Delete failed.');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await api.updateCompanySettings(settings as any);
      setSettingsSaved(true);
      notify('Company settings saved successfully.');
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save settings.');
    }
  };

  const statuses = [
    'New',
    'Contacted',
    'Consultation Scheduled',
    'Quotation Sent',
    'In Progress',
    'Completed',
    'Closed'
  ];

  return (
    <div className="space-y-6">
      <SEO title="Administrative Management Console — RG BUILDERS ENGINEERS AND CONTRACTORS" />

      {/* Floating Action Feedback */}
      {actionMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#F28C28] text-black font-heading font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Tab Navigation Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'enquiries', label: `Quotation Enquiries (${stats?.totalEnquiries || 0})`, icon: Inbox },
          { key: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
          { key: 'gallery', label: `Office Gallery (${gallery.length})`, icon: Images },
          { key: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
          { key: 'settings', label: 'Company Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#F28C28] text-[#171717] font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* KPI Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-zinc-400 text-xs font-mono uppercase block mb-1">Total Enquiries</span>
              <div className="text-3xl font-heading font-black text-white">{stats?.totalEnquiries ?? 0}</div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Registered quote requests</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-[#F28C28] text-xs font-mono uppercase block mb-1">New Leads</span>
              <div className="text-3xl font-heading font-black text-[#F28C28]">{stats?.newEnquiries ?? 0}</div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Awaiting initial outreach</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-blue-400 text-xs font-mono uppercase block mb-1">In Progress</span>
              <div className="text-3xl font-heading font-black text-blue-400">{stats?.inProgressEnquiries ?? 0}</div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Consultation / Quote sent</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-emerald-400 text-xs font-mono uppercase block mb-1">Portfolio Projects</span>
              <div className="text-3xl font-heading font-black text-emerald-400">{projects.length}</div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Active showcase models</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl col-span-2 lg:col-span-1">
              <span className="text-amber-400 text-xs font-mono uppercase block mb-1">Office Gallery</span>
              <div className="text-3xl font-heading font-black text-amber-400">{gallery.length}</div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Headquarters &amp; studio photos</span>
            </div>
          </div>

          {/* Status Breakdown & Recent Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Status Breakdown (4 cols) */}
            <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
                Pipeline Status Breakdown
              </h3>
              <div className="space-y-3">
                {statusBreakdown.map((sb) => (
                  <div key={sb.status} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">{sb.status}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono font-bold">
                      {sb.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Enquiries (8 cols) */}
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Recent Quotation Requests
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-[#F28C28] hover:underline font-bold"
                >
                  View All Enquiries &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {recentEnquiries.map((e) => (
                  <div
                    key={e.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[#F28C28] font-bold">{e.refCode}</span>
                        <span className="font-semibold text-white">{e.fullName}</span>
                      </div>
                      <div className="text-zinc-400 text-[11px]">
                        {e.projectType} &middot; {e.budget}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 uppercase">
                      {e.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENQUIRIES MANAGEMENT */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-[#F28C28] shrink-0" />
              <select
                value={enquiryStatusFilter}
                onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#F28C28]"
              >
                <option value="all">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search reference, client name, email..."
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F28C28]"
              />
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-[#171717] text-zinc-400 uppercase font-mono text-[10px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3.5">Reference</th>
                    <th className="px-4 py-3.5">Applicant</th>
                    <th className="px-4 py-3.5">Project Type</th>
                    <th className="px-4 py-3.5">Location</th>
                    <th className="px-4 py-3.5">Budget</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-zinc-500">
                        No customer enquiries match your search filter.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-[#F28C28]">
                          {e.refCode}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-white block">{e.fullName}</span>
                          <span className="text-[11px] text-zinc-500">{e.phone}</span>
                        </td>
                        <td className="px-4 py-3 text-zinc-200">
                          {e.projectType}
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          {e.projectLocation}
                        </td>
                        <td className="px-4 py-3 text-zinc-300">
                          {e.budget || '—'}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={e.status}
                            onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                            className="bg-black/60 border border-zinc-700 text-[11px] rounded px-2 py-1 text-[#F28C28] font-semibold focus:outline-none"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEnquiry(e);
                              setEditingNotes(e.adminNotes || '');
                            }}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEnquiry(e.id)}
                            className="p-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Project Showcase Models</h3>
            <button
              type="button"
              onClick={() => {
                setEditingProject({
                  title: '',
                  category: 'Residential',
                  location: '',
                  area: '3,500 sq.ft.',
                  status: 'Completed (Demonstration Model)',
                  summary: '',
                  description: '',
                  designConcept: '',
                  scope: '',
                  materials: '',
                  coverImage: '/images/hero.jpg',
                  featured: 1
                });
                setIsNewProjectModalOpen(true);
              }}
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between"
              >
                <div className="h-44 relative bg-black">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-black/80 px-2.5 py-0.5 rounded text-[10px] text-[#F28C28] font-bold uppercase">
                    {p.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-white text-base mb-1">{p.title}</h4>
                    <p className="text-zinc-400 text-xs line-clamp-2 mb-3">{p.summary}</p>
                    <div className="text-[11px] text-zinc-500 font-mono">{p.location} &middot; {p.area}</div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(p);
                        setIsNewProjectModalOpen(true);
                      }}
                      className="text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#F28C28]" />
                      <span>Edit Project</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GALLERY MANAGEMENT (Office Showcase) */}
      {activeTab === 'gallery' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Office Showcase Gallery</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Manage photos of your headquarters, engineering studios, consultation chambers, and drafting workspaces displayed on the live website.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingGalleryItem({
                  title: '',
                  category: 'Office',
                  description: '',
                  imageUrl: '',
                  displayOrder: gallery.length + 1,
                  featured: 1
                });
                setIsNewGalleryModalOpen(true);
              }}
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shrink-0"
            >
              <ImagePlus className="w-4 h-4" />
              <span>Add Office Photo</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', ...Array.from(new Set(gallery.map(g => g.category || 'Office')))].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setGalleryCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                  galleryCategoryFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#F28C28] text-black font-bold'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat === 'all'
                  ? `All Photos (${gallery.length})`
                  : `${cat} (${gallery.filter(g => (g.category || 'Office').toLowerCase() === cat.toLowerCase()).length})`}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery
              .filter((item) =>
                galleryCategoryFilter === 'all' ||
                item.category.toLowerCase() === galleryCategoryFilter.toLowerCase()
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="h-48 relative bg-black overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-black">
                        {item.category || 'Office'}
                      </span>
                      {Boolean(item.featured) && (
                        <span className="bg-black/80 text-[#F28C28] px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-white text-base mb-1">{item.title}</h4>
                      {item.description && (
                        <p className="text-zinc-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <div className="text-[10px] font-mono text-zinc-500">
                        Order priority: #{item.displayOrder ?? 0}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGalleryItem(item);
                          setIsNewGalleryModalOpen(true);
                        }}
                        className="text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#F28C28]" />
                        <span>Edit Photo Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: FAQS MANAGEMENT */}
      {activeTab === 'faqs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Frequently Asked Questions</h3>
            <button
              type="button"
              onClick={() => setEditingFaq({ question: '', answer: '', category: 'General', displayOrder: faqs.length + 1 })}
              className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">{f.question}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{f.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingFaq(f)}
                    className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white rounded-lg"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!confirm('Delete FAQ?')) return;
                      await api.deleteFaq(f.id);
                      loadDashboardData();
                    }}
                    className="p-1.5 bg-red-900/30 text-red-400 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: COMPANY SETTINGS */}
      {activeTab === 'settings' && settings && (
        <div className="max-w-2xl bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Company Identity &amp; Contact Information</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Changes updated here update the live website navbar, footer, contact page, and WhatsApp button immediately.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName || ''}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Official Phone</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Official WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsapp || ''}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  placeholder="+919876543210"
                  className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Headquarters Physical Address</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">Operating Business Hours</label>
              <input
                type="text"
                value={settings.businessHours || ''}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-sm font-heading font-bold text-[#F28C28] mb-3">Preliminary Estimator Rate Settings (₹ / sq.ft.)</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Standard Tier</label>
                  <input
                    type="number"
                    value={settings.rateStandardSqFt || '1850'}
                    onChange={(e) => setSettings({ ...settings, rateStandardSqFt: e.target.value })}
                    className="w-full bg-[#171717] border border-zinc-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Premium Tier</label>
                  <input
                    type="number"
                    value={settings.ratePremiumSqFt || '2400'}
                    onChange={(e) => setSettings({ ...settings, ratePremiumSqFt: e.target.value })}
                    className="w-full bg-[#171717] border border-zinc-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Luxury Tier</label>
                  <input
                    type="number"
                    value={settings.rateLuxurySqFt || '3200'}
                    onChange={(e) => setSettings({ ...settings, rateLuxurySqFt: e.target.value })}
                    className="w-full bg-[#171717] border border-zinc-700 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save All Configuration Settings</span>
              </button>
              {settingsSaved && <span className="text-xs text-emerald-400 font-bold">✔ Saved to Database!</span>}
            </div>
          </form>
        </div>
      )}

      {/* ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] rounded-3xl max-w-2xl w-full border border-zinc-700 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-[#F28C28]">{selectedEnquiry.refCode}</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase">
                  {selectedEnquiry.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-zinc-300 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Applicant Name</span>
                  <span className="font-semibold text-white text-sm">{selectedEnquiry.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Phone Number</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-mono text-[#F28C28]">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-zinc-200">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Preferred Contact</span>
                  <span className="text-white font-medium">{selectedEnquiry.preferredContactMethod}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Project Type</span>
                  <span className="text-white font-medium">{selectedEnquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Plot / Area</span>
                  <span className="text-white font-medium">{selectedEnquiry.plotArea || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Budget</span>
                  <span className="text-white font-medium">{selectedEnquiry.budget || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Project Description &amp; Scope</span>
                <p className="p-4 rounded-xl bg-black/40 border border-zinc-800 text-zinc-200 leading-relaxed whitespace-pre-line">
                  {selectedEnquiry.projectDescription}
                </p>
              </div>

              <div>
                <label className="text-zinc-500 block mb-1">Internal Engineering &amp; Follow-up Notes</label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record call logs, consultation dates, site inspection findings..."
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F28C28]"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Save Notes</span>
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Update Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 text-xs rounded px-2.5 py-1 text-[#F28C28] font-bold"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT ADD / EDIT MODAL */}
      {isNewProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] rounded-3xl max-w-2xl w-full border border-zinc-700 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-base">
                {editingProject.id ? 'Edit Project Model' : 'Create New Project Showcase'}
              </h3>
              <button
                type="button"
                onClick={() => { setIsNewProjectModalOpen(false); setEditingProject(null); }}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. The Horizon Cantilever Villa"
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select
                    value={editingProject.category || 'Residential'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villas">Villas</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Architectural Design">Architectural Design</option>
                    <option value="Turnkey Construction">Turnkey Construction</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="e.g. Bay District"
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Built-Up Area</label>
                  <input
                    type="text"
                    value={editingProject.area || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                    placeholder="e.g. 5,400 sq.ft."
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Completion Year</label>
                  <input
                    type="text"
                    value={editingProject.completionYear || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, completionYear: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Client Name</label>
                <input
                  type="text"
                  value={editingProject.client || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  placeholder="e.g. Private Client / Commercial Partner"
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              {/* Cover Photo Upload & URL */}
              <div className="space-y-2">
                <label className="text-zinc-400 block mb-1">Project Cover Image</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="text"
                    required
                    value={editingProject.coverImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    placeholder="/images/hero.jpg or upload below"
                    className="flex-1 w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white font-mono text-xs"
                  />
                  <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors">
                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-[#F28C28]" /> : <Upload className="w-4 h-4 text-[#F28C28]" />}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'project')}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {editingProject.coverImage && (
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-black mt-2">
                    <img src={editingProject.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked ? 1 : 0 })}
                  className="accent-[#F28C28] w-4 h-4 rounded"
                />
                <div>
                  <span className="text-white font-semibold block text-xs">Feature on Website Homepage Showcase</span>
                  <span className="text-[11px] text-zinc-400 block">Highlight this project in the top showcase on the home page.</span>
                </div>
              </label>

              <div>
                <label className="text-zinc-400 block mb-1">Short Summary (1–2 sentences)</label>
                <input
                  type="text"
                  value={editingProject.summary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  placeholder="Architectural summary..."
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Full Architectural Description</label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F28C28] hover:bg-[#E07B17] text-black font-heading font-bold px-6 py-2 rounded-xl"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY ADD / EDIT MODAL */}
      {isNewGalleryModalOpen && editingGalleryItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] rounded-3xl max-w-xl w-full border border-zinc-700 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-white text-base">
                {editingGalleryItem.id ? 'Edit Office Photo' : 'Add Photo to Office Gallery'}
              </h3>
              <button
                type="button"
                onClick={() => { setIsNewGalleryModalOpen(false); setEditingGalleryItem(null); }}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Office Photo Title</label>
                <input
                  type="text"
                  required
                  value={editingGalleryItem.title || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                  placeholder="e.g. RG Head Office Drafting Room / Architectural Studio"
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">Office Area / Category</label>
                  <select
                    value={editingGalleryItem.category || 'Design Studio'}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Design Studio">Design Studio</option>
                    <option value="Consultation Rooms">Consultation Room</option>
                    <option value="Workspaces">Engineering Workspace</option>
                    <option value="Reception">Reception &amp; Welcome Lounge</option>
                    <option value="Conference">Executive Conference Room</option>
                    <option value="Sample Room">Material &amp; Sample Suite</option>
                    <option value="Office">General Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Display Priority Order</label>
                  <input
                    type="number"
                    value={editingGalleryItem.displayOrder ?? 1}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, displayOrder: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              {/* Image Uploader & Preview */}
              <div className="space-y-2">
                <label className="text-zinc-400 block mb-1">Showcase Photograph</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <input
                    type="text"
                    required
                    value={editingGalleryItem.imageUrl || ''}
                    onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })}
                    placeholder="/images/... or upload below"
                    className="flex-1 w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white font-mono text-xs"
                  />
                  <label className="cursor-pointer bg-[#F28C28] hover:bg-[#E07B17] text-black px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow">
                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Upload className="w-4 h-4 text-black" />}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'gallery')}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {editingGalleryItem.imageUrl && (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border border-zinc-700 bg-black mt-2">
                    <img src={editingGalleryItem.imageUrl} alt="Gallery Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Office Description / Location Note</label>
                <textarea
                  rows={3}
                  value={editingGalleryItem.description || ''}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                  placeholder="Describe this office space, drafting facility, or consultation room..."
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer bg-zinc-900/90 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  checked={Boolean(editingGalleryItem.featured)}
                  onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, featured: e.target.checked ? 1 : 0 })}
                  className="accent-[#F28C28] w-4 h-4 rounded"
                />
                <div>
                  <span className="text-white font-semibold block text-xs">Feature on Homepage Office Showcase</span>
                  <span className="text-[11px] text-zinc-400 block">Display this photo in the homepage office gallery section.</span>
                </div>
              </label>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewGalleryModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F28C28] hover:bg-[#E07B17] text-black font-heading font-bold px-6 py-2 rounded-xl"
                >
                  Save Office Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ EDIT MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#171717] rounded-3xl max-w-lg w-full border border-zinc-700 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="font-heading font-bold text-white text-base">
                {editingFaq.id ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button type="button" onClick={() => setEditingFaq(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (editingFaq.id) {
                  await api.updateFaq(editingFaq.id, editingFaq);
                } else {
                  await api.createFaq(editingFaq);
                }
                setEditingFaq(null);
                notify('FAQ saved.');
                loadDashboardData();
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-zinc-400 block mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-[#121212] border border-zinc-700 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setEditingFaq(null)} className="text-zinc-400">Cancel</button>
                <button type="submit" className="bg-[#F28C28] text-black font-heading font-bold px-5 py-2 rounded-xl">
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
