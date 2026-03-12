import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAppContext, Role } from '../AppContext';

const Auth: React.FC = () => {
  const { login, register, currentUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Citizen' as Role,
  });

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === 'Admin' ? '/admin-dashboard' : '/citizen-dashboard');
    }
    // Check if coming from landing with a specific state
    if (location.state?.register) setIsLogin(false);
    if (location.state?.login) setIsLogin(true);
  }, [currentUser, navigate, location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (!success) alert('Invalid credentials');
      } else {
        await register(formData.name, formData.email, formData.role, formData.password);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen hero-gradient relative flex items-center justify-center p-4 overflow-hidden font-dm">
      <div className="fixed inset-0 grid-pattern z-0 opacity-10"></div>
      <div className="fixed inset-0 noise-overlay z-0 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black font-syne tracking-tighter text-white mb-2"
          >
            PROJECT <span className="text-orange">UNNAT</span>
          </motion.h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs italic">Authenticating Citizen Power</p>
        </div>

        <div className="glass-card p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <h2 className="text-3xl font-black font-syne text-white mb-8 border-b border-white/5 pb-4">
            {isLogin ? 'Welcome Back' : 'Create Identity'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="relative group/field">
                <label className="text-[10px] font-black uppercase tracking-widest text-orange mb-1 block ml-2">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/field:text-orange transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="premium-input w-full pl-12"
                    placeholder="E.g. Rahul Sharma"
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange mb-1 block ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/field:text-orange transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="premium-input w-full pl-12"
                  placeholder="name@government.in"
                  required
                />
              </div>
            </div>

            <div className="relative group/field">
              <label className="text-[10px] font-black uppercase tracking-widest text-orange mb-1 block ml-2">Access Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/field:text-orange transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="premium-input w-full pl-12 pr-12"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-orange mb-1 block ml-2">System Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Citizen'})}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.role === 'Citizen' ? 'border-orange bg-orange/10 text-white' : 'border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                    <User size={24} className="mb-2" />
                    <span className="font-bold text-xs uppercase tracking-widest">Citizen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Admin'})}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.role === 'Admin' ? 'border-orange bg-orange/10 text-white' : 'border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                    <Shield size={24} className="mb-2" />
                    <span className="font-bold text-xs uppercase tracking-widest">Admin</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-premium-primary w-full py-4 text-sm tracking-[0.2em] flex items-center justify-center space-x-2"
            >
              <span>{isLogin ? 'SECURE LOGIN' : 'INITIALIZE ACCOUNT'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-6">
            <p className="text-gray-500 text-sm font-bold">
              {isLogin ? "New to the platform?" : "Part of the system?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange hover:text-orange-saffron font-black hover:underline transition-all ml-1"
              >
                {isLogin ? 'Register Authority' : 'Authorized Login'}
              </button>
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <button 
            onClick={() => navigate('/')}
            className="text-white/20 hover:text-white/40 font-black uppercase text-[10px] tracking-widest transition-all"
          >
            ← Back to Landing
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
