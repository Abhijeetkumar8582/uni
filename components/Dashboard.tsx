
import React, { useState } from 'react';
import { AppView, ExpertNode, UnicoreConfig, ChannelType } from '../types';

// Minimalist Icons
const Icons = {
  Server: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  Bot: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Shield: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Edit: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Cpu: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Activity: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
};

const Dashboard: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // --- UNICORE GLOBAL STATE ---
  const [unicore, setUnicore] = useState<UnicoreConfig>({
    piiRedaction: true,
    dataRetentionDays: 365,
    complianceStandard: 'FERPA',
    incidentThreshold: 5,
    globalFailSafe: false,
    thinkingBudget: 32000,
    allowedIPs: ['10.0.0.1/24'],
    requireMFA: true,
    routingRules: [
      { id: 'RR-01', domain: 'Admissions', targetBotId: 'EN-1', priority: 1, confidenceThreshold: 0.85 },
      { id: 'RR-02', domain: 'Financial Aid', targetBotId: 'EN-1', priority: 2, confidenceThreshold: 0.90 },
      { id: 'RR-03', domain: 'Academic Advising', targetBotId: 'SN-1', priority: 1, confidenceThreshold: 0.80 },
      { id: 'RR-04', domain: 'IT Support', targetBotId: 'ON-1', priority: 1, confidenceThreshold: 0.75 },
    ],
    sharedEntities: [
      { id: 'SE-01', name: 'student_id', dataType: 'String(9)', validationRule: 'Regex ^900', pii: true },
      { id: 'SE-02', name: 'term_code', dataType: 'Integer', validationRule: 'List [202510]', pii: false },
    ]
  });

  // --- EXPERT NODES STATE ---
  const [nodes, setNodes] = useState<ExpertNode[]>([
    { 
      id: 'EN-1', 
      name: 'Enrollment Bot', 
      department: 'Admissions',
      description: 'Handles prospective students, applications, and financial aid inquiries.',
      status: 'Online', 
      channels: ['Web', 'SMS', 'WhatsApp'], 
      allowedAudiences: ['Public', 'Prospects'], 
      authMethod: 'None', 
      owner: 'Sarah J.', 
      currentVersion: 'v4.2.1', 
      lastDeployed: '2d ago',
      kpiTarget: 'Yield Rate > 28%',
      businessGoal: 'Maximize completed applications',
      operatingHours: '24/7 (AI) | 9-5 (Human)',
      knowledgeRefresh: 'Daily @ 2AM',
      responseTone: 'Encouraging',
      guardrails: ['Must cite sources', 'No financial promises'],
      allowedActions: [
        { id: 'A1', name: 'Create Application', type: 'Write', enabled: true, requiresApproval: false },
        { id: 'A2', name: 'Schedule Tour', type: 'Write', enabled: true, requiresApproval: false },
      ],
      escalationEnabled: true,
      health: { kb: 'Healthy', connectors: 'Operational' }
    },
    { 
      id: 'SN-1', 
      name: 'Success Bot', 
      department: 'Student Affairs',
      description: 'Retention focus. Academic advising, mental health triage, and course registration.',
      status: 'Online', 
      channels: ['Web', 'SMS', 'Email'], 
      allowedAudiences: ['Students'], 
      authMethod: 'SSO', 
      owner: 'Marcus K.', 
      currentVersion: 'v3.1.0',
      lastDeployed: '5h ago',
      kpiTarget: 'Retention > 90%',
      businessGoal: 'Prevent stop-outs',
      operatingHours: '24/7',
      knowledgeRefresh: 'Hourly',
      responseTone: 'Supportive',
      guardrails: ['FERPA Compliance', 'Suicide Prevention Protocol'],
      allowedActions: [
        { id: 'A3', name: 'Book Advisor', type: 'Write', enabled: true, requiresApproval: false },
        { id: 'A4', name: 'View Grades', type: 'Read', enabled: true, requiresApproval: true },
      ],
      escalationEnabled: true,
      health: { kb: 'Healthy', connectors: 'Operational' }
    },
    { 
      id: 'AN-1', 
      name: 'Advancement Bot', 
      department: 'Development',
      description: 'Alumni engagement, donation processing, and event registration.',
      status: 'Maintenance', 
      channels: ['Email', 'Voice'], 
      allowedAudiences: ['Alumni'], 
      authMethod: 'Token', 
      owner: 'Elena R.', 
      currentVersion: 'v2.8.4',
      lastDeployed: '1w ago',
      kpiTarget: 'Donation Vol > $1M',
      businessGoal: 'Alumni Engagement',
      operatingHours: '8am - 8pm',
      knowledgeRefresh: 'Weekly',
      responseTone: 'Formal & Grateful',
      guardrails: ['Gift Solicitation Policy'],
      allowedActions: [
        { id: 'A5', name: 'Process Gift', type: 'Write', enabled: false, requiresApproval: true },
      ],
      escalationEnabled: false,
      health: { kb: 'Healthy', connectors: 'Degraded' } 
    },
    { 
      id: 'ON-1', 
      name: 'Operations Bot', 
      department: 'IT / Ops',
      description: 'Internal staff support, IT ticketing, and HR Q&A.',
      status: 'Online', 
      channels: ['Web', 'Voice'], 
      allowedAudiences: ['Staff'], 
      authMethod: 'Magic Link', 
      owner: 'IT Dev Team', 
      currentVersion: 'v1.5.2',
      lastDeployed: '30m ago', 
      kpiTarget: 'Ticket Deflection > 60%',
      businessGoal: 'Operational Efficiency',
      operatingHours: '24/7',
      knowledgeRefresh: 'Real-time',
      responseTone: 'Direct',
      guardrails: ['Internal Only', 'Security Protocol'],
      allowedActions: [
        { id: 'A6', name: 'Reset Password', type: 'Write', enabled: true, requiresApproval: false },
        { id: 'A7', name: 'Query SQL', type: 'Read', enabled: true, requiresApproval: true },
      ],
      escalationEnabled: true,
      health: { kb: 'Healthy', connectors: 'Operational' }
    },
  ]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const updateNode = (nodeId: string, updates: Partial<ExpertNode>) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n));
  };

  const toggleChannel = (nodeId: string, channel: ChannelType) => {
    setNodes(prev => prev.map(n => {
      if (n.id !== nodeId) return n;
      const channels = n.channels.includes(channel)
        ? n.channels.filter(c => c !== channel)
        : [...n.channels, channel];
      return { ...n, channels };
    }));
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      Online: 'bg-emerald-100 text-emerald-700',
      Maintenance: 'bg-amber-100 text-amber-700',
      Offline: 'bg-slate-100 text-slate-600',
      Busy: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${styles[status as keyof typeof styles] || styles.Offline}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-[#050505]">Orchestration Hub</h1>
          <p className="text-sm text-[#737373]">Centralized intelligence command and expert node topology.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setView('audit-logs')} className="px-4 py-2 bg-white border border-[#DDDBCB] rounded-lg text-sm font-medium text-[#050505] hover:bg-[#FAFAFA] shadow-sm">Audit Logs</button>
        </div>
      </div>

      {/* Main Orchestration View */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* --- LEFT: UNICORE ENGINE (Control Tower) --- */}
        <div 
          className="w-full lg:w-96 flex-shrink-0 bg-white rounded-3xl p-8 flex flex-col cursor-pointer group transition-all border border-[#DDDBCB] shadow-sm hover:border-[#1B9AAA]"
          onClick={() => { setSelectedNodeId('UNICORE'); setActiveTab('routing'); }}
        >
          <div className="flex flex-col h-full">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#FAFAFA] rounded-2xl flex items-center justify-center text-xl font-bold text-[#050505] border border-[#DDDBCB] group-hover:scale-105 transition-transform">
                   U
                </div>
                <div>
                   <h2 className="text-xl font-bold text-[#050505] tracking-tight">Unicore</h2>
                   <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${unicore.globalFailSafe ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`}></span>
                      <span className={`text-xs font-medium ${unicore.globalFailSafe ? 'text-red-600' : 'text-emerald-600'}`}>
                         {unicore.globalFailSafe ? 'FAIL-SAFE ACTIVE' : 'System Operational'}
                      </span>
                   </div>
                </div>
             </div>

             <div className="flex-1 space-y-6">
                <div className="p-4 bg-[#FAFAFA] border border-[#DDDBCB] rounded-2xl">
                   <div className="text-xs font-bold text-[#737373] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Icons.Cpu /> Global Compute
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                         <div className="text-3xl font-bold text-[#050505]">{unicore.thinkingBudget / 1000}k</div>
                         <div className="text-[10px] text-[#737373] mt-1">Tokens / Request</div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-emerald-600">99.9%</div>
                         <div className="text-[10px] text-[#737373] mt-1">Uptime</div>
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between items-center text-sm text-[#050505] p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors">
                      <span className="flex items-center gap-2"><Icons.Shield /> PII Redaction</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${unicore.piiRedaction ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                         {unicore.piiRedaction ? 'Active' : 'Disabled'}
                      </span>
                   </div>
                   <div className="flex justify-between items-center text-sm text-[#050505] p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors">
                      <span className="flex items-center gap-2"><Icons.Activity /> Active Routes</span>
                      <span className="font-bold text-[#050505]">{unicore.routingRules.length}</span>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-[#DDDBCB]">
                <button className="w-full py-3 bg-white border border-[#DDDBCB] hover:bg-[#FAFAFA] text-[#050505] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                   Configure Core
                </button>
             </div>
          </div>
        </div>

        {/* --- RIGHT: NETWORK GRID (Nodes) --- */}
        <div className="flex-1 overflow-y-auto pr-2 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20 rounded-3xl border border-dashed border-[#DDDBCB]">
           <div className="absolute inset-0 bg-[#FAFAFA]/50 -z-10"></div>
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {nodes.map(node => (
                 <div 
                   key={node.id}
                   onClick={() => { setSelectedNodeId(node.id); setActiveTab('overview'); }}
                   className="bg-white p-6 rounded-2xl border border-[#DDDBCB] hover:border-[#1B9AAA] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                 >
                    {/* Active Indicator Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1B9AAA] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#FAFAFA] rounded-xl flex items-center justify-center font-bold text-sm text-[#050505] group-hover:bg-[#1B9AAA] group-hover:text-white transition-colors shadow-sm">
                             {getInitials(node.name)}
                          </div>
                          <div>
                             <h3 className="font-bold text-[#050505] text-sm">{node.name}</h3>
                             <p className="text-xs text-[#737373]">{node.department}</p>
                          </div>
                       </div>
                       <StatusBadge status={node.status} />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                       {node.channels.map(ch => (
                          <span key={ch} className="px-2 py-1 bg-[#FAFAFA] border border-[#DDDBCB] rounded text-[10px] font-medium text-[#737373]">
                             {ch}
                          </span>
                       ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#FAFAFA]">
                       <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                          <Icons.Activity />
                          <span className="font-mono">12ms</span>
                       </div>
                       <div className="text-xs font-bold text-[#050505]">{node.currentVersion}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* --- CONFIGURATION DRAWER (SLIDE-OVER) --- */}
      {selectedNodeId && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedNodeId(null)}></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-2xl bg-white shadow-xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-[#DDDBCB] flex justify-between items-center bg-[#FAFAFA]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border border-[#DDDBCB] rounded-xl flex items-center justify-center font-bold text-sm text-[#050505] shadow-sm">
                    {selectedNodeId === 'UNICORE' ? 'UE' : getInitials(selectedNode?.name || '')}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#050505]">
                       {selectedNodeId === 'UNICORE' ? 'Global Configuration' : selectedNode?.name}
                    </h2>
                    <p className="text-xs text-[#737373]">
                      {selectedNodeId === 'UNICORE' ? 'Organization Level Settings' : `${selectedNode?.department} • ${selectedNode?.role || 'Expert'} Logic`}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedNodeId(null)} className="text-[#737373] hover:text-[#050505] transition-colors">
                  <Icons.Close />
                </button>
              </div>

              {/* Drawer Tabs */}
              <div className="px-6 border-b border-[#DDDBCB]">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                   {selectedNodeId === 'UNICORE' ? (
                     ['routing', 'governance', 'schema', 'failsafe'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize ${
                           activeTab === tab ? 'border-[#1B9AAA] text-[#1B9AAA]' : 'border-transparent text-[#737373] hover:text-[#050505] hover:border-[#DDDBCB]'
                         }`}
                       >
                         {tab}
                       </button>
                     ))
                   ) : (
                     ['overview', 'enablement', 'knowledge', 'actions', 'channels'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize ${
                           activeTab === tab ? 'border-[#1B9AAA] text-[#1B9AAA]' : 'border-transparent text-[#737373] hover:text-[#050505] hover:border-[#DDDBCB]'
                         }`}
                       >
                         {tab}
                       </button>
                     ))
                   )}
                </nav>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-white">
                
                {/* --- UNICORE PANELS --- */}
                {selectedNodeId === 'UNICORE' && (
                  <div className="space-y-8">
                    {activeTab === 'routing' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-semibold text-[#050505]">Routing Rules</h3>
                          <button className="text-xs font-medium text-[#1B9AAA] hover:text-[#157f8c]">+ Add Rule</button>
                        </div>
                        <div className="border border-[#DDDBCB] rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-[#DDDBCB]">
                            <thead className="bg-[#FAFAFA]">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Domain</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Target Bot</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase tracking-wider">Confidence</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#DDDBCB]">
                              {unicore.routingRules.map((rule) => (
                                <tr key={rule.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#050505]">{rule.priority}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#050505]">{rule.domain}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#1B9AAA] font-medium">{rule.targetBotId}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#737373]">&gt;{rule.confidenceThreshold * 100}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeTab === 'governance' && (
                      <div className="space-y-6">
                         <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#DDDBCB] space-y-4">
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <Icons.Shield />
                                  <span className="text-sm font-semibold text-[#050505]">PII Redaction</span>
                                </div>
                               <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" checked={unicore.piiRedaction} onChange={() => setUnicore({...unicore, piiRedaction: !unicore.piiRedaction})} className="sr-only peer" />
                                  <div className="w-11 h-6 bg-[#DDDBCB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#52D1DC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDDBCB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B9AAA]"></div>
                               </label>
                            </div>
                            <p className="text-xs text-[#737373]">Automatically detect and redact sensitive data (SSN, DoB, Financials) before storage.</p>
                         </div>

                         <div className="space-y-2">
                            <label className="text-sm font-medium text-[#737373]">Data Retention Policy</label>
                            <div className="flex items-center gap-4">
                               <input type="range" min="30" max="730" value={unicore.dataRetentionDays} onChange={(e) => setUnicore({...unicore, dataRetentionDays: parseInt(e.target.value)})} className="w-full h-2 bg-[#DDDBCB] rounded-lg appearance-none cursor-pointer" />
                               <span className="text-sm font-bold text-[#050505] w-24 text-right">{unicore.dataRetentionDays} Days</span>
                            </div>
                         </div>
                      </div>
                    )}

                    {activeTab === 'failsafe' && (
                      <div className="space-y-6">
                         <div className="p-6 bg-red-50 border border-red-100 rounded-lg text-center space-y-4">
                            <div className="text-red-600 flex justify-center"><Icons.Alert /></div>
                            <h3 className="text-lg font-bold text-red-800">Global Kill Switch</h3>
                            <p className="text-sm text-red-700">Immediately route all traffic to human support. Suspends all AI generation across all tenants.</p>
                            <button 
                              onClick={() => setUnicore({...unicore, globalFailSafe: !unicore.globalFailSafe})}
                              className={`w-full py-3 font-bold text-white rounded-md shadow-sm transition-all text-sm ${unicore.globalFailSafe ? 'bg-[#050505]' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                               {unicore.globalFailSafe ? 'DEACTIVATE EMERGENCY MODE' : 'ACTIVATE EMERGENCY MODE'}
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- BOT SPECIFIC PANELS --- */}
                {selectedNode && selectedNodeId !== 'UNICORE' && (
                  <div className="space-y-8">
                    
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <label className="text-xs font-semibold text-[#737373] uppercase">Primary Owner</label>
                               <input type="text" value={selectedNode.owner} onChange={(e) => updateNode(selectedNodeId!, { owner: e.target.value })} className="w-full px-3 py-2 bg-white border border-[#DDDBCB] rounded-md text-sm focus:ring-[#1B9AAA] focus:border-[#1B9AAA]" />
                            </div>
                            <div className="space-y-1">
                               <label className="text-xs font-semibold text-[#737373] uppercase">Current Version</label>
                               <div className="flex gap-2">
                                  <input type="text" value={selectedNode.currentVersion} disabled className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#DDDBCB] rounded-md text-sm text-[#737373]" />
                                  <button className="px-3 py-2 bg-white border border-[#DDDBCB] rounded-md text-xs font-medium text-[#050505] hover:bg-[#FAFAFA]">Rollback</button>
                                </div>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-semibold text-[#737373] uppercase">Business KPI Target</label>
                            <input type="text" value={selectedNode.kpiTarget} onChange={(e) => updateNode(selectedNodeId!, { kpiTarget: e.target.value })} className="w-full px-3 py-2 bg-white border border-[#DDDBCB] rounded-md text-sm focus:ring-[#1B9AAA] focus:border-[#1B9AAA]" />
                         </div>
                      </div>
                    )}

                    {activeTab === 'enablement' && (
                      <div className="space-y-6">
                         <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg border border-[#DDDBCB]">
                            <div>
                               <h3 className="text-sm font-semibold text-[#050505]">Bot Status</h3>
                               <p className="text-xs text-[#737373]">Controls public availability.</p>
                            </div>
                            <select 
                              value={selectedNode.status} 
                              onChange={(e) => updateNode(selectedNodeId!, { status: e.target.value as any })}
                              className="px-3 py-1.5 bg-white border border-[#DDDBCB] rounded-md text-sm focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                            >
                               <option>Online</option>
                               <option>Maintenance</option>
                               <option>Offline</option>
                            </select>
                         </div>

                         <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#DDDBCB]">
                            <div>
                               <h3 className="text-sm font-semibold text-[#050505]">Human Handoff</h3>
                               <p className="text-xs text-[#737373]">Escalate to live agent on high sentiment friction.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={selectedNode.escalationEnabled} onChange={() => updateNode(selectedNodeId!, { escalationEnabled: !selectedNode.escalationEnabled })} className="sr-only peer" />
                              <div className="w-11 h-6 bg-[#DDDBCB] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#52D1DC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDDBCB] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B9AAA]"></div>
                            </label>
                         </div>
                      </div>
                    )}

                    {activeTab === 'actions' && (
                       <div className="space-y-4">
                          <h3 className="text-sm font-semibold text-[#050505]">Allowed Tool Permissions</h3>
                          <div className="border border-[#DDDBCB] rounded-lg overflow-hidden">
                             <table className="min-w-full divide-y divide-[#DDDBCB]">
                                <thead className="bg-[#FAFAFA]">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase">Action Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-[#737373] uppercase">Type</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-[#737373] uppercase">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-[#DDDBCB]">
                                  {selectedNode.allowedActions.map((action) => (
                                    <tr key={action.id}>
                                      <td className="px-4 py-3 text-sm text-[#050505]">{action.name}</td>
                                      <td className="px-4 py-3 text-xs">
                                        <span className={`px-2 py-0.5 rounded ${action.type === 'Write' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                          {action.type}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-right">
                                         <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={action.enabled} readOnly className="sr-only peer" />
                                            <div className="w-9 h-5 bg-[#DDDBCB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDDBCB] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1B9AAA]"></div>
                                          </label>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                             </table>
                          </div>
                       </div>
                    )}

                    {activeTab === 'channels' && (
                       <div className="grid grid-cols-2 gap-4">
                          {['Web', 'SMS', 'WhatsApp', 'Voice', 'Email'].map(ch => (
                            <div 
                              key={ch}
                              onClick={() => toggleChannel(selectedNodeId!, ch as any)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col justify-between h-24 ${selectedNode.channels.includes(ch as any) ? 'bg-[#1B9AAA]/10 border-[#1B9AAA]' : 'bg-white border-[#DDDBCB] hover:border-[#737373]'}`}
                            >
                               <div className="flex justify-between items-start">
                                  <span className={`font-semibold text-sm ${selectedNode.channels.includes(ch as any) ? 'text-[#1B9AAA]' : 'text-[#050505]'}`}>{ch}</span>
                                  {selectedNode.channels.includes(ch as any) && <Icons.Check />}
                               </div>
                               {selectedNode.channels.includes(ch as any) ? (
                                 <span className="text-xs text-[#1B9AAA] font-medium">Active</span>
                               ) : (
                                 <span className="text-xs text-[#737373]">Disabled</span>
                               )}
                            </div>
                          ))}
                       </div>
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[#DDDBCB] bg-[#FAFAFA] flex gap-3 justify-end">
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  className="px-4 py-2 bg-white border border-[#DDDBCB] rounded-md text-sm font-medium text-[#050505] hover:bg-[#FAFAFA]"
                >
                   Cancel
                </button>
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  className="px-4 py-2 bg-[#1B9AAA] text-white rounded-md text-sm font-medium hover:bg-[#157f8c] shadow-sm"
                >
                   Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
