
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  File: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Upload: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
  Settings: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Zap: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Link: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  ChevronRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Eye: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
};

interface ProcessedDoc {
  id: string;
  name: string;
  type: string;
  applicant: string;
  status: 'Verified' | 'Flagged' | 'Processing';
  confidence: number;
  extractedData: Record<string, string>;
}

interface Batch {
  id: string;
  source: string;
  status: 'Processing' | 'Reviewing' | 'Complete' | 'Failed';
  progress: number;
  color: string;
  count: number;
  trigger: string;
  timestamp: string;
  documents: ProcessedDoc[];
}

const DocProcessing: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeMainTab, setActiveMainTab] = useState<'batches' | 'workflows'>('batches');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  const batches: Batch[] = [
    { 
      id: 'BATCH-2026-0104-CA', 
      source: 'Common App Sync', 
      status: 'Processing', 
      progress: 67, 
      color: 'bg-blue-600', 
      count: 45, 
      trigger: 'Application Creation',
      timestamp: '10 mins ago',
      documents: [
        { id: 'D1', name: 'Transcript_Rivera.pdf', type: 'Transcript', applicant: 'Alex Rivera', status: 'Verified', confidence: 98, extractedData: { GPA: '3.92', School: 'Lincoln High', GradDate: '06/2026' } },
        { id: 'D2', name: 'Rec_Letter_Smith.pdf', type: 'Recommendation', applicant: 'Sarah Smith', status: 'Flagged', confidence: 62, extractedData: { Recommender: 'Mr. Jones', Role: 'Teacher', Sentiment: 'Positive' } },
        { id: 'D3', name: 'Essay_Personal.docx', type: 'Essay', applicant: 'Mike Chen', status: 'Processing', confidence: 0, extractedData: {} },
      ]
    },
    { 
      id: 'BATCH-2026-0104-EM', 
      source: 'Email Attachment Gateway', 
      status: 'Reviewing', 
      progress: 100, 
      color: 'bg-amber-500', 
      count: 12, 
      trigger: 'Missing Item Update',
      timestamp: '1 hour ago',
      documents: [
        { id: 'D4', name: 'Passport_Scan.jpg', type: 'ID Doc', applicant: 'Li Wei', status: 'Flagged', confidence: 45, extractedData: { Country: 'China', Expiry: '12/2028' } }
      ]
    },
    { 
      id: 'BATCH-2026-0103-SL', 
      source: 'Slate SFTP Drop', 
      status: 'Complete', 
      progress: 100, 
      color: 'bg-emerald-500', 
      count: 156, 
      trigger: 'Test Score Match',
      timestamp: 'Yesterday',
      documents: []
    },
  ];

  const automationRules = [
    { event: 'Transcript Verified', condition: 'GPA > 3.8 AND STEM_Focused = True', action: 'Tag: "Honors Candidate"', status: 'Active' },
    { event: 'Intl Passport Processed', condition: 'Region IN ("SE Asia", "Europe")', action: 'Trigger: "Global Welcome" SMS', status: 'Active' },
    { event: 'Financial Doc Ingested', condition: 'Type = "1040" OR Type = "W2"', action: 'Route to: FinAid Queue (High Priority)', status: 'Paused' },
    { event: 'Essay Sentiment Analysis', condition: 'Tone = "Negative" OR Risk_Flag = True', action: 'Alert: Human Review Required', status: 'Active' },
  ];

  const selectedBatch = batches.find(b => b.id === selectedBatchId);
  const selectedDoc = selectedBatch?.documents.find(d => d.id === selectedDocId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Application Intelligence</h1>
          <p className="text-sm text-slate-500">Automated processing of transcripts, essays, and supplementary materials.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2">
             <Icons.Settings /> Configuration
           </button>
           <button className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 text-sm">
             <Icons.Upload /> Manual Upload
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Review', val: '35', color: 'text-amber-600', sub: 'Requires Intervention', icon: <Icons.Alert /> },
          { label: 'Processed Today', val: '1,240', color: 'text-blue-600', sub: '98% Success Rate', icon: <Icons.CheckCircle /> },
          { label: 'Avg Extraction Time', val: '1.2s', color: 'text-slate-900', sub: 'Per Page', icon: <Icons.Zap /> },
          { label: 'Auto-Admit Flags', val: '12', color: 'text-emerald-600', sub: 'Qualified Candidates', icon: <Icons.Zap /> },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-slate-500">{kpi.label}</div>
                <div className="text-slate-400">{kpi.icon}</div>
             </div>
             <div>
                <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{kpi.sub}</div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => setActiveMainTab('batches')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeMainTab === 'batches' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
          >
            Processing Queue
          </button>
          <button 
            onClick={() => setActiveMainTab('workflows')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeMainTab === 'workflows' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
          >
            Logic Rules
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {activeMainTab === 'batches' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Batches Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-3">Batch ID / Source</th>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Trigger</th>
                      <th className="px-4 py-3">Volume</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {batches.map((b) => (
                      <tr 
                        key={b.id} 
                        onClick={() => { setSelectedBatchId(b.id); setSelectedDocId(null); }}
                        className={`cursor-pointer transition-colors ${selectedBatchId === b.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                      >
                        <td className="px-4 py-4">
                          <div className="font-medium text-slate-900">{b.id}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Icons.File /> {b.source}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-500 text-xs">{b.timestamp}</td>
                        <td className="px-4 py-4 w-48">
                          <div className="flex flex-col gap-1.5">
                             <div className="flex justify-between text-xs">
                                <span className={`font-medium ${b.status === 'Processing' ? 'text-blue-600' : b.status === 'Reviewing' ? 'text-amber-600' : 'text-emerald-600'}`}>{b.status}</span>
                                <span className="text-slate-500">{b.progress}%</span>
                             </div>
                             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className={`${b.color} h-full transition-all duration-500`} style={{width: `${b.progress}%`}}></div>
                             </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-slate-200 text-xs font-medium text-slate-600 bg-white">
                             <Icons.Link />
                             {b.trigger}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{b.count} files</td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-slate-400 hover:text-blue-600 font-bold px-2">
                             <Icons.ChevronRight />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300 space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-500">Define logic to fire campaigns based on extracted document data.</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                   <Icons.Zap /> Add Rule
                </button>
              </div>
              <div className="space-y-3">
                {automationRules.map((rule, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-200 rounded-lg flex items-center justify-between hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Icons.Zap /></div>
                       <div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-slate-900">{rule.event}</span>
                            <span className="text-slate-300">→</span>
                            <span className="font-medium text-blue-600">{rule.action}</span>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">Condition: {rule.condition}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${rule.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{rule.status}</span>
                       <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors"><Icons.Settings /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BATCH INSPECTOR DRAWER */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedBatchId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-5xl bg-white shadow-2xl flex animate-in slide-in-from-right duration-300">
              
              {/* Left Panel: File List */}
              <div className="w-96 border-r border-slate-200 flex flex-col bg-slate-50">
                 <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white">
                    <div>
                       <h3 className="text-sm font-bold text-slate-900">{selectedBatch.id}</h3>
                       <div className="text-xs text-slate-500">{selectedBatch.count} Documents • {selectedBatch.status}</div>
                    </div>
                    <button onClick={() => setSelectedBatchId(null)} className="text-slate-400 hover:text-slate-600"><Icons.Close /></button>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {selectedBatch.documents.map(doc => (
                       <div 
                         key={doc.id}
                         onClick={() => setSelectedDocId(doc.id)}
                         className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedDocId === doc.id ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'
                         }`}
                       >
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-xs font-bold text-slate-700 truncate w-40">{doc.name}</span>
                             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 
                                doc.status === 'Flagged' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                             }`}>{doc.status}</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <div className="text-[10px] text-slate-500">{doc.type} • {doc.applicant}</div>
                             <div className={`text-[10px] font-bold ${doc.confidence > 90 ? 'text-emerald-600' : doc.confidence > 50 ? 'text-amber-600' : 'text-slate-400'}`}>
                                {doc.confidence}% Conf.
                             </div>
                          </div>
                       </div>
                    ))}
                    {selectedBatch.documents.length === 0 && (
                       <div className="text-center py-10 text-slate-400 text-xs">No documents available in preview.</div>
                    )}
                 </div>
              </div>

              {/* Right Panel: Document Details */}
              <div className="flex-1 flex flex-col bg-white">
                 {selectedDoc ? (
                    <>
                       <div className="h-16 px-8 border-b border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                             <div>
                                <h2 className="text-sm font-bold text-slate-900">{selectedDoc.name}</h2>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                   <span>{selectedDoc.applicant}</span>
                                   <span>•</span>
                                   <span>ID: {selectedDoc.id}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="px-3 py-1.5 border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">View Original</button>
                             <button className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800">Reprocess</button>
                          </div>
                       </div>

                       <div className="flex-1 overflow-y-auto p-8">
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Extracted Metadata</h4>
                                <div className="space-y-4">
                                   {Object.entries(selectedDoc.extractedData).map(([key, val]) => (
                                      <div key={key} className="flex justify-between items-center group">
                                         <span className="text-sm text-slate-500 font-medium">{key}</span>
                                         <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-900">{val}</span>
                                            <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-blue-500"><Icons.Settings /></button>
                                         </div>
                                      </div>
                                   ))}
                                   {Object.keys(selectedDoc.extractedData).length === 0 && (
                                      <div className="text-sm text-slate-400 italic">Processing pending or failed...</div>
                                   )}
                                </div>
                             </div>

                             <div className="space-y-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Validation Logic</h4>
                                <div className="space-y-3">
                                   <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
                                      <Icons.CheckCircle />
                                      <div>
                                         <div className="font-bold">Formatting Check Passed</div>
                                         <div>Document resolution matches minimum requirements.</div>
                                      </div>
                                   </div>
                                   {selectedDoc.status === 'Flagged' && (
                                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                                         <Icons.Alert />
                                         <div>
                                            <div className="font-bold">Confidence Warning</div>
                                            <div>Some fields fell below the 80% certainty threshold.</div>
                                         </div>
                                      </div>
                                   )}
                                </div>
                             </div>
                          </div>
                       </div>
                    </>
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                       <div className="w-16 h-16 mb-4"><Icons.File /></div>
                       <p className="text-sm font-medium">Select a document to inspect details</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DocProcessing;
