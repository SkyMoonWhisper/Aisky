import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const AuthPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  // Redirect to chat if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <img src="/logo/logo-ai.jpeg" alt="Aisky Logo" className="w-20 h-20 rounded-full shadow-lg" />
        </div>
        <h1 className="text-3xl font-bold text-white">Aisky</h1>
        <p className="mt-2 text-blue-200 max-w-md">
          AI website UI yang di design oleh Dzarel menggunakan API resmi Gemini
        </p>
      </div>
      
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <RegisterForm onToggleForm={toggleForm} />
      )}
      
      <div className="mt-8 text-sm text-blue-200">
        Made with ❤️ by DzarelDeveloper
      </div>
    </div>
  );
};

export default AuthPage;