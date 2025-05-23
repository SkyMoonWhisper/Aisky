import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already logged in (via token in localStorage)
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setState(prev => ({ ...prev, loading: false }));
          return;
        }
        
        // Here you would normally validate the token with your backend
        // For demo purposes, we'll just parse the stored user data
        const userData = localStorage.getItem('user');
        if (userData) {
          setState({
            isAuthenticated: true,
            user: JSON.parse(userData),
            loading: false,
            error: null,
          });
        } else {
          localStorage.removeItem('token');
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Session expired. Please login again.',
        });
      }
    };

    checkAuthStatus();
  }, []);

  // In a real app, these functions would make API calls to your backend
  const login = async (email: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // // TODO: Replace with actual API call to your backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // For demo purposes:
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
        };
        
        // Simulate token (in real app, this would come from your backend)
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setState({
          isAuthenticated: true,
          user: mockUser,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const googleLogin = async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // // TODO: Implement Google OAuth flow
      // In a real application, you would redirect to Google OAuth URL
      // or use a library like react-google-login
      
      alert('Google login would be implemented here with proper OAuth flow');
      
      // For demo purposes, we'll simulate a successful login
      const mockUser: User = {
        id: '2',
        email: 'google@example.com',
        name: 'Google User',
        picture: 'https://randomuser.me/api/portraits/lego/1.jpg',
      };
      
      localStorage.setItem('token', 'mock-google-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // // TODO: Replace with actual API call to your backend
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name }),
      // });
      
      // For demo purposes:
      if (email && password && name) {
        const mockUser: User = {
          id: '3',
          email,
          name,
        };
        
        localStorage.setItem('token', 'mock-registration-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setState({
          isAuthenticated: true,
          user: mockUser,
          loading: false,
          error: null,
        });
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        googleLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};