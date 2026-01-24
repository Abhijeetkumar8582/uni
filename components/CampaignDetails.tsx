
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Message: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Users: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Chart: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Send: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Zap: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
};

const CampaignDetails: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'recipients'>('analytics');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('jane.doe@university.edu');

  const recipients = [
    { name: 'Alex Rivera', email: 'arivera@gmail.com', status: 'Opened', time: '2h ago', interactions: 3 },
    { name: 'Sarah Parker', email: 'spark@yahoo.com', status: 'Clicked', time: '5h ago', interactions: 5 },
    { name: 'Liam Scott', email: 'lscott@outlook.com', status: 'Sent', time: '1d ago', interactions: 1 },
    { name: 'Maya Johnson', email: 'mjohn@me.com', status: 'Bounced', time: '2d ago', interactions: 0 },
    { name: 'James Wilson', email: 'jwilson@edu.org', status: 'Unsubscribed', time: '3d ago', interactions: 0 },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView('campaigns')} 
            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500"
          >
            <Icons.ArrowLeft />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Fall 2026 Welcome Series
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium border border-emerald-200">Active</span>
            </h1>
            <p className="text-xs text-slate-500">Multi-channel sequence • Started Oct 12, 2025</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsTestModalOpen(true)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50">Send Test</button>
          <button className="px-3 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs shadow-sm hover:bg-slate-800">Pause Sequence</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Recipients', val: '2,847', color: 'text-slate-900', trend: '↑ 12%', icon: <Icons.Users /> },
          { label: 'Delivered', val: '98.4%', color: 'text-emerald-600', trend: '↑ 0.4%', icon: <Icons.Check /> },
          { label: 'Open Rate', val: '48.2%', color: 'text-blue-600', trend: '↑ 5.2%', icon: <Icons.Eye /> },
          { label: 'Click Rate', val: '22.1%', color: 'text-violet-600', trend: '↑ 2.1%', icon: <Icons.Chart /> },
          { label: 'Conversions', val: '847', color: 'text-amber-600', trend: '↑ 18%', icon: <Icons.Zap /> },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
               <span className="p-1.5 bg-slate-50 rounded text-slate-500">{s.icon}</span>
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{s.trend}</span>
            </div>
            <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs & Content */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="px-6 border-b border-slate-200 flex gap-6">
          {['analytics', 'content', 'recipients'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-all ${
                activeTab === tab ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Chart Placeholder */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64 flex flex-col items-center justify-center text-slate-400">
                  <Icons.Chart />
                  <span className="mt-2 text-xs font-medium">Engagement Timeline Visualization</span>
                </div>
                
                {/* A/B Test Results */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-4">A/B Test Results: Subject Line</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">A</div>
                      <div className="flex-1">
                         <div className="text-xs text-slate-500 mb-1">"Welcome to the Golden Eagle Family!"</div>
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full" style={{ width: '42%' }}></div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-slate-900">42%</div>
                         <div className="text-[10px] text-slate-400">Open Rate</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">B</div>
                      <div className="flex-1">
                         <div className="text-xs text-slate-500 mb-1">"Your Acceptance Packet is Inside 📦"</div>
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full" style={{ width: '58%' }}></div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-emerald-600">58%</div>
                         <div className="text-[10px] text-slate-400">Winner</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-4">Device Breakdown</h4>
                  <div className="space-y-3">
                    {[{l:'Mobile', v:72, c:'bg-blue-500'}, {l:'Desktop', v:24, c:'bg-indigo-500'}, {l:'Tablet', v:4, c:'bg-slate-400'}].map(d => (
                      <div key={d.l}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">{d.l}</span>
                          <span className="font-bold">{d.v}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${d.c}`} style={{width: `${d.v}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recipients' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                 <div className="relative w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></span>
                    <input type="text" placeholder="Search recipients..." className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-100" />
                 </div>
                 <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Export List</button>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold text-slate-500 border-b border-slate-100">
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Engagement</th>
                    <th className="px-4 py-3 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recipients.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{r.name}</div>
                        <div className="text-xs text-slate-500">{r.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          r.status === 'Clicked' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          r.status === 'Opened' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-0.5">
                           {[...Array(5)].map((_, j) => (
                             <div key={j} className={`w-1.5 h-4 rounded-sm ${j < r.interactions ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                           ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-slate-500">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                  <div className="mb-4">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Subject Line</span>
                     <div className="text-lg font-bold text-slate-900">Welcome to the Golden Eagle Family, {"{{First Name}}"}! 🎉</div>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-6 border border-slate-100 text-sm text-slate-600 leading-relaxed font-sans">
                     <p className="mb-4">Hi {"{{First Name}}"},</p>
                     <p className="mb-4">Congratulations on your admission to University! We're absolutely thrilled to welcome you to our community of scholars, innovators, and future leaders.</p>
                     <p className="mb-6">Your official acceptance packet is on its way, but you can view your digital letter right now in the portal.</p>
                     <div className="text-center py-4">
                        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">View Acceptance</button>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                     <Icons.Zap /> AI Content Optimization
                  </h4>
                  <div className="space-y-4">
                     <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                        <strong>Insight:</strong> Variation B is performing 12% better with Gen-Z applicants due to the use of emojis in the subject line.
                     </div>
                     <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-500">Tone Analysis</div>
                        <div className="flex gap-2">
                           {['Excited', 'Welcoming', 'Urgent'].map(t => (
                              <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded border border-slate-200">{t}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Send Test Modal */}
      {isTestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Icons.Send />
                </div>
                <h3 className="text-lg font-bold text-slate-900 text-center mb-1">Send Test</h3>
                <p className="text-xs text-center text-slate-500 mb-6">Send a preview to your inbox to verify formatting.</p>
                <div className="space-y-3">
                   <input 
                    type="email" 
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                   />
                   <button onClick={() => { alert('Test sent!'); setIsTestModalOpen(false); }} className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg text-sm hover:bg-slate-800">Send Now</button>
                   <button onClick={() => setIsTestModalOpen(false)} className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
