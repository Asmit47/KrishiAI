import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { X, MessageCircle, Bot } from "lucide-react";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";
import { ChatInput } from "./chat-input";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
}

interface ExpandableChatProps {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
  initialMessage?: string;
}

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed: "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
  },
};

export const ExpandableChat: React.FC<ExpandableChatProps & { isOpen?: boolean; onOpenChange?: (isOpen: boolean) => void }> = ({
  position = "bottom-right",
  size = "md",
  icon,
  className,
  isOpen: isOpenProp = false,
  onOpenChange,
  initialMessage = "Hello! How can I help you with your farming today?",
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          content: initialMessage,
          sender: 'ai',
        },
      ]);
    }
  }, [initialMessage]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  };

  // Sync with prop changes
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: getBotResponse(message),
        sender: 'ai',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! How can I assist you with your farming today?";
    } else if (input.includes('crop') && input.includes('recommend')) {
      return "Based on your location and weather, I recommend tomatoes and corn as they are in season and have good market demand.";
    } else if (input.includes('pest') || input.includes('disease')) {
      return "I can help you identify pests and diseases. Could you describe the symptoms or share a photo?";
    } else if (input.includes('soil') || input.includes('fertilizer')) {
      return "For healthy soil, I recommend a balanced NPK fertilizer. The exact ratio depends on your soil test results.";
    } else if (input.includes('weather') || input.includes('rain')) {
      return "I can provide weather forecasts. Would you like to know the forecast for your area?";
    } else if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I'm here to help with your farming questions. You can ask me about crops, soil, weather, or any other farming-related topics.";
    }
  };

  const handleAttachFile = () => {
    // Handle file attachment
    console.log("File attachment clicked");
  };

  const handleVoiceInput = (isListening: boolean) => {
    // Handle voice input state changes if needed
    console.log("Voice input:", isListening ? "started" : "stopped");
  };

  return (
    <div
      className={cn(
        `fixed ${chatConfig.positions[position]} z-50`,
        className
      )}
    >
      {/* Chat Window */}
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 sm:rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-green-100 dark:bg-green-900">
              <Bot className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              AI Farming Assistant
            </h1>
          </div>
          <button
            type="button"
            className="h-8 w-8 rounded-full sm:hidden flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
              className={message.sender === "user" ? "flex-row-reverse" : ""}
            >
              <ChatBubbleAvatar
                variant={message.sender === "user" ? "user" : "bot"}
                className="shrink-0"
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar variant="bot" className="shrink-0" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
          <ChatInput
            ref={inputRef}
            placeholder="Type your message..."
            onSend={handleSendMessage}
            onAttach={handleAttachFile}
            onVoiceInput={handleVoiceInput}
            isLoading={isLoading}
            className="w-full"
          />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300 bg-green-500 hover:bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
          isOpen ? "hidden" : ""
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          icon || <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ExpandableChat;
