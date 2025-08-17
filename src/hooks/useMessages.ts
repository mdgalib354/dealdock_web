import { useState, useEffect } from 'react';
import { Message, Conversation, User } from '../types';

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: 'current-user',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'user',
        savedOffers: [],
        followedBrands: [],
        joinedAt: new Date()
      },
      {
        id: 'tech-store',
        name: 'TechStore Inc.',
        email: 'contact@techstore.com',
        avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
        type: 'business',
        savedOffers: [],
        followedBrands: [],
        joinedAt: new Date()
      }
    ],
    lastMessage: {
      id: '1',
      senderId: 'tech-store',
      receiverId: 'current-user',
      content: 'Hi! Thanks for your interest in our iPhone deal. Is there anything specific you\'d like to know?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30)
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'current-user',
    receiverId: 'tech-store',
    content: 'Hi, I\'m interested in the iPhone 15 Pro Max deal. Is it still available?',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    read: true
  },
  {
    id: '2',
    senderId: 'tech-store',
    receiverId: 'current-user',
    content: 'Hi! Thanks for your interest in our iPhone deal. Is there anything specific you\'d like to know?',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    read: false
  }
];

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading conversations and messages
    setTimeout(() => {
      setConversations(mockConversations);
      setMessages({
        '1': mockMessages
      });
      setLoading(false);
    }, 1000);
  }, []);

  const sendMessage = (conversationId: string, content: string, type: Message['type'] = 'text', file?: File) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: conversations.find(c => c.id === conversationId)?.participants.find(p => p.id !== 'current-user')?.id || '',
      content,
      type,
      fileName: file?.name,
      fileSize: file?.size,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
      createdAt: new Date(),
      read: false
    };

    // Add message to conversation
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    // Update conversation last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: new Date()
            }
          : conv
      )
    );
  };

  const markAsRead = (conversationId: string) => {
    setMessages(prev => ({
      ...prev,
      [conversationId]: prev[conversationId]?.map(msg =>
        msg.receiverId === 'current-user' ? { ...msg, read: true } : msg
      ) || []
    }));

    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const startConversation = (participant: User): string => {
    const existingConv = conversations.find(conv =>
      conv.participants.some(p => p.id === participant.id)
    );

    if (existingConv) {
      return existingConv.id;
    }

    const newConversation: Conversation = {
      id: Date.now().toString(),
      participants: [
        {
          id: 'current-user',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=100',
          type: 'user',
          savedOffers: [],
          followedBrands: [],
          joinedAt: new Date()
        },
        participant
      ],
      unreadCount: 0,
      updatedAt: new Date()
    };

    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({ ...prev, [newConversation.id]: [] }));

    return newConversation.id;
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return {
    conversations,
    messages,
    loading,
    sendMessage,
    markAsRead,
    startConversation,
    getTotalUnreadCount
  };
};