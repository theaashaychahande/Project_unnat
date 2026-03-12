import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Search, 
  Bell, 
  Filter, 
  MapPin,
  MoreHorizontal,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { useAppContext, Urgency, Status } from '../AppContext';

const AdminDashboard: React.FC = () => {
  const { currentUser, logout, complaints, users, updateComplaintStatus } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queue'>('overview');
  const [filters, setFilters] = useState({ urgency: '', status: '' });

  if (!currentUser || currentUser.role !== 'Admin') return null;

  const filteredComplaints = complaints.filter(c => 
    (filters.urgency === '' || c.urgency === filters.urgency) &&
    (filters.status === '' || c.status === filters.status)
  );

  const stats = {
    totalUsers: users.length,
    totalComplaints: complaints.length,
    resolvedRate: complaints.length ? Math.round((complaints.filter(c => c.status === 'Resolved').length / complaints.length) * 100) : 0,
    urgencyBreakdown: {
      Low: complaints.filter(c => c.urgency === 'Low').length,
      Medium: complaints.filter(c => c.urgency === 'Medium').length,
      High: complaints.filter(c => c.urgency === 'High').length,
      Critical: complaints.filter(c => c.urgency === 'Critical').length,
    }
  };

  const getUrgencyBadge = (urgency: Urgency) => {
    switch (urgency) {
      case 'Low': return 'border-green-500 text-green-500 bg-green-500/10';
      case 'Medium': return 'border-yellow-500 text-yellow-500 bg-yellow-500/10';
      case 'High': return 'border-orange text-orange bg-orange/10';
      case 'Critical': return 'border-red-500 text-red-500 bg-red-500/10';
      default: return 'border-gray-500 text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-navy text-premium-white font-dm flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-navy-deep border-r border-white/5 flex flex-col h-screen sticky top-0 z-50">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center font-black text-navy shadow-lg shadow-orange/20">U</div>
            <h1 className="text-2xl font-black font-syne tracking-tighter">PROJECT <span className="text-orange">UNNAT</span></h1>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mt-4">Administrative Control</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all group ${activeTab === 'overview' ? 'bg-orange text-navy shadow-xl shadow-orange/10' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={20} className={activeTab === 'overview' ? 'text-navy' : 'group-hover:text-orange'} />
            <span className="uppercase tracking-widest text-xs">Overview</span>
            {activeTab === 'overview' && <motion.div layoutId="nav-pill" className="ml-auto w-1.5 h-1.5 bg-navy rounded-full" />}
          </button>
          
          <button 
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-bold transition-all group ${activeTab === 'queue' ? 'bg-orange text-navy shadow-xl shadow-orange/10' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
          >
            <ClipboardList size={20} className={activeTab === 'queue' ? 'text-navy' : 'group-hover:text-orange'} />
            <span className="uppercase tracking-widest text-xs">Complaints Queue</span>
            {activeTab === 'queue' && <motion.div layoutId="nav-pill" className="ml-auto w-1.5 h-1.5 bg-navy rounded-full" />}
          </button>

          <div className="pt-8 opacity-20 border-t border-white/5 mt-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-6">System Management</p>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-gray-500 grayscale cursor-not-allowed">
              <Users size={20} />
              <span className="uppercase tracking-widest text-xs">User Directory</span>
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5 bg-navy/20">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange/20 border border-orange/30 flex items-center justify-center font-black text-orange">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate">{currentUser.name}</p>
              <p className="text-[10px] text-orange font-bold uppercase tracking-widest">Master Admin</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl text-[10px] font-black tracking-widest transition-all"
          >
            <LogOut size={16} />
            <span>LOGOUT SYSTEM</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <header className="sticky top-0 z-40 bg-navy/80 backdrop-blur-xl border-b border-white/5 px-10 py-6 flex justify-between items-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search docket, citizen or location..." 
              className="bg-navy-deep border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm w-full outline-none focus:ring-1 focus:ring-orange/50 transition-all"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-3 bg-navy-deep border border-white/5 rounded-xl text-gray-500 hover:text-orange transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange rounded-full border-2 border-navy-deep"></span>
            </button>
            <div className="h-8 w-px bg-white/5"></div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Status</p>
              <p className="text-xs font-bold text-green-500 flex items-center justify-end gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM ONLINE
              </p>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black font-syne tracking-tight capitalize mb-2">{activeTab}</h2>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Real-time Governance Analytics</p>
          </div>

          <AnimatePresence mode='wait'>
            {activeTab === 'overview' ? (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Registered Citizens', val: stats.totalUsers, icon: Users, color: 'text-blue-500' },
                    { label: 'Active Complaints', val: stats.totalComplaints, icon: TrendingUp, color: 'text-orange' },
                    { label: 'Resolution Efficiency', val: `${stats.resolvedRate}%`, icon: CheckCircle2, color: 'text-green-500' }
                  ].map((s, i) => (
                    <div key={i} className="glass-card p-8 border-l-4 border-l-orange relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                        <s.icon size={120} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{s.label}</p>
                      <h3 className="text-5xl font-black font-syne text-white tracking-tighter">{s.val}</h3>
                    </div>
                  ))}
                </div>

                {/* Charts & Summaries */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 glass-card p-8">
                    <h3 className="text-xl font-black font-syne tracking-tight mb-8">Urgency Distribution</h3>
                    <div className="space-y-6">
                      {Object.entries(stats.urgencyBreakdown).map(([level, count]) => (
                        <div key={level}>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{level} Urgency</span>
                            <span className="text-sm font-black">{count}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / (stats.totalComplaints || 1)) * 100}%` }}
                              className={`h-full ${level === 'Critical' ? 'bg-red-500' : level === 'High' ? 'bg-orange' : level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-8 bg-orange/5 border-orange/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <AlertTriangle size={48} />
                    </div>
                    <h3 className="text-xl font-black font-syne tracking-tight mb-6 text-orange">Critical Briefing</h3>
                    <div className="space-y-4">
                      {complaints.filter(c => c.urgency === 'Critical' && c.status !== 'Resolved').slice(0, 3).map(c => (
                        <div key={c.id} className="p-4 bg-navy-deep border border-white/5 rounded-xl hover:border-orange/30 transition-all cursor-pointer">
                          <p className="text-xs font-black text-white truncate">{c.title}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">📍 {c.location}</p>
                        </div>
                      ))}
                      {stats.urgencyBreakdown.Critical === 0 && (
                        <div className="py-8 text-center">
                          <CheckCircle2 size={32} className="mx-auto text-green-500 opacity-20 mb-3" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">No Critical Alerts</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="queue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card overflow-hidden"
              >
                {/* Filters */}
                <div className="p-8 border-b border-white/5 flex flex-wrap gap-6 items-center bg-white/5">
                  <div className="flex items-center space-x-3 text-orange">
                    <Filter size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">Active Filters:</span>
                  </div>
                  <div className="flex gap-4">
                    {(['urgency', 'status'] as const).map(fType => (
                      <div key={fType} className="relative group">
                        <select
                          name={fType}
                          value={filters[fType]}
                          onChange={(e) => setFilters(prev => ({...prev, [e.target.name]: e.target.value}))}
                          className="appearance-none bg-navy border border-white/10 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest pr-12 outline-none focus:ring-1 focus:ring-orange hover:border-white/20 transition-all"
                        >
                          <option value="">All {fType}s</option>
                          {fType === 'urgency' ? (
                            ['Low', 'Medium', 'High', 'Critical'].map(v => <option key={v} value={v}>{v}</option>)
                          ) : (
                            ['Pending', 'In Progress', 'Resolved'].map(v => <option key={v} value={v}>{v}</option>)
                          )}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                  {(filters.urgency || filters.status) && (
                    <button 
                      onClick={() => setFilters({urgency: '', status: ''})}
                      className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all underline underline-offset-4"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Queue Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/5">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Citizen Profile</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Docket Details</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Priority</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Current Status</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Update Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredComplaints.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 rounded-lg bg-navy-deep border border-white/10 flex items-center justify-center font-black text-xs text-orange">
                                {c.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-black text-white">{c.userName}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter italic">ID: {c.userId.slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-black text-white mb-1">{c.title}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                              <MapPin size={10} className="text-orange" /> {c.location}
                            </p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border-2 ${getUrgencyBadge(c.urgency)}`}>
                              {c.urgency}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${c.status === 'Resolved' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : c.status === 'In Progress' ? 'bg-blue-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                              <span className="text-[10px] font-black uppercase tracking-widest">{c.status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="inline-flex items-center relative group/select">
                              <select 
                                value={c.status}
                                onChange={(e) => updateComplaintStatus(c.id, e.target.value as Status)}
                                className="bg-navy-deep border border-white/5 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-lg outline-none cursor-pointer hover:border-orange transition-all appearance-none pr-8"
                              >
                                <option value="Pending">PENDING</option>
                                <option value="In Progress">IN PROGRESS</option>
                                <option value="Resolved">RESOLVED</option>
                              </select>
                              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredComplaints.length === 0 && (
                    <div className="p-20 text-center">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-gray-500" />
                      </div>
                      <p className="text-gray-500 italic font-medium uppercase tracking-[0.2em] text-xs">No records found matching current criteria.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
