
import React, { useState, useRef } from 'react';
import { AppView, KBDocument, KBFolder, CustomMetaTag, KBChunk } from '../types';
import { extractTextFromFile } from '../services/documentExtract';
import { chunkText, approxTokenCount, embedTexts, cosineSimilarity } from '../services/embeddingService';
import { answerFromContext, answerFromWeb } from '../services/geminiService';

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
  Link: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  Alert: () => <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
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
  const [processError, setProcessError] = useState<string | null>(null);
  /** Pending files: show row with filename + Save; process only when Save is clicked */
  const [pendingUploads, setPendingUploads] = useState<{ id: string; file: File }[]>([]);
  
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
  const [simulatedResult, setSimulatedResult] = useState<{ match: string; summary: string; source?: 'document' | 'web' } | null>(null);

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

  /** Add selected file to pending list (row with filename + Save). */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const fileType = (file.name.split('.').pop() || '').toUpperCase();
    if (!/^(PDF|TXT)$/i.test(fileType)) {
      setProcessError(`Unsupported: ${file.name}. Use .txt or .pdf.`);
      return;
    }
    setProcessError(null);
    setPendingUploads(prev => [...prev, { id: crypto.randomUUID(), file }]);
  };

  /** Run extract → chunk → embed for one file; then show chunks. Called when user clicks Save. */
  const handleSavePendingFile = async (entry: { id: string; file: File }) => {
    const { file } = entry;
    setPendingUploads(prev => prev.filter(p => p.id !== entry.id));
    setProcessError(null);
    setIsProcessing(true);
    setProcessProgress(5);
    setProcessStep('Reading file…');

    const fileType = (file.name.split('.').pop() || 'DOC').toUpperCase();

    try {
      setProcessStep('Extracting text…');
      setProcessProgress(15);
      const { text, error: extractError } = await extractTextFromFile(file);
      if (extractError || !text) {
        setProcessError(extractError || 'No text extracted');
        setIsProcessing(false);
        return;
      }

      setProcessStep('Splitting into chunks…');
      setProcessProgress(35);
      const chunkStrings = chunkText(text, 512, 50);
      if (chunkStrings.length === 0) {
        setProcessError('No chunks produced from text');
        setIsProcessing(false);
        return;
      }

      setProcessStep('Generating embeddings (Gemini)…');
      setProcessProgress(50);
      await embedTexts(chunkStrings);
      setProcessProgress(85);
      setProcessStep('Indexing chunks…');

      const docId = Math.random().toString(36).substring(2, 11);
      const chunks: KBChunk[] = chunkStrings.map((content, i) => ({
        id: `chunk_${docId}_${i}`,
        vectorId: `vec_${docId}_${i}`,
        content,
        tokenCount: approxTokenCount(content),
        relevanceScore: undefined,
      }));

      const newDoc: KBDocument = {
        id: docId,
        name: file.name,
        type: fileType,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        folderId: currentFolderId,
        status: 'Live',
        department: 'General',
        lastSync: 'Just now',
        customTags: [],
        chunks,
      };

      setDocs(prev => [newDoc, ...prev]);
      setProcessProgress(100);
      setProcessStep('Complete');
      setIsIngestModalOpen(false);
      setIsProcessing(false);
      setProcessProgress(0);
      setSelectedDoc(newDoc);
      setActivePanelTab('chunks');
      setIsPanelOpen(true);
    } catch (err) {
      setProcessError(err instanceof Error ? err.message : 'Processing failed');
      setIsProcessing(false);
    }
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

  const handleSimulateRetrieval = async () => {
    if (!testQuery || !selectedDoc) return;
    setSimulatedResult({ match: 'Analysing…', summary: '' });
    const chunks = selectedDoc.chunks || [];
    if (chunks.length === 0) {
      setSimulatedResult({ match: 'No chunks in this document.', summary: '' });
      return;
    }
    try {
      // Embed query + all chunks, then pick top-k by similarity (answer only from those)
      const texts = [testQuery, ...chunks.map(c => c.content)];
      const allEmbeddings = await embedTexts(texts);
      if (!allEmbeddings.length || allEmbeddings.length < 2) {
        setSimulatedResult({ match: 'Could not compute embeddings.', summary: '' });
        return;
      }
      const queryVec = allEmbeddings[0];
      const chunkVecs = allEmbeddings.slice(1);
      const scored = chunkVecs.map((vec, i) => ({ index: i, score: cosineSimilarity(queryVec, vec) }));
      scored.sort((a, b) => b.score - a.score);
      const topK = 5;
      const top = scored.slice(0, topK);
      const context = top.map(t => chunks[t.index].content).join('\n\n');
      let summary = await answerFromContext(context, testQuery);
      const matchText = top.map(t => `Chunk ${t.index + 1} (${(t.score * 100).toFixed(0)}%)`).join(', ');
      const notInDocument = /does not contain this information|excerpt does not contain/i.test(summary);
      if (notInDocument) {
        summary = await answerFromWeb(testQuery);
        setSimulatedResult({
          match: `Matched: ${matchText}. Answer generated from context.`,
          summary,
          source: 'web',
        });
      } else {
        setSimulatedResult({
          match: `Matched: ${matchText}. Answer from extracted chunks.`,
          summary,
          source: 'document',
        });
      }
    } catch (err) {
      setSimulatedResult({
        match: 'Retrieval failed.',
        summary: err instanceof Error ? err.message : 'Could not generate answer.',
      });
    }
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

      {/* Processing Progress Bar — shown only while processing */}
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
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { if (!isProcessing) { setIsIngestModalOpen(false); setProcessError(null); } }}></div>
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-lg font-bold text-slate-900">Connect Data Source</h2>
                    <p className="text-xs text-slate-500">Select an ingestion method to populate the knowledge base.</p>
                 </div>
                 <button onClick={() => { if (!isProcessing) { setIsIngestModalOpen(false); setProcessError(null); } }} className="text-slate-400 hover:text-slate-600"><Icons.Close /></button>
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
                       <div className="space-y-4">
                          {processError && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                              <Icons.Alert />
                              <span className="flex-1">{processError}</span>
                              <button type="button" onClick={() => setProcessError(null)} className="text-red-500 hover:text-red-700 font-medium">Dismiss</button>
                            </div>
                          )}
                          {pendingUploads.length > 0 && (
                            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">Selected files — click Save to extract & chunk</div>
                              <ul className="divide-y divide-slate-100">
                                {pendingUploads.map((entry) => (
                                  <li key={entry.id} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-sm font-medium text-slate-900 truncate flex-1 min-w-0" title={entry.file.name}>{entry.file.name}</span>
                                    <span className="text-xs text-slate-400 flex-shrink-0">{(entry.file.size / 1024).toFixed(1)} KB</span>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleSavePendingFile(entry)}
                                        disabled={isProcessing}
                                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        {isProcessing ? 'Processing…' : 'Save'}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setPendingUploads(prev => prev.filter(p => p.id !== entry.id))}
                                        disabled={isProcessing}
                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50"
                                        title="Remove"
                                      >
                                        <Icons.Close />
                                      </button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors p-10 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-blue-600"><Icons.Upload /></div>
                            <h3 className="text-sm font-bold text-slate-900">Click to upload documents</h3>
                            <p className="text-xs text-slate-500 mt-2 mb-6 text-center max-w-xs">Supported: <strong>.txt</strong> and <strong>.pdf</strong>. Add file, then click <strong>Save</strong> to extract text and chunk.</p>
                            <input type="file" ref={fileInputRef} className="hidden" accept=".txt,.pdf,text/plain,application/pdf" onChange={handleFileSelect} />
                            <button type="button" className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800">Select Files</button>
                          </div>
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

                {/* CHUNKS TAB — table format */}
                {activePanelTab === 'chunks' && (
                   <div className="space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-500">{selectedDoc.chunks?.length || 0} chunks</span>
                         <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">Gemini gemini-embedding-001</span>
                      </div>
                      {selectedDoc.chunks && selectedDoc.chunks.length > 0 ? (
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="text-xs font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
                                <th className="px-4 py-3 w-12">#</th>
                                <th className="px-4 py-3">Content</th>
                                <th className="px-4 py-3 w-24 text-right">Tokens</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedDoc.chunks.map((chunk, i) => (
                                <tr key={chunk.id} className="hover:bg-slate-50/50 transition-colors align-top">
                                  <td className="px-4 py-3 font-medium text-slate-600 align-top">{i + 1}</td>
                                  <td className="px-4 py-3 text-slate-700 whitespace-pre-wrap break-words">
                                    {chunk.content}
                                  </td>
                                  <td className="px-4 py-3 text-right text-slate-500 align-top">{chunk.tokenCount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-10 text-slate-400 text-sm border border-dashed border-slate-200 rounded-xl">No chunks. Upload a .txt or .pdf to extract and chunk.</div>
                      )}
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

                      {simulatedResult && (
                         <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl animate-in fade-in slide-in-from-top-2 space-y-4">
                            <h5 className="text-xs font-bold text-emerald-700">Simulation Result</h5>
                            <div>
                               <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Matched chunk</div>
                               <p className="text-xs text-emerald-800 leading-relaxed">{simulatedResult.match}</p>
                            </div>
                            {simulatedResult.summary && (
                               <div>
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Answer summary</span>
                                  </div>
                                  <p className="text-sm text-emerald-900 leading-relaxed">{simulatedResult.summary}</p>
                               </div>
                            )}
                            {simulatedResult.match === 'Analysing…' && (
                               <p className="text-xs text-emerald-600 animate-pulse">Generating answer…</p>
                            )}
                         </div>
                      )}
                   </div>
                )}
             </div>

             {/* Footer Actions */}
             <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
                <button type="button" className="flex-1 py-3 border border-slate-300 bg-white text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-50">
                   Force Re-Index
                </button>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800">
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
