
import React, { useState } from 'react';
import { AppView, Message } from '../types';

// Professional SVG Icons
const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Brain: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  Shield: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Signal: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  User: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Bot: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
};

const AgentDetails: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'persona' | 'security' | 'fidelity'>('persona');
  
  const history: Message[] = [
    { role: 'user', content: 'What are the scholarship deadlines for Fall 2026?', timestamp: '2:14 PM' },
    { role: 'assistant', content: 'The scholarship priority deadline for the Fall 2026 cycle is March 1st. You must have a completed application and FAFSA on file by this date.', timestamp: '2:14 PM', logicPath: 'KB_SCHOLAR_2026' },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('dashboard')} 
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm"
          >
             <Icons.ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Agent Configuration</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium text-slate-500">Target:</span>
              <span className="text-xs font-bold text-slate-700">Enrollment Bot</span>
              <div className="w-1 h-1 rounded-full bg-slate-300 mx-1"></div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
              </span>
            </div>
          </div>
        </div>
        <div>
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-sm transition-all flex items-center gap-2">
              <Icons.Check /> Synchronize Logic
           </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row flex-1 overflow-hidden min-h-[600px]">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
           <div className="p-4">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Settings</div>
             <nav className="space-y-1">
               {[
                 { id: 'persona', label: 'Identity Blueprint', icon: <Icons.Brain /> },
                 { id: 'security', label: 'Access Control', icon: <Icons.Shield /> },
                 { id: 'fidelity', label: 'Fidelity Audit', icon: <Icons.Signal /> },
               ].map(tab => (
                 <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                 >
                   {tab.icon}
                   {tab.label}
                 </button>
               ))}
             </nav>
           </div>
           
           <div className="mt-auto p-4 border-t border-slate-200">
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">Status</div>
                  <div className="flex justify-between items-center text-xs mb-1">
                     <span className="font-medium text-slate-900">Live Traffic</span>
                     <span className="flex items-center gap-1 text-emerald-600 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-medium text-slate-900">KB Sync</span>
                     <span className="text-slate-500">2h ago</span>
                  </div>
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {activeTab === 'persona' && (
            <div className="p-8 max-w-3xl space-y-8 animate-in fade-in duration-300">
               <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Identity Blueprint</h2>
                  <p className="text-sm text-slate-500">Define the core personality, tone, and behavioral logic of the Enrollment Bot.</p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">System Instructions</label>
                    <textarea 
                      className="w-full min-h-[200px] p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 leading-relaxed outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm resize-y font-mono"
                      defaultValue="You are the Enrollment Expert for Unifuse University. Be professional, supportive, and focus on conversion milestones (Application, FAFSA, Deposit). Always prioritize official academic deadlines."
                    ></textarea>
                    <p className="text-xs text-slate-400">These instructions act as the base prompt for all interactions.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Voice Profile</label>
                        <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100">
                           <option>Professional & Academic</option>
                           <option>Supportive & Encouraging</option>
                           <option>Direct & Efficient</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fallback Route</label>
                        <select className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100">
                           <option>Handoff to Admissions Staff</option>
                           <option>Escalate to Support Ticket</option>
                           <option>Self-Service Redirect</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-8 max-w-3xl space-y-8 animate-in fade-in duration-300">
               <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Access Control (RBAC)</h2>
                  <p className="text-sm text-slate-500">Configure who can interact with this bot and required authentication levels.</p>
               </div>

               <div className="space-y-8">
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                     <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Allowed Audiences</h3>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add Audience</button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {['Public (Web)', 'Prospective Leads', 'Admissions Staff'].map(role => (
                          <div key={role} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 shadow-sm">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                             <span className="text-xs font-medium text-slate-700">{role}</span>
                             <button className="text-slate-300 hover:text-red-500 ml-1">×</button>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-900">Authentication Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['None (Public)', 'SSO (SAML)', 'SMS OTP', 'Magic Link'].map(method => (
                            <div key={method} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${method === 'None (Public)' ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                              <span className={`text-sm font-medium ${method === 'None (Public)' ? 'text-blue-700' : 'text-slate-700'}`}>{method}</span>
                              {method === 'None (Public)' && <div className="text-blue-600"><Icons.Check /></div>}
                            </div>
                          ))}
                      </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'fidelity' && (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
               <div className="p-8 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Fidelity Audit (Maker-Checker)</h2>
                  <p className="text-sm text-slate-500">Verify neural accuracy and flag hallucinations in real-time history.</p>
               </div>
               <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                  {history.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.role !== 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Icons.Bot /></div>
                       )}
                       
                       <div className={`max-w-[70%] space-y-2`}>
                          <div className={`flex items-baseline gap-2 text-xs text-slate-400 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                             <span className="font-bold">{msg.role === 'user' ? 'Student' : 'Enrollment Bot'}</span>
                             <span>{msg.timestamp}</span>
                          </div>
                          
                          <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                             msg.role === 'user' 
                               ? 'bg-blue-600 text-white rounded-tr-none' 
                               : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                          }`}>
                             {msg.content}
                          </div>

                          {msg.role !== 'user' && (
                             <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-2">
                                   <span className="font-bold text-slate-500">Logic:</span>
                                   <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono text-[10px]">{msg.logicPath}</code>
                                </div>
                                <div className="flex gap-2">
                                   <button className="text-red-500 hover:underline font-medium">Flag Gap</button>
                                   <button className="text-emerald-600 hover:underline font-medium">Verify</button>
                                </div>
                             </div>
                          )}
                       </div>

                       {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Icons.User /></div>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
