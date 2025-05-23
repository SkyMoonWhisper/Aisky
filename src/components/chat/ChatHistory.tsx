import React from 'react';
import { Conversation } from '../../types';
import { truncateText, formatDate } from '../../utils/helpers';
import { MessageCircle, Trash2 } from 'lucide-react';

interface ChatHistoryProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
}) => {
  if (!conversations.length) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        <p>Belum ada riwayat percakapan</p>
        <button
          onClick={onNewChat}
          className="mt-2 text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Mulai percakapan baru
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <ul className="space-y-1 p-2">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <div
              className={`
                flex items-center justify-between p-3 rounded-lg cursor-pointer
                ${
                  currentConversationId === conversation.id
                    ? 'bg-blue-100 dark:bg-blue-900/30'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <MessageCircle 
                  className={`
                    flex-shrink-0
                    ${
                      currentConversationId === conversation.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                  size={20}
                />
                <div className="flex-1 min-w-0">
                  <p className={`
                      font-medium truncate
                      ${
                        currentConversationId === conversation.id
                          ? 'text-blue-800 dark:text-blue-300'
                          : 'text-gray-800 dark:text-gray-200'
                      }
                    `}
                  >
                    {truncateText(conversation.title, 25)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(conversation.updatedAt)}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conversation.id);
                }}
                className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Hapus percakapan"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;