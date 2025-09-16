import React, { useRef, useState, useCallback, FC } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface Solution {
  icon: string;
  title: string;
  description: string;
}

interface SampleResults {
  disease: string;
  confidence: string;
  severity: string;
  treatment: string[];
  prevention: string[];
}

interface TranslationType {
  title: string;
  subtitle: string;
  uploadPhoto: string;
  takePhoto: string;
  results: string;
  diagnosis: string;
  earlyBlight: string;
  diagnosisText: string;
  suggestedSolutions: string;
  solutions: Solution[];
  analyzing: string;
  noImageSelected: string;
  analysisComplete: string;
  diseaseDetected: string;
  healthyPlant: string;
  confidence: string;
  recommendations: string;
  prevention: string;
  tryAnother: string;
  sampleResults: SampleResults;
}

interface DiseaseDetectionProps {
  language: Language;
  onBack: () => void;
}

const DiseaseDetection: FC<DiseaseDetectionProps> = ({ language, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const translations: Record<Language, TranslationType> = {
    en: {
      title: "Crop Disease Detection",
      subtitle: "Upload or take a photo of the affected plant.",
      uploadPhoto: "Upload Photo",
      takePhoto: "Take Photo",
      results: "Results",
      diagnosis: "DIAGNOSIS",
      earlyBlight: "Early Blight",
      diagnosisText: "The analysis indicates a high probability of Early Blight, a common fungal disease affecting tomatoes and potatoes. Key indicators are the dark, concentric lesions on the leaves.",
      suggestedSolutions: "Suggested Solutions",
      solutions: [
        {
          icon: "science",
          title: "Fungicide Application",
          description: "Apply a copper-based or chlorothalonil fungicide. Follow the product label for application rates and timing."
        },
        {
          icon: "eco",
          title: "Cultural Practices",
          description: "Improve air circulation by pruning and spacing plants. Water at the base of the plant to avoid wet foliage."
        },
        {
          icon: "recycling",
          title: "Sanitation",
          description: "Remove and destroy infected plant debris at the end of the season to reduce fungal overwintering."
        }
      ],
      analyzing: "Analyzing image...",
      noImageSelected: "No image selected",
      analysisComplete: "Analysis Complete",
      diseaseDetected: "Disease Detected",
      healthyPlant: "Healthy Plant",
      confidence: "Confidence",
      recommendations: "Recommendations",
      prevention: "Prevention",
      tryAnother: "Try Another Image",
      sampleResults: {
        disease: "Leaf Spot Disease",
        confidence: "92%",
        severity: "Moderate",
        treatment: [
          "Remove affected leaves immediately",
          "Apply copper-based fungicide",
          "Improve air circulation around plants"
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
      title: "फसल रोग पहचान",
      subtitle: "प्रभावित पौधे की फोटो अपलोड करें या खींचें।",
      uploadPhoto: "फोटो अपलोड करें",
      takePhoto: "फोटो लें",
      results: "परिणाम",
      diagnosis: "निदान",
      earlyBlight: "अर्ली ब्लाइट",
      diagnosisText: "विश्लेषण से पता चलता है कि टमाटर और आलू को प्रभावित करने वाले एक सामान्य फंगल रोग अर्ली ब्लाइट की उच्च संभावना है। मुख्य संकेत पत्तियों पर काले, संकेंद्रित घाव हैं।",
      suggestedSolutions: "सुझाए गए समाधान",
      solutions: [
        {
          icon: "science",
          title: "फफूंदनाशक का उपयोग",
          description: "तांबे आधारित या क्लोरोथैलोनिल फफूंदनाशक लगाएं। आवेदन दर और समय के लिए उत्पाद लेबल का पालन करें।"
        },
        {
          icon: "eco",
          title: "सांस्कृतिक प्रथाएं",
          description: "पौधों को छाँटकर और उनके बीच उचित दूरी रखकर हवा के संचार में सुधार करें। गीली पत्तियों से बचने के लिए पौधे के आधार पर पानी दें।"
        },
        {
          icon: "recycling",
          title: "स्वच्छता",
          description: "फंगस को ओवरविन्टरिंग से रोकने के लिए मौसम के अंत में संक्रमित पौधे के अवशेषों को हटा दें और नष्ट कर दें।"
        }
      ],
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
    pa: {
      title: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
      subtitle: "ਪ੍ਰਭਾਵਿਤ ਪੌਦੇ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ ਜਾਂ ਖਿੱਚੋ।",
      uploadPhoto: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      takePhoto: "ਫੋਟੋ ਲਓ",
      results: "ਨਤੀਜੇ",
      diagnosis: "ਡਾਇਗਨੋਸਿਸ",
      earlyBlight: "ਅਰਲੀ ਬਲਾਈਟ",
      diagnosisText: "ਵਿਸ਼ਲੇਸ਼ਣ ਇਹ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਟਮਾਟਰ ਅਤੇ ਆਲੂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ ਵਾਲੇ ਇੱਕ ਆਮ ਫੰਗਲ ਰੋਗ ਅਰਲੀ ਬਲਾਈਟ ਦੀ ਉੱਚ ਸੰਭਾਵਨਾ ਹੈ। ਮੁੱਖ ਸੰਕੇਤ ਪੱਤੀਆਂ 'ਤੇ ਹਨੇਰੇ, ਕੇਂਦਰਿਤ ਘਾਉ ਹਨ।",
      suggestedSolutions: "ਸੁਝਾਏ ਗਏ ਹੱਲ",
      solutions: [
        {
          icon: "science",
          title: "ਫੰਗੀਸਾਈਡ ਐਪਲੀਕੇਸ਼ਨ",
          description: "ਤਾਂਬੇ-ਅਧਾਰਿਤ ਜਾਂ ਕਲੋਰੋਥੈਲੋਨਿਲ ਫੰਗੀਸਾਈਡ ਲਗਾਓ। ਐਪਲੀਕੇਸ਼ਨ ਦਰਾਂ ਅਤੇ ਸਮੇਂ ਲਈ ਉਤਪਾਦ ਲੇਬਲ ਦੀ ਪਾਲਣਾ ਕਰੋ।"
        },
        {
          icon: "eco",
          title: "ਸਭਿਆਚਾਰਕ ਅਭਿਆਸ",
          description: "ਪੌਦਿਆਂ ਨੂੰ ਕੱਟ ਕੇ ਅਤੇ ਉਹਨਾਂ ਵਿਚਕਾਰ ਥਾਂ ਛੱਡ ਕੇ ਹਵਾ ਦੇ ਪ੍ਰਵਾਹ ਵਿੱਚ ਸੁਧਾਰ ਕਰੋ। ਗਿੱਲੇ ਪੱਤਿਆਂ ਤੋਂ ਬਚਣ ਲਈ ਪੌਦੇ ਦੇ ਅਧਾਰ ਤੇ ਪਾਣੀ ਦਿਓ।"
        },
        {
          icon: "recycling",
          title: "ਸਫਾਈ",
          description: "ਫੰਗਲ ਦੇ ਓਵਰਵਿੰਟਰਿੰਗ ਨੂੰ ਘਟਾਉਣ ਲਈ ਸੀਜ਼ਨ ਦੇ ਅੰਤ ਵਿੱਚ ਲਾਗ ਵਾਲੇ ਪੌਦੇ ਦੇ ਮਲਬੇ ਨੂੰ ਹਟਾਓ ਅਤੇ ਨਸ਼ਟ ਕਰੋ।"
        }
      ],
      analyzing: "ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
      noImageSelected: "ਕੋਈ ਤਸਵੀਰ ਚੁਣੀ ਨਹੀਂ ਗਈ",
      analysisComplete: "ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਾ",
      diseaseDetected: "ਬਿਮਾਰੀ ਦਾ ਪਤਾ ਲੱਗਿਆ",
      healthyPlant: "ਸਿਹਤਮੰਦ ਪੌਧਾ",
      confidence: "ਭਰੋਸਾ",
      recommendations: "ਸਿਫਾਰਸ਼ਾਂ",
      prevention: "ਰੋਕਥਾਮ ਦੇ ਤਰੀਕੇ",
      tryAnother: "ਕੋਈ ਹੋਰ ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
      sampleResults: {
        disease: "ਪੱਤੇ ਦੇ ਧੱਬੇ ਦੀ ਬਿਮਾਰੀ",
        confidence: "92%",
        severity: "ਮੱਧਮ",
        treatment: [
          "ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ ਨੂੰ ਤੁਰੰਤ ਹਟਾਓ",
          "ਤਾਂਬੇ ਆਧਾਰਿਤ ਫੰਗੀਸਾਈਡ ਸਪ੍ਰੇ ਕਰੋ",
          "ਪੌਧਿਆਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਹਵਾ ਦਾ ਸੰਚਾਰ ਸੁਧਾਰੋ",
          "ਉੱਪਰੋਂ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ"
        ],
        prevention: [
          "ਬਿਮਾਰੀ ਪ੍ਰਤੀਰੋਧੀ ਕਿਸਮਾਂ ਲਗਾਓ",
          "ਪੌਧਿਆਂ ਵਿਚਕਾਰ ਸਹੀ ਦੂਰੀ ਬਣਾਈ ਰੱਖੋ",
          "ਮਿੱਟੀ ਦੇ ਪੱਧਰ 'ਤੇ ਪਾਣੀ ਦਿਓ, ਪੱਤਿਆਂ 'ਤੇ ਨਹੀਂ",
          "ਨਿਯਮਿਤ ਜਾਂਚ ਅਤੇ ਜਲਦੀ ਪਛਾਣ"
        ]
      }
    }
  };

  // Get translations for the current language, fallback to English
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        // Simulate analysis completion after a short delay
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisComplete(true);
        }, 2000);
      };
      reader.onerror = () => {
        setIsAnalyzing(false);
        alert('Error reading the file');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTakePhoto = useCallback(() => {
    console.log("Take photo functionality to be implemented");
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-slate-50">
      <div className="flex flex-col gap-6 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-50/80 p-4 pb-2 backdrop-blur-sm">
          <button 
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-green-950">{t.title}</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex flex-col gap-8 px-4">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
              <p className="text-green-950">{t.analyzing}</p>
            </div>
          ) : !analysisComplete ? (
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-center text-lg font-bold">Detect Plant Disease</h2>
                <p className="mb-6 text-center text-sm text-gray-500">{t.subtitle}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-500 p-4 text-green-600 transition-colors hover:bg-green-50"
                  >
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                    <span className="font-medium">{t.uploadPhoto}</span>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </button>
                  
                  <button 
                    onClick={handleTakePhoto}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-500 p-4 text-green-600 transition-colors hover:bg-green-50"
                  >
                    <span className="material-symbols-outlined text-3xl">photo_camera</span>
                    <span className="font-medium">{t.takePhoto}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {selectedImage && (
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="overflow-hidden rounded-xl">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded plant" 
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <div className="mb-6">
                      <h3 className="mb-3 text-xl font-semibold">{t.results}</h3>
                      <div className="rounded-xl bg-green-50 p-4">
                        <h4 className="text-sm font-medium uppercase tracking-wider text-green-600">{t.diagnosis}</h4>
                        <p className="mt-1 text-lg font-semibold text-green-950">{t.earlyBlight}</p>
                        <p className="mt-2 text-sm text-green-900">{t.diagnosisText}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-green-600">{t.suggestedSolutions}</h4>
                      <div className="space-y-3">
                        {t.solutions.map((solution: Solution, index: number) => (
                          <div key={index} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                              <span className="material-symbols-outlined text-blue-500">
                                {solution.icon}
                              </span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-green-900">{solution.title}</h5>
                              <p className="mt-1 text-sm text-green-800">{solution.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisComplete(false);
                      }}
                      className="w-full rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
                    >
                      {t.tryAnother}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 mt-auto bg-white/80 backdrop-blur-sm">
        <nav className="flex justify-around border-t border-green-100 px-4 py-2">
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="material-symbols-outlined">home</span>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="material-symbols-outlined">search</span>
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-xs">Scan</span>
          </button>
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="material-symbols-outlined">notifications</span>
            <span className="text-xs">Alerts</span>
          </button>
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default DiseaseDetection;