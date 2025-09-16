import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DiseaseDetection from './components/DiseaseDetection';
import ChatAssistant from './components/ChatAssistant';
import CropRecommendations from './components/CropRecommendations';
import SoilAssessment from './components/SoilAssessment';
import Marketplace from './components/Marketplace';
import AIAdviceAssistant from './components/AIAdviceAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Handle online/offline status
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
        return <DiseaseDetection language={language} onBack={() => setActiveTab('dashboard')} />;
      case 'chat':
        return <AIAdviceAssistant language={language} onBack={() => setActiveTab('dashboard')} />;
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
      case 'soil':
        return <SoilAssessment language={language} onBack={() => setActiveTab('dashboard')} />;
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
        return <Marketplace language={language} onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard language={language} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-1 pb-16">
        {renderContent()}
      </main>

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