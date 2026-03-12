import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle } from 'lucide-react';

const StatCounter = ({ label, count, suffix = "", icon: Icon }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-orange/10 rounded-2xl text-orange">
          <Icon size={32} />
        </div>
      </div>
      <h3 className="text-4xl font-black font-syne text-white mb-2">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {count}
        </motion.span>
        {suffix}
      </h3>
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{label}</p>
    </motion.div>
  );
};

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden font-dm selection:bg-orange selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 hero-gradient z-0"></div>
      <div className="fixed inset-0 grid-pattern z-0 opacity-20"></div>
      <div className="fixed inset-0 noise-overlay z-0 pointer-events-none"></div>

      {/* Ashoka Chakra Watermark */}
      <div className="fixed -bottom-32 -right-32 w-[600px] h-[600px] opacity-[0.03] z-0 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14.5c-.28 0-.5.22-.5.5v2.22l-1.63-1.63a.495.495 0 00-.71 0 .495.495 0 000 .71l1.63 1.63h-2.22a.5.5 0 00-.5.5c0 .28.22.5.5.5h2.22l-1.63 1.63a.495.495 0 000 .71c.1.1.23.15.35.15s.26-.05.35-.15l1.63-1.63V15.5c0 .28.22.5.5.5s.5-.22.5-.5v-2.22l1.63 1.63c.1.1.23.15.35.15s.26-.05.35-.15a.495.495 0 000-.71L12.71 11h2.22c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-2.22l1.63-1.63a.495.495 0 000-.71.495.495 0 00-.71 0l-1.63 1.63V7.5c0-.28-.22-.5-.5-.5z"/>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="mb-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-2 bg-orange/10 border border-orange/20 rounded-full text-orange font-black text-xs uppercase tracking-[0.3em]"
            >
              Bharat Digital Governance
            </motion.span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black font-syne leading-tight mb-4 tracking-tighter">
            नागरिक <span className="text-orange drop-shadow-[0_0_30px_rgba(255,107,43,0.3)]">आवाज़</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold font-syne text-white/40 -mt-2 mb-10 tracking-widest uppercase">
            Project <span className="text-orange">Unnat</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Every complaint heard. Every issue resolved. <br />
            <span className="text-white/60">Modernizing governance for the 21st century citizen.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/', { state: { register: true } })}
              className="btn-premium-primary text-lg px-10 py-4"
            >
              REGISTER AS CITIZEN
            </button>
            <button 
              onClick={() => navigate('/', { state: { login: true } })}
              className="btn-premium-outline text-lg px-10 py-4"
            >
              ADMIN LOGIN
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="container mx-auto mt-32 border-t border-white/5 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCounter icon={CheckCircle} label="Complaints Resolved" count="12,400" suffix="+" />
          <StatCounter icon={FileText} label="Wards Covered" count="48" />
          <StatCounter icon={Users} label="Response Rate" count="98" suffix="%" />
        </div>
      </section>

      {/* Footer Details */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center space-x-2 text-white/20 font-black tracking-widest uppercase text-[10px]">
          <span>Nagpur Municipal Corporation</span>
          <span className="text-orange">•</span>
          <span>Digital Transformation Cell</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
