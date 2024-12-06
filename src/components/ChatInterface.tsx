import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  const { currentSession, user, addMessage } = useChatStore();

  const handleSend = () => {
    if (!message.trim() || !user) return;

    const newMessage = {
      id: crypto.randomUUID(),
      content: message.trim(),
      timestamp: Date.now(),
      senderId: user.id,
    };

    addMessage(newMessage);
    setMessage('');
  };

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Waiting for a match...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Anonymous Chat</h2>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">Messages: {currentSession.messageCount}/20</span>
            {currentSession.messageCount >= 20 && (
              <span className="text-blue-500">⚠️</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.senderId === user?.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}