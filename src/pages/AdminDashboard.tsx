import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import MapView from '../components/MapView';

const AdminDashboard: React.FC = () => {
  const { currentUser, logout, complaints, users, updateComplaintStatus, loading } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'map'>('overview');
  const [filters, setFilters] = useState({ urgency: '', status: '' });

  if (loading) return null;
  if (!currentUser || currentUser.role !== 'Admin') {
    return (
      <div className="min-h-screen bg-gov-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 font-bold">Unauthorized Access. Redirecting...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gov-background text-gov-text-primary font-noto flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-gov-white border-r border-gov-border flex flex-col h-screen sticky top-0 z-50 shadow-sm">
        <div className="p-8 border-b border-gov-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gov-green-primary rounded-lg flex items-center justify-center font-bold text-gov-white text-lg">U</div>
            <h1 className="text-2xl font-baskerville font-bold text-gov-green-dark">UNNAT</h1>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary mt-4">Admin Control</p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-lg font-bold transition-all group ${activeTab === 'overview' ? 'bg-gov-green-light border border-gov-green-primary text-gov-green-dark' : 'text-gov-text-secondary hover:bg-gov-background hover:text-gov-green-primary'}`}
          >
            <LayoutDashboard size={20} className={activeTab === 'overview' ? 'text-gov-green-dark' : 'group-hover:text-gov-green-primary'} />
            <span className="uppercase tracking-widest text-xs">Overview</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-lg font-bold transition-all group ${activeTab === 'queue' ? 'bg-gov-green-light border border-gov-green-primary text-gov-green-dark' : 'text-gov-text-secondary hover:bg-gov-background hover:text-gov-green-primary'}`}
          >
            <ClipboardList size={20} className={activeTab === 'queue' ? 'text-gov-green-dark' : 'group-hover:text-gov-green-primary'} />
            <span className="uppercase tracking-widest text-xs">Complaints</span>
          </button>

          <button 
            onClick={() => setActiveTab('map')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-lg font-bold transition-all group ${activeTab === 'map' ? 'bg-gov-green-light border border-gov-green-primary text-gov-green-dark' : 'text-gov-text-secondary hover:bg-gov-background hover:text-gov-green-primary'}`}
          >
            <MapPin size={20} className={activeTab === 'map' ? 'text-gov-green-dark' : 'group-hover:text-gov-green-primary'} />
            <span className="uppercase tracking-widest text-xs">Map View</span>
          </button>

          <div className="pt-8 opacity-20 border-t border-gov-border mt-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary mb-4 px-6">System Management</p>
            <button className="w-full flex items-center space-x-4 px-6 py-4 text-gov-text-secondary grayscale cursor-not-allowed">
              <Users size={20} />
              <span className="uppercase tracking-widest text-xs">User Directory</span>
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-gov-border bg-gov-background/50">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gov-green-light border-2 border-gov-green-primary flex items-center justify-center font-bold text-gov-green-dark">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{currentUser.name}</p>
              <p className="text-[10px] text-gov-green-primary font-bold uppercase tracking-widest">Master Admin</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg text-[10px] font-bold tracking-widest transition-all border border-red-200"
          >
            <LogOut size={16} />
            <span>LOGOUT SYSTEM</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <header className="sticky top-0 z-40 bg-gov-white/80 backdrop-blur-xl border-b border-gov-border px-10 py-6 flex justify-between items-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gov-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search docket, citizen or location..." 
              className="bg-gov-background border border-gov-border rounded-xl pl-12 pr-4 py-3 text-sm w-full outline-none focus:ring-1 focus:ring-gov-green-primary transition-all"
            />
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-3 bg-gov-background border border-gov-border rounded-xl text-gov-text-secondary hover:text-gov-green-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gov-white"></span>
            </button>
            <div className="h-8 w-px bg-gov-border"></div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gov-text-secondary uppercase tracking-widest">Current Status</p>
              <p className="text-xs font-bold text-gov-green-primary flex items-center justify-end gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gov-green-primary"></span>
                SYSTEM ONLINE
              </p>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black font-baskerville tracking-tight capitalize mb-2">{activeTab}</h2>
            <p className="text-gov-text-secondary font-bold uppercase tracking-[0.2em] text-xs">Real-time Governance Analytics</p>
          </div>

          <div>
            {activeTab === 'overview' ? (
              <div key="overview" className="space-y-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Registered Citizens', val: stats.totalUsers, icon: Users, color: 'text-blue-500' },
                    { label: 'Active Complaints', val: stats.totalComplaints, icon: TrendingUp, color: 'text-orange' },
                    { label: 'Resolution Efficiency', val: `${stats.resolvedRate}%`, icon: CheckCircle2, color: 'text-green-500' }
                  ].map((s, i) => (
                    <div key={i} className="card-gov p-8 border-l-4 border-l-gov-green-primary relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                        <s.icon size={120} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gov-text-secondary mb-2">{s.label}</p>
                      <h3 className="text-5xl font-black font-syne text-gov-green-dark tracking-tighter">{s.val}</h3>
                    </div>
                  ))}
                </div>

                {/* Charts & Summaries */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 card-gov p-8">
                    <h3 className="text-xl font-black font-syne tracking-tight mb-8 text-gov-text-primary">Urgency Distribution</h3>
                    <div className="space-y-6">
                      {Object.entries(stats.urgencyBreakdown).map(([level, count]) => (
                        <div key={level}>
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gov-text-secondary">{level} Urgency</span>
                            <span className="text-sm font-black text-gov-text-primary">{count}</span>
                          </div>
                          <div className="h-2 bg-gov-background rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${(count / (stats.totalComplaints || 1)) * 100}%` }}
                              className={`h-full ${level === 'Critical' ? 'bg-red-500' : level === 'High' ? 'bg-orange-600' : level === 'Medium' ? 'bg-yellow-500' : 'bg-gov-green-primary'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-gov p-8 bg-gov-green-light/20 border-gov-green-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <AlertTriangle size={48} />
                    </div>
                    <h3 className="text-xl font-baskerville font-bold tracking-tight mb-6 text-gov-green-dark">Critical Briefing</h3>
                    <div className="space-y-4">
                      {complaints.filter(c => c.urgency === 'Critical' && c.status !== 'Resolved').slice(0, 3).map(c => (
                        <div key={c.id} className="p-4 bg-gov-white border border-gov-border rounded-xl hover:border-gov-green-primary transition-all cursor-pointer">
                          <p className="text-xs font-bold text-gov-text-primary truncate">{c.title}</p>
                          <p className="text-[10px] text-gov-text-secondary font-bold uppercase mt-1">📍 {c.location}</p>
                        </div>
                      ))}
                      {stats.urgencyBreakdown.Critical === 0 && (
                        <div className="py-8 text-center">
                          <CheckCircle2 size={32} className="mx-auto text-gov-green-primary opacity-20 mb-3" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">No Critical Alerts</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Smaller Map View in Overview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black font-syne tracking-tight text-gov-green-dark">Geographical Distribution</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Nagpur City Map</span>
                  </div>
                  <MapView complaints={complaints} />
                </div>
              </div>
            ) : activeTab === 'map' ? (
              <div key="map" className="space-y-6">
                {/* Map Filters */}
                <div className="card-gov p-6 flex flex-wrap gap-6 items-center bg-gov-white">
                  <div className="flex items-center space-x-3 text-gov-green-primary">
                    <Filter size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Map Filters:</span>
                  </div>
                  <div className="flex gap-4">
                    {(['urgency', 'status'] as const).map(fType => (
                      <div key={fType} className="relative group">
                        <select
                          name={fType}
                          value={filters[fType]}
                          onChange={(e) => setFilters(prev => ({...prev, [e.target.name]: e.target.value}))}
                          className="appearance-none bg-gov-background border border-gov-border rounded-lg px-6 py-3 text-[10px] font-bold uppercase tracking-widest pr-12 outline-none focus:ring-1 focus:ring-gov-green-primary hover:border-gov-green-secondary transition-all"
                        >
                          <option value="">All {fType}s</option>
                          {fType === 'urgency' ? (
                            ['Low', 'Medium', 'High', 'Critical'].map(v => <option key={v} value={v}>{v}</option>)
                          ) : (
                            ['Pending', 'In Progress', 'Resolved'].map(v => <option key={v} value={v}>{v}</option>)
                          )}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gov-text-secondary pointer-events-none" />
                      </div>
                    ))}
                  </div>
                  {(filters.urgency || filters.status) && (
                    <button 
                      onClick={() => setFilters({urgency: '', status: ''})}
                      className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary hover:text-gov-green-primary transition-all underline underline-offset-4"
                    >
                      Reset Map
                    </button>
                  )}
                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gov-text-secondary uppercase tracking-widest">
                      Showing {filteredComplaints.length} locations
                    </span>
                  </div>
                </div>

                <MapView complaints={filteredComplaints} />
              </div>
            ) : (
              <div key="queue" className="card-gov overflow-hidden">
                {/* Filters */}
                <div className="p-8 border-b border-gov-border flex flex-wrap gap-6 items-center bg-gov-background/30">
                  <div className="flex items-center space-x-3 text-gov-green-primary">
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
                          className="appearance-none bg-gov-white border border-gov-border rounded-lg px-6 py-3 text-[10px] font-bold uppercase tracking-widest pr-12 outline-none focus:ring-1 focus:ring-gov-green-primary hover:border-gov-green-secondary transition-all"
                        >
                          <option value="">All {fType}s</option>
                          {fType === 'urgency' ? (
                            ['Low', 'Medium', 'High', 'Critical'].map(v => <option key={v} value={v}>{v}</option>)
                          ) : (
                            ['Pending', 'In Progress', 'Resolved'].map(v => <option key={v} value={v}>{v}</option>)
                          )}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gov-text-secondary pointer-events-none" />
                      </div>
                    ))}
                  </div>
                  {(filters.urgency || filters.status) && (
                    <button 
                      onClick={() => setFilters({urgency: '', status: ''})}
                      className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary hover:text-gov-green-primary transition-all underline underline-offset-4"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Queue Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gov-background/50 border-b border-gov-border">
                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Citizen Profile</th>
                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Docket Details</th>
                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Priority</th>
                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Current Status</th>
                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary text-right">Update Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gov-border">
                      {filteredComplaints.map((c) => (
                        <tr key={c.id} className="hover:bg-gov-background/30 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 rounded-lg bg-gov-green-light border border-gov-green-primary flex items-center justify-center font-bold text-xs text-gov-green-dark">
                                {c.userName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gov-text-primary">{c.userName}</p>
                                <p className="text-[10px] text-gov-text-secondary font-bold uppercase tracking-tighter italic">ID: {c.userId.slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-gov-text-primary mb-1">{c.title}</p>
                            <p className="text-[10px] text-gov-text-secondary font-bold uppercase tracking-widest flex items-center gap-2">
                              <MapPin size={10} className="text-gov-green-primary" /> {c.location}
                            </p>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase border-2 ${getUrgencyBadge(c.urgency)}`}>
                              {c.urgency}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${c.status === 'Resolved' ? 'bg-gov-green-primary shadow-[0_0_8px_rgba(45,106,79,0.4)]' : c.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{c.status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="inline-flex items-center relative group/select">
                              <select 
                                value={c.status}
                                onChange={(e) => updateComplaintStatus(c.id, e.target.value as Status)}
                                className="bg-gov-white border border-gov-border text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg outline-none cursor-pointer hover:border-gov-green-primary transition-all appearance-none pr-8"
                              >
                                <option value="Pending">PENDING</option>
                                <option value="In Progress">IN PROGRESS</option>
                                <option value="Resolved">RESOLVED</option>
                              </select>
                              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gov-text-secondary pointer-events-none" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredComplaints.length === 0 && (
                    <div className="p-20 text-center">
                      <div className="w-20 h-20 bg-gov-background rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={32} className="text-gov-text-secondary" />
                      </div>
                      <p className="text-gov-text-secondary font-medium uppercase tracking-[0.2em] text-xs">No records found matching current criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
