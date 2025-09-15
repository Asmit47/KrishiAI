import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  TrendingUp, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Camera,
  Upload
} from 'lucide-react';

interface DashboardProps {
  language: string;
  onNavigateToTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, onNavigateToTab }) => {
  const translations = {
    en: {
      welcomeBack: "Welcome Back, Farmer!",
      quickDiseaseDetection: "Quick Disease Detection",
      scanPlantNow: "Scan Plant Now",
      uploadImage: "Upload Image",
      detectDiseases: "Detect plant diseases instantly with AI-powered image analysis",
      todayWeather: "Today's Weather",
      soilHealth: "Soil Health",
      recentAlerts: "Recent Alerts",
      quickStats: "Quick Stats",
      temperature: "Temperature",
      humidity: "Humidity", 
      windSpeed: "Wind Speed",
      uvIndex: "UV Index",
      ph: "pH Level",
      moisture: "Moisture",
      nitrogen: "Nitrogen",
      excellent: "Excellent",
      good: "Good",
      needsAttention: "Needs Attention",
      cropsGrowing: "Crops Growing",
      activeAlerts: "Active Alerts",
      avgYield: "Avg Yield",
      profitMargin: "Profit Margin"
    },
    hi: {
      welcomeBack: "वापस स्वागत है, किसान!",
      quickDiseaseDetection: "त्वरित रोग पहचान",
      scanPlantNow: "अभी पौधे को स्कैन करें",
      uploadImage: "तस्वीर अपलोड करें",
      detectDiseases: "AI-संचालित छवि विश्लेषण के साथ तुरंत पौधों की बीमारियों का पता लगाएं",
      todayWeather: "आज का मौसम",
      soilHealth: "मिट्टी का स्वास्थ्य",
      recentAlerts: "हाल की चेतावनी",
      quickStats: "त्वरित आंकड़े",
      temperature: "तापमान",
      humidity: "नमी",
      windSpeed: "हवा की गति",
      uvIndex: "यूवी सूचकांक",
      ph: "पीएच स्तर",
      moisture: "नमी",
      nitrogen: "नाइट्रोजन",
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      needsAttention: "ध्यान चाहिए",
      cropsGrowing: "फसलें उगाना",
      activeAlerts: "सक्रिय अलर्ट",
      avgYield: "औसत उपज",
      profitMargin: "लाभ मार्जिन"
    },
    pa: {
      welcomeBack: "ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ, ਕਿਸਾਨ!",
      quickDiseaseDetection: "ਤੇਜ਼ ਬਿਮਾਰੀ ਪਛਾਣ",
      scanPlantNow: "ਹੁਣੇ ਪੌਧੇ ਨੂੰ ਸਕੈਨ ਕਰੋ",
      uploadImage: "ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ",
      detectDiseases: "AI-ਸੰਚਾਲਿਤ ਚਿੱਤਰ ਵਿਸ਼ਲੇਸ਼ਣ ਨਾਲ ਤੁਰੰਤ ਪੌਧਿਆਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦਾ ਪਤਾ ਲਗਾਓ",
      todayWeather: "ਅੱਜ ਦਾ ਮੌਸਮ",
      soilHealth: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ",
      recentAlerts: "ਹਾਲ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ",
      quickStats: "ਤੇਜ਼ ਅੰਕੜੇ",
      temperature: "ਤਾਪਮਾਨ",
      humidity: "ਨਮੀ",
      windSpeed: "ਹਵਾ ਦੀ ਗਤੀ",
      uvIndex: "UV ਸੂਚਕਾਂਕ",
      ph: "pH ਪੱਧਰ",
      moisture: "ਨਮੀ",
      nitrogen: "ਨਾਈਟ੍ਰੋਜਨ",
      excellent: "ਸ਼ਾਨਦਾਰ",
      good: "ਚੰਗਾ",
      needsAttention: "ਧਿਆਨ ਚਾਹੀਦਾ ਹੈ",
      cropsGrowing: "ਫਸਲਾਂ ਉਗਾਉਣਾ",
      activeAlerts: "ਸਰਗਰਮ ਅਲਰਟ",
      avgYield: "ਔਸਤ ਪੈਦਾਵਾਰ",
      profitMargin: "ਮੁਨਾਫਾ ਮਾਰਜਿਨ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const weatherData = [
    { icon: Thermometer, label: t.temperature, value: "28°C", color: "text-orange-500" },
    { icon: Droplets, label: t.humidity, value: "65%", color: "text-blue-500" },
    { icon: Wind, label: t.windSpeed, value: "12 km/h", color: "text-gray-500" },
    { icon: Sun, label: t.uvIndex, value: "6", color: "text-yellow-500" }
  ];

  const soilData = [
    { label: t.ph, value: "6.8", status: t.excellent, color: "text-green-500" },
    { label: t.moisture, value: "45%", status: t.good, color: "text-blue-500" },
    { label: t.nitrogen, value: "Medium", status: t.needsAttention, color: "text-yellow-500" }
  ];

  const stats = [
    { label: t.cropsGrowing, value: "5", icon: CheckCircle, color: "bg-green-500" },
    { label: t.activeAlerts, value: "2", icon: AlertTriangle, color: "bg-yellow-500" },
    { label: t.avgYield, value: "85%", icon: TrendingUp, color: "bg-blue-500" },
    { label: t.profitMargin, value: "₹23K", icon: DollarSign, color: "bg-purple-500" }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">{t.welcomeBack}</h2>
        <p className="opacity-90">Monitor your farm's health and make data-driven decisions</p>
      </div>

      {/* Quick Disease Detection */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Camera size={24} className="mr-3 text-green-500" />
              {t.quickDiseaseDetection}
            </h3>
            <p className="text-gray-600 mt-1">{t.detectDiseases}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onNavigateToTab('disease-detection')}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <Camera size={20} />
            <span>{t.scanPlantNow}</span>
          </button>
          
          <button
            onClick={() => onNavigateToTab('disease-detection')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <Upload size={20} />
            <span>{t.uploadImage}</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weather and Soil Health */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Sun size={20} className="mr-2 text-yellow-500" />
            {t.todayWeather}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {weatherData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon size={18} className={item.color} />
                  <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Soil Health Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-green-500" />
            {t.soilHealth}
          </h3>
          <div className="space-y-4">
            {soilData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{item.label}</span>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{item.value}</p>
                  <p className={`text-xs ${item.color}`}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <AlertTriangle size={20} className="mr-2 text-yellow-500" />
          {t.recentAlerts}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <AlertTriangle size={16} className="text-yellow-500 mt-1" />
            <div>
              <p className="font-medium text-gray-800">Nitrogen Deficiency Detected</p>
              <p className="text-sm text-gray-600">Consider applying nitrogen fertilizer to improve soil health</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <Droplets size={16} className="text-blue-500 mt-1" />
            <div>
              <p className="font-medium text-gray-800">Optimal Watering Time</p>
              <p className="text-sm text-gray-600">Weather conditions are perfect for irrigation today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;