import { Bot } from "lucide-react";
import { useChatWidget } from "./chat-widget-provider";

export const FloatingChatButton = () => {
  const { toggleChat } = useChatWidget();

  return (
    <div className="fixed right-6 z-50" style={{ bottom: 'calc(4rem + 1.5rem)' }}> {/* 4rem for bottom nav + 1.5rem gap */}
      <button
        onClick={toggleChat}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 transform hover:scale-105 active:scale-95"
        aria-label="AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingChatButton;
