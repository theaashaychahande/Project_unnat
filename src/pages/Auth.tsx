import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, Role } from '../AppContext';

const Auth: React.FC = () => {
  const { login, register, currentUser } = useAppContext();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
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
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className="min-h-screen flex items-center justify-center bg-navy text-white font-sans px-4">
      <div className="bg-white text-navy p-8 rounded-lg shadow-2xl w-full max-w-md transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-navy tracking-tight">Project Unnat</h1>
          <p className="text-gray-500 mt-2">Professional Governance Platform</p>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-orange pb-2">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-1">Account Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition-all"
              >
                <option value="Citizen">Citizen</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange text-white font-bold py-3 px-4 rounded-md hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
          >
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm border-t pt-4">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange font-bold hover:underline ml-1"
            >
              {isLogin ? 'Register Now' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
