
import React, { useState } from 'react';
import { AppView } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// Professional SVG Icons
const Icons = {
  ArrowLeft: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Sparkles: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  Mail: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Message: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  UserGroup: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Layout: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  Code: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  Template: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Pencil: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
};

export interface TargetAudienceContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: string;
}

const defaultTargetAudience: TargetAudienceContact[] = [
  { id: '1', name: 'John Mark', email: 'John@unifuse.ai', phone: '+918582821457', segment: 'Admitted Students' },
  { id: '2', name: 'Deepesh Reddy', email: 'Deepesh.reddy@unifuse.ai', phone: '+918884773773', segment: 'Admitted Students' },
];

function audienceToSegment(audience: string): string {
  return audience.replace(/\s*\([^)]*\)\s*$/, '').trim() || audience;
}

interface CampaignCreateProps {
  setView: (v: AppView) => void;
  onAddCampaign: (campaign: { name: string; channels: ('Email' | 'SMS' | 'Voice' | 'WhatsApp')[]; status: 'Active' | 'Scheduled' | 'Draft' | 'Completed' | 'Paused'; audience: string; audienceSize: number; engagement: number; lastUpdated: string }) => void;
}

const CampaignCreate: React.FC<CampaignCreateProps> = ({ setView, onAddCampaign }) => {
  // Navigation State
  const [step, setStep] = useState(1);
  const [creationPath, setCreationPath] = useState<'ai' | 'template' | 'manual' | null>(null);

  // Step 1: Context State
  const [name, setName] = useState('');
  const [audience, setAudience] = useState('Admitted Students (Domestic)');
  const [goal, setGoal] = useState('Yield (Deposit)');
  const [contextNotes, setContextNotes] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Email']);
  const [targetAudienceContacts, setTargetAudienceContacts] = useState<TargetAudienceContact[]>(defaultTargetAudience);

  // Step 2: Content State
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [editingPhoneId, setEditingPhoneId] = useState<string | null>(null);
  const [editingPhoneValue, setEditingPhoneValue] = useState('');

  // Mock Templates
  const templates = [
    { id: 't1', name: 'Dean\'s Welcome Letter', category: 'Yield', preview: 'Formal welcome from college leadership highlighting academic prestige.' },
    { id: 't2', name: 'Financial Aid Reminder', category: 'Retention', preview: 'Urgent nudge to complete FAFSA verification steps.' },
    { id: 't3', name: 'Campus Life Teaser', category: 'Engagement', preview: 'Visual-heavy showcase of student clubs and dorm life.' },
    { id: 't4', name: 'Deposit Deadline Warning', category: 'Yield', preview: 'Direct, action-oriented reminder 3 days before deadline.' },
  ];

  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    try {
      const fullPrompt = `
        Act as an expert higher education copywriter.
        Create a multi-channel campaign (Channels: ${selectedChannels.join(', ')}).
        
        Context:
        - Audience: ${audience}
        - Business Goal: ${goal}
        - Additional Context: ${contextNotes}
        - User Specific Instructions: ${aiPrompt}

        Output Requirements:
        - Subject Line (if Email)
        - Body Copy (Use placeholders like {{FirstName}})
        - Tone: Persuasive, Professional, yet Warm.
      `;
      
      const result = await sendMessageToGemini([{ role: 'user', content: fullPrompt }]);
      setGeneratedCopy(result);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert('Failed to generate AI content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (t: typeof templates[0]) => {
    setSelectedTemplateId(t.id);
    setGeneratedCopy(`[TEMPLATE: ${t.name}]\n\nSubject: Welcome to the Community, {{FirstName}}!\n\nWe are thrilled to offer you admission to the Class of 2028... [Template Content Loaded]`);
    // In a real app, this would load actual content
  };

  const toggleChannel = (c: string) => {
    if (selectedChannels.includes(c)) {
      setSelectedChannels(selectedChannels.filter(ch => ch !== c));
    } else {
      setSelectedChannels([...selectedChannels, c]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('campaigns')} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
           <Icons.ArrowLeft />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Campaign Orchestrator</h1>
           <p className="text-sm text-slate-500">Design automated engagement workflows.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center justify-center gap-8">
        {[
          { s: 1, label: 'Strategy & Context' },
          { s: 2, label: 'Content Engine' },
          { s: 3, label: 'Review & Launch' },
        ].map((item, idx) => (
          <div key={item.s} className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
               step === item.s ? 'bg-slate-900 text-white' : 
               step > item.s ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
             }`}>
               {step > item.s ? <Icons.Check /> : item.s}
             </div>
             <span className={`text-xs font-bold uppercase tracking-wide ${step === item.s ? 'text-slate-900' : 'text-slate-400'}`}>{item.label}</span>
             {idx < 2 && <div className="w-12 h-px bg-slate-200 mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Main Form Area */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-8 relative overflow-hidden flex flex-col">
        
        {/* --- STEP 1: STRATEGY & CONTEXT --- */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Campaign Name</label>
                   <input 
                     type="text" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="e.g. Fall 2026 Yield Nurture"
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100"
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Target Audience</label>
                   <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.UserGroup /></div>
                      <select 
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 appearance-none"
                      >
                         <option>Admitted Students (Domestic)</option>
                         <option>International Prospects</option>
                         <option>Transfer Students</option>
                         <option>Lapsed Financial Aid Applicants</option>
                         <option>Alumni - Last Gift &gt; 2 Years</option>
                      </select>
                   </div>
                </div>
             </div>

             {/* Target Audience table — segment name comes from dropdown above */}
             <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Target Audience — Contacts</label>
                <p className="text-xs text-slate-400">SMS will be sent to all contacts whose Segment matches the selected Target Audience when you launch.</p>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">Name</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">Email</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">Phone</th>
                        <th className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide">Segment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {targetAudienceContacts.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                          <td className="px-4 py-3 text-slate-600">{c.email}</td>
                          <td className="px-4 py-3 text-slate-600">
                            {editingPhoneId === c.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="tel"
                                  value={editingPhoneValue}
                                  onChange={(e) => setEditingPhoneValue(e.target.value)}
                                  className="w-36 px-2 py-1.5 text-sm border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                                  placeholder="+1 234 567 8900"
                                  autoFocus
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTargetAudienceContacts(prev =>
                                      prev.map(contact =>
                                        contact.id === c.id ? { ...contact, phone: editingPhoneValue.trim() || contact.phone } : contact
                                      )
                                    );
                                    setEditingPhoneId(null);
                                    setEditingPhoneValue('');
                                  }}
                                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                                  title="Save"
                                >
                                  <Icons.Check />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPhoneId(null);
                                    setEditingPhoneValue('');
                                  }}
                                  className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                                  title="Cancel"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-2">
                                {c.phone}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPhoneId(c.id);
                                    setEditingPhoneValue(c.phone);
                                  }}
                                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit phone number"
                                >
                                  <Icons.Pencil />
                                </button>
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                              <Icons.UserGroup />
                              {c.segment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Primary Goal</label>
                   <select 
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100"
                   >
                      <option>Yield (Deposit)</option>
                      <option>Application Completion</option>
                      <option>Event Registration</option>
                      <option>Donation / Fundraising</option>
                      <option>Retention / Re-enrollment</option>
                   </select>
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Channel Mix</label>
                   <div className="flex gap-4">
                      {['Email', 'SMS', 'WhatsApp'].map(ch => (
                         <button 
                           key={ch}
                           onClick={() => toggleChannel(ch)}
                           className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-2 transition-all ${
                             selectedChannels.includes(ch) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                           }`}
                         >
                            {selectedChannels.includes(ch) && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                            {ch}
                         </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Key Context / Notes</label>
                <textarea 
                  value={contextNotes}
                  onChange={(e) => setContextNotes(e.target.value)}
                  placeholder="e.g. Deadline extended to May 15th. Mention the new scholarship fund available for STEM majors."
                  className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                />
                <p className="text-xs text-slate-400">This context will be used to guide the AI or fill template variables.</p>
             </div>
          </div>
        )}

        {/* --- STEP 2: CONTENT ENGINE --- */}
        {step === 2 && !creationPath && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-center">
              <h2 className="text-xl font-bold text-slate-900 text-center mb-8">Choose Creation Engine</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* AI Path */}
                 <div 
                   onClick={() => setCreationPath('ai')}
                   className="p-8 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:shadow-xl cursor-pointer transition-all group bg-white hover:bg-indigo-50/10 text-center"
                 >
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                       <Icons.Sparkles />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">AI Architect</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Generative creation based on your strategy and audience context. Best for unique campaigns.</p>
                 </div>

                 {/* Template Path */}
                 <div 
                   onClick={() => setCreationPath('template')}
                   className="p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl cursor-pointer transition-all group bg-white hover:bg-blue-50/10 text-center"
                 >
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                       <Icons.Template />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Template Library</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Select from pre-approved, high-performing institutional templates.</p>
                 </div>

                 {/* Manual / Import Path */}
                 <div 
                   onClick={() => setCreationPath('manual')}
                   className="p-8 rounded-2xl border-2 border-slate-100 hover:border-slate-400 hover:shadow-xl cursor-pointer transition-all group bg-white hover:bg-slate-50 text-center"
                 >
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                       <Icons.Code />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Manual / 3rd Party</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Import HTML code or connect a third-party builder (e.g., Salesforce).</p>
                 </div>
              </div>
           </div>
        )}

        {step === 2 && creationPath === 'ai' && (
           <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <button onClick={() => setCreationPath(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">Back</button>
                 <div className="h-4 w-px bg-slate-300"></div>
                 <div className="flex items-center gap-2 text-indigo-600 font-bold">
                    <Icons.Sparkles /> AI Architect
                 </div>
              </div>
              
              <div className="flex-1 bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
                 <label className="text-xs font-bold text-indigo-800 uppercase tracking-wide block mb-3">Refine Instructions</label>
                 <textarea 
                   value={aiPrompt}
                   onChange={(e) => setAiPrompt(e.target.value)}
                   placeholder={`Provide specific instructions for the AI...\n\nDefault Context Applied:\n- Audience: ${audience}\n- Goal: ${goal}\n- Notes: ${contextNotes || 'None'}`}
                   className="w-full h-48 p-4 bg-white border border-indigo-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none font-medium text-slate-700"
                 />
                 <div className="flex justify-end mt-4">
                    <button 
                      onClick={handleGenerateCopy}
                      disabled={isGenerating}
                      className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                       {isGenerating ? <><Icons.Refresh /> Architecting...</> : <><Icons.Sparkles /> Generate Content</>}
                    </button>
                 </div>
              </div>
           </div>
        )}

        {step === 2 && creationPath === 'template' && (
           <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <button onClick={() => setCreationPath(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">Back</button>
                 <div className="h-4 w-px bg-slate-300"></div>
                 <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <Icons.Template /> Template Library
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 overflow-y-auto p-1">
                 {templates.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => handleTemplateSelect(t)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${
                         selectedTemplateId === t.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-1 rounded text-slate-500 uppercase tracking-wide">{t.category}</span>
                       </div>
                       <h4 className="font-bold text-slate-900 mb-1">{t.name}</h4>
                       <p className="text-xs text-slate-500 line-clamp-2">{t.preview}</p>
                    </div>
                 ))}
              </div>
              
              <div className="mt-auto pt-4 flex justify-end">
                 <button 
                   disabled={!selectedTemplateId}
                   onClick={() => setStep(3)}
                   className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all"
                 >
                    Use Template
                 </button>
              </div>
           </div>
        )}

        {step === 2 && creationPath === 'manual' && (
           <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                 <button onClick={() => setCreationPath(null)} className="text-sm font-bold text-slate-400 hover:text-slate-600">Back</button>
                 <div className="h-4 w-px bg-slate-300"></div>
                 <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <Icons.Code /> Manual / Import
                 </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 gap-4">
                 <div className="text-slate-400"><Icons.Code /></div>
                 <p className="text-sm font-medium text-slate-500">Paste HTML code or import from URL</p>
                 <button className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100">
                    Open Editor
                 </button>
              </div>
           </div>
        )}

        {/* --- STEP 3: REVIEW & LAUNCH --- */}
        {step === 3 && (
           <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                 <div>
                    <h3 className="text-lg font-bold text-slate-900">Review Content</h3>
                    <p className="text-xs text-slate-500">Verify generated copy before activation.</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500">Desktop</span>
                    <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-400">Mobile</span>
                 </div>
              </div>

              <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-6 overflow-y-auto whitespace-pre-wrap text-sm text-slate-700 font-medium leading-relaxed font-mono">
                 {generatedCopy || "Content generation failed. Please try again."}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Pre-Flight Checklist</h4>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                       <Icons.Check /> Audience Defined
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                       <Icons.Check /> Content Validated
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                       <Icons.Check /> FERPA Compliant
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between">
           <button 
             onClick={() => step > 1 ? setStep(step - 1) : setView('campaigns')}
             className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
           >
              Back
           </button>
           {step === 1 && (
              <button 
                onClick={() => {
                   if(!name) { alert('Please name your campaign'); return; }
                   setStep(2);
                }}
                className="px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-sm"
              >
                 Next Step
              </button>
           )}
           {step === 3 && (
              <button 
                disabled={isLaunching}
                onClick={async () => {
                  setIsLaunching(true);
                  try {
                    const smsBody = generatedCopy
                      ? generatedCopy.replace(/\s+/g, ' ').trim().slice(0, 160) || undefined
                      : undefined;
                    const segment = audienceToSegment(audience);
                    const matchingContacts = targetAudienceContacts.filter(
                      c => c.segment.trim().toLowerCase() === segment.trim().toLowerCase()
                    );
                    const toNumbers = matchingContacts.map(c => c.phone).filter(Boolean);
                    const payload: { body?: string; to?: string[] } = smsBody != null ? { body: smsBody } : {};
                    if (toNumbers.length > 0) {
                      payload.to = toNumbers;
                    }
                    const res = await fetch('/api/send-sms', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });
                    const text = await res.text();
                    let data: { ok?: boolean; sent?: number; error?: string; results?: { to: string; error?: string }[] } = {};
                    if (text) {
                      try {
                        data = JSON.parse(text);
                      } catch {
                        data = { ok: false, error: 'Invalid response from server' };
                      }
                    } else {
                      data = { ok: false, error: res.ok ? 'Empty response' : (res.statusText || `Request failed (${res.status})`) };
                    }
                    if (data.ok) {
                      const channels = selectedChannels as ('Email' | 'SMS' | 'Voice' | 'WhatsApp')[];
                      onAddCampaign({
                        name: name || 'Untitled Campaign',
                        channels: channels.length ? channels : ['Email'],
                        status: 'Active',
                        audience: audience,
                        audienceSize: matchingContacts.length,
                        engagement: 0,
                        lastUpdated: 'Just now',
                      });
                      const sent = data.sent ?? (toNumbers.length > 0 ? toNumbers.length : 1);
                      alert(`Campaign launched! SMS sent to ${sent} recipient(s) from the target audience.`);
                      setView('campaigns');
                    } else {
                      const err = data.results?.length
                        ? data.results.map((r: { to: string; error?: string }) => `${r.to}: ${r.error || 'failed'}`).join('; ')
                        : (data.error || 'Unknown error');
                      alert('SMS failed: ' + err);
                    }
                  } catch (e) {
                    alert('Failed to send SMS: ' + (e instanceof Error ? e.message : 'Network error'));
                  } finally {
                    setIsLaunching(false);
                  }
                }}
                className="px-8 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                 {isLaunching ? 'Sending SMS…' : 'Launch Campaign'}
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreate;
