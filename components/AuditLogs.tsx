
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  Shield: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  User: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Clock: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  File: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
};

interface LogEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  time: string;
  timestamp: string;
  type: 'Security' | 'AI' | 'Data' | 'Admin';
  severity: 'Info' | 'Warning' | 'Critical';
  ip: string;
  location: string;
  details: string;
}

const AuditLogs: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Security'>('All');

  const logs: LogEntry[] = [
    { id: 'LOG-9921', user: 'Security System', role: 'System', action: 'Failed Login Attempt', target: 'Auth Gateway', time: '12m ago', timestamp: 'Oct 24, 14:02:21', type: 'Security', severity: 'Critical', ip: '192.168.1.42', location: 'Unknown Proxy', details: '5 consecutive failed attempts from same IP block.' },
    { id: 'LOG-9922', user: 'Jane Doe', role: 'Admin', action: 'Modified Knowledge Base', target: 'Admission Req. 2026', time: '45m ago', timestamp: 'Oct 24, 13:30:05', type: 'Data', severity: 'Info', ip: '10.0.0.12', location: 'Campus Network', details: 'Updated document tags: +Fall2026, -Draft.' },
    { id: 'LOG-9923', user: 'System Bot', role: 'AI Agent', action: 'Auto-resolved Ticket', target: 'Ticket #4921', time: '1h ago', timestamp: 'Oct 24, 13:15:00', type: 'AI', severity: 'Info', ip: 'Internal', location: 'US-East-1', details: 'Applied resolution script based on 98% confidence match.' },
    { id: 'LOG-9924', user: 'Mike Admin', role: 'DevOps', action: 'API Key Rotated', target: 'Slate Integration', time: '2h ago', timestamp: 'Oct 24, 12:00:00', type: 'Admin', severity: 'Warning', ip: '10.0.0.8', location: 'VPN (Remote)', details: 'Manual rotation of client secret for Slate connector.' },
    { id: 'LOG-9925', user: 'Jane Doe', role: 'Admin', action: 'Exported Student List', target: 'Campaign: Welcome', time: '4h ago', timestamp: 'Oct 24, 10:00:00', type: 'Data', severity: 'Warning', ip: '10.0.0.12', location: 'Campus Network', details: 'CSV export of 2,400 records containing PII.' },
  ];

  const selectedLog = logs.find(l => l.id === selectedLogId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Governance Ledger</h1>
          <p className="text-sm text-slate-500">Immutable record of security events and platform activity.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm">
             <Icons.Download /> Export Report
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events (24h)', val: '24,102', sub: 'Normal Volume', color: 'text-blue-600', icon: <Icons.File /> },
          { label: 'Security Flags', val: '2', sub: 'Requires Review', color: 'text-red-600', icon: <Icons.Shield /> },
          { label: 'Admin Actions', val: '142', sub: 'Config Changes', color: 'text-slate-900', icon: <Icons.User /> },
          { label: 'Compliance Score', val: '98%', sub: 'FERPA Audit', color: 'text-emerald-600', icon: <Icons.Check /> }, // Using Check directly here for simplicity or creating it
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

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center gap-4">
           <div className="flex gap-2">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                 {['All', 'Critical', 'Security'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f as any)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                       {f}
                    </button>
                 ))}
              </div>
              <div className="h-8 w-px bg-slate-200 mx-2 self-center"></div>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                 <Icons.Filter /> Adv. Filter
              </button>
           </div>
           <div className="relative w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></span>
              <input type="text" placeholder="Search logs (User, IP, Action)..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-100" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50 text-xs font-bold text-slate-500 border-b border-slate-200">
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Actor</th>
                    <th className="px-6 py-3">Event Action</th>
                    <th className="px-6 py-3">Target Resource</th>
                    <th className="px-6 py-3 text-right">Severity</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                 {logs.map(log => (
                    <tr 
                      key={log.id} 
                      onClick={() => setSelectedLogId(log.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedLogId === log.id ? 'bg-blue-50/50' : ''}`}
                    >
                       <td className="px-6 py-4 text-xs font-mono text-slate-500">
                          <div>{log.timestamp}</div>
                          <div className="text-slate-400">{log.time}</div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{log.user}</div>
                          <div className="text-xs text-slate-500">{log.role}</div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="font-medium text-slate-700">{log.action}</div>
                          <div className="text-xs text-slate-400">{log.type} Event</div>
                       </td>
                       <td className="px-6 py-4">
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs text-blue-600 font-bold">{log.target}</code>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                             log.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                             log.severity === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                             'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                             {log.severity === 'Critical' && <Icons.Alert />}
                             {log.severity}
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* INSPECTOR DRAWER */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedLogId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="h-20 px-8 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                 <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                       <span>{selectedLog.id}</span>
                       <span className="text-slate-300">/</span>
                       <span>{selectedLog.type}</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedLog.action}</h2>
                 </div>
                 <button onClick={() => setSelectedLogId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
                    <Icons.Close />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                 
                 {/* Metadata Grid */}
                 <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                       <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Actor Context</div>
                       <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500"><Icons.User /></div>
                          <div>
                             <div className="font-bold text-sm text-slate-900">{selectedLog.user}</div>
                             <div className="text-xs text-slate-500">{selectedLog.role}</div>
                          </div>
                       </div>
                       <div className="text-xs text-slate-500 font-mono mt-2">
                          IP: {selectedLog.ip}<br/>
                          Loc: {selectedLog.location}
                       </div>
                    </div>
                    <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                       <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Event Scope</div>
                       <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500"><Icons.Shield /></div>
                          <div>
                             <div className="font-bold text-sm text-slate-900">{selectedLog.severity}</div>
                             <div className="text-xs text-slate-500">Severity Level</div>
                          </div>
                       </div>
                       <div className="text-xs text-slate-500 font-mono mt-2">
                          Target: {selectedLog.target}<br/>
                          Time: {selectedLog.timestamp}
                       </div>
                    </div>
                 </div>

                 {/* Details Payload */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Forensic Detail</h4>
                    <div className="p-4 bg-slate-900 rounded-xl text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto">
                       {`{
  "event_id": "${selectedLog.id}",
  "timestamp_utc": "${new Date().toISOString()}",
  "actor": {
    "uid": "usr_88291",
    "ip_address": "${selectedLog.ip}",
    "session_id": "sess_99210"
  },
  "action": {
    "type": "${selectedLog.action}",
    "resource": "${selectedLog.target}",
    "outcome": "Success"
  },
  "metadata": {
    "details": "${selectedLog.details}"
  }
}`}
                    </div>
                    <div className="text-sm text-slate-600 bg-white p-4 border border-slate-200 rounded-xl">
                       <span className="font-bold text-slate-900">Summary: </span>
                       {selectedLog.details}
                    </div>
                 </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-4">
                 <button className="flex-1 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                    Copy JSON
                 </button>
                 {selectedLog.severity === 'Critical' && (
                    <button className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg flex items-center justify-center gap-2">
                       <Icons.Shield /> Create Incident
                    </button>
                 )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
