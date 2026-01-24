
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  Server: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  Chip: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  Ticket: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
  Wifi: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>,
  Activity: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Terminal: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
};

interface Ticket {
  id: string;
  requester: string;
  role: string;
  department: string;
  category: 'IT' | 'Facilities' | 'HR' | 'Finance';
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Escalated' | 'Pending AI';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  aiConfidence: number; // 0-100
  aiAction: string;
  created: string;
}

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  status: 'Running' | 'Completed' | 'Failed' | 'Paused';
  step: string;
  progress: number;
  started: string;
}

const OperationsHub: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'workflows' | 'infrastructure'>('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const tickets: Ticket[] = [
    { id: 'INC-4921', requester: 'Dr. Sarah Miller', role: 'Faculty', department: 'Biology', category: 'IT', subject: 'Canvas Login Error - 403 Forbidden', status: 'Pending AI', priority: 'High', aiConfidence: 89, aiAction: 'Reset Session Token', created: '10 mins ago' },
    { id: 'INC-4922', requester: 'James Chen', role: 'Student', department: 'Housing', category: 'Facilities', subject: 'AC Unit leaking in Dorm Room 404', status: 'Open', priority: 'Medium', aiConfidence: 95, aiAction: 'Dispatch Vendor: CoolAir', created: '1 hour ago' },
    { id: 'REQ-1002', requester: 'HR System', role: 'System', department: 'Admin', category: 'HR', subject: 'New Hire Provisioning: E. Vance', status: 'In Progress', priority: 'Low', aiConfidence: 99, aiAction: 'Run Script: onboarding_v4', created: '2 hours ago' },
    { id: 'INC-4923', requester: 'Prof. Albus', role: 'Faculty', department: 'History', category: 'IT', subject: 'WiFi signal weak in Lecture Hall B', status: 'Escalated', priority: 'Medium', aiConfidence: 45, aiAction: 'Unknown Network Topology', created: 'Yesterday' },
  ];

  const workflows: Workflow[] = [
    { id: 'WF-8821', name: 'Faculty Onboarding: E. Vance', trigger: 'Workday Event', status: 'Running', step: 'Provisioning Email', progress: 65, started: '10:42 AM' },
    { id: 'WF-8822', name: 'End of Term Grade Sync', trigger: 'Calendar Schedule', status: 'Completed', step: 'Final Verification', progress: 100, started: '02:00 AM' },
    { id: 'WF-8823', name: 'Dorm Access Audit', trigger: 'Security Alert', status: 'Failed', step: 'Door #421 Timeout', progress: 42, started: 'Yesterday' },
  ];

  const systems = [
    { name: 'Canvas LMS', status: 'Operational', uptime: '99.99%', latency: '42ms', region: 'US-East' },
    { name: 'Ellucian Banner', status: 'Degraded', uptime: '98.2%', latency: '1240ms', region: 'On-Prem' },
    { name: 'Campus WiFi (Eduroam)', status: 'Operational', uptime: '99.5%', latency: '12ms', region: 'Campus-Wide' },
    { name: 'Workday ERP', status: 'Operational', uptime: '99.9%', latency: '89ms', region: 'Cloud' },
  ];

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#050505]">Operations Command Center</h1>
          <p className="text-sm text-[#737373]">Autonomous infrastructure management and support orchestration.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-[#DDDBCB] rounded-lg text-sm font-medium text-[#737373] hover:bg-[#FAFAFA] flex items-center gap-2 shadow-sm">
             <Icons.Terminal /> Run Script
           </button>
           <button className="px-4 py-2 bg-[#050505] text-white rounded-lg text-sm font-medium hover:bg-[#222] shadow-sm flex items-center gap-2">
             <Icons.Ticket /> Create Ticket
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Auto-Resolution Rate', val: '68.4%', sub: '+4.2% this week', color: 'text-[#1B9AAA]', icon: <Icons.Chip /> },
          { label: 'Active Incidents', val: '14', sub: '2 Critical', color: 'text-amber-600', icon: <Icons.Alert /> },
          { label: 'System Uptime', val: '99.8%', sub: 'Banner Latency High', color: 'text-emerald-600', icon: <Icons.Server /> },
          { label: 'Cost Savings', val: '$42.1k', sub: 'YTD Efficiency', color: 'text-[#737373]', icon: <Icons.Activity /> },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-[#DDDBCB] shadow-sm flex flex-col justify-between">
             <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-[#737373]">{kpi.label}</div>
                <div className="text-[#737373]">{kpi.icon}</div>
             </div>
             <div>
                <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
                <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wide">{kpi.sub}</div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-[#DDDBCB] shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#DDDBCB] bg-[#FAFAFA]/50">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'tickets' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Service Desk
          </button>
          <button 
            onClick={() => setActiveTab('workflows')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'workflows' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Automated Workflows
          </button>
          <button 
            onClick={() => setActiveTab('infrastructure')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'infrastructure' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            System Health
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-0">
          
          {/* TICKETS TAB */}
          {activeTab === 'tickets' && (
             <div className="flex flex-col h-full">
                <div className="p-4 border-b border-[#DDDBCB] flex justify-between items-center bg-white">
                   <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDDBCB] rounded-lg text-xs font-bold text-[#737373] hover:bg-[#FAFAFA]">
                         <Icons.Filter /> Status: All
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDDBCB] rounded-lg text-xs font-bold text-[#737373] hover:bg-[#FAFAFA]">
                         Category: IT
                      </button>
                   </div>
                   <div className="relative w-64">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"><Icons.Search /></span>
                      <input type="text" placeholder="Search incidents..." className="w-full pl-9 pr-3 py-2 bg-[#FAFAFA] border border-[#DDDBCB] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1B9AAA]" />
                   </div>
                </div>
                <div className="overflow-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-[#FAFAFA] text-xs font-bold text-[#737373] border-b border-[#DDDBCB]">
                            <th className="px-6 py-4">Incident / Subject</th>
                            <th className="px-6 py-4">Requester</th>
                            <th className="px-6 py-4">Priority / Status</th>
                            <th className="px-6 py-4">AI Diagnostic</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FAFAFA] text-sm">
                         {tickets.map(ticket => (
                            <tr 
                              key={ticket.id} 
                              onClick={() => setSelectedTicketId(ticket.id)}
                              className="hover:bg-[#FAFAFA] cursor-pointer transition-colors group"
                            >
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="font-mono text-xs text-[#737373]">{ticket.id}</span>
                                     <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                        ticket.category === 'IT' ? 'bg-[#52D1DC]/10 text-[#1B9AAA] border-[#52D1DC]/20' :
                                        ticket.category === 'Facilities' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                        'bg-[#FAFAFA] text-[#737373] border-[#DDDBCB]'
                                     }`}>{ticket.category}</span>
                                  </div>
                                  <div className="font-medium text-[#050505] group-hover:text-[#1B9AAA] transition-colors">{ticket.subject}</div>
                               </td>
                               <td className="px-6 py-4">
                                  <div className="text-[#050505] font-medium">{ticket.requester}</div>
                                  <div className="text-xs text-[#737373]">{ticket.role} • {ticket.department}</div>
                               </td>
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-2 mb-1">
                                     <div className={`w-2 h-2 rounded-full ${
                                        ticket.priority === 'Critical' ? 'bg-red-600 animate-pulse' :
                                        ticket.priority === 'High' ? 'bg-amber-500' : 'bg-[#1B9AAA]'
                                     }`}></div>
                                     <span className="text-xs font-medium text-[#737373]">{ticket.priority}</span>
                                  </div>
                                  <div className="text-xs text-[#737373]">{ticket.status}</div>
                               </td>
                               <td className="px-6 py-4">
                                  <div className="w-full max-w-[140px]">
                                     <div className="flex justify-between text-[10px] font-bold text-[#737373] mb-1">
                                        <span>Confidence</span>
                                        <span>{ticket.aiConfidence}%</span>
                                     </div>
                                     <div className="w-full bg-[#FAFAFA] h-1.5 rounded-full overflow-hidden mb-1">
                                        <div className={`h-full ${ticket.aiConfidence > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${ticket.aiConfidence}%`}}></div>
                                     </div>
                                     <div className="text-[10px] text-[#1B9AAA] font-medium truncate">{ticket.aiAction}</div>
                                  </div>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button className="text-[#737373] hover:text-[#1B9AAA] font-bold px-2">View</button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          )}

          {/* WORKFLOWS TAB */}
          {activeTab === 'workflows' && (
             <div className="p-6 grid grid-cols-1 gap-4">
                {workflows.map(wf => (
                   <div key={wf.id} className="bg-white border border-[#DDDBCB] rounded-xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${
                         wf.status === 'Running' ? 'bg-[#52D1DC]/10 text-[#1B9AAA]' :
                         wf.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                         {wf.status === 'Running' ? <span className="animate-spin">⚙️</span> : wf.status === 'Completed' ? <Icons.CheckCircle /> : <Icons.Alert />}
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <h3 className="text-base font-bold text-[#050505]">{wf.name}</h3>
                               <p className="text-xs text-[#737373]">Trigger: {wf.trigger} • Started {wf.started}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                               wf.status === 'Running' ? 'bg-[#52D1DC]/10 text-[#1B9AAA]' :
                               wf.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>{wf.status}</span>
                         </div>
                         <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium text-[#737373]">
                               <span>Current Step: {wf.step}</span>
                               <span>{wf.progress}%</span>
                            </div>
                            <div className="w-full bg-[#FAFAFA] h-2 rounded-full overflow-hidden">
                               <div className={`h-full transition-all duration-1000 ${
                                  wf.status === 'Failed' ? 'bg-red-500' : 'bg-[#1B9AAA]'
                               }`} style={{width: `${wf.progress}%`}}></div>
                            </div>
                         </div>
                      </div>
                      <button className="p-2 text-[#737373] hover:text-[#050505] border border-[#DDDBCB] rounded-lg hover:bg-[#FAFAFA]">
                         Details
                      </button>
                   </div>
                ))}
             </div>
          )}

          {/* INFRASTRUCTURE TAB */}
          {activeTab === 'infrastructure' && (
             <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {systems.map((sys, i) => (
                      <div key={i} className={`p-6 rounded-xl border-l-4 shadow-sm flex justify-between items-center ${
                         sys.status === 'Operational' ? 'bg-emerald-50/50 border-emerald-500' : 
                         sys.status === 'Degraded' ? 'bg-amber-50/50 border-amber-500' : 'bg-red-50/50 border-red-500'
                      }`}>
                         <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${
                               sys.status === 'Operational' ? 'bg-emerald-500' : 
                               sys.status === 'Degraded' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
                            }`}></div>
                            <div>
                               <h3 className="text-lg font-bold text-[#050505]">{sys.name}</h3>
                               <div className="text-xs text-[#737373] font-medium">{sys.region}</div>
                            </div>
                         </div>
                         <div className="text-right space-y-1">
                            <div className={`text-sm font-bold ${
                               sys.status === 'Operational' ? 'text-emerald-700' : 
                               sys.status === 'Degraded' ? 'text-amber-700' : 'text-red-700'
                            }`}>{sys.status}</div>
                            <div className="text-xs text-[#737373] flex items-center justify-end gap-3">
                               <span><span className="font-bold">{sys.uptime}</span> Uptime</span>
                               <span><span className="font-bold">{sys.latency}</span> Latency</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
                
                <div className="mt-8 p-6 bg-[#050505] rounded-xl text-white">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg flex items-center gap-2"><Icons.Terminal /> Mainframe Logs</h3>
                      <span className="text-xs font-mono text-emerald-400 animate-pulse">● Live Stream</span>
                   </div>
                   <div className="font-mono text-xs text-[#737373] space-y-1 h-32 overflow-hidden relative">
                      <div>[10:42:01] SIS: Batch job #9921 started (Grade Roll)</div>
                      <div>[10:42:05] NET: Access Point #124 (Library) reporting packet loss</div>
                      <div>[10:42:12] IAM: Provisioned user 'e.vance' in Active Directory</div>
                      <div className="text-amber-400">[10:42:45] WARN: Database 'Banner_Prod' CPU &gt; 85%</div>
                      <div>[10:43:01] LMS: Course sync completed successfully</div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505] to-transparent"></div>
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>

      {/* TICKET INSPECTOR DRAWER */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-[#050505]/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedTicketId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="h-20 px-8 border-b border-[#DDDBCB] flex items-center justify-between bg-[#FAFAFA]">
                 <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#737373] uppercase tracking-wide mb-1">
                       <span>{selectedTicket.id}</span>
                       <span className="text-[#737373]">/</span>
                       <span>{selectedTicket.category}</span>
                    </div>
                    <h2 className="text-lg font-bold text-[#050505] truncate max-w-md">{selectedTicket.subject}</h2>
                 </div>
                 <button onClick={() => setSelectedTicketId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DDDBCB] text-[#737373] transition-colors">
                    <Icons.Close />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                 
                 {/* AI Triage Card */}
                 <div className="bg-[#FAFAFA] border border-[#DDDBCB] rounded-xl p-5 mb-8">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#1B9AAA] rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#1B9AAA]/20">AI</div>
                          <div>
                             <h4 className="text-sm font-bold text-[#050505]">Diagnostic Analysis</h4>
                             <p className="text-xs text-[#737373]">Confidence: <span className="font-bold text-emerald-600">{selectedTicket.aiConfidence}%</span></p>
                          </div>
                       </div>
                       <span className="px-2 py-1 bg-white border border-[#DDDBCB] rounded text-[10px] font-bold text-[#737373] shadow-sm">
                          Model: Ops-Gen-4
                       </span>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="text-sm text-[#737373] leading-relaxed bg-white p-3 rounded-lg border border-[#DDDBCB]">
                          Based on the error code <code>403 Forbidden</code> and user role, this appears to be a session token mismatch in Canvas. Common resolution is forcing a session refresh via API.
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <button className="flex-1 py-2 bg-[#1B9AAA] text-white rounded-lg text-xs font-bold hover:bg-[#157f8c] shadow-sm flex items-center justify-center gap-2">
                             <Icons.Terminal /> Execute: {selectedTicket.aiAction}
                          </button>
                          <button className="px-4 py-2 bg-white border border-[#DDDBCB] text-[#737373] rounded-lg text-xs font-bold hover:bg-[#FAFAFA]">
                             Ignore
                          </button>
                       </div>
                    </div>
                 </div>

                 {/* User Info */}
                 <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 border border-[#DDDBCB] rounded-xl">
                       <div className="text-[10px] font-bold text-[#737373] uppercase mb-2">Requester</div>
                       <div className="font-bold text-[#050505]">{selectedTicket.requester}</div>
                       <div className="text-xs text-[#737373]">{selectedTicket.role} • {selectedTicket.department}</div>
                    </div>
                    <div className="p-4 border border-[#DDDBCB] rounded-xl">
                       <div className="text-[10px] font-bold text-[#737373] uppercase mb-2">Asset Context</div>
                       <div className="font-bold text-[#050505]">MacBook Pro (M2)</div>
                       <div className="text-xs text-[#737373]">IP: 10.4.2.21 (Campus WiFi)</div>
                    </div>
                 </div>

                 {/* Activity Log */}
                 <div>
                    <h4 className="text-xs font-bold text-[#737373] uppercase tracking-wide mb-4">Activity Log</h4>
                    <div className="space-y-6 relative border-l-2 border-[#DDDBCB] ml-2 pl-6 pb-2">
                       <div className="relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-[#DDDBCB] border-2 border-white"></div>
                          <div className="text-xs text-[#737373] mb-1">{selectedTicket.created}</div>
                          <div className="text-sm text-[#050505]">Ticket created via Web Portal</div>
                       </div>
                       <div className="relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-[#52D1DC]/20 border-2 border-white"></div>
                          <div className="text-xs text-[#737373] mb-1">2 mins later</div>
                          <div className="text-sm text-[#050505]">AI triage initiated. Categorized as <span className="font-bold">IT / High Priority</span>.</div>
                       </div>
                    </div>
                 </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#DDDBCB] bg-[#FAFAFA] flex gap-4">
                 <button className="flex-1 py-3 bg-white border border-[#DDDBCB] rounded-xl text-sm font-bold text-[#737373] hover:bg-[#FAFAFA] shadow-sm">
                    Assign to Human
                 </button>
                 <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg flex items-center justify-center gap-2">
                    <Icons.CheckCircle /> Mark Resolved
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default OperationsHub;
