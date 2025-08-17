import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Business } from '../types';

interface AuthContextType {
  currentUser: User | Business | null;
  login: (email: string, password: string, type: 'user' | 'business') => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage
    const savedUser = localStorage.getItem('dealDockUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'user' | 'business'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User | Business = {
      id: '1',
      name: type === 'business' ? 'TechStore Inc.' : 'John Doe',
      email,
      avatar: type === 'business' 
        ? 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
        : 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=400',
      type,
      savedOffers: [],
      followedBrands: [],
      joinedAt: new Date(),
      ...(type === 'business' && {
        description: 'Leading technology retailer offering the latest gadgets and electronics.',
        category: 'Technology',
        verified: true,
        totalOffers: 15,
        followers: 1250
      })
    };

    setCurrentUser(mockUser);
    localStorage.setItem('dealDockUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User | Business = {
      id: Date.now().toString(),
      ...userData,
      savedOffers: [],
      followedBrands: [],
      joinedAt: new Date(),
      ...(userData.type === 'business' && {
        verified: false,
        totalOffers: 0,
        followers: 0
      })
    };

    setCurrentUser(newUser);
    localStorage.setItem('dealDockUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dealDockUser');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};