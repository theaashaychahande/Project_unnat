import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import { useAppContext } from './AppContext';

function App() {
  const { currentUser, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-gov-background flex items-center justify-center text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-gov-green-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="space-y-2">
            <h2 className="text-2xl font-baskerville font-bold text-gov-green-dark">Initializing UNNAT</h2>
            <p className="text-gov-text-secondary font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">Establishing Secure Connection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route 
        path="/citizen-dashboard" 
        element={currentUser?.role === 'Citizen' ? <CitizenDashboard /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/admin-dashboard" 
        element={currentUser?.role === 'Admin' ? <AdminDashboard /> : <Navigate to="/auth" />} 
      />
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
