import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, Urgency } from '../AppContext';

const CitizenDashboard: React.FC = () => {
  const { currentUser, logout, complaints, addComplaint } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    urgency: 'Medium' as Urgency,
  });

  if (!currentUser) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({
      title: '',
      description: '',
      location: '',
      urgency: 'Medium',
    });
    alert('Complaint submitted successfully!');
  };

  const userComplaints = complaints.filter(c => c.userId === currentUser.id);

  const getUrgencyColor = (urgency: Urgency) => {
    switch (urgency) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500 text-white';
      case 'In Progress': return 'bg-blue-500 text-white';
      case 'Resolved': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-navy text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tighter text-orange">UNNAT</span>
            <div className="h-6 w-px bg-white/20 hidden md:block"></div>
            <span className="hidden md:block text-sm font-medium">Citizen Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden sm:inline">Welcome, <strong>{currentUser.name}</strong></span>
            <button 
              onClick={() => { logout(); navigate('/'); }}
              className="bg-orange hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="grid grid-cols-1 gap-8">
          {/* Complaint Form */}
          <section className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-navy p-4">
              <h2 className="text-xl font-bold text-white">File a New Complaint</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-navy mb-1">Complaint Title</label>
                  <input 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all" 
                    placeholder="Brief summary of the issue"
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-navy mb-1">Details / Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all" 
                    placeholder="Provide as much detail as possible..."
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Location</label>
                  <input 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all" 
                    placeholder="Area or landmark"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-1">Urgency Level</label>
                  <select 
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-navy mb-1">Attach Photo (Optional)</label>
                  <input 
                    type="file" 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-navy file:text-white hover:file:bg-navy/90" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-orange text-white px-8 py-3 rounded-md font-black hover:bg-orange-600 active:scale-95 transition-all shadow-lg self-end w-full sm:w-auto"
                >
                  SUBMIT COMPLAINT
                </button>
              </div>
            </form>
          </section>

          {/* Complaints List */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-navy flex items-center">
              <span className="bg-orange w-2 h-8 mr-3 rounded-full"></span>
              Your Submissions
            </h2>
            
            {userComplaints.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic">No complaints submitted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {userComplaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-orange hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-navy">{complaint.title}</h3>
                          <p className="text-sm text-gray-500 font-medium">Ref: {complaint.id.toUpperCase()}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 items-start">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${getUrgencyColor(complaint.urgency)}`}>
                            {complaint.urgency}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs font-bold text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span>📍 {complaint.location}</span>
                          <span>📅 {complaint.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
