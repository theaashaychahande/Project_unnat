import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import { useAppContext } from './AppContext';

function App() {
  const { currentUser } = useAppContext();

  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
