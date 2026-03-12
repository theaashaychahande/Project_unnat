import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Citizen',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', formData);
    } else {
      console.log('Registering with:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-white">
      <div className="bg-white text-navy p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Citizen">Citizen</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;