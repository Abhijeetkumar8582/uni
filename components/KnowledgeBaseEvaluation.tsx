
import React, { useState } from 'react';
import { AppView } from '../types';

const KnowledgeBaseEvaluation: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [isEvaluating, setIsEvaluating] = useState(false);

  const runEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => setIsEvaluating(false), 2000);
  };

  const intentBuckets = [
    { name: 'Policy & Admissions', accuracy: 98.4, volume: '2,421', status: 'Stable', action: 'Direct Answer' },
    { name: 'Financial Aid (Pell/FAFSA)', accuracy: 89.2, volume: '1,892', status: 'Requires Logic Sync', action: 'CRM Trigger' },
    { name: 'Institutional Scholarships', accuracy: 94.7, volume: '842', status: 'Stable', action: 'Doc Verification' },
    { name: 'International Transfers', accuracy: 72.4, volume: '432', status: 'Criticial Gap', action: 'Human Escalate' },
  ];

  const outcomes = [
    { label: 'AI Resolved', val: '87.3%', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: '✅' },
    { label: 'Action Executed', val: '8.4%', color: 'text-blue-500', bg: 'bg-blue-50', icon: '⚡' },
    { label: 'Human Handoff', val: '4.3%', color: 'text-amber-500', bg: 'bg-amber-50', icon: '👤' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Fidelity Dashboard</h1>
          <p className="text-slate-500 text-lg font-medium mt-1">Institutional measure of AI accuracy and agent handle actions.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={runEvaluation}
            disabled={isEvaluating}
            className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 ${
              isEvaluating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isEvaluating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Auditing Neural Paths...
              </>
            ) : 'Run Full Neural Sweep ➔'}
          </button>
        </div>
      </div>

      {/* Accuracy Distribution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {outcomes.map((o, i) => (
           <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm group hover:shadow-2xl transition-all">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-[1.25rem] ${o.bg} ${o.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner`}>{o.icon}</div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Platform Outcome</div>
              </div>
              <div className="text-5xl font-black text-slate-900 tracking-tighter mb-1">{o.val}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{o.label}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Intent Bucket Tracking */}
        <div className="bg-white rounded-[3.5rem] border border-slate-200 p-12 shadow-sm">
           <div className="flex justify-between items-center mb-12">
              <div>
                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Fidelity by Intent Bucket</h3>
                 <p className="text-[11px] font-bold text-slate-400 mt-1">Accuracy scores segmented by institutional domain logic.</p>
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Samples: 5.5k+</span>
           </div>
           
           <div className="space-y-10">
              {intentBuckets.map((bucket, i) => (
                <div key={i} className="group">
                   <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{bucket.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{bucket.volume} Conversations • <span className="text-blue-500">{bucket.action}</span></div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${bucket.accuracy > 90 ? 'text-emerald-500' : bucket.accuracy > 80 ? 'text-amber-500' : 'text-red-500'} tracking-tighter`}>{bucket.accuracy}%</div>
                        <div className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${bucket.status.includes('Gap') ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>{bucket.status}</div>
                      </div>
                   </div>
                   <div className="w-full bg-slate-50 h-3.5 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ${bucket.accuracy > 90 ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : bucket.accuracy > 80 ? 'bg-amber-500' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'}`}
                        style={{ width: `${bucket.accuracy}%` }}
                      ></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Hallucination Monitoring & Logic Logs */}
        <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col border border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
          <div className="relative z-10 h-full flex flex-col">
             <div className="flex items-center justify-between mb-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Institutional Guardrails</h4>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Shield Active</span>
                </div>
             </div>

             <div className="flex-1 space-y-12">
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between group hover:bg-white/10 transition-all">
                   <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Low Confidence Suppressions</div>
                      <div className="text-3xl font-black text-white">0.02%</div>
                   </div>
                   <div className="w-px h-12 bg-white/10"></div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Blocked Generative Attempts</div>
                      <div className="text-3xl font-black text-blue-400">14</div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Identified Logic Gaps (Sync Required)</h5>
                   <div className="space-y-4">
                      {[
                        { query: 'International housing waivers 2026', hits: 42, impact: 'High', color: 'bg-red-500/20 text-red-400' },
                        { query: 'Veteran scholarship renewal timeline', hits: 21, impact: 'Medium', color: 'bg-amber-500/20 text-amber-400' },
                        { query: 'Late FAFSA penalty logic', hits: 18, impact: 'High', color: 'bg-red-500/20 text-red-400' },
                      ].map((gap, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer p-4 hover:bg-white/5 rounded-2xl transition-all">
                           <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">"{gap.query}"</div>
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] font-bold text-slate-500">{gap.hits} REQUESTS</span>
                              <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${gap.color}`}>{gap.impact}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <button 
               onClick={() => setView('kb-manage')}
               className="mt-12 w-full py-5 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl text-[10px] uppercase tracking-[0.3em] shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
             >
                Deep-Sync Logic Nexus ➔
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseEvaluation;
