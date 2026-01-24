
import React, { useState } from 'react';
import { AppView } from '../types';

const KnowledgeBaseTrain: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [tone, setTone] = useState('Professional');
  const [isSaving, setIsSaving] = useState(false);
  const [diversity, setDiversity] = useState(60);
  const [routingPolicy, setRoutingPolicy] = useState('Most Relevant');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Simulate Sync
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('enrollment-hub')} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">←</button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Train & Fine-Tune</h1>
            <p className="text-slate-500">Customize AI personality and routing logic based on institutional metadata.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">Export Weights</button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            {isSaving ? 'Training...' : 'Synchronize Model'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm divide-y divide-slate-100">
            <div className="p-10">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">🎭</span>
                Voice & Persona Tuning
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { id: 'Professional', label: 'Academic & Formal', icon: '👔', desc: 'Best for Registrar & Policy info' },
                   { id: 'Friendly', label: 'Encouraging', icon: '😊', desc: 'Optimized for Student Success' },
                   { id: 'Direct', label: 'Objective', icon: '🎯', desc: 'High accuracy, low word count' },
                   { id: 'Casual', label: 'Youthful', icon: '🕶️', desc: 'Engagement focus (Gen-Z)' }
                 ].map((t) => (
                   <div 
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                      tone === t.id ? 'bg-blue-50 border-blue-600 shadow-lg shadow-blue-50' : 'bg-white border-slate-50 hover:border-slate-200'
                    }`}
                   >
                     <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl">{t.icon}</span>
                        <span className="font-bold text-slate-900 text-sm">{t.label}</span>
                     </div>
                     <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{t.desc}</p>
                   </div>
                 ))}
              </div>
            </div>

            <div className="p-10">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">🔀</span>
                Logic Based Routing
              </h3>
              <div className="space-y-8">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <label className="text-sm font-bold text-slate-700">Retrieval Diversity Weight</label>
                     <span className="px-3 py-1 bg-slate-100 rounded-lg font-bold text-[10px] text-slate-600">{diversity}% Confidence</span>
                   </div>
                   <input 
                    type="range" 
                    value={diversity}
                    onChange={(e) => setDiversity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" 
                   />
                   <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                     <span>Factual Precision</span>
                     <span>Creative Synthesis</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Most Relevant', label: 'Prioritize Meta-Tags', desc: 'Strictly follow RBAC & Tags' },
                    { id: 'Most Recent', label: 'Recency Weighting', desc: 'Favor newest sync dates' },
                  ].map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setRoutingPolicy(p.id)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        routingPolicy === p.id ? 'bg-violet-50 border-violet-600' : 'bg-white border-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-slate-900 text-xs mb-1">{p.label}</div>
                      <div className="text-[9px] text-slate-400 font-medium">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mb-16 blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
             <h4 className="font-bold text-lg mb-6 flex justify-between items-center">
               Logic Simulator
               <span className="px-2 py-1 bg-white/10 rounded text-[9px] font-black uppercase tracking-tighter">Live Preview</span>
             </h4>
             <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1">Mock User Role</div>
                  <div className="flex gap-2">
                    {['Public', 'Staff'].map(r => (
                      <span key={r} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold">{r}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Retrieved Content Path</div>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold mb-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    DOC ID: #2026-ADM (FALL)
                  </div>
                  <div className="text-[9px] text-slate-400 italic">Score: 0.98 (Routing: Admission Hub)</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] leading-relaxed text-slate-300">
                  <span className="text-slate-500 block mb-2 font-bold uppercase tracking-tighter">Generated Response ({tone})</span>
                  {tone === 'Professional' && "The Fall 2026 application deadline for domestic transfers is March 1st. Please submit your transcript via Slate for review."}
                  {tone === 'Friendly' && "Hey! Just wanted to let you know the Fall 2026 transfer deadline is March 1st. Can't wait to see your application! 😊"}
                  {tone === 'Direct' && "Deadline: March 1, 2026. Required: Transfer Transcript (Slate)."}
                  {tone === 'Casual' && "Yo! March 1st is the big day for Fall 2026 transfers. Get those apps in! 🚀"}
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
             <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><span>🏷️</span> Active Routing Tags</h4>
             <div className="space-y-3">
                {[
                  { tag: 'Department: Finance', priority: 'High', color: 'text-emerald-500' },
                  { tag: 'Role: Admissions', priority: 'High', color: 'text-blue-500' },
                  { tag: 'Region: Domestic', priority: 'Med', color: 'text-amber-500' },
                  { tag: 'Term: Fall 2026', priority: 'Med', color: 'text-violet-500' },
                ].map((tag, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">{tag.tag}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${tag.color.replace('text', 'bg')}/10 ${tag.color}`}>{tag.priority}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 transition-all">Add Routing Override</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseTrain;
