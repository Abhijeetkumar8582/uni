
import React, { useState, useRef } from 'react';
import { AppView, KBDocument, KBFolder, CustomMetaTag, KBChunk } from '../types';

// Professional SVG Icons
const Icons = {
  Folder: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Upload: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Tag: () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
  Database: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Cpu: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Globe: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  SharePoint: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, // Representing Org structure
  Code: () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  Link: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
};

const KnowledgeBaseManage: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<KBFolder[]>([
    { id: 'F1', name: 'Admissions Policy', parentId: null, itemCount: 12 },
    { id: 'F2', name: 'Financial Aid Logic', parentId: null, itemCount: 5 },
    { id: 'F3', name: '2026 Cycle Data', parentId: 'F1', itemCount: 3 },
    { id: 'F4', name: 'Housing Handbooks', parentId: null, itemCount: 8 },
  ]);

  const [docs, setDocs] = useState<KBDocument[]>([
    { 
      id: '1', name: 'Fall 2026 Admissions Protocol.pdf', type: 'PDF', size: '2.4 MB', folderId: 'F1', status: 'Live', department: 'Admissions', lastSync: '2h ago', 
      customTags: [{id: 't1', key: 'Cycle', value: 'Fall 26'}, {id: 't2', key: 'Audience', value: 'Domestic'}],
      chunks: [
        { id: 'c1', vectorId: 'vec_88291', tokenCount: 256, content: 'Applicants must submit their Common App by Jan 15th for priority consideration. Transcripts...' },
        { id: 'c2', vectorId: 'vec_88292', tokenCount: 128, content: 'Late applications are processed on a rolling basis subject to space availability in the program.' },
      ]
    },
    { 
      id: '2', name: 'Institutional Scholarship Matrix.xlsx', type: 'XLSX', size: '1.2 MB', folderId: 'F2', status: 'Live', department: 'Finance', lastSync: '1d ago', 
      customTags: [{id: 't3', key: 'Category', value: 'Financial'}, {id: 't4', key: 'Sensitive', value: 'True'}],
      chunks: [
         { id: 'c3', vectorId: 'vec_99102', tokenCount: 512, content: 'Merit-based scholarships require a minimum GPA of 3.8 and are renewable for 4 years...' }
      ]
    },
    { 
      id: '3', name: 'admissions.university.edu', type: 'WEB', size: '84 Pgs', folderId: 'F1', status: 'Live', department: 'Admissions', lastSync: '4h ago', 
      customTags: [],
      chunks: []
    },
  ]);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState<'metadata' | 'chunks' | 'test'>('metadata');
  const [selectedDoc, setSelectedDoc] = useState<KBDocument | null>(null);
  
  // Ingest/Upload State
  const [isIngestModalOpen, setIsIngestModalOpen] = useState(false);
  const [ingestTab, setIngestTab] = useState<'upload' | 'web' | 'sharepoint' | 'api'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string>('');
  const [processProgress, setProcessProgress] = useState(0);
  
  // Web Crawler Inputs
  const [crawlUrl, setCrawlUrl] = useState('');
  const [crawlDepth, setCrawlDepth] = useState(1);

  // SharePoint Inputs
  const [spUrl, setSpUrl] = useState('');
  const [spLibrary, setSpLibrary] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Metadata Editing State
  const [newTagKey, setNewTagKey] = useState('');
  const [newTagValue, setNewTagValue] = useState('');

  // Simulation State
  const [testQuery, setTestQuery] = useState('');
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  // Navigation Logic
  const currentFolders = folders.filter(f => f.parentId === currentFolderId);
  const currentDocs = docs.filter(d => d.folderId === currentFolderId);

  const navigateTo = (id: string | null) => setCurrentFolderId(id);
  const getBreadcrumbs = () => {
    const crumbs = [{ id: null, name: 'Root' }];
    if (!currentFolderId) return crumbs;

    let current = folders.find(f => f.id === currentFolderId);
    while (current) {
      crumbs.splice(1, 0, { id: current.id, name: current.name });
      current = folders.find(f => f.id === current.parentId);
    }
    return crumbs;
  };

  const simulateProcessing = (steps: {p: number, label: string}[], type: string, name: string) => {
    setIsProcessing(true);
    setProcessProgress(0);
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        const newDoc: KBDocument = {
          id: Math.random().toString(36).substr(2, 9),
          name: name,
          type: type,
          size: type === 'WEB' ? '12 Pgs' : type === 'SP' ? 'Lib Sync' : '450 KB',
          folderId: currentFolderId,
          status: 'Live',
          department: 'General',
          lastSync: 'Just now',
          customTags: [],
          chunks: [
            { id: 'new_1', vectorId: 'vec_new_1', tokenCount: 150, content: 'Sample extracted content from the newly connected source...' }
          ]
        };
        setDocs(prev => [newDoc, ...prev]);
        setIsProcessing(false);
        setProcessProgress(0);
        setIsIngestModalOpen(false);
        return;
      }

      setProcessProgress(steps[currentStep].p);
      setProcessStep(steps[currentStep].label);
      currentStep++;
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    simulateProcessing([
      { p: 20, label: 'OCR & Text Extraction' },
      { p: 45, label: 'Recursive Character Splitting' },
      { p: 70, label: 'Generating Embeddings' },
      { p: 90, label: 'Indexing into Vector Store' },
      { p: 100, label: 'Complete' }
    ], file.name.split('.').pop()?.toUpperCase() || 'DOC', file.name);
  };

  const handleWebCrawl = () => {
    simulateProcessing([
      { p: 10, label: `Handshaking with ${crawlUrl}` },
      { p: 30, label: 'Crawling Sitemap (Depth: ' + crawlDepth + ')' },
      { p: 60, label: 'Scraping & Cleaning HTML' },
      { p: 85, label: 'Vectorizing Content' },
      { p: 100, label: 'Index Updated' }
    ], 'WEB', crawlUrl.replace('https://', ''));
  };

  const handleSharePointConnect = () => {
    simulateProcessing([
      { p: 20, label: 'Authenticating via Microsoft Graph' },
      { p: 50, label: `Syncing Library: ${spLibrary}` },
      { p: 80, label: 'Processing Documents' },
      { p: 100, label: 'Sync Complete' }
    ], 'SP', `${spLibrary} (SharePoint)`);
  };

  const createFolder = () => {
    const name = prompt('Folder Name:');
    if (name) {
      setFolders([...folders, { id: 'F' + Date.now(), name, parentId: currentFolderId, itemCount: 0 }]);
    }
  };

  const handleAddTag = () => {
    if (selectedDoc && newTagKey && newTagValue) {
      const newTag: CustomMetaTag = { id: Date.now().toString(), key: newTagKey, value: newTagValue };
      const updatedDoc = { ...selectedDoc, customTags: [...selectedDoc.customTags, newTag] };
      setDocs(docs.map(d => d.id === selectedDoc.id ? updatedDoc : d));
      setSelectedDoc(updatedDoc);
      setNewTagKey('');
      setNewTagValue('');
    }
  };

  const handleRemoveTag = (tagId: string) => {
    if (selectedDoc) {
      const updatedDoc = { ...selectedDoc, customTags: selectedDoc.customTags.filter(t => t.id !== tagId) };
      setDocs(docs.map(d => d.id === selectedDoc.id ? updatedDoc : d));
      setSelectedDoc(updatedDoc);
    }
  };

  const handleSimulateRetrieval = () => {
    if(!testQuery) return;
    setSimulatedResponse("Analysing...");
    setTimeout(() => {
       setSimulatedResponse("Matched Chunk: 'c1' (Score: 0.92). This document contains high relevance for the query based on vector proximity.");
    }, 1000);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">RAG Console</h1>
          <p className="text-sm text-slate-500">Vector database management and document ingestion pipeline.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={createFolder} 
             className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
           >
             <Icons.Plus /> New Folder
           </button>
           <button 
             onClick={() => setIsIngestModalOpen(true)}
             disabled={isProcessing}
             className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-sm flex items-center gap-2 transition-all"
           >
              {isProcessing ? <span className="animate-spin">⟳</span> : <Icons.Upload />}
              Add Source
           </button>
        </div>
      </div>

      {/* Processing Progress Bar */}
      {isProcessing && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                 <span className="text-blue-600 animate-pulse"><Icons.Cpu /></span>
                 {processStep}
              </div>
              <span className="text-xs font-bold text-slate-500">{processProgress}%</span>
           </div>
           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${processProgress}%` }}></div>
           </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 pb-2">
         {getBreadcrumbs().map((crumb, idx) => (
           <React.Fragment key={idx}>
              <button 
                onClick={() => navigateTo(crumb.id)}
                className={`hover:text-slate-900 hover:underline ${idx === getBreadcrumbs().length - 1 ? 'font-semibold text-slate-900' : ''}`}
              >
                {crumb.name}
              </button>
              {idx < getBreadcrumbs().length - 1 && <span className="text-slate-300">/</span>}
           </React.Fragment>
         ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Folders */}
        {currentFolders.map(folder => (
          <div 
            key={folder.id} 
            onClick={() => navigateTo(folder.id)}
            className="bg-white border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-3 aspect-square group"
          >
            <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
               <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
            </div>
            <div>
               <div className="text-sm font-medium text-slate-900 truncate max-w-[120px]">{folder.name}</div>
               <div className="text-xs text-slate-400">{folder.itemCount} items</div>
            </div>
          </div>
        ))}

        {/* Documents */}
        {currentDocs.map(doc => (
          <div 
            key={doc.id}
            onClick={() => { setSelectedDoc(doc); setIsPanelOpen(true); setActivePanelTab('metadata'); }}
            className="bg-white border border-slate-200 p-4 rounded-xl hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between aspect-square group relative"
          >
            <div className="absolute top-3 right-3 text-slate-300 group-hover:text-slate-500">
               {doc.status === 'Live' && <span className="w-2 h-2 bg-emerald-500 rounded-full block"></span>}
            </div>
            <div className="mt-2 flex justify-center">
               <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs border ${
                 doc.type === 'WEB' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                 doc.type === 'SP' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-100'
               }`}>
                  {doc.type}
               </div>
            </div>
            <div className="text-center">
               <div className="text-sm font-medium text-slate-900 line-clamp-2 leading-tight mb-1">{doc.name}</div>
               <div className="text-xs text-slate-400">{doc.size}</div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {currentFolders.length === 0 && currentDocs.length === 0 && !isProcessing && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
             <Icons.Folder />
             <p className="text-sm font-medium mt-2">This folder is empty</p>
          </div>
        )}
      </div>

      {/* --- INGESTION MODAL --- */}
      {isIngestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isProcessing && setIsIngestModalOpen(false)}></div>
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-lg font-bold text-slate-900">Connect Data Source</h2>
                    <p className="text-xs text-slate-500">Select an ingestion method to populate the knowledge base.</p>
                 </div>
                 <button onClick={() => !isProcessing && setIsIngestModalOpen(false)} className="text-slate-400 hover:text-slate-600"><Icons.Close /></button>
              </div>
              
              <div className="flex flex-1 overflow-hidden">
                 {/* Sidebar */}
                 <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
                    {[
                      { id: 'upload', label: 'Upload Files', icon: <Icons.Upload /> },
                      { id: 'web', label: 'Web Crawler', icon: <Icons.Globe /> },
                      { id: 'sharepoint', label: 'SharePoint', icon: <Icons.SharePoint /> },
                      { id: 'api', label: 'Custom API', icon: <Icons.Code /> },
                    ].map(item => (
                       <button
                         key={item.id}
                         onClick={() => setIngestTab(item.id as any)}
                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                           ingestTab === item.id ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                         }`}
                       >
                          {item.icon}
                          {item.label}
                       </button>
                    ))}
                 </div>

                 {/* Content */}
                 <div className="flex-1 p-8 overflow-y-auto">
                    {ingestTab === 'upload' && (
                       <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors p-10 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-blue-600"><Icons.Upload /></div>
                          <h3 className="text-sm font-bold text-slate-900">Click to upload documents</h3>
                          <p className="text-xs text-slate-500 mt-2 mb-6 text-center max-w-xs">Supported formats: PDF, DOCX, TXT, CSV, XLSX. Maximum file size: 25MB.</p>
                          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800">Select Files</button>
                       </div>
                    )}

                    {ingestTab === 'web' && (
                       <div className="space-y-6 max-w-lg mx-auto">
                          <div className="text-center mb-6">
                             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3"><Icons.Globe /></div>
                             <h3 className="text-lg font-bold text-slate-900">Website Crawler</h3>
                             <p className="text-xs text-slate-500">Index public pages for retrieval.</p>
                          </div>
                          
                          <div className="space-y-4">
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Root URL</label>
                                <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-100">
                                   <Icons.Link />
                                   <input 
                                     type="text" 
                                     placeholder="https://university.edu/admissions" 
                                     value={crawlUrl}
                                     onChange={(e) => setCrawlUrl(e.target.value)}
                                     className="flex-1 text-sm outline-none"
                                   />
                                </div>
                             </div>
                             
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Crawl Depth: {crawlDepth}</label>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="5" 
                                  value={crawlDepth}
                                  onChange={(e) => setCrawlDepth(parseInt(e.target.value))}
                                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                   <span>This Page Only</span>
                                   <span>Entire Subdomain</span>
                                </div>
                             </div>

                             <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800">
                                <b>Note:</b> Crawler respects robots.txt. Pages requiring authentication will be skipped.
                             </div>
                             
                             <button 
                               onClick={handleWebCrawl}
                               disabled={!crawlUrl}
                               className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition-all"
                             >
                                Start Indexing
                             </button>
                          </div>
                       </div>
                    )}

                    {ingestTab === 'sharepoint' && (
                       <div className="space-y-6 max-w-lg mx-auto">
                          <div className="text-center mb-6">
                             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3"><Icons.SharePoint /></div>
                             <h3 className="text-lg font-bold text-slate-900">Microsoft SharePoint</h3>
                             <p className="text-xs text-slate-500">Connect to your organization's intranet.</p>
                          </div>

                          <div className="space-y-4">
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">SharePoint Site URL</label>
                                <input 
                                  type="text" 
                                  placeholder="https://org.sharepoint.com/sites/hr" 
                                  value={spUrl}
                                  onChange={(e) => setSpUrl(e.target.value)}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                                />
                             </div>
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Document Library Name</label>
                                <input 
                                  type="text" 
                                  placeholder="Shared Documents" 
                                  value={spLibrary}
                                  onChange={(e) => setSpLibrary(e.target.value)}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100"
                                />
                             </div>
                             
                             <button 
                               onClick={handleSharePointConnect}
                               disabled={!spUrl || !spLibrary}
                               className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-100 transition-all"
                             >
                                Connect & Sync
                             </button>
                          </div>
                       </div>
                    )}
                    
                    {ingestTab === 'api' && (
                        <div className="space-y-6 max-w-lg mx-auto">
                          <div className="text-center mb-6">
                             <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3"><Icons.Code /></div>
                             <h3 className="text-lg font-bold text-slate-900">Custom API Ingest</h3>
                             <p className="text-xs text-slate-500">Fetch JSON/XML data from external endpoints.</p>
                          </div>
                          <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
                             <p className="text-sm text-slate-500 mb-4">API configuration is handled via the <b>Integrations</b> hub for security.</p>
                             <button onClick={() => { setIsIngestModalOpen(false); setView('integrations'); }} className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100">
                                Go to Integrations
                             </button>
                          </div>
                        </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- SLIDE-OVER DRAWER (RAG Inspector) --- */}
      {isPanelOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsPanelOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
             {/* Drawer Header */}
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-start bg-slate-50">
                <div className="flex gap-3">
                   <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-xs text-slate-600 shadow-sm">
                      {selectedDoc.type}
                   </div>
                   <div>
                      <h2 className="text-base font-bold text-slate-900 line-clamp-1 w-64">{selectedDoc.name}</h2>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                         <span className={`flex items-center gap-1 ${selectedDoc.status === 'Live' ? 'text-emerald-600' : 'text-amber-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedDoc.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                            {selectedDoc.status}
                         </span>
                         <span>•</span>
                         <span>{selectedDoc.size}</span>
                         <span>•</span>
                         <span>{selectedDoc.chunks?.length || 0} Chunks</span>
                      </div>
                   </div>
                </div>
                <button onClick={() => setIsPanelOpen(false)} className="text-slate-400 hover:text-slate-600"><Icons.Close /></button>
             </div>

             {/* Tabs */}
             <div className="px-6 border-b border-slate-200 flex gap-6">
                {['metadata', 'chunks', 'test'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActivePanelTab(tab as any)}
                     className={`py-3 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors ${activePanelTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                   >
                      {tab === 'chunks' ? 'Vector Chunks' : tab === 'test' ? 'Retrieval Sim' : 'Metadata'}
                   </button>
                ))}
             </div>

             {/* Drawer Body */}
             <div className="flex-1 overflow-y-auto p-6 bg-white">
                
                {/* METADATA TAB */}
                {activePanelTab === 'metadata' && (
                   <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                         <h4 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-2"><Icons.Database /> Routing Logic</h4>
                         <p className="text-xs text-blue-600 leading-relaxed">
                            Tags defined here act as strict filters for the RAG retriever. The bot will prefer documents matching the user's role and intent.
                         </p>
                      </div>

                      <div className="space-y-3">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Tags</label>
                         {selectedDoc.customTags.length === 0 && <div className="text-sm text-slate-400 italic p-2">No tags defined.</div>}
                         {selectedDoc.customTags.map(tag => (
                            <div key={tag.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg group hover:border-slate-300 transition-colors">
                               <div className="flex items-center gap-2 text-sm">
                                  <span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs">{tag.key}</span>
                                  <span className="text-slate-300">→</span>
                                  <span className="font-bold text-slate-900">{tag.value}</span>
                               </div>
                               <button onClick={() => handleRemoveTag(tag.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Trash /></button>
                            </div>
                         ))}
                      </div>

                      <div className="border-t border-slate-100 pt-6 space-y-3">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Add New Meta Tag</label>
                         <div className="flex gap-2">
                            <input 
                              placeholder="Key (e.g. Dept)" 
                              value={newTagKey}
                              onChange={(e) => setNewTagKey(e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" 
                            />
                            <input 
                              placeholder="Value (e.g. HR)" 
                              value={newTagValue}
                              onChange={(e) => setNewTagValue(e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" 
                            />
                            <button 
                              onClick={handleAddTag}
                              disabled={!newTagKey || !newTagValue}
                              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 disabled:opacity-50"
                            >
                               Add
                            </button>
                         </div>
                      </div>
                   </div>
                )}

                {/* CHUNKS TAB */}
                {activePanelTab === 'chunks' && (
                   <div className="space-y-6">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-500">{selectedDoc.chunks?.length || 0} Vectors found</span>
                         <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">model: text-embedding-004</span>
                      </div>
                      
                      <div className="space-y-4">
                         {selectedDoc.chunks?.map((chunk, i) => (
                            <div key={chunk.id} className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-all hover:shadow-sm">
                               <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{chunk.vectorId}</span>
                                  <span className="text-[10px] font-bold text-slate-400">{chunk.tokenCount} tokens</span>
                               </div>
                               <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  {chunk.content}
                               </p>
                            </div>
                         ))}
                         {(!selectedDoc.chunks || selectedDoc.chunks.length === 0) && (
                            <div className="text-center py-10 text-slate-400 text-sm">No vector chunks available. Please re-index.</div>
                         )}
                      </div>
                   </div>
                )}

                {/* TEST TAB */}
                {activePanelTab === 'test' && (
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Simulator Query</label>
                         <textarea 
                           className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none h-24"
                           placeholder="Enter a question a user might ask..."
                           value={testQuery}
                           onChange={(e) => setTestQuery(e.target.value)}
                         ></textarea>
                         <button 
                           onClick={handleSimulateRetrieval}
                           className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 shadow-sm"
                         >
                            Test Retrieval
                         </button>
                      </div>

                      {simulatedResponse && (
                         <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                            <h5 className="text-xs font-bold text-emerald-700 mb-1">Simulation Result</h5>
                            <p className="text-xs text-emerald-800 leading-relaxed">{simulatedResponse}</p>
                         </div>
                      )}
                   </div>
                )}
             </div>

             {/* Footer Actions */}
             <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
                <button className="flex-1 py-3 border border-slate-300 bg-white text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-50">
                   Force Re-Index
                </button>
                <button className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800">
                   Save Changes
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseManage;
