import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { useChat } from '../../context/ChatContext';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Settings, LogOut, Plus, Moon, Sun, User } from 'lucide-react';
import Button from '../ui/Button';
import ChatHistory from '../chat/ChatHistory';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const { settings, updateSettings } = useSettings();
  const { 
    conversations, 
    currentConversation,
    createNewConversation, 
    selectConversation, 
    deleteConversation 
  } = useChat();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  if (collapsed) {
    return (
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 w-16 transition-all duration-300 border-r border-gray-200 dark:border-gray-700">
        {/* Collapsed Header */}
        <div className="p-4 flex justify-center">
          <button 
            onClick={onToggleCollapse}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <img src="/logo/logo-ai.jpg" alt="Aisky Logo" className="w-8 h-8 rounded-full" />
          </button>
        </div>
        
        {/* New Chat Button */}
        <div className="p-2">
          <Button
            onClick={createNewConversation}
            variant="ghost"
            className="w-full p-2 justify-center"
            title="Chat Baru"
          >
            <Plus size={24} />
          </Button>
        </div>
        
        {/* Navigation */}
        <div className="flex-grow overflow-y-auto">
          <div className="p-2 space-y-2">
            <NavLink 
              to="/chat" 
              className={({ isActive }) => `
                flex items-center justify-center p-2 rounded-lg
                ${isActive 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                }
              `}
              title="Chat"
            >
              <MessageSquare size={24} />
            </NavLink>
            
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `
                flex items-center justify-center p-2 rounded-lg
                ${isActive 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                }
              `}
              title="Pengaturan"
            >
              <Settings size={24} />
            </NavLink>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            title={settings.theme === 'light' ? 'Aktifkan Mode Gelap' : 'Aktifkan Mode Terang'}
          >
            {settings.theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
            title="Keluar"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 w-64 transition-all duration-300 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <img src="/logo/logo-ai.jpeg" alt="Aisky Logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Aisky</h1>
        </div>
        <button 
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {user?.picture ? (
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <User size={20} className="text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
      
      {/* New Chat Button */}
      <div className="p-4">
        <Button
          onClick={createNewConversation}
          fullWidth
          leftIcon={<Plus size={18} />}
        >
          Chat Baru
        </Button>
      </div>
      
      {/* Chat History */}
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Riwayat Percakapan
        </div>
        <div className="flex-grow overflow-y-auto">
          <ChatHistory
            conversations={conversations}
            currentConversationId={currentConversation?.id || null}
            onSelectConversation={selectConversation}
            onDeleteConversation={deleteConversation}
            onNewChat={createNewConversation}
          />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <NavLink 
          to="/chat" 
          className={({ isActive }) => `
            flex items-center space-x-3 p-2 rounded-lg
            ${isActive 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
            }
          `}
        >
          <MessageSquare size={20} />
          <span>Chat</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `
            flex items-center space-x-3 p-2 rounded-lg
            ${isActive 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
              : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
            }
          `}
        >
          <Settings size={20} />
          <span>Pengaturan</span>
        </NavLink>
        
        <div className="pt-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tema {settings.theme === 'light' ? 'Terang' : 'Gelap'}</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              title={settings.theme === 'light' ? 'Aktifkan Mode Gelap' : 'Aktifkan Mode Terang'}
            >
              {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;