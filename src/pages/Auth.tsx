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
    if (location.state?.register) setIsLogin(false);
    if (location.state?.login) setIsLogin(true);
  }, [currentUser, navigate, location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (!success) alert('Invalid credentials');
    } else {
      register(formData.name, formData.email, formData.role);
    }
  };

  return (
    <div className="min-h-screen bg-gov-background font-noto flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black font-baskerville text-gov-green-dark mb-2"
          >
            UNNAT
          </motion.h1>
          <p className="text-gov-text-secondary font-bold uppercase tracking-widest text-xs">नागरिक शिकायत प्रणाली</p>
        </div>

        {/* Main Card */}
        <div className="card-gov p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gov-green-primary to-transparent"></div>
          
          <h2 className="text-3xl font-baskerville font-bold text-gov-green-dark mb-8 border-b border-gov-border pb-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Register Only) */}
            {!isLogin && (
              <div className="relative group/field">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary mb-2 block ml-2">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gov-green-primary group-focus-within/field:text-gov-green-dark transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all"
                    placeholder="E.g. Rahul Sharma"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="relative group/field">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary mb-2 block ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gov-green-primary group-focus-within/field:text-gov-green-dark transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all"
                  placeholder="name@government.in"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group/field">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary mb-2 block ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gov-green-primary group-focus-within/field:text-gov-green-dark transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gov-border rounded-lg bg-gov-light text-gov-text-primary placeholder-gov-text-secondary focus:outline-none focus:border-gov-green-primary focus:ring-2 focus:ring-gov-green-light transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gov-green-primary hover:text-gov-green-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Role Selection (Register Only) */}
            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gov-green-primary mb-2 block ml-2">Select Role</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Citizen'})}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all font-bold ${formData.role === 'Citizen' ? 'border-gov-green-primary bg-gov-green-light text-gov-green-dark' : 'border-gov-border bg-gov-light text-gov-text-secondary hover:border-gov-green-primary'}`}
                  >
                    <User size={24} className="mb-2" />
                    <span className="text-xs uppercase tracking-widest">Citizen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Admin'})}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all font-bold ${formData.role === 'Admin' ? 'border-gov-green-primary bg-gov-green-light text-gov-green-dark' : 'border-gov-border bg-gov-light text-gov-text-secondary hover:border-gov-green-primary'}`}
                  >
                    <Shield size={24} className="mb-2" />
                    <span className="text-xs uppercase tracking-widest">Admin</span>
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-gov-primary w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center space-x-2 font-bold"
            >
              <span>{isLogin ? 'Login' : 'Register'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-8 text-center border-t border-gov-border pt-6">
            <p className="text-gov-text-secondary text-sm font-bold">
              {isLogin ? "New to the platform?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gov-green-primary hover:text-gov-green-secondary font-bold hover:underline transition-all ml-1"
              >
                {isLogin ? 'Create Account' : 'Login Here'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Landing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <button 
            onClick={() => navigate('/')}
            className="text-gov-text-secondary hover:text-gov-green-primary font-bold uppercase text-[10px] tracking-widest transition-all"
          >
            ← Back to Landing
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
