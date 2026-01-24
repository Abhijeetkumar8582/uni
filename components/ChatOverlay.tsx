
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatOverlayProps {
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your Unifuse AI Assistant. How can I help you manage your enrollment hub today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await sendMessageToGemini(newMessages);
    setMessages([...newMessages, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const suggestions = [
    "Show enrollment funnel",
    "View campaign performance",
    "Pending document review",
    "Latest AI resolution rate"
  ];

  return (
    <div className="fixed bottom-6 right-6 w-[480px] h-[640px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col z-[1000] overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-xl shadow-lg shadow-amber-100">⚡</div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight">AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all font-bold text-xl">×</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-amber-400 text-white'
            }`}>
              {m.role === 'user' ? 'JD' : '⚡'}
            </div>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">⚡</div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions & Input */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex flex-wrap gap-2 mb-6">
          {suggestions.map(s => (
            <button 
              key={s} 
              onClick={() => { setInput(s); }}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="relative">
          <textarea 
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask a follow-up question..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all resize-none placeholder:text-slate-400"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center disabled:opacity-50 disabled:shadow-none hover:scale-105 transition-transform"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatOverlay;
