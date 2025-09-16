import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

interface ChatAssistantProps {
  language: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "AI Chat Assistant",
      subtitle: "Ask me anything about farming, crops, and agricultural practices",
      placeholder: "Type your farming question...",
      send: "Send",
      typing: "AI is typing...",
      welcomeMessage: "Hello! I'm your AI farming assistant. I can help you with crop diseases, soil health, weather advice, and farming best practices. What would you like to know?"
    },
    hi: {
      title: "AI चैट सहायक",
      subtitle: "खेती, फसलों और कृषि प्रथाओं के बारे में कुछ भी पूछें",
      placeholder: "अपना खेती का सवाल टाइप करें...",
      send: "भेजें",
      typing: "AI टाइप कर रहा है...",
      welcomeMessage: "नमस्ते! मैं आपका AI खेती सहायक हूँ। मैं फसल की बीमारियों, मिट्टी के स्वास्थ्य, मौसम की सलाह और खेती की बेहतर प्रथाओं में आपकी मदद कर सकता हूँ। आप क्या जानना चाहते हैं?"
    },
    pa: {
      title: "AI ਚੈਟ ਸਹਾਇਕ",
      subtitle: "ਖੇਤੀ, ਫਸਲਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੇ ਅਭਿਆਸਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ",
      placeholder: "ਆਪਣਾ ਖੇਤੀ ਦਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
      send: "ਭੇਜੋ",
      typing: "AI ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...",
      welcomeMessage: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਮਿੱਟੀ ਦੀ ਸਿਹਤ, ਮੌਸਮ ਦੀ ਸਲਾਹ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੇ ਵਧੀਆ ਤਰੀਕਿਆਂ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੁੰਦੇ ਹੋ?"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Sample responses based on keywords
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('disease') || message.includes('रोग') || message.includes('ਬਿਮਾਰੀ')) {
      return language === 'hi' 
        ? "पौधों की बीमारियों के लिए, सबसे पहले प्रभावित पत्तियों को हटाएं। कॉपर सल्फेट या जैविक कवकनाशी का उपयोग करें। पौधों के बीच अच्छी हवा का संचार सुनिश्चित करें।"
        : language === 'pa'
        ? "ਪੌਧਿਆਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਲਈ, ਪਹਿਲਾਂ ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ ਨੂੰ ਹਟਾਓ। ਕਾਪਰ ਸਲਫੇਟ ਜਾਂ ਜੈਵਿਕ ਫੰਗੀਸਾਈਡ ਦੀ ਵਰਤੋਂ ਕਰੋ। ਪੌਧਿਆਂ ਵਿਚਕਾਰ ਚੰਗੀ ਹਵਾ ਦਾ ਸੰਚਾਰ ਯਕੀਨੀ ਬਣਾਓ।"
        : "For plant diseases, first remove affected leaves. Use copper sulfate or organic fungicides. Ensure good air circulation between plants and avoid overhead watering.";
    }
    
    if (message.includes('soil') || message.includes('मिट्टी') || message.includes('ਮਿੱਟੀ')) {
      return language === 'hi'
        ? "मिट्टी की जाँच नियमित रूप से करें। pH 6.0-7.0 के बीच रखें। जैविक खाद का उपयोग करें और फसल चक्र अपनाएं। पानी की निकासी का भी ध्यान रखें।"
        : language === 'pa'
        ? "ਮਿੱਟੀ ਦੀ ਨਿਯਮਿਤ ਜਾਂਚ ਕਰੋ। pH 6.0-7.0 ਦੇ ਵਿਚਕਾਰ ਰੱਖੋ। ਜੈਵਿਕ ਖਾਦ ਦੀ ਵਰਤੋਂ ਕਰੋ ਅਤੇ ਫਸਲ ਚੱਕਰ ਅਪਣਾਓ। ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਦਾ ਵੀ ਧਿਆਨ ਰੱਖੋ।"
        : "Test your soil regularly. Maintain pH between 6.0-7.0. Use organic fertilizers and practice crop rotation. Also ensure proper drainage for healthy soil.";
    }
    
    if (message.includes('water') || message.includes('पानी') || message.includes('ਪਾਣੀ')) {
      return language === 'hi'
        ? "पानी देने का समय सुबह या शाम का बेहतर होता है। मिट्टी में नमी की जाँच करके ही पानी दें। ड्रिप इरिगेशन का उपयोग करें जहाँ संभव हो।"
        : language === 'pa'
        ? "ਪਾਣੀ ਦੇਣ ਦਾ ਸਮਾਂ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਦਾ ਬਿਹਤਰ ਹੁੰਦਾ ਹੈ। ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਦੀ ਜਾਂਚ ਕਰਕੇ ਹੀ ਪਾਣੀ ਦਿਓ। ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਦੀ ਵਰਤੋਂ ਕਰੋ।"
        : "Water in early morning or evening. Check soil moisture before watering. Use drip irrigation where possible to conserve water and improve efficiency.";
    }
    
    // Default response
    return language === 'hi'
      ? "यह एक अच्छा सवाल है! कृषि में कई कारक महत्वपूर्ण होते हैं जैसे मिट्टी, पानी, मौसम और बीज की गुणवत्ता। क्या आप किसी खास विषय पर और जानकारी चाहते हैं?"
      : language === 'pa'
      ? "ਇਹ ਇੱਕ ਚੰਗਾ ਸਵਾਲ ਹੈ! ਖੇਤੀਬਾੜੀ ਵਿੱਚ ਕਈ ਕਾਰਕ ਮਹੱਤਵਪੂਰਨ ਹੁੰਦੇ ਹਨ ਜਿਵੇਂ ਮਿੱਟੀ, ਪਾਣੀ, ਮੌਸਮ ਅਤੇ ਬੀਜ ਦੀ ਗੁਣਵੱਤਾ। ਕੀ ਤੁਸੀਂ ਕਿਸੇ ਖਾਸ ਵਿਸ਼ੇ ਬਾਰੇ ਹੋਰ ਜਾਣਕਾਰੀ ਚਾਹੁੰਦੇ ਹੋ?"
      : "That's a great question! Agriculture involves many factors like soil health, water management, weather conditions, and seed quality. Would you like specific information on any of these topics?";
  };

  useEffect(() => {
    // Add welcome message on component mount
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        text: t.welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [language]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto mt-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
          <h2 className="text-xl font-bold mb-1">{t.title}</h2>
          <p className="text-sm opacity-90">{t.subtitle}</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg flex items-start space-x-2 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md xl:max-w-lg flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-2 rounded-lg bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <Loader className="animate-spin" size={14} />
                    <p className="text-sm text-gray-600">{t.typing}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              className="flex-1 min-h-[44px] max-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;