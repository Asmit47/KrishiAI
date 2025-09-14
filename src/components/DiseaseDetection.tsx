import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Loader, X } from 'lucide-react';

interface DiseaseDetectionProps {
  language: string;
}

const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      title: "Plant Disease Detection",
      subtitle: "Upload or capture an image of your plant to detect diseases",
      uploadImage: "Upload Image",
      takePhoto: "Take Photo",
      analyzing: "Analyzing image...",
      noImageSelected: "No image selected",
      analysisComplete: "Analysis Complete",
      diseaseDetected: "Disease Detected",
      healthyPlant: "Healthy Plant",
      confidence: "Confidence",
      recommendations: "Treatment Recommendations",
      prevention: "Prevention Tips",
      tryAnother: "Analyze Another Image",
      sampleResults: {
        disease: "Leaf Spot Disease",
        confidence: "92%",
        severity: "Moderate",
        treatment: [
          "Remove affected leaves immediately",
          "Apply copper-based fungicide spray",
          "Improve air circulation around plants",
          "Avoid overhead watering"
        ],
        prevention: [
          "Plant disease-resistant varieties",
          "Maintain proper spacing between plants",
          "Water at soil level, not on leaves",
          "Regular inspection and early detection"
        ]
      }
    },
    hi: {
      title: "पौधों की बीमारी की पहचान",
      subtitle: "बीमारियों का पता लगाने के लिए अपने पौधे की तस्वीर अपलोड या कैप्चर करें",
      uploadImage: "तस्वीर अपलोड करें",
      takePhoto: "फोटो लें",
      analyzing: "तस्वीर का विश्लेषण...",
      noImageSelected: "कोई तस्वीर चुनी नहीं गई",
      analysisComplete: "विश्लेषण पूरा",
      diseaseDetected: "बीमारी का पता चला",
      healthyPlant: "स्वस्थ पौधा",
      confidence: "विश्वसनीयता",
      recommendations: "उपचार सुझाव",
      prevention: "रोकथाम के उपाय",
      tryAnother: "दूसरी तस्वीर का विश्लेषण करें",
      sampleResults: {
        disease: "पत्ती धब्बा रोग",
        confidence: "92%",
        severity: "मध्यम",
        treatment: [
          "प्रभावित पत्तियों को तुरंत हटाएं",
          "कॉपर आधारित कवकनाशी स्प्रे करें",
          "पौधों के चारों ओर हवा का संचार सुधारें",
          "ऊपर से पानी देने से बचें"
        ],
        prevention: [
          "रोग प्रतिरोधी किस्मों का रोपण करें",
          "पौधों के बीच उचित दूरी बनाए रखें",
          "मिट्टी के स्तर पर पानी दें, पत्तियों पर नहीं",
          "नियमित निरीक्षण और जल्दी पहचान"
        ]
      }
    },
    te: {
      title: "మొక్కల వ్యాధుల గుర్తింపు",
      subtitle: "వ్యాధులను గుర్తించడానికి మీ మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా క్యాప్చర్ చేయండి",
      uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి",
      takePhoto: "ఫోటో తీయండి",
      analyzing: "చిత్రాన్ని విశ్లేషిస్తోంది...",
      noImageSelected: "ఏ చిత్రం ఎంచుకోలేదు",
      analysisComplete: "విశ్లేషణ పూర్తయింది",
      diseaseDetected: "వ్యాధి గుర్తించబడింది",
      healthyPlant: "ఆరోగ్యకరమైన మొక్క",
      confidence: "విశ్వసనీయత",
      recommendations: "చికిత్స సిఫార్సులు",
      prevention: "నివారణ చిట్కాలు",
      tryAnother: "మరొక చిత్రాన్ని విశ్లేషించండి",
      sampleResults: {
        disease: "ఆకు మచ్చ వ్యాధి",
        confidence: "92%",
        severity: "మధ్యస్థ",
        treatment: [
          "ప్రభావిత ఆకులను వెంటనే తొలగించండి",
          "కాపర్ ఆధారిత శిలీంద్రనాశిని స్ప్రే చేయండి",
          "మొక్కల చుట్టూ గాలి ప్రసరణను మెరుగుపరచండి",
          "ఎగువ నుండి నీళ్లు పెట్టడం మానండి"
        ],
        prevention: [
          "వ్యాధి నిరోధక రకాలను నాటండి",
          "మొక్కల మధ్య సరైన దూరం ఉంచండి",
          "మట్టి స్థాయిలో నీరు, ఆకులపై కాదు",
          "క్రమ పరిశీలన మరియు ముందస్తు గుర్తింపు"
        ]
      }
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    alert("Camera functionality would be implemented with device camera access in a real application");
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // Mock analysis result
      setAnalysisResult({
        diseaseDetected: true,
        disease: t.sampleResults.disease,
        confidence: t.sampleResults.confidence,
        severity: t.sampleResults.severity,
        treatment: t.sampleResults.treatment,
        prevention: t.sampleResults.prevention
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
          <p className="opacity-90">{t.subtitle}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload Section */}
          {!selectedImage && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Upload size={20} />
                    <span>{t.uploadImage}</span>
                  </button>
                  <button
                    onClick={handleCameraCapture}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Camera size={20} />
                    <span>{t.takePhoto}</span>
                  </button>
                </div>
                <p className="text-gray-500">{t.noImageSelected}</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Selected Image Display */}
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
                <button
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {!isAnalyzing && !analysisResult && (
                <div className="text-center">
                  <button
                    onClick={analyzeImage}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Analyze for Disease
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analysis Loading */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <Loader className="animate-spin mx-auto mb-4 text-green-500" size={48} />
              <p className="text-lg font-semibold text-gray-700">{t.analyzing}</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  {analysisResult.diseaseDetected ? (
                    <AlertTriangle className="text-orange-500" size={24} />
                  ) : (
                    <CheckCircle className="text-green-500" size={24} />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{t.analysisComplete}</h3>
                    <p className="text-sm text-gray-600">
                      {analysisResult.diseaseDetected ? t.diseaseDetected : t.healthyPlant}
                    </p>
                  </div>
                </div>

                {analysisResult.diseaseDetected && (
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Disease</p>
                      <p className="font-semibold">{analysisResult.disease}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">{t.confidence}</p>
                      <p className="font-semibold text-green-600">{analysisResult.confidence}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Severity</p>
                      <p className="font-semibold text-orange-500">{analysisResult.severity}</p>
                    </div>
                  </div>
                )}
              </div>

              {analysisResult.diseaseDetected && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Treatment Recommendations */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">{t.recommendations}</h4>
                    <ul className="space-y-2">
                      {analysisResult.treatment.map((item: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention Tips */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3">{t.prevention}</h4>
                    <ul className="space-y-2">
                      {analysisResult.prevention.map((item: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={resetAnalysis}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  {t.tryAnother}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;