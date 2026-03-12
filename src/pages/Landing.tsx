import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Lightbulb, Droplet, Road, Trash2, Zap, TreePine, Building } from 'lucide-react';

const StatItem = ({ value, label, icon: Icon }: { value: string; label: string; icon?: React.ElementType }) => (
  <div className="text-center p-4">
    {Icon && <Icon className="text-gov-green-primary mx-auto mb-2" size={32} />}
    <p className="font-baskerville text-4xl font-bold text-gov-green-dark mb-1">{value}</p>
    <p className="text-gov-text-secondary text-sm">{label}</p>
  </div>
);

const CategoryTile = ({ icon: Icon, name }: { icon: React.ElementType; name: string }) => (
  <motion.div
    whileHover={{ y: -5, borderColor: '#2D6A4F' }}
    className="card-gov p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-200"
  >
    <Icon className="text-gov-green-primary mb-3" size={40} />
    <p className="text-gov-text-primary font-bold">{name}</p>
  </motion.div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth', { state: { login: true } });
  };

  const handleRegisterClick = () => {
    navigate('/auth', { state: { register: true } });
  };

  return (
    <div className="min-h-screen bg-gov-background font-noto text-gov-text-primary">
      {/* Navbar */}
      <nav className="bg-gov-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🇮🇳</span>
            <h1 className="font-baskerville text-2xl font-bold text-gov-green-dark">Project Unnat</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleLoginClick} className="btn-gov-outline">Login</button>
            <button onClick={handleRegisterClick} className="btn-gov-primary">Register</button>
          </div>
        </div>
        <div className="tricolor-strip">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <div className="card-gov p-8 md:p-16 max-w-4xl mx-auto">
            <p className="text-gov-green-primary font-mono text-sm mb-4 tracking-wider">🇮🇳 Powered by Digital India</p>
            <h2 className="font-tiro text-5xl md:text-6xl font-bold text-gov-green-dark leading-tight mb-4">नागरिक शिकायत प्रणाली</h2>
            <p className="text-2xl text-gov-text-secondary mb-6">Citizen Complaint & Governance Platform</p>
            <p className="text-gov-text-secondary max-w-2xl mx-auto mb-8">
              A transparent platform for citizens of Nagpur to raise civic issues and track their resolution in real time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button onClick={handleRegisterClick} className="btn-gov-primary">File a Complaint</button>
              <button onClick={() => { /* Track complaint logic */ }} className="btn-gov-outline">Track Your Complaint</button>
            </div>
            <p className="text-gov-text-secondary text-sm font-mono">Available in Hindi · Marathi · English</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gov-green-light py-8">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 divide-x divide-gov-border">
            <StatItem value="48" label="Municipal Wards" icon={Building} />
            <StatItem value="12,400+" label="Complaints Filed" icon={FileText} />
            <StatItem value="98%" label="Resolution Rate" icon={CheckCircle} />
            <StatItem value="32,000+" label="Citizens Registered" icon={Users} />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-6 py-16">
          <h3 className="section-heading-gov">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-gov p-8 relative overflow-hidden">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">01</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">Register with Aadhaar verification</h4>
              <p className="text-gov-text-secondary">Secure your identity and get started with a simple, verified registration process.</p>
            </div>
            <div className="card-gov p-8 relative overflow-hidden">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">02</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">Submit your complaint with photo and location</h4>
              <p className="text-gov-text-secondary">Easily report issues by providing details, photos, and precise location data.</p>
            </div>
            <div className="card-gov p-8 relative overflow-hidden">
              <span className="absolute -top-4 -left-4 text-8xl font-bold text-gov-border opacity-50">03</span>
              <h4 className="text-xl font-bold text-gov-green-dark mb-4">Track resolution in real time</h4>
              <p className="text-gov-text-secondary">Monitor the progress of your complaints and receive updates until resolution.</p>
            </div>
          </div>
        </section>

        {/* Complaint Categories Section */}
        <section className="container mx-auto px-6 py-16">
          <h3 className="section-heading-gov">Report Issues Across All Civic Departments</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <CategoryTile icon={Road} name="Roads" />
            <CategoryTile icon={Droplet} name="Water Supply" />
            <CategoryTile icon={Zap} name="Electricity" />
            <CategoryTile icon={Trash2} name="Garbage" />
            <CategoryTile icon={Lightbulb} name="Street Lights" />
            <CategoryTile icon={TreePine} name="Parks" />
            <CategoryTile icon={Building} name="Public Property" />
            <CategoryTile icon={FileText} name="Drainage" /> {/* Reusing FileText for Drainage for now */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gov-green-dark text-white py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🇮🇳</span>
            <div>
              <h4 className="font-baskerville text-xl font-bold">Project Unnat</h4>
              <p className="text-sm text-white/70">Swachh Shasan. Swasth Nagrik.</p>
            </div>
          </div>
          <div className="text-center">
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline text-white/80">About Us</a></li>
              <li><a href="#" className="hover:underline text-white/80">Help & Support</a></li>
              <li><a href="#" className="hover:underline text-white/80">RTI</a></li>
              <li><a href="#" className="hover:underline text-white/80">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/70 mb-2">A Digital India Initiative</p>
            {/* GOI Logo Placeholder */}
            <div className="w-24 h-12 bg-white/10 ml-auto flex items-center justify-center text-white/50 text-xs rounded">GOI Logo</div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/50 text-xs">
          © 2025 Nagpur Municipal Corporation. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
