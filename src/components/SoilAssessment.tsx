import React from 'react';

interface SoilAssessmentProps {
  language: 'en' | 'hi' | 'pa';
  onBack?: () => void;
}

const SoilAssessment: React.FC<SoilAssessmentProps> = ({ language, onBack }) => {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-50/80 p-4 pb-2 backdrop-blur-sm">
        <h1 className="flex-1 text-2xl font-bold leading-tight tracking-tighter text-green-950">
          {language === 'en' ? 'Soil Assessment' : language === 'hi' ? 'मिट्टी का आकलन' : 'ਮਿੱਟੀ ਦਾ ਮੁਲਾਂਕਣ'}
        </h1>
        {onBack && (
          <button 
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
      </header>

      <main className="flex flex-col gap-8 px-4">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
            {language === 'en' ? 'Soil Assessment' : language === 'hi' ? 'मिट्टी का आकलन' : 'ਮਿੱਟੀ ਦਾ ਮੁਲਾਂਕਣ'}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#45c91d] px-6 py-3 text-base font-bold leading-normal tracking-wide text-green-950 transition-all hover:bg-opacity-90 sm:w-auto">
              <span className="material-symbols-outlined">upload_file</span>
              <span className="truncate">
                {language === 'en' 
                  ? 'Upload Soil Test Report' 
                  : language === 'hi' 
                    ? 'मिट्टी परीक्षण रिपोर्ट अपलोड करें' 
                    : 'ਮਿੱਟੀ ਟੈਸਟ ਰਿਪੋਰਟ ਅੱਪਲੋਡ ਕਰੋ'}
              </span>
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-6 py-3 text-base font-bold leading-normal tracking-wide text-green-950 transition-all hover:bg-green-200 sm:w-auto">
              <span className="material-symbols-outlined">science</span>
              <span className="truncate">
                {language === 'en' 
                  ? 'Start Virtual Soil Test' 
                  : language === 'hi' 
                    ? 'वर्चुअल मिट्टी परीक्षण शुरू करें' 
                    : 'ਵਰਚੁਅਲ ਮਿੱਟੀ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ'}
              </span>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
            {language === 'en' ? 'Comprehensive Soil Health' : language === 'hi' ? 'व्यापक मिट्टी स्वास्थ्य' : 'ਵਿਆਪਕ ਮਿੱਟੀ ਦੀ ਸਿਹਤ'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-700">science</span>
                <p className="text-sm font-medium text-green-700">
                  {language === 'en' ? 'pH Level' : language === 'hi' ? 'पीएच स्तर' : 'pH ਪੱਧਰ'}
                </p>
              </div>
              <p className="text-3xl font-bold text-green-950">6.5</p>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-700">humidity_mid</span>
                <p className="text-sm font-medium text-green-700">
                  {language === 'en' ? 'Moisture' : language === 'hi' ? 'नमी' : 'ਨਮੀ'}
                </p>
              </div>
              <p className="text-3xl font-bold text-green-950">45%</p>
            </div>
            <div className="col-span-2 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-700">eco</span>
                <p className="text-sm font-medium text-green-700">
                  {language === 'en' ? 'Nitrogen Amount' : language === 'hi' ? 'नाइट्रोजन की मात्रा' : 'ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਮਾਤਰਾ'}
                </p>
              </div>
              <p className="text-3xl font-bold text-green-950">120 kg/ha</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SoilAssessment;
