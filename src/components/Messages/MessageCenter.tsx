import React, { useState } from 'react';
import { MessageSquare, X, Send, Paperclip, Image, FileText } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';
import { formatDistanceToNow } from 'date-fns';

const MessageCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  
  const { conversations, messages, sendMessage, markAsRead, getTotalUnreadCount } = useMessages();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedConversation) {
      sendMessage(selectedConversation, messageText.trim());
      setMessageText('');
    }
  };

  const handleFileUpload = (file: File) => {
    if (selectedConversation) {
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' :
                      file.type.startsWith('audio/') ? 'audio' : 'file';
      
      sendMessage(selectedConversation, file.name, fileType, file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFileUpload);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const renderMessage = (message: any) => {
    const isOwn = message.senderId === 'current-user';
    
    return (
      <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-900'
        }`}>
          {message.type === 'text' && (
            <p className="text-sm">{message.content}</p>
          )}
          
          {message.type === 'image' && (
            <div>
              <img 
                src={message.fileUrl} 
                alt={message.fileName}
                className="rounded max-w-full h-auto mb-2"
              />
              <p className="text-xs opacity-75">{message.fileName}</p>
            </div>
          )}
          
          {(message.type === 'file' || message.type === 'video' || message.type === 'audio') && (
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <div>
                <p className="text-sm font-medium">{message.fileName}</p>
                <p className="text-xs opacity-75">
                  {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : ''}
                </p>
              </div>
            </div>
          )}
          
          <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatDistanceToNow(message.createdAt)} ago
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Message Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <MessageSquare className="h-5 w-5" />
        {getTotalUnreadCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getTotalUnreadCount() > 9 ? '9+' : getTotalUnreadCount()}
          </span>
        )}
      </button>

      {/* Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-96 flex">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No conversations yet</p>
                  </div>
                ) : (
                  conversations.map((conversation) => {
                    const otherParticipant = conversation.participants.find(p => p.id !== 'current-user');
                    return (
                      <div
                        key={conversation.id}
                        onClick={() => {
                          setSelectedConversation(conversation.id);
                          markAsRead(conversation.id);
                        }}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={otherParticipant?.avatar}
                            alt={otherParticipant?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {otherParticipant?.name}
                              </p>
                              {conversation.unreadCount > 0 && (
                                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                            {conversation.lastMessage && (
                              <p className="text-xs text-gray-500 truncate">
                                {conversation.lastMessage.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const conversation = conversations.find(c => c.id === selectedConversation);
                        const otherParticipant = conversation?.participants.find(p => p.id !== 'current-user');
                        return (
                          <>
                            <img
                              src={otherParticipant?.avatar}
                              alt={otherParticipant?.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{otherParticipant?.name}</p>
                              <p className="text-xs text-gray-500">
                                {otherParticipant?.type === 'business' ? 'Business' : 'Customer'}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Messages */}
                  <div 
                    className={`flex-1 p-4 overflow-y-auto ${dragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {messages[selectedConversation]?.map(renderMessage)}
                    {dragOver && (
                      <div className="text-center text-blue-600 py-8">
                        <Paperclip className="h-12 w-12 mx-auto mb-2" />
                        <p>Drop files here to send</p>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        multiple
                      />
                      <label
                        htmlFor="file-upload"
                        className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <Paperclip className="h-5 w-5" />
                      </label>
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!messageText.trim()}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageCenter;