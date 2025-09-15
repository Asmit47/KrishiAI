import React from 'react';
import { 
  Home, 
  Camera, 
  TrendingUp, 
  MessageCircle, 
  BarChart3
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  setActiveTab, 
  language 
}) => {
  const translations = {
    en: {
      home: "Home",
      disease: "Disease",
      soil: "Soil",
      advice: "Advice",
      market: "Market"
    },
    hi: {
      home: "होम",
      disease: "रोग",
      soil: "मिट्टी",
      advice: "सलाह",
      market: "बाजार"
    },
    pa: {
      home: "ਘਰ",
      disease: "ਰੋਗ",
      soil: "ਮਿੱਟੀ",
      advice: "ਸਲਾਹ",
      market: "ਮਾਰਕੀਟ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const navItems = [
    { id: 'dashboard', label: t.home, icon: Home },
    { id: 'disease-detection', label: t.disease, icon: Camera },
    { id: 'soil-analysis', label: t.soil, icon: TrendingUp },
    { id: 'chat', label: t.advice, icon: MessageCircle },
    { id: 'market-prices', label: t.market, icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors duration-200 ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <div className={`p-1 ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs font-medium mt-1 ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;