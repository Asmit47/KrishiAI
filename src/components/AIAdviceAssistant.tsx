import React from 'react';

interface AIAdviceAssistantProps {
  language: 'en' | 'hi' | 'pa';
  onBack?: () => void;
}

const translations = {
  en: {
    title: 'Crop Recommendations',
    location: 'Your Location:',
    locationValue: 'Sunnyvale, CA',
    topRecommendations: 'Top Recommendations',
    otherSuitableCrops: 'Other Suitable Crops',
    viewDetails: 'View Details',
    home: 'Home',
    detect: 'Detect',
    soil: 'Soil',
    advice: 'Advice',
    market: 'Market'
  },
  hi: {
    title: 'फसल सिफारिशें',
    location: 'आपका स्थान:',
    locationValue: 'सनीवेल, सीए',
    topRecommendations: 'शीर्ष सिफारिशें',
    otherSuitableCrops: 'अन्य उपयुक्त फसलें',
    viewDetails: 'विवरण देखें',
    home: 'होम',
    detect: 'जांचें',
    soil: 'मिट्टी',
    advice: 'सलाह',
    market: 'बाजार'
  },
  pa: {
    title: 'ਫਸਲ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ',
    location: 'ਤੁਹਾਡਾ ਟਿਕਾਣਾ:',
    locationValue: 'ਸਨੀਵੇਲ, ਸੀਏ',
    topRecommendations: 'ਟਾਪ ਸਿਫਾਰਸ਼ਾਂ',
    otherSuitableCrops: 'ਹੋਰ ਢੁਕਵੀਆਂ ਫਸਲਾਂ',
    viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
    home: 'ਘਰ',
    detect: 'ਖੋਜ',
    soil: 'ਮਿੱਟੀ',
    advice: 'ਸਲਾਹ',
    market: 'ਮਾਰਕੀਟ'
  }
};

const AIAdviceAssistant: React.FC<AIAdviceAssistantProps> = ({ language }) => {
  const t = translations[language];
  
  const topCrops = [
    {
      id: 1,
      name: 'Tomatoes',
      description: 'High demand in local markets and ideal for current weather conditions. Expected high yield.',
      image: 'https://images.unsplash.com/photo-1592841200221-1907ca6d4758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      isHighlighted: true
    },
    {
      id: 2,
      name: 'Corn',
      description: 'Resistant to current pests and thrives in the predicted rainfall. Profitable for the upcoming season.',
      image: 'https://images.unsplash.com/photo-1601593768793-34b8f5b6a8b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      isHighlighted: false
    }
  ];

  const otherCrops = [
    {
      id: 1,
      name: 'Squash',
      description: 'Good for soil rotation and has a stable market price.',
      image: 'https://images.unsplash.com/photo-1594282416549-98196cb5f994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'Cucumbers',
      description: 'Requires minimal water and has a short growth cycle.',
      image: 'https://images.unsplash.com/photo-1604977043715-08a151e9a3e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-slate-50" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <div className="flex flex-col gap-6">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-50/80 p-4 pb-2 backdrop-blur-sm">
          <h1 className="flex-1 text-2xl font-bold leading-tight tracking-tighter text-green-950">{t.title}</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </header>

        <main className="flex flex-col gap-8 px-4">
          {/* Location Section */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
              <span className="material-symbols-outlined text-green-700">location_on</span>
              <p className="text-base font-medium text-green-950">
                {t.location} <span className="font-bold">{t.locationValue}</span>
              </p>
            </div>
          </section>

          {/* Top Recommendations Section */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
              {t.topRecommendations}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {topCrops.map((crop) => (
                <div key={crop.id} className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <div 
                    className="h-40 w-full rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${crop.image})` }}
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-green-950">{crop.name}</h3>
                    <p className="text-sm text-green-700">{crop.description}</p>
                    <button 
                      className={`mt-2 w-full rounded-lg py-2.5 text-sm font-bold text-green-950 transition-all ${
                        crop.isHighlighted 
                          ? 'bg-[#45c91d] hover:bg-opacity-90' 
                          : 'bg-green-100 hover:bg-green-200'
                      }`}
                    >
                      {t.viewDetails}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Suitable Crops Section */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
              {t.otherSuitableCrops}
            </h2>
            <div className="flex flex-col gap-3">
              {otherCrops.map((crop) => (
                <div key={crop.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                  <div 
                    className="h-16 w-16 flex-shrink-0 rounded-xl bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${crop.image})` }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-green-950">{crop.name}</h3>
                    <p className="text-sm text-green-700">{crop.description}</p>
                  </div>
                  <span className="material-symbols-outlined text-green-950">chevron_right</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AIAdviceAssistant;
