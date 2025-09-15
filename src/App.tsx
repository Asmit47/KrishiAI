import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import DiseaseDetection from './components/DiseaseDetection';
import ChatAssistant from './components/ChatAssistant';
import CropRecommendations from './components/CropRecommendations';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard language={language} onNavigateToTab={setActiveTab} />;
      case 'disease-detection':
        return <DiseaseDetection language={language} />;
      case 'chat':
        return <ChatAssistant language={language} />;
      case 'crop-recommendations':
        return <CropRecommendations language={language} />;
      case 'weather':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Forecast</h2>
              <p className="text-gray-600">Detailed weather information and forecasts will be displayed here.</p>
            </div>
          </div>
        );
      case 'soil-analysis':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Soil Analysis</h2>
              <p className="text-gray-600">Comprehensive soil health analysis and recommendations will be shown here.</p>
            </div>
          </div>
        );
      case 'market-prices':
        return (
          <div className="p-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Prices</h2>
              <p className="text-gray-600">Real-time market prices and trends will be displayed here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard language={language} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="flex flex-col min-h-screen">
        <Header
          language={language}
          setLanguage={(l: string) => setLanguage(l as 'en' | 'hi' | 'pa')}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
      />

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed bottom-20 left-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <p className="text-sm font-medium text-center">
            You're currently offline. Some features may be limited.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;