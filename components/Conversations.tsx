
import React, { useState } from 'react';
import { AppView, ChatHistoryEntry } from '../types';

// Professional SVG Icons
const Icons = {
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  User: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Message: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Clock: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Flag: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5-5H5a2 2 0 01-2 2z" /></svg>,
  Bot: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Activity: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
};

const Conversations: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [filter, setFilter] = useState<'all' | 'error' | 'auth'>('all');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const conversationPool: ChatHistoryEntry[] = [
    {
      id: 'CHAT-2026-X882',
      userId: 'USR-882',
      userName: 'Marcus Aurelius',
      isAnonymous: false,
      channel: 'Webchat',
      timestamp: 'Just now',
      lastMessage: 'I need my 1098-T tax form.',
      status: 'Active',
      summary: 'Authenticated student seeking tax documentation.',
      sentiment: 'Neutral',
      accuracyScore: 98,
      tags: ['Financial Aid', 'Auth'],
      isLive: true
    },
    {
      id: 'CHAT-2026-X883',
      userId: 'ANON-LEAD-4',
      userName: 'Anonymous Lead',
      isAnonymous: true,
      channel: 'WhatsApp',
      timestamp: '12m ago',
      lastMessage: 'What is the MBA deadline?',
      status: 'Resolved',
      summary: 'Anonymous prospect inquiring about grad deadlines.',
      sentiment: 'Positive',
      accuracyScore: 96,
      tags: ['Admissions', 'Prospect']
    },
    {
      id: 'CHAT-2026-X884',
      userId: 'USR-771',
      userName: 'Sarah Chen',
      isAnonymous: false,
      channel: 'SMS',
      timestamp: '1h ago',
      lastMessage: 'The application portal is down.',
      status: 'Error',
      summary: 'Critical system downtime reported via SMS node.',
      sentiment: 'Negative',
      accuracyScore: 42,
      errorCode: 'ERR_LOGIC_GAP',
      errorDetail: 'Knowledge base lacks "Portal Status" sub-routing.',
      tags: ['Tech Support', 'System Alert']
    },
    {
       id: 'CHAT-2026-X885',
       userId: 'USR-992',
       userName: 'David Miller',
       isAnonymous: false,
       channel: 'Webchat',
       timestamp: '2h ago',
       lastMessage: 'Where do I park for the game?',
       status: 'Resolved',
       summary: 'General inquiry regarding campus facilities.',
       sentiment: 'Neutral',
       accuracyScore: 99,
       tags: ['Campus Life']
    }
  ];

  const selectedChat = conversationPool.find(c => c.id === selectedChatId);

  // Simulated Chat Transcript
  const mockTranscript = [
    { role: 'user', text: "Hi, I'm trying to find where to download my 1098-T form for taxes.", time: '10:42 AM' },
    { role: 'assistant', text: "I can help with that. Are you a current student or an alum?", time: '10:42 AM' },
    { role: 'user', text: "Current student.", time: '10:43 AM' },
    { role: 'assistant', text: "Great. You can access your 1098-T form through the Student Financial Portal. Log in, go to 'My Finance', and select 'Tax Documents'. Would you like a direct link?", time: '10:43 AM' },
    { role: 'user', text: "Yes please, that would be helpful.", time: '10:44 AM' }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Interaction Intelligence</h1>
          <p className="text-sm text-slate-500">Real-time audit of AI conversations and intent resolution.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
             <Icons.Download /> Export CSV
           </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Active Sessions', val: '42', color: 'text-blue-600', trend: 'High Traffic' },
           { label: 'Avg Sentiment', val: '8.4/10', color: 'text-emerald-600', trend: 'Positive' },
           { label: 'Resolution Rate', val: '94.2%', color: 'text-indigo-600', trend: 'Steady' },
           { label: 'Escalations', val: '3', color: 'text-amber-600', trend: 'Action Req' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="flex justify-between items-end">
                 <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
                 <div className="text-[10px] font-bold bg-slate-50 px-2 py-1 rounded text-slate-500">{stat.trend}</div>
              </div>
           </div>
         ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2">
             <div className="flex bg-slate-100 p-1 rounded-lg">
                {['all', 'auth', 'error'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {f}
                  </button>
                ))}
             </div>
             <div className="h-8 w-px bg-slate-200 mx-2 self-center"></div>
             <select className="bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg px-3 outline-none hover:border-slate-300">
                <option>All Channels</option>
                <option>Webchat</option>
                <option>SMS</option>
                <option>WhatsApp</option>
             </select>
          </div>

          <div className="relative w-full md:w-80">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></div>
             <input 
               type="text" 
               placeholder="Search by ID, User, or Content..."
               className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
             />
          </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-100">
                <th className="px-6 py-4">User / Session</th>
                <th className="px-6 py-4">Context & Summary</th>
                <th className="px-6 py-4">Sentiment & Tags</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {conversationPool.map((chat) => (
                <tr 
                  key={chat.id} 
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`group cursor-pointer transition-colors ${selectedChatId === chat.id ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${
                           chat.isAnonymous ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-blue-100 text-blue-600 border-blue-200'
                       }`}>
                         {chat.isAnonymous ? <Icons.User /> : chat.userName.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <div className="flex items-center gap-2">
                             <span className="font-semibold text-slate-900">{chat.userName}</span>
                             {chat.isLive && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> LIVE
                                </span>
                             )}
                          </div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{chat.id}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${chat.accuracyScore > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {chat.accuracyScore}% Fidelity
                       </span>
                       <span className="text-xs text-slate-400">• {chat.timestamp}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-2 leading-relaxed">{chat.summary}</p>
                    {chat.errorCode && (
                       <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 w-fit">
                          <Icons.Alert /> {chat.errorCode}
                       </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                             chat.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                             chat.sentiment === 'Negative' ? 'bg-red-50 text-red-600 border-red-100' :
                             'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                             {chat.sentiment}
                          </span>
                          <span className="text-xs text-slate-400">{chat.channel}</span>
                       </div>
                       <div className="flex flex-wrap gap-1">
                          {chat.tags.map(t => (
                             <span key={t} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-500">{t}</span>
                          ))}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      className="text-slate-400 hover:text-blue-600 font-bold text-lg px-2"
                      onClick={(e) => { e.stopPropagation(); setSelectedChatId(chat.id); }}
                    >
                      →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- INSPECTOR DRAWER --- */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedChatId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-4xl bg-white shadow-2xl flex animate-in slide-in-from-right duration-300">
              
              {/* Left: Chat Transcript */}
              <div className="flex-1 flex flex-col border-r border-slate-200 bg-slate-50">
                 <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">
                          {selectedChat.isAnonymous ? <Icons.User /> : selectedChat.userName.slice(0, 2)}
                       </div>
                       <div>
                          <h3 className="text-sm font-bold text-slate-900">{selectedChat.userName}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                             <span>{selectedChat.channel}</span>
                             <span>•</span>
                             <span>{selectedChat.id}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><Icons.Flag /></button>
                       <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"><Icons.Download /></button>
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {mockTranscript.map((msg, i) => (
                       <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.role !== 'user' && <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs shrink-0"><Icons.Bot /></div>}
                          
                          <div className={`max-w-[75%] space-y-1 ${msg.role === 'user' ? 'items-end flex flex-col' : ''}`}>
                             <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                  ? 'bg-blue-600 text-white rounded-tr-none' 
                                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                             }`}>
                                {msg.text}
                             </div>
                             <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
                          </div>

                          {msg.role === 'user' && <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 text-xs shrink-0"><Icons.User /></div>}
                       </div>
                    ))}
                 </div>

                 <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex gap-2">
                       <input type="text" placeholder="Type an internal note..." className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-300" />
                       <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800">Add Note</button>
                    </div>
                 </div>
              </div>

              {/* Right: Intelligence Panel */}
              <div className="w-80 bg-white flex flex-col overflow-y-auto">
                 <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Analysis</h3>
                    <button onClick={() => setSelectedChatId(null)} className="text-slate-400 hover:text-slate-600"><Icons.Close /></button>
                 </div>

                 <div className="p-6 space-y-8">
                    {/* Sentiment */}
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sentiment Analysis</h4>
                       <div className="flex items-center gap-3">
                          <div className="text-3xl">🙂</div>
                          <div>
                             <div className="text-lg font-bold text-emerald-600">Positive (0.84)</div>
                             <div className="text-xs text-slate-500">Tone: Constructive</div>
                          </div>
                       </div>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="w-[84%] h-full bg-emerald-500"></div>
                       </div>
                    </div>

                    {/* Intent */}
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detected Intent</h4>
                       <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <div className="text-sm font-bold text-blue-900">Tax_Document_Request</div>
                          <div className="text-xs text-blue-600 mt-1">Confidence: 98.2%</div>
                       </div>
                    </div>

                    {/* Entities */}
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Extracted Entities</h4>
                       <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600 font-medium">Form: 1098-T</span>
                          <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600 font-medium">Role: Student</span>
                          <span className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600 font-medium">Topic: Finance</span>
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-slate-100 space-y-3">
                       <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                          <Icons.Alert /> Flag for Review
                       </button>
                       <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                          <Icons.CheckCircle /> Mark Resolved
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Conversations;
