import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'hi' | 'pa';
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  setActiveTab, 
  language 
}) => {
  const translations = {
    en: {
      home: "Home",
      detect: "Detect",
      soil: "Soil",
      advice: "Advice",
      market: "Market"
    },
    hi: {
      home: "होम",
      detect: "जांच",
      soil: "मिट्टी",
      advice: "सलाह",
      market: "बाजार"
    },
    pa: {
      home: "ਘਰ",
      detect: "ਪਤਾ",
      soil: "ਮਿੱਟੀ",
      advice: "ਸਲਾਹ",
      market: "ਮਾਰਕੀਟ"
    }
  };

  const t = translations[language] || translations.en;

  const navItems = [
    { id: 'dashboard', label: t.home, icon: 'home' },
    { id: 'disease-detection', label: t.detect, icon: 'document_scanner' },
    { id: 'soil', label: t.soil, icon: 'grass' },
    { id: 'chat', label: t.advice, icon: 'lightbulb' },
    { id: 'market-prices', label: t.market, icon: 'storefront' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-green-100 z-50">
      <div className="flex justify-around px-1 py-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors w-full ${
              activeTab === item.id
                ? 'text-green-950 bg-green-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;