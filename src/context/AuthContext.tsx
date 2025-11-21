import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, isOrganizer: boolean) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: { name: string; bio: string; avatar: string }) => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    bio: 'Event enthusiast and music lover',
    isOrganizer: true,
    hasPaidPlan: false,
    followers: 234,
    following: 189,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (name: string, email: string, password: string, isOrganizer: boolean = false) => {
    // Mock registration
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      bio: '',
      isOrganizer: isOrganizer,
      hasPaidPlan: false,
      followers: 0,
      following: 0,
      preferredGenres: [],
    };
    mockUsers.push(newUser);
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (data: { name: string; bio: string; avatar: string }) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}