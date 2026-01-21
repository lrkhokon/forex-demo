
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketAnalysis = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a daily forex market sentiment analysis. Include sections for 'Key Trends', 'Top Movers', and 'Expert Advice'. Keep it professional and concise for a financial portal.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            keyTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
            topMovers: { type: Type.ARRAY, items: { type: Type.STRING } },
            advice: { type: Type.STRING }
          },
          required: ["headline", "keyTrends", "topMovers", "advice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching market analysis:", error);
    return null;
  }
};

export const getPairAnalysis = async (symbol: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a technical and fundamental outlook for ${symbol}. Provide a 'Sentiment' (Bullish/Bearish), 'Key Level', and 'Trade Idea'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            keyLevel: { type: Type.STRING },
            tradeIdea: { type: Type.STRING }
          },
          required: ["sentiment", "keyLevel", "tradeIdea"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error(`Error analyzing ${symbol}:`, error);
    return null;
  }
};
