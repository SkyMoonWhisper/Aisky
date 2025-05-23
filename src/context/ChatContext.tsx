import React, { createContext, useContext, useState, useReducer } from 'react';
import { Conversation, Message, ChatState } from '../types';
import { useAuth } from './AuthContext';
import { generateUniqueId } from '../utils/helpers';
import { sendMessageToGemini } from '../utils/geminiApi';

interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

type ChatAction =
  | { type: 'SET_CONVERSATIONS', payload: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION', payload: Conversation }
  | { type: 'ADD_CONVERSATION', payload: Conversation }
  | { type: 'DELETE_CONVERSATION', payload: string }
  | { type: 'ADD_MESSAGE', payload: { conversationId: string, message: Message } }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string | null };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload,
      };
    case 'SET_CURRENT_CONVERSATION':
      return {
        ...state,
        currentConversation: action.payload,
      };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversation: action.payload,
      };
    case 'DELETE_CONVERSATION':
      const updatedConversations = state.conversations.filter(
        conv => conv.id !== action.payload
      );
      return {
        ...state,
        conversations: updatedConversations,
        currentConversation: 
          state.currentConversation?.id === action.payload
            ? updatedConversations[0] || null
            : state.currentConversation,
      };
    case 'ADD_MESSAGE':
      const { conversationId, message } = action.payload;
      return {
        ...state,
        conversations: state.conversations.map(conv => 
          conv.id === conversationId
            ? {
                ...conv,
                messages: [...conv.messages, message],
                updatedAt: new Date(),
                title: conv.messages.length === 0 && message.role === 'user' 
                  ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                  : conv.title,
              }
            : conv
        ),
        currentConversation: state.currentConversation?.id === conversationId
          ? {
              ...state.currentConversation,
              messages: [...state.currentConversation.messages, message],
              updatedAt: new Date(),
              title: state.currentConversation.messages.length === 0 && message.role === 'user'
                ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                : state.currentConversation.title,
            }
          : state.currentConversation,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const initialState: ChatState = {
    conversations: [],
    currentConversation: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load conversations from localStorage when component mounts
  React.useEffect(() => {
    if (isAuthenticated) {
      try {
        const savedConversations = localStorage.getItem('conversations');
        if (savedConversations) {
          const conversations = JSON.parse(savedConversations);
          dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
          
          // Set current conversation to the most recent one if it exists
          if (conversations.length > 0) {
            dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversations[0] });
          }
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, [isAuthenticated]);

  // Save conversations to localStorage whenever they change
  React.useEffect(() => {
    if (isAuthenticated && state.conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(state.conversations));
    }
  }, [state.conversations, isAuthenticated]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: generateUniqueId(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
  };

  const selectConversation = (id: string) => {
    const conversation = state.conversations.find(conv => conv.id === id);
    if (conversation) {
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    }
  };

  const deleteConversation = (id: string) => {
    dispatch({ type: 'DELETE_CONVERSATION', payload: id });
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    let currentConv = state.currentConversation;
    
    // If there's no current conversation, create one
    if (!currentConv) {
      const newConversation: Conversation = {
        id: generateUniqueId(),
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
      currentConv = newConversation;
    }
    
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId: currentConv.id, message: userMessage },
    });
    
    // Set loading state
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Call Gemini API to get response
      const botResponse = await sendMessageToGemini(content);
      
      const botMessage: Message = {
        id: generateUniqueId(),
        content: botResponse,
        role: 'bot',
        timestamp: new Date(),
      };
      
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { conversationId: currentConv.id, message: botMessage },
      });
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to get response from AI. Please try again.' });
      
      // Add error message from bot
      const errorMessage: Message = {
        id: generateUniqueId(),
        content: 'Sorry, I encountered an error processing your request. Please try again later.',
        role: 'bot',
        timestamp: new Date(),
      };
      
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { conversationId: currentConv.id, message: errorMessage },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        sendMessage,
        createNewConversation,
        selectConversation,
        deleteConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};