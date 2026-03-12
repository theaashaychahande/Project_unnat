import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  addDoc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';

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
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, role: Role, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status'>) => Promise<void>;
  updateComplaintStatus: (complaintId: string, status: Status) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to Auth State
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from firestore
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser({ id: firebaseUser.uid, ...docSnap.data() } as User);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Listen to Complaints
  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const complaintsData: Complaint[] = [];
      snapshot.forEach(doc => {
        complaintsData.push({ id: doc.id, ...doc.data() } as Complaint);
      });
      setComplaints(complaintsData);
    });
    return () => unsub();
  }, []);

  // Listen to Users (for Admin) - Optional but existing logic had `users` list.
  useEffect(() => {
    if (currentUser?.role === 'Admin') {
      const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
        const usersData: User[] = [];
        snapshot.forEach(doc => {
          usersData.push({ id: doc.id, ...doc.data() } as User);
        });
        setUsers(usersData);
      });
      return () => unsub();
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (name: string, email: string, role: Role, password: string): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // create user document
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role
    });
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const addComplaint = async (data: Omit<Complaint, 'id' | 'userId' | 'userName' | 'date' | 'status'>) => {
    if (!currentUser) return;
    const newComplaint = {
      ...data,
      userId: currentUser.id,
      userName: currentUser.name,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    await addDoc(collection(db, 'complaints'), newComplaint);
  };

  const updateComplaintStatus = async (complaintId: string, status: Status) => {
    await updateDoc(doc(db, 'complaints', complaintId), {
      status
    });
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
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
