import React, { useState } from 'react';
import { TrendingUp, Droplets, Thermometer, DollarSign, Leaf, Star } from 'lucide-react';

interface CropRecommendationsProps {
  language: string;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ language }) => {
  const [filters, setFilters] = useState({
    season: 'current',
    soilType: 'loamy',
    waterAvailability: 'medium'
  });

  const translations = {
    en: {
      title: "Crop Recommendations",
      subtitle: "Get personalized crop suggestions based on your farm conditions",
      filters: "Filter Recommendations",
      season: "Season",
      soilType: "Soil Type",
      waterAvailability: "Water Availability",
      current: "Current Season",
      kharif: "Kharif (Monsoon)",
      rabi: "Rabi (Winter)",
      summer: "Summer",
      loamy: "Loamy",
      clay: "Clay",
      sandy: "Sandy",
      black: "Black Soil",
      high: "High",
      medium: "Medium",
      low: "Low",
      recommendedCrops: "Recommended Crops for You",
      profitPotential: "Profit Potential",
      waterRequirement: "Water Requirement",
      growthPeriod: "Growth Period",
      sustainability: "Sustainability Score",
      marketDemand: "Market Demand",
      expectedYield: "Expected Yield",
      investment: "Investment Required",
      viewDetails: "View Details",
      months: "months"
    },
    hi: {
      title: "फसल सुझाव",
      subtitle: "अपनी खेती की स्थिति के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें",
      filters: "सुझाव फ़िल्टर करें",
      season: "मौसम",
      soilType: "मिट्टी का प्रकार",
      waterAvailability: "पानी की उपलब्धता",
      current: "वर्तमान मौसम",
      kharif: "खरीफ (मानसून)",
      rabi: "रबी (सर्दी)",
      summer: "गर्मी",
      loamy: "दोमट",
      clay: "चिकनी",
      sandy: "रेतीली",
      black: "काली मिट्टी",
      high: "अधिक",
      medium: "मध्यम",
      low: "कम",
      recommendedCrops: "आपके लिए अनुशंसित फसलें",
      profitPotential: "लाभ की संभावना",
      waterRequirement: "पानी की आवश्यकता",
      growthPeriod: "वृद्धि अवधि",
      sustainability: "स्थिरता स्कोर",
      marketDemand: "बाजार मांग",
      expectedYield: "अपेक्षित उपज",
      investment: "आवश्यक निवेश",
      viewDetails: "विवरण देखें",
      months: "महीने"
    },
    pa: {
      title: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
      subtitle: "ਆਪਣੇ ਖੇਤ ਦੀਆਂ ਸਥਿਤੀਆਂ ਦੇ ਆਧਾਰ 'ਤੇ ਵਿਅਕਤੀਗਤ ਫਸਲ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",
      filters: "ਸਿਫਾਰਸ਼ਾਂ ਨੂੰ ਫਿਲਟਰ ਕਰੋ",
      season: "ਮੌਸਮ",
      soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
      waterAvailability: "ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ",
      current: "ਮੌਜੂਦਾ ਮੌਸਮ",
      kharif: "ਖਰੀਫ (ਮਾਨਸੂਨ)",
      rabi: "ਰਬੀ (ਸਰਦੀ)",
      summer: "ਗਰਮੀ",
      loamy: "ਦੋਮਟ",
      clay: "ਚਿਕਨੀ",
      sandy: "ਰੇਤਲੀ",
      black: "ਕਾਲੀ ਮਿੱਟੀ",
      high: "ਉੱਚ",
      medium: "ਮੱਧਮ",
      low: "ਘੱਟ",
      recommendedCrops: "ਤੁਹਾਡੇ ਲਈ ਸਿਫਾਰਸ਼ੀ ਫਸਲਾਂ",
      profitPotential: "ਮੁਨਾਫੇ ਦੀ ਸੰਭਾਵਨਾ",
      waterRequirement: "ਪਾਣੀ ਦੀ ਲੋੜ",
      growthPeriod: "ਵਿਕਾਸ ਦੀ ਮਿਆਦ",
      sustainability: "ਸਥਿਰਤਾ ਸਕੋਰ",
      marketDemand: "ਮਾਰਕੀਟ ਦੀ ਮੰਗ",
      expectedYield: "ਅਪੇਖਿਤ ਪੈਦਾਵਾਰ",
      investment: "ਲੋੜੀਂਦਾ ਨਿਵੇਸ਼",
      viewDetails: "ਵੇਰਵੇ ਵੇਖੋ",
      months: "ਮਹੀਨੇ"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const cropData = [
    {
      id: 1,
      name: "Rice",
      nameHi: "धान",
      namePa: "ਚਾਵਲ",
      profitPotential: "High",
      waterRequirement: "High",
      growthPeriod: 4,
      sustainability: 85,
      marketDemand: "High",
      expectedYield: "45 quintals/acre",
      expectedYieldHi: "45 क्विंटल/एकड़",
      expectedYieldPa: "45 ਕੁਇੰਟਲ/ਏਕੜ",
      investment: "₹15,000",
      season: ["kharif"],
      soilTypes: ["clay", "loamy"],
      waterLevel: ["high", "medium"]
    },
    {
      id: 2,
      name: "Wheat",
      nameHi: "गेहूं",
      namePa: "ਕਣਕ",
      profitPotential: "Medium",
      waterRequirement: "Medium",
      growthPeriod: 5,
      sustainability: 78,
      marketDemand: "High",
      expectedYield: "25 quintals/acre",
      expectedYieldHi: "25 क्विंटल/एकड़",
      expectedYieldPa: "25 ਕੁਇੰਟਲ/ਏਕੜ",
      investment: "₹12,000",
      season: ["rabi"],
      soilTypes: ["loamy", "clay"],
      waterLevel: ["medium", "low"]
    },
    {
      id: 3,
      name: "Cotton",
      nameHi: "कपास",
      namePa: "ਕਪਾਹ",
      profitPotential: "High",
      waterRequirement: "Medium",
      growthPeriod: 6,
      sustainability: 72,
      marketDemand: "High",
      expectedYield: "15 quintals/acre",
      expectedYieldHi: "15 क्विंटल/एकड़",
      expectedYieldPa: "15 ਕੁਇੰਟਲ/ਏਕੜ",
      investment: "₹18,000",
      season: ["kharif"],
      soilTypes: ["black", "loamy"],
      waterLevel: ["medium", "low"]
    },
    {
      id: 4,
      name: "Sugarcane",
      nameHi: "गन्ना",
      namePa: "ਗੰਨਾ",
      profitPotential: "High",
      waterRequirement: "High",
      growthPeriod: 12,
      sustainability: 90,
      marketDemand: "Medium",
      expectedYield: "400 quintals/acre",
      expectedYieldHi: "400 क्विंटल/एकड़",
      expectedYieldPa: "400 ਕੁਇੰਟਲ/ਏਕੜ",
      investment: "₹25,000",
      season: ["current"],
      soilTypes: ["loamy", "clay"],
      waterLevel: ["high"]
    }
  ];

  const filteredCrops = cropData.filter(crop => 
    (filters.season === 'current' || crop.season.includes(filters.season)) &&
    crop.soilTypes.includes(filters.soilType) &&
    crop.waterLevel.includes(filters.waterAvailability)
  );

  const getProfitColor = (profit: string) => {
    switch (profit.toLowerCase()) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getWaterColor = (water: string) => {
    switch (water.toLowerCase()) {
      case 'high': return 'text-blue-600';
      case 'medium': return 'text-blue-400';
      case 'low': return 'text-blue-200';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
          <p className="opacity-90">{t.subtitle}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.filters}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.season}
                </label>
                <select
                  value={filters.season}
                  onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="current">{t.current}</option>
                  <option value="kharif">{t.kharif}</option>
                  <option value="rabi">{t.rabi}</option>
                  <option value="summer">{t.summer}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.soilType}
                </label>
                <select
                  value={filters.soilType}
                  onChange={(e) => setFilters(prev => ({ ...prev, soilType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="loamy">{t.loamy}</option>
                  <option value="clay">{t.clay}</option>
                  <option value="sandy">{t.sandy}</option>
                  <option value="black">{t.black}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.waterAvailability}
                </label>
                <select
                  value={filters.waterAvailability}
                  onChange={(e) => setFilters(prev => ({ ...prev, waterAvailability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="high">{t.high}</option>
                  <option value="medium">{t.medium}</option>
                  <option value="low">{t.low}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.recommendedCrops}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCrops.map((crop) => (
                <div key={crop.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">
                        {language === 'hi' ? crop.nameHi : language === 'pa' ? crop.namePa : crop.name}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={`${
                              star <= Math.floor(crop.sustainability / 20) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {crop.sustainability}/100
                        </span>
                      </div>
                    </div>
                    <Leaf className="text-green-500" size={32} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <DollarSign className={`mx-auto mb-1 ${getProfitColor(crop.profitPotential)}`} size={20} />
                      <p className="text-sm text-gray-600">{t.profitPotential}</p>
                      <p className={`font-semibold ${getProfitColor(crop.profitPotential)}`}>
                        {crop.profitPotential}
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplets className={`mx-auto mb-1 ${getWaterColor(crop.waterRequirement)}`} size={20} />
                      <p className="text-sm text-gray-600">{t.waterRequirement}</p>
                      <p className={`font-semibold ${getWaterColor(crop.waterRequirement)}`}>
                        {crop.waterRequirement}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.growthPeriod}:</span>
                      <span className="font-medium">{crop.growthPeriod} {t.months}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.expectedYield}:</span>
                      <span className="font-medium">
                        {language === 'hi' ? crop.expectedYieldHi : language === 'pa' ? crop.expectedYieldPa : crop.expectedYield}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.investment}:</span>
                      <span className="font-medium text-green-600">{crop.investment}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{t.marketDemand}:</span>
                      <span className={`font-medium ${
                        crop.marketDemand === 'High' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {crop.marketDemand}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                    {t.viewDetails}
                  </button>
                </div>
              ))}
            </div>

            {filteredCrops.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Leaf size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600">
                  No crops match your current filters. Try adjusting your selection criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendations;