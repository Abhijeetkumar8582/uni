
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  X: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  ChevronRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Alert: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
};

const HITLReview: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState('Yield Nurture - Honors Admit');

  const reviews = [
    { student: 'Emily Rodriguez', school: 'Lincoln High', issue: 'Scan Quality', date: '2h ago', level: 'high', gpa: '4.8' },
    { student: 'Marcus Chen', school: 'Washington Academy', issue: 'GPA Scale', date: '3h ago', level: 'med', gpa: '3.9' },
    { student: 'Aisha Patel', school: 'International Bacc.', issue: "Int'l Format", date: '4h ago', level: 'low', gpa: '4.0' },
  ];

  const handleProcess = () => {
    setIsConfirming(true);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('doc-processing')} 
            className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shadow-sm"
          >
            <Icons.ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Review Queue</h1>
            <p className="text-sm text-slate-500">Correct AI extraction confidence gaps and trigger downstream logic.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-2 pr-4 shadow-sm">
           <div className="w-10 h-10 rounded bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 font-bold text-lg">35</div>
           <div className="text-right">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">Pending</div>
              <div className="text-[10px] font-medium text-slate-400">Est. 1h 22m</div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        {/* Queue List */}
        <div className="divide-y divide-slate-100">
          {reviews.map((r, i) => (
            <div key={i} className="group">
              <div 
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                className={`p-4 flex items-center gap-6 cursor-pointer transition-colors ${expandedRow === i ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
              >
                <div className={`transition-transform text-slate-400 ${expandedRow === i ? 'rotate-90 text-blue-600' : ''}`}><Icons.ChevronRight /></div>
                
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">{r.student}</div>
                  <div className="text-xs text-slate-500 font-medium">{r.school}</div>
                </div>
                
                <div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                    r.level === 'high' ? 'bg-red-50 text-red-600 border-red-100' : 
                    r.level === 'med' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {r.issue}
                  </span>
                </div>
                
                <div className="text-xs text-slate-400 w-20 text-right">{r.date}</div>
              </div>

              {/* Detail Expansion */}
              {expandedRow === i && (
                <div className="border-t border-slate-100 bg-slate-50 p-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                    
                    {/* Left: Document Viewer */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden relative group/doc">
                       <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                             <Icons.FileText /> Transcript_Verified_2026.pdf
                          </div>
                          <div className="flex gap-2">
                             <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><Icons.Eye /></button>
                          </div>
                       </div>
                       
                       {/* Mock PDF Canvas */}
                       <div className="flex-1 bg-slate-800 p-8 flex items-center justify-center overflow-auto relative">
                          <div className="w-full max-w-[400px] aspect-[8.5/11] bg-white shadow-2xl relative opacity-90">
                             {/* Simulated PDF Content */}
                             <div className="absolute top-10 left-8 w-32 h-4 bg-slate-200 rounded"></div>
                             <div className="absolute top-20 left-8 right-8 h-px bg-slate-200"></div>
                             
                             {/* Highlight Overlay */}
                             <div className="absolute top-32 left-8 w-24 h-6 bg-amber-500/20 border border-amber-500 rounded cursor-help"></div>
                             <div className="absolute top-32 right-8 w-16 h-6 bg-blue-500/20 border border-blue-500 rounded"></div>

                             <div className="space-y-4 mt-24 px-8">
                                {[...Array(8)].map((_, j) => (
                                   <div key={j} className="flex gap-4">
                                      <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                                      <div className="h-2 w-1/4 bg-slate-100 rounded"></div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Right: Data Correction */}
                    <div className="flex flex-col gap-4 overflow-hidden">
                       <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 items-start">
                          <div className="text-amber-600 mt-0.5"><Icons.Alert /></div>
                          <div>
                             <h4 className="text-sm font-bold text-amber-900">Intelligence Conflict</h4>
                             <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                                System extracted GPA <span className="font-bold">{r.gpa}</span>, but detected a hand-written note about "Honors Weighting". Please verify.
                             </p>
                          </div>
                       </div>

                       <div className="bg-white border border-slate-200 rounded-lg flex-1 flex flex-col shadow-sm overflow-hidden">
                          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wide">
                             Extracted Fields
                          </div>
                          <div className="p-4 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
                             {[
                                { label: 'AP Calculus BC', val: '4.8', conf: 94 },
                                { label: 'AP English Lit', val: '4.5', conf: 92 },
                                { label: 'Honors Physics', val: '4.3', conf: 64, error: true },
                                { label: 'Adv. Comp Sci', val: '4.0', conf: 58, error: true },
                             ].map((field, idx) => (
                                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${field.error ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100'}`}>
                                   <div className="flex items-center gap-3">
                                      <div className={`w-1.5 h-1.5 rounded-full ${field.conf > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                                      <span className="text-sm font-medium text-slate-700">{field.label}</span>
                                   </div>
                                   <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase">{field.conf}% Conf.</span>
                                      <input 
                                         defaultValue={field.val} 
                                         className="w-16 text-center text-sm font-bold text-slate-900 border border-slate-200 rounded py-1 px-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                      />
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="bg-slate-900 rounded-xl p-5 text-white flex flex-col gap-4 shadow-lg">
                          <div>
                             <h4 className="text-sm font-bold mb-1">Post-Review Trigger</h4>
                             <p className="text-xs text-slate-400">Select the campaign to fire upon verification.</p>
                          </div>
                          <select 
                             value={activeWorkflow}
                             onChange={(e) => setActiveWorkflow(e.target.value)}
                             className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                          >
                             <option>Yield Nurture - Honors Admit</option>
                             <option>Yield Nurture - Regular Admit</option>
                             <option>Financial Aid - Follow-up</option>
                          </select>
                          <div className="flex gap-3 pt-2">
                             <button className="flex-1 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">Skip</button>
                             <button 
                               onClick={handleProcess}
                               className="flex-[2] py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50"
                             >
                                Verify & Fire Logic
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirming && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                 <Icons.Check />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verified</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                 Document data updated. The <strong className="text-slate-900">{activeWorkflow}</strong> campaign has been triggered for Emily Rodriguez.
              </p>
              <button 
                 onClick={() => { setIsConfirming(false); setExpandedRow(null); }}
                 className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg"
              >
                 Next Item
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default HITLReview;
