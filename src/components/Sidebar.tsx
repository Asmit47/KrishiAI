import React from 'react';
import { 
  Home, 
  Camera, 
  MessageCircle, 
  TrendingUp, 
  CloudRain, 
  Leaf,
  BarChart3,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  activeTab, 
  setActiveTab, 
  language 
}) => {
  const translations = {
    en: {
      dashboard: "Dashboard",
      diseaseDetection: "Disease Detection",
      chatAssistant: "Chat Assistant",
      cropRecommendations: "Crop Recommendations",
      weather: "Weather",
      soilAnalysis: "Soil Analysis",
      marketPrices: "Market Prices"
    },
    hi: {
      dashboard: "डैशबोर्ड",
      diseaseDetection: "रोग पहचान",
      chatAssistant: "चैट सहायक",
      cropRecommendations: "फसल सुझाव",
      weather: "मौसम",
      soilAnalysis: "मिट्टी विश्लेषण",
      marketPrices: "बाजार भाव"
    },
    pa: {
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      diseaseDetection: "ਬਿਮਾਰੀ ਪਛਾਣ",
      chatAssistant: "ਚੈਟ ਸਹਾਇਕ",
      cropRecommendations: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
      weather: "ਮੌਸਮ",
      soilAnalysis: "ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ",
      marketPrices: "ਮਾਰਕੀਟ ਰੇਟ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'disease-detection', label: t.diseaseDetection, icon: Camera },
    { id: 'chat', label: t.chatAssistant, icon: MessageCircle },
    { id: 'crop-recommendations', label: t.cropRecommendations, icon: Leaf },
    { id: 'weather', label: t.weather, icon: CloudRain },
    { id: 'soil-analysis', label: t.soilAnalysis, icon: TrendingUp },
    { id: 'market-prices', label: t.marketPrices, icon: BarChart3 }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left
                  ${activeTab === item.id 
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;