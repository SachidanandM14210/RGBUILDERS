import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  HelpCircle,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { api, getAdminToken, removeAdminToken } from '../lib/api';
import { AdminUser } from '../types';

export function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }

    api.adminCheckAuth()
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          removeAdminToken();
          navigate('/admin/login');
        }
      })
      .catch(() => {
        removeAdminToken();
        navigate('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    removeAdminToken();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center font-mono text-zinc-400">
        Verifying administrative session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-zinc-200 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#171717] border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-zinc-400 hover:text-white lg:hidden rounded-lg hover:bg-zinc-800"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#F28C28] font-heading font-black text-sm">
              R<span className="text-white">G</span>
            </div>
            <div>
              <span className="font-heading font-bold text-white text-sm block">RG BUILDERS ENGINEERS AND CONTRACTORS</span>
              <span className="text-[10px] font-mono text-zinc-400 block -mt-0.5">Admin Management Console</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-zinc-800 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
            <span className="text-zinc-300 font-medium">{user?.name || 'Administrator'}</span>
            <span className="text-zinc-500 font-mono text-[10px]">({user?.role})</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
