import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'Citizen' | 'Admin';
export type Urgency = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Pending' | 'In Progress' | 'Resolved';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  location: string;
  urgency: Urgency;
  photoUrl?: string;
  date: string;
  status: Status;
  latitude: number;
  longitude: number;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  complaints: Complaint[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, role: Role, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status' | 'latitude' | 'longitude'>) => Promise<void>;
  updateComplaintStatus: (complaintId: string, status: Status) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('unnat_user');
      const storedUsers = localStorage.getItem('unnat_users');
      const storedComplaints = localStorage.getItem('unnat_complaints');

      if (storedUser && storedUser !== 'undefined') setCurrentUser(JSON.parse(storedUser));
      if (storedUsers && storedUsers !== 'undefined') setUsers(JSON.parse(storedUsers));
      if (storedComplaints && storedComplaints !== 'undefined') setComplaints(JSON.parse(storedComplaints));
    } catch (e) {
      console.error('Failed to parse storage:', e);
      localStorage.clear(); // Clear potentially corrupted data
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('unnat_users', JSON.stringify(users));
      localStorage.setItem('unnat_complaints', JSON.stringify(complaints));
      if (currentUser) {
        localStorage.setItem('unnat_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('unnat_user');
      }
    }
  }, [users, complaints, currentUser, loading]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const role: Role = email.toLowerCase().includes('admin') ? 'Admin' : 'Citizen';
    const loggedInUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: role
    };
    
    setCurrentUser(loggedInUser);
    if (!users.find(u => u.email === email)) {
      setUsers(prev => [...prev, loggedInUser]);
    }
    return true;
  };

  const register = async (name: string, email: string, role: Role, _password: string): Promise<void> => {
    const newUser: User = { 
      id: 'user-' + Math.random().toString(36).substr(2, 9), 
      name, 
      email, 
      role 
    };
    setCurrentUser(newUser);
    setUsers(prev => [...prev, newUser]);
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
  };

  const addComplaint = async (data: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status' | 'latitude' | 'longitude'>) => {
    if (!currentUser) return;
    
    const latitude = 21.1458 + (Math.random() - 0.5) * 0.1;
    const longitude = 79.0882 + (Math.random() - 0.5) * 0.1;

    const newComplaint: Complaint = {
      ...data,
      id: 'comp-' + Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date().toISOString(),
      status: 'Pending' as Status,
      latitude,
      longitude
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const updateComplaintStatus = async (complaintId: string, status: Status) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status } : c));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      complaints,
      login,
      register,
      logout,
      addComplaint,
      updateComplaintStatus,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
