import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  MapPin, 
  Calendar, 
  Camera, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Home,
  User as UserIcon,
  Bell
} from 'lucide-react';
import { useAppContext, Urgency } from '../AppContext';

const CitizenDashboard: React.FC = () => {
  const { currentUser, logout, complaints, addComplaint, loading } = useAppContext();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    urgency: 'Medium' as Urgency,
  });

  if (loading) return null;
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gov-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 font-bold">Please login to access dashboard.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint(formData);
    setFormData({ title: '', description: '', location: '', urgency: 'Medium' });
    setShowForm(false);
  };

  const userComplaints = complaints.filter(c => c.userId === currentUser.id);

  const getUrgencyStyles = (urgency: Urgency) => {
    switch (urgency) {
      case 'Low': return 'border-gov-green-light text-gov-green-dark bg-gov-green-light';
      case 'Medium': return 'border-yellow-400 text-yellow-600 bg-yellow-100';
      case 'High': return 'border-orange-400 text-orange-600 bg-orange-100';
      case 'Critical': return 'border-red-400 text-red-600 bg-red-100';
      default: return 'border-gov-border text-gov-text-secondary bg-gov-background';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={14} className="animate-pulse text-yellow-500" />;
      case 'In Progress': return <AlertCircle size={14} className="animate-bounce text-blue-500" />;
      case 'Resolved': return <CheckCircle2 size={14} className="text-gov-green-primary" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gov-background text-gov-text-primary font-noto pb-24 md:pb-8">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-gov-white shadow-sm border-b border-gov-border px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gov-green-primary rounded-lg flex items-center justify-center font-black text-gov-white text-lg">
              U
            </div>
            <h1 className="text-xl font-baskerville font-bold text-gov-green-dark hidden sm:block">
              UNNAT
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gov-background rounded-full transition-colors relative">
              <Bell size={20} className="text-gov-green-primary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gov-border">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-widest text-gov-green-primary">{currentUser.name}</p>
                <p className="text-[10px] text-gov-text-secondary font-bold uppercase">Citizen</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gov-green-light border-2 border-gov-green-primary flex items-center justify-center overflow-hidden">
                <UserIcon size={20} className="text-gov-green-dark" />
              </div>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="tricolor-strip">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Banner */}
        <section className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-4xl font-baskerville font-bold text-gov-green-dark mb-2">
                Welcome, <span className="text-gov-green-primary">{currentUser.name.split(' ')[0]}</span>
              </h2>
              <p className="text-gov-text-secondary font-bold uppercase tracking-widest text-xs">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div className="card-gov p-6 flex items-center space-x-6">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-gov-border" />
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={175} strokeDashoffset={175 * (1 - 0.85)} className="text-gov-green-primary" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-gov-green-dark">85</div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gov-text-secondary">Civic Score</p>
                <p className="text-xs font-bold text-gov-green-primary">Excellent Standing</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Complaint Action */}
        <div className="mb-12">
          {!showForm ? (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(true)}
              className="w-full card-gov p-8 border-dashed border-2 border-gov-border hover:border-gov-green-primary flex flex-col items-center justify-center space-y-4 group transition-all"
            >
              <div className="p-4 bg-gov-green-light rounded-xl text-gov-green-primary group-hover:bg-gov-green-primary group-hover:text-gov-white transition-all">
                <Plus size={32} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-baskerville font-bold text-gov-green-dark">File a Complaint</h3>
                <p className="text-sm text-gov-text-secondary font-medium">Help improve Nagpur's civic services.</p>
              </div>
            </motion.button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-gov overflow-hidden"
            >
              <div className="bg-gov-green-primary p-4 flex justify-between items-center">
                <h3 className="font-bold font-baskerville text-gov-white uppercase tracking-widest text-sm">New Complaint Form</h3>
                <button onClick={() => setShowForm(false)} className="text-gov-white/70 hover:text-gov-white transition-colors font-bold text-xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary ml-2">Complaint Title</label>
                    <input 
                      name="title" value={formData.title} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all"
                      placeholder="Briefly describe the issue" required 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary ml-2">Detailed Description</label>
                    <textarea 
                      name="description" value={formData.description} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all min-h-[120px]" 
                      placeholder="Provide specific details about the problem..." required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary ml-2">Exact Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gov-green-primary" />
                      <input 
                        name="location" value={formData.location} onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all"
                        placeholder="Street, Ward, or Landmark" required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary ml-2">Urgency Level</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Low', 'Medium', 'High', 'Critical'] as Urgency[]).map(level => (
                        <button
                          key={level} type="button"
                          onClick={() => setFormData({...formData, urgency: level})}
                          className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-tighter border-2 transition-all ${formData.urgency === level ? getUrgencyStyles(level) : 'border-gov-border text-gov-text-secondary hover:border-gov-green-primary bg-gov-light'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:flex-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary ml-2 mb-2 block">Visual Evidence</label>
                    <div className="border-2 border-dashed border-gov-border rounded-lg p-4 flex items-center justify-center space-x-3 text-gov-text-secondary hover:border-gov-green-primary hover:text-gov-green-primary transition-all cursor-pointer group">
                      <Camera size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold">Tap to Upload Photo</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-gov-primary w-full sm:w-auto px-12 py-4 text-xs tracking-widest uppercase">
                    Submit Complaint
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {/* Complaints Timeline */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black font-syne tracking-tight">Complaint History</h3>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-3 py-1 rounded-full">
              {userComplaints.length} Total Records
            </div>
          </div>

          <div className="relative space-y-6 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-gov-border">
            {userComplaints.length === 0 ? (
              <div className="card-gov p-12 text-center">
                <p className="text-gov-text-secondary font-medium">No complaints filed yet.</p>
              </div>
            ) : (
              <AnimatePresence mode='popLayout'>
                {userComplaints.map((complaint, idx) => (
                  <motion.div 
                    key={complaint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-12 group"
                  >
                    <div className="absolute left-0 top-6 w-10 h-10 rounded-full bg-gov-white border-4 border-gov-background z-10 flex items-center justify-center shadow-sm">
                      <div className={`w-3 h-3 rounded-full ${complaint.urgency === 'Critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gov-green-primary'}`}></div>
                    </div>
                    
                    <div className="card-gov p-6 group-hover:border-gov-green-primary transition-all group-hover:translate-x-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-baskerville font-bold text-gov-green-dark mb-1">{complaint.title}</h4>
                          <div className="flex items-center space-x-3 text-[10px] font-bold text-gov-text-secondary uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {complaint.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {complaint.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase border-2 ${getUrgencyStyles(complaint.urgency)}`}>
                            {complaint.urgency}
                          </span>
                          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gov-green-light text-gov-green-dark border border-gov-green-primary">
                            {getStatusIcon(complaint.status)}
                            {complaint.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-gov-text-secondary text-sm leading-relaxed line-clamp-2">"{complaint.description}"</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>

      {/* Mobile Tab Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 card-gov rounded-none border-t border-gov-border px-6 py-4 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-gov-green-primary">
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-gov-green-primary w-12 h-12 rounded-lg flex items-center justify-center text-gov-white shadow-lg shadow-gov-green-primary/30 -mt-10 border-4 border-gov-background"
        >
          <Plus size={24} />
        </button>
        <button className="flex flex-col items-center gap-1 text-gov-text-secondary">
          <UserIcon size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default CitizenDashboard;
