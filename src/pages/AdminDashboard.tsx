import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, Urgency, Status } from '../AppContext';

const AdminDashboard: React.FC = () => {
  const { currentUser, logout, complaints, users, updateComplaintStatus } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'queue'>('overview');
  const [filters, setFilters] = useState({ urgency: '', status: '' });

  if (!currentUser || currentUser.role !== 'Admin') {
    navigate('/');
    return null;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredComplaints = complaints.filter(c => 
    (filters.urgency === '' || c.urgency === filters.urgency) &&
    (filters.status === '' || c.status === filters.status)
  );

  const stats = {
    totalUsers: users.length,
    totalComplaints: complaints.length,
    urgencyBreakdown: {
      Low: complaints.filter(c => c.urgency === 'Low').length,
      Medium: complaints.filter(c => c.urgency === 'Medium').length,
      High: complaints.filter(c => c.urgency === 'High').length,
      Critical: complaints.filter(c => c.urgency === 'Critical').length,
    }
  };

  const getUrgencyBadge = (urgency: Urgency) => {
    switch (urgency) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col fixed h-full shadow-2xl z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-black tracking-tighter text-orange">UNNAT</h1>
          <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Admin Control</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'overview' ? 'bg-orange text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <span>📊</span>
            <span>Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('queue')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'queue' ? 'bg-orange text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <span>📋</span>
            <span>Complaints Queue</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center font-bold text-navy">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="w-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 py-2 rounded-md text-xs font-black transition-all"
          >
            LOGOUT SYSTEM
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-navy capitalize">{activeTab}</h2>
            <p className="text-gray-500 font-medium">Project Unnat Management System</p>
          </div>
          <div className="text-right text-xs font-bold text-gray-400">
            SYSTEM STATUS: <span className="text-green-500">ONLINE</span>
          </div>
        </header>

        {activeTab === 'overview' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Citizens</p>
                <h3 className="text-4xl font-black text-navy">{stats.totalUsers}</h3>
                <div className="mt-4 h-1 w-12 bg-orange rounded-full"></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Complaints</p>
                <h3 className="text-4xl font-black text-navy">{stats.totalComplaints}</h3>
                <div className="mt-4 h-1 w-12 bg-orange rounded-full"></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Avg. Response Time</p>
                <h3 className="text-4xl font-black text-navy">2.4d</h3>
                <div className="mt-4 h-1 w-12 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Breakdown Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-6">Complaints by Urgency Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.urgencyBreakdown).map(([level, count]) => (
                  <div key={level} className={`p-4 rounded-xl border-2 ${getUrgencyBadge(level as Urgency)}`}>
                    <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">{level}</p>
                    <p className="text-2xl font-black">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filters */}
            <div className="p-6 border-b border-gray-50 flex flex-wrap gap-4 bg-gray-50/50">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-black text-gray-400 uppercase mb-1">Urgency Level</label>
                <select
                  name="urgency"
                  value={filters.urgency}
                  onChange={handleFilterChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange"
                >
                  <option value="">All Levels</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-black text-gray-400 uppercase mb-1">Complaint Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Citizen</th>
                    <th className="px-6 py-4">Title & Location</th>
                    <th className="px-6 py-4">Urgency</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-navy">{c.userName}</p>
                        <p className="text-xs text-gray-400">ID: {c.userId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-navy">{c.title}</p>
                        <p className="text-xs text-gray-500 font-medium">📍 {c.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase border ${getUrgencyBadge(c.urgency)}`}>
                          {c.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${c.status === 'Resolved' ? 'bg-green-500' : c.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                          <span className="font-bold text-navy text-xs">{c.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">{c.date}</td>
                      <td className="px-6 py-4 text-right">
                        <select 
                          value={c.status}
                          onChange={(e) => updateComplaintStatus(c.id, e.target.value as Status)}
                          className="bg-navy text-white text-[10px] font-black px-2 py-1 rounded-md outline-none cursor-pointer hover:bg-orange transition-colors"
                        >
                          <option value="Pending">PENDING</option>
                          <option value="In Progress">PROGRESS</option>
                          <option value="Resolved">RESOLVE</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredComplaints.length === 0 && (
                <div className="p-12 text-center text-gray-400 italic font-medium">
                  No complaints found matching the current filters.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
