
import { GoogleGenAI } from "@google/genai";
import { HotelData } from "../types.ts";

export const enhanceHotelDescription = async (data: Partial<HotelData>): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a luxury hospitality marketing expert. 
    Transform the following raw hotel data into a professional, high-converting description for a premium booking platform.
    
    Hotel Name: ${data.name}
    Address: ${data.address}
    Category: ${data.category}
    Amenities: ${data.amenities?.join(', ')}
    Base Notes: ${data.description || "A wonderful place to stay."}

    Focus on the unique atmosphere, the guest experience, and the benefits of the location. 
    Tone: Professional, inviting, and slightly sophisticated.
    Length: Approximately 100-150 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "Unable to enhance description at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error enhancing description. Please check your network or try again.";
  }
};
