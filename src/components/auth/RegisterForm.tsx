import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register, loading, error } = useAuth();
  
  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Nama diperlukan';
    }
    
    if (!email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      newErrors.password = 'Password diperlukan';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password diperlukan';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await register(email, password, name);
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Akun Baru</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Buat akun untuk mengakses fitur Skybot
        </p>
      </div>
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Input
          label="Nama Lengkap"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          error={errors.name}
          fullWidth
          leftIcon={<User size={18} />}
        />
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          error={errors.email}
          fullWidth
          leftIcon={<Mail size={18} />}
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.password}
          fullWidth
          leftIcon={<Lock size={18} />}
        />
        
        <Input
          label="Konfirmasi Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.confirmPassword}
          fullWidth
          leftIcon={<Lock size={18} />}
        />
        
        <div className="pt-2">
          <Button 
            type="submit"
            fullWidth
            isLoading={loading}
            rightIcon={<UserPlus size={18} />}
          >
            Daftar
          </Button>
        </div>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{' '}
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            onClick={onToggleForm}
          >
            Masuk
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;