import React from 'react';
import { Menu, Globe, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isOnline: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  sidebarOpen, 
  setSidebarOpen,
  isOnline 
}) => {
  const translations = {
    en: { title: "FarmAI Assistant", offline: "Offline Mode", online: "Online" },
    hi: { title: "फार्म AI सहायक", offline: "ऑफलाइन मोड", online: "ऑनलाइन" },
    te: { title: "వ్యవసాయ AI సహాయకుడు", offline: "ఆఫ్‌లైన్ మోడ్", online: "ఆన్‌లైన్" }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">{t.title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-sm">
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="hidden sm:inline">
              {isOnline ? t.online : t.offline}
            </span>
          </div>
          
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-green-500 text-white rounded-lg px-3 py-1 text-sm border-none focus:ring-2 focus:ring-green-300"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;