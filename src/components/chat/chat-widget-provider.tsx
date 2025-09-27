"use client";

import { createContext, useContext, useState } from 'react';
import ExpandableChat from '../ExpandableChat';

type ChatWidgetContextType = {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextType | undefined>(undefined);

type ChatWidgetProviderProps = {
  children: React.ReactNode;
  language?: 'en' | 'hi' | 'pa';
};

export const ChatWidgetProvider = ({ children, language = 'en' }: ChatWidgetProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatWidgetContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
      <ExpandableChat 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        language={language}
        className="z-50"
      />
    </ChatWidgetContext.Provider>
  );
};

export const useChatWidget = (): ChatWidgetContextType => {
  const context = useContext(ChatWidgetContext);
  if (!context) {
    throw new Error('useChatWidget must be used within a ChatWidgetProvider');
  }
  return context;
};
