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
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  complaints: Complaint[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, role: Role) => void;
  logout: () => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status'>) => void;
  updateComplaintStatus: (complaintId: string, status: Status) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('unnat_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('unnat_users');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Admin User', email: 'admin@unnat.gov', role: 'Admin' },
      { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Citizen' }
    ];
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('unnat_complaints');
    return saved ? JSON.parse(saved) : [
      {
        id: 'c1',
        userId: '2',
        userName: 'John Doe',
        title: 'Broken Street Light',
        description: 'The street light near the park is not working.',
        location: 'Park Avenue',
        urgency: 'Medium',
        date: '2026-03-10',
        status: 'Pending'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('unnat_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('unnat_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('unnat_complaints', JSON.stringify(complaints));
  }, [complaints]);

  const login = (email: string, _password: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, role: Role) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addComplaint = (data: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status'>) => {
    if (!currentUser) return;
    const newComplaint: Complaint = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const updateComplaintStatus = (complaintId: string, status: Status) => {
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
      updateComplaintStatus
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
