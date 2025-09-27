import React, { useState, useRef, FormEvent, useEffect } from "react";
import { X, Send, Bot, Mic } from "lucide-react";
import { cn } from "../lib/utils";

// Types
type ChatPosition = "bottom-right" | "bottom-left";
type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

type SenderType = 'user' | 'bot';

interface Message {
  id: number;
  content: string;
  sender: SenderType;
}

interface ExpandableChatProps {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
  language: 'en' | 'hi' | 'pa';
  initialQuestion?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
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

const translations = {
  en: {
    title: "AI Assistant",
    subtitle: "How can I help you today?",
    placeholder: "Type your message...",
    welcome: "Hello! I'm your AI farming assistant. How can I help you today?"
  },
  hi: {
    title: "AI सहायक",
    subtitle: "आज मैं आपकी कैसे मदद कर सकता हूं?",
    placeholder: "अपना संदेश टाइप करें...",
    welcome: "नमस्ते! मैं आपका AI खेती सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?"
  },
  pa: {
    title: "AI ਸਹਾਇਕ",
    subtitle: "ਮੈਂ ਤੁਹਾਡੀ ਅੱਜ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...",
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
  }
};

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  position = "bottom-right",
  language = 'en',
  initialQuestion = '',
  isOpen: isOpenProp = false,
  onOpenChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations.en;

  // Initialize messages with welcome message and handle initial question
  React.useEffect(() => {
    if (messages.length === 0) {
      const initialMessages: Message[] = [
        {
          id: 1,
          content: t.welcome,
          sender: 'bot' as SenderType,
        },
      ];

      if (initialQuestion) {
        initialMessages.push({
          id: 2,
          content: initialQuestion,
          sender: 'user' as SenderType,
        });
      }
      
      setMessages(initialMessages);
    }
  }, [language, initialQuestion]);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sync isOpen prop with internal state
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  // Notify parent when isOpen changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user' as SenderType,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: getBotResponse(input, language),
        sender: 'bot' as SenderType,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string, lang: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('namaste')) {
      return lang === 'hi' 
        ? 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?' 
        : lang === 'pa' 
          ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?'
          : 'Hello! How can I assist you today?';
    }
    
    if (input.includes('weather') || input.includes('mausam') || input.includes('ਮੌਸਮ')) {
      return lang === 'hi'
        ? 'मौसम की जानकारी के लिए कृपया अपना स्थान साझा करें।'
        : lang === 'pa'
          ? 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਟਿਕਾਣਾ ਸਾਂਝਾ ਕਰੋ।'
          : 'For weather information, please share your location.';
    }
    
    if (input.includes('crop') || input.includes('fasal') || input.includes('ਫਸਲ')) {
      return lang === 'hi'
        ? 'फसल सिफारिशों के लिए, कृपया अपनी मिट्टी के प्रकार और स्थान के बारे में जानकारी दें।'
        : lang === 'pa'
          ? 'ਫਸਲ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਅਤੇ ਟਿਕਾਣੇ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦਿਓ।'
          : 'For crop recommendations, please provide information about your soil type and location.';
    }
    
    // Default response
    return lang === 'hi'
      ? 'मैं आपकी मदद करने के लिए यहां हूं। क्या आप मुझे और अधिक विवरण दे सकते हैं?'
      : lang === 'pa'
        ? 'ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਕੀ ਤੁਸੀਂ ਮੈਨੂੰ ਹੋਰ ਵੇਰਵੇ ਦੇ ਸਕਦੇ ਹੋ?'
        : 'I am here to help. Can you provide me with more details?';
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleMicrophone = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div 
      ref={chatRef}
      className={cn(
        "fixed right-4 transition-all duration-300 ease-in-out z-[60] rounded-xl shadow-lg overflow-hidden border border-gray-200",
        isOpen ? chatConfig.states.open : chatConfig.states.closed,
        chatConfig.positions[position],
        className,
        'bottom-24', // Position above bottom navigation
        'w-[calc(100vw-2rem)] max-w-md' // Responsive width
      )}
      style={{ bottom: '5.5rem' }} // Position above bottom nav
    >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-50">
              <Bot className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{t.title}</h3>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] flex items-start gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                )}
                <div
                  className={`px-4 py-2.5 rounded-xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-50 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <Bot className="h-4 w-4 text-green-600" />
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-gray-50 text-gray-800 rounded-bl-none">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-4 py-2.5 pr-12 bg-transparent border-0 focus:ring-0 text-gray-900 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="button"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md ${
                  isListening 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-gray-400 hover:text-green-600 hover:bg-gray-100'
                } transition-colors`}
                onClick={toggleMicrophone}
                disabled={isLoading}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
    </div>
  );
};

export default ExpandableChat;
