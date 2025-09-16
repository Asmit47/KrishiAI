import React, { useRef, useEffect } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface DashboardProps {
  onNavigateToTab: (tab: string) => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToTab, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Any other side effects for Dashboard can go here
    return () => {
      // Cleanup if needed
    };
  }, []);

  const translations = {
    en: {
      cropDiseaseDetection: 'Crop Disease Detection',
      uploadPhoto: 'Upload Photo',
      clickPhoto: 'Click Photo',
      weatherDetails: 'Weather Details',
      temperature: 'Temperature',
      wind: 'Wind',
      humidity: 'Humidity',
      uvIndex: 'UV Index',
      soilHealthDetails: 'Soil Health Details',
      phLevel: 'pH Level',
      moisture: 'Moisture',
      nitrogenAmount: 'Nitrogen Amount',
      alerts: 'Alerts',
      noAlerts: 'No Alerts',
      high: 'High',
      today: 'Today'
    },
    hi: {
      cropDiseaseDetection: 'फसल रोग पहचान',
      uploadPhoto: 'फोटो अपलोड करें',
      clickPhoto: 'फोटो लें',
      weatherDetails: 'मौसम विवरण',
      temperature: 'तापमान',
      wind: 'हवा',
      humidity: 'नमी',
      uvIndex: 'यूवी सूचकांक',
      soilHealthDetails: 'मिट्टी स्वास्थ्य विवरण',
      phLevel: 'पीएच स्तर',
      moisture: 'नमी',
      nitrogenAmount: 'नाइट्रोजन मात्रा',
      alerts: 'अलर्ट',
      noAlerts: 'कोई अलर्ट नहीं',
      high: 'उच्च',
      today: 'आज'
    },
    pa: {
      cropDiseaseDetection: 'ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣ',
      uploadPhoto: 'ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ',
      clickPhoto: 'ਫੋਟੋ ਖਿੱਚੋ',
      weatherDetails: 'ਮੌਸਮ ਵੇਰਵਾ',
      temperature: 'ਤਾਪਮਾਨ',
      wind: 'ਹਵਾ',
      humidity: 'ਨਮੀ',
      uvIndex: 'ਯੂਵੀ ਸੂਚਕਾਂਕ',
      soilHealthDetails: 'ਮਿੱਟੀ ਸਿਹਤ ਵੇਰਵਾ',
      phLevel: 'ਪੀਐੱਚ ਪੱਧਰ',
      moisture: 'ਨਮੀ',
      nitrogenAmount: 'ਨਾਈਟ੍ਰੋਜਨ ਮਾਤਰਾ',
      alerts: 'ਚੇਤਾਵਨੀਆਂ',
      noAlerts: 'ਕੋਈ ਚੇਤਾਵਨੀ ਨਹੀਂ',
      high: 'ਉੱਚਾ',
      today: 'ਅੱਜ'
    }
  } as const;

  const t = translations[language];

  const handleFileUpload = () => fileInputRef.current?.click();

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      onNavigateToTab('disease-detection');
      stream.getTracks().forEach((track) => track.stop());
    } catch {
      handleFileUpload();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onNavigateToTab('disease-detection');
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-md">
        <main className="flex flex-col gap-6 p-4">
          {/* Crop Disease Detection */}
          <section className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">{t.cropDiseaseDetection}</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button 
                onClick={handleFileUpload}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#45c91d] px-6 py-3 text-base font-bold leading-normal tracking-wide text-green-950 transition-all hover:bg-opacity-90 sm:w-auto"
              >
                <span className="material-symbols-outlined">upload_file</span>
                <span className="truncate">{t.uploadPhoto}</span>
              </button>
              <button 
                onClick={handleCameraCapture}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-6 py-3 text-base font-bold leading-normal tracking-wide text-green-950 transition-all hover:bg-green-200 sm:w-auto"
              >
                <span className="material-symbols-outlined">photo_camera</span>
                <span className="truncate">{t.clickPhoto}</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </section>

          {/* Weather Details */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">{t.weatherDetails}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">device_thermostat</span>
                  <p className="text-sm font-medium text-green-700">{t.temperature}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">28°C</p>
              </div>
              
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">air</span>
                  <p className="text-sm font-medium text-green-700">{t.wind}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">12 km/h</p>
              </div>
              
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">water_drop</span>
                  <p className="text-sm font-medium text-green-700">{t.humidity}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">65%</p>
              </div>
              
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">wb_sunny</span>
                  <p className="text-sm font-medium text-green-700">{t.uvIndex}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">{t.high}</p>
              </div>
            </div>
          </section>

          {/* Soil Health Details */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">{t.soilHealthDetails}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">science</span>
                  <p className="text-sm font-medium text-green-700">{t.phLevel}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">6.5</p>
              </div>
              
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">humidity_mid</span>
                  <p className="text-sm font-medium text-green-700">{t.moisture}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">45%</p>
              </div>
              
              <div className="col-span-2 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">eco</span>
                  <p className="text-sm font-medium text-green-700">{t.nitrogenAmount}</p>
                </div>
                <p className="text-3xl font-bold text-green-950">120 kg/ha</p>
              </div>
            </div>
          </section>

          {/* Alerts */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">{t.alerts}</h2>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-green-700">{t.today}</p>
                <p className="text-3xl font-bold text-green-950">{t.noAlerts}</p>
                <p className="text-sm font-medium text-green-700">All is well</p>
              </div>
              <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQcQLXPA9vijyWlN2oAjjXg4PEZJE1Toi54zE-0crthX1O4IMfACEMgFd8Qhcs_jSfWgFlNaAdkBvKkfP8hGmioPtN61uf3IDfIbyL3OAsITigJvmcttUM-nP1ZzYdrLULLyDsKQZluTFyFag7PV0ksd2uz4l5M51Egkgpp2mjK7LzraDJGllox1xcQbFtjCy6FBpIGlAGP_hVLBx4bOSQaQlyt2mvi3oJNO9O1n8x_v71bZTUBlbno0c3z_f1e5-473IYonV8O2k")' }}></div>
            </div>
          </section>
        </main>
      </div>

    </div>
  );
};

export default Dashboard;
