import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import Button from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-grow bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan Anda di sini..."
            className="w-full bg-transparent border-0 focus:ring-0 outline-none resize-none max-h-[150px] py-2 px-3 text-gray-900 dark:text-gray-100"
            rows={1}
            disabled={isLoading}
          />
          <div className="flex items-center justify-between px-3 pt-2">
            <div className="flex space-x-2">
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                title="Lampirkan file"
              >
                <Paperclip size={20} />
              </button>
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                title="Rekam pesan suara"
              >
                <Mic size={20} />
              </button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          isLoading={isLoading}
          size="lg"
          className="rounded-full p-3 h-12 w-12 flex items-center justify-center"
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;