import React, { useRef } from 'react';
import { 
  Camera,
  Upload,
  Thermometer,
  Wind,
  Droplet,
  Sun,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface StatItem {
  id: number;
  label: string;
  value: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
  color?: string;
}

type Language = 'en' | 'hi' | 'pa';

interface DashboardProps {
  language: Language;
  onNavigateToTab: (tab: string) => void;
}

const getStatusColor = (status: 'good' | 'warning' | 'critical'): string => {
  switch (status) {
    case 'good': return 'text-green-500';
    case 'warning': return 'text-yellow-500';
    case 'critical': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

const Dashboard: React.FC<DashboardProps> = ({ language, onNavigateToTab }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      cropDiseaseDetection: "Crop Disease Detection",
      uploadPhoto: "Upload Photo",
      clickPhoto: "Click Photo",
      weatherDetails: "Weather Details",
      temperature: "Temperature",
      wind: "Wind",
      humidity: "Humidity",
      uvIndex: "UV Index",
      soilHealthDetails: "Soil Health Details",
      phLevel: "pH Level",
      moisture: "Moisture", 
      nitrogenAmount: "Nitrogen Amount",
      alerts: "Alerts",
      noAlerts: "No Alerts",
      high: "High",
      appName: "Krishi AI",
      scanPlantNow: "Scan Plant Now",
      uploadImage: "Upload Image"
    },
    hi: {
      cropDiseaseDetection: "फसल रोग पहचान",
      uploadPhoto: "फोटो अपलोड करें",
      clickPhoto: "फोटो लें",
      weatherDetails: "मौसम विवरण",
      temperature: "तापमान",
      wind: "हवा",
      humidity: "नमी",
      uvIndex: "यूवी सूचकांक",
      soilHealthDetails: "मिट्टी स्वास्थ्य विवरण",
      phLevel: "पीएच स्तर",
      moisture: "नमी",
      nitrogenAmount: "नाइट्रोजन मात्रा",
      alerts: "अलर्ट",
      noAlerts: "कोई अलर्ट नहीं",
      high: "उच्च",
      appName: "कृषि एआई",
      scanPlantNow: "पौधे को स्कैन करें",
      uploadImage: "इमेज अपलोड करें"
    },
    pa: {
      cropDiseaseDetection: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣ",
      uploadPhoto: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      clickPhoto: "ਫੋਟੋ ਖਿੱਚੋ",
      weatherDetails: "ਮੌਸਮ ਵੇਰਵਾ",
      temperature: "ਤਾਪਮਾਨ",
      wind: "ਹਵਾ",
      humidity: "ਨਮੀ",
      uvIndex: "ਯੂਵੀ ਸੂਚਕਾਂਕ",
      soilHealthDetails: "ਮਿੱਟੀ ਸਿਹਤ ਵੇਰਵਾ",
      phLevel: "ਪੀਐੱਚ ਪੱਧਰ",
      moisture: "ਨਮੀ",
      nitrogenAmount: "ਨਾਈਟ੍ਰੋਜਨ ਮਾਤਰਾ",
      alerts: "ਚੇਤਾਵਨੀਆਂ",
      noAlerts: "ਕੋਈ ਚੇਤਾਵਨੀ ਨਹੀਂ",
      high: "ਉੱਚਾ",
      appName: "ਕ੍ਰਿਸ਼ੀ ਏਆਈ",
      scanPlantNow: "ਪੌਦੇ ਨੂੰ ਸਕੈਨ ਕਰੋ",
      uploadImage: "ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ"
    }
  };

  const t = translations[language];

  // Handle file upload
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Here you would implement camera capture logic
      // For now, just navigate to disease detection
      onNavigateToTab('disease-detection');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Camera access denied:', error);
      // Fallback to file upload
      handleFileUpload();
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would handle the selected image
      console.log('Selected file:', file);
      onNavigateToTab('disease-detection');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6">
        
        {/* Crop Disease Detection Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t.cropDiseaseDetection}
          </h2>
          
          <div className="space-y-3">
            {/* Upload Photo Button */}
            <button
              onClick={handleFileUpload}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Upload size={18} />
              <span>{t.uploadPhoto}</span>
            </button>
            
            {/* Click Photo Button */}
            <button
              onClick={handleCameraCapture}
              className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <Camera size={18} />
              <span>{t.clickPhoto}</span>
            </button>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Weather Details Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.weatherDetails}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Temperature */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Thermometer size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.temperature}</p>
                <p className="text-xl font-bold text-gray-800">28°C</p>
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wind size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.wind}</p>
                <p className="text-xl font-bold text-gray-800">12 km/h</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplet size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.humidity}</p>
                <p className="text-xl font-bold text-gray-800">65%</p>
              </div>
            </div>

            {/* UV Index */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Sun size={18} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.uvIndex}</p>
                <p className="text-xl font-bold text-gray-800">{t.high}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Health Details Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.soilHealthDetails}
          </h3>
          
          <div className="space-y-4">
            {/* pH Level */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{t.phLevel}</p>
                <p className="text-xl font-bold text-gray-800">6.5</p>
              </div>
            </div>

            {/* Moisture */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplet size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{t.moisture}</p>
                <p className="text-xl font-bold text-gray-800">45%</p>
              </div>
            </div>

            {/* Nitrogen Amount */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{t.nitrogenAmount}</p>
                <p className="text-xl font-bold text-gray-800">120 kg/ha</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t.alerts}
          </h3>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-gray-300 border-dashed rounded-full"></div>
            </div>
            <p className="text-gray-500 font-medium">{t.noAlerts}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;