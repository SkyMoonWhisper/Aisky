import React from 'react';
import { User } from 'lucide-react';
import { Message } from '../../types';
import { formatDate } from '../../utils/helpers';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <User size={20} />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white dark:bg-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2Z" fill="currentColor"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="white"/>
              </svg>
            </div>
          )}
        </div>
        <div>
          <div 
            className={`
              px-4 py-3 rounded-lg 
              ${isUser 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-tl-none'
              }
            `}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
          <div 
            className={`
              text-xs text-gray-500 dark:text-gray-400 mt-1 
              ${isUser ? 'text-right' : 'text-left'}
            `}
          >
            {formatDate(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;