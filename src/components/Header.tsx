import React from 'react';
import { Globe } from 'lucide-react';

type Language = 'en' | 'hi' | 'pa';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage
}) => {
  const translations = {
    en: { title: "Krishi AI" },
    hi: { title: "कृषि AI" },
    pa: { title: "ਕ੍ਰਿਸ਼ੀ AI" }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left - Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
        </div>
        
        {/* Right - Language Selector */}
        <div className="flex items-center">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-gray-50 text-gray-700 rounded-full pl-9 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="en">ENG</option>
              <option value="hi">हिंदी</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;