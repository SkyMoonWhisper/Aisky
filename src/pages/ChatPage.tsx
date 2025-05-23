import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

const ChatPage: React.FC = () => {
  const { currentConversation, sendMessage, loading, createNewConversation } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create a new conversation if there isn't one
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);
  
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {currentConversation?.title || 'Percakapan Baru'}
        </h2>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {currentConversation?.messages && currentConversation.messages.length > 0 ? (
          <div className="space-y-4">
            {currentConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="#3B82F6"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Aisky siap membantu Anda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
              Kirim pesan untuk memulai percakapan dengan asisten AI Anda
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 text-blue-600">1</span>
                Tanyakan informasi atau fakta
              </p>
              <p className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 text-blue-600">2</span>
                Minta bantuan dengan tugas
              </p>
              <p className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 text-blue-600">3</span>
                Dapatkan ide atau saran
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={loading} />
    </div>
  );
};

export default ChatPage;