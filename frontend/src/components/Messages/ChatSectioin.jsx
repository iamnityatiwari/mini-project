import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';

const ChatSection = ({ selectedConnection, onClose, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full dark:bg-slate-600 bg-sky-50 ">
      {/* Header with Profile Icon */}
      <div className="flex items-center justify-between p-4 py-5 bg-gray-200 border-b border-gray-300 shadow-sm  shadow-black">
        <div className="flex items-center">
          <FiUser className="mr-2 text-gray-500" size={24} />
          <h2 className="text-xl font-bold">{selectedConnection.name}</h2>
        </div>
        <button onClick={onClose} className="text-red-500 font-semibold">
          Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 items-start ${
              message.sender === selectedConnection.username ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.sender === selectedConnection.username && (
              <FiUser className="mr-2 text-gray-500" size={20} />
            )}
            <div
              className={`p-2 rounded-lg ${
                message.sender === selectedConnection.username ? 'bg-gray-100' : 'bg-green-100'
              } max-w-xs break-words`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input for New Message */}
      <div className=" border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="w-full mr-10 p-2 border  focus:outline-none"
        />
        <button onClick={handleSendMessage} className="  text-blue-500 mr-2 hover:text-blue-700 absolute  right-0">
          <IoSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;