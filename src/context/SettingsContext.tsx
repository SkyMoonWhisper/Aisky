import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSettings, SettingsState } from '../types';
import { useAuth } from './AuthContext';

interface SettingsContextType extends SettingsState {
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  language: 'en',
  theme: 'light',
  aiStyle: 'balanced',
  temperature: 0.7,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, setState] = useState<SettingsState>({
    settings: defaultSettings,
    loading: false,
    error: null,
  });

  // Load settings from localStorage when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          setState(prev => ({
            ...prev,
            settings: { ...defaultSettings, ...JSON.parse(savedSettings) },
          }));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to load settings',
        }));
      }
    }
  }, [isAuthenticated]);

  // Apply theme whenever it changes
  useEffect(() => {
    if (state.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.settings.theme]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setState(prev => {
      const updatedSettings = { ...prev.settings, ...newSettings };
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(updatedSettings));
      return {
        ...prev,
        settings: updatedSettings,
      };
    });
  };

  const resetSettings = () => {
    localStorage.removeItem('userSettings');
    setState(prev => ({
      ...prev,
      settings: defaultSettings,
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};