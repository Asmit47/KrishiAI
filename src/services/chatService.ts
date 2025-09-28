import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export const sendChatMessage = async (message: string, language: string = 'en') => {
  try {
    console.log('Sending message to Gemini API...');
    
    // For text-only input, use generateContent
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are a helpful farming assistant. Respond in ${language}. The user asked: ${message}`
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const response = await result.response;
    const text = response.text();
    console.log('API Response:', text);
    
    return text;
  } catch (error) {
    console.error('Error in sendChatMessage:', error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};

// For chat applications, you can use startChat for multi-turn conversations
export const startChat = async () => {
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello, I am a farmer. I need help with my crops.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Hello! I\'m your farming assistant. How can I help you with your crops today?' }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  
  return chat;
};
