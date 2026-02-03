
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppView, HotelData } from '../types.ts';

interface HotelierAssistantProps {
  currentView: AppView;
  hotelData?: HotelData;
}

interface MessageSource {
  title: string;
  uri: string;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
  sources?: MessageSource[];
}

export const HotelierAssistant: React.FC<HotelierAssistantProps> = ({ currentView, hotelData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Welcome to the Intelligence Hub. I am your Britrip Assistant. How can I optimize your portfolio today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the Britrip Hotelier Assistant, an expert in global hospitality data, revenue management, and property syndication.
        Context: The user is currently on the "${currentView}" page.
        ${hotelData ? `Active Property Data: ${JSON.stringify(hotelData)}` : ''}
        User Query: ${userMessage}
        
        Guidelines:
        - Be professional, concise, and institutional.
        - Provide high-yield advice (ADR optimization, description conversion).
        - Use terminology like "Syndication", "Conversion Rate", "Trade Zone", and "Market Index".
        - If query is about trends or market news, use Google Search grounding.
        - Keep responses under 150 words.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      const aiText = response.text || "I am processing your synchronization request. Please stand by.";
      
      const sources: MessageSource[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web) {
            sources.push({
              title: chunk.web.title || 'Source',
              uri: chunk.web.uri
            });
          }
        });
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: aiText,
        sources: sources.length > 0 ? sources : undefined
      }]);
    } catch (error) {
      console.error("Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Apologies, there was a disruption in the neural sync. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-6 w-[400px] h-[600px] glass-assistant rounded-[40px] shadow-4xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500 border border-white/20">
          <div className="p-8 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#dec52d] rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gold">
                <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-widest">Hotelier Intelligence</h3>
                <p className="text-[#dec52d] text-[10px] font-bold uppercase tracking-[0.2em]">Neural Sync Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5"></path></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[24px] text-xs leading-relaxed font-medium ${
                  m.role === 'user' 
                    ? 'bg-[#dec52d] text-slate-900 rounded-tr-none' 
                    : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none shadow-inner'
                }`}>
                  {m.text}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                    {m.sources.map((src, si) => (
                      <a 
                        key={si} 
                        href={src.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[9px] bg-slate-800 text-white/50 px-2 py-1 rounded-lg border border-white/5 hover:border-[#dec52d]/30 transition-all flex items-center"
                      >
                        <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.207 14.207L9.793 12.793L17.584 5H13V3H21Z"/></svg>
                        {src.title.length > 20 ? src.title.substring(0, 17) + '...' : src.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-[#dec52d] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#dec52d] rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-1.5 h-1.5 bg-[#dec52d] rounded-full animate-bounce animation-delay-400"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about market trends or data..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-white/30 text-xs font-bold outline-none focus:border-[#dec52d] transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#dec52d] hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
              </button>
            </div>
            <p className="text-[9px] text-white/20 mt-4 text-center font-black uppercase tracking-widest">Powered by Britrip AI Core 3.1</p>
          </div>
        </div>
      )}

      <div className="relative group">
        <div className="absolute inset-0 bg-[#dec52d]/20 rounded-full blur-2xl group-hover:bg-[#dec52d]/40 transition-all duration-700 animate-pulse"></div>
        <div className="absolute -inset-2 border border-[#dec52d]/20 rounded-full animate-rotate-slow"></div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-all duration-500 animate-float active:scale-90"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#dec52d]/0 via-[#dec52d]/10 to-[#dec52d]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className={`w-8 h-8 transition-all duration-500 ${isOpen ? 'text-white rotate-180' : 'text-[#dec52d]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            )}
          </svg>
          
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center animate-bounce">
            <span className="text-[8px] font-black text-white">1</span>
          </div>
        </button>
        
        {!isOpen && (
          <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-slate-950 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-2xl pointer-events-none translate-x-4 group-hover:translate-x-0 duration-500">
            Market Intelligence
          </div>
        )}
      </div>
    </div>
  );
};
