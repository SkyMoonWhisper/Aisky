export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  language: string;
  theme: 'light' | 'dark';
  aiStyle: string;
  temperature: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  loading: boolean;
  error: string | null;
}

export interface SettingsState {
  settings: UserSettings;
  loading: boolean;
  error: string | null;
}