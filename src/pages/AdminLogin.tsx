import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { api, setAdminToken } from '../lib/api';

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.adminLogin({ username, password });
      if (res.success && res.token) {
        setAdminToken(res.token);
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername('admin');
    setPassword('Admin@RG2026!');
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <SEO title="Company Staff Portal Login — RG BUILDERS ENGINEERS AND CONTRACTORS" />
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-zinc-900/90 rounded-3xl border border-zinc-800 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>

          <div className="w-12 h-12 rounded-xl bg-[#171717] border border-zinc-700 text-[#F28C28] mx-auto flex items-center justify-center font-heading font-black text-xl mb-3 shadow-inner">
            R<span className="text-[#F28C28]">G</span>
          </div>

          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            STAFF MANAGEMENT PORTAL
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Authorized administrative access for RG BUILDERS ENGINEERS AND CONTRACTORS operations.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Administrator Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F28C28]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#171717] border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F28C28]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F28C28] hover:bg-[#E07B17] text-[#171717] font-heading font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>Access Management Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-xs text-zinc-400 hover:text-[#F28C28] bg-zinc-800/80 hover:bg-zinc-800 px-3.5 py-2 rounded-lg transition-colors border border-zinc-700 inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Use Default Credentials (admin / Admin@RG2026!)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
