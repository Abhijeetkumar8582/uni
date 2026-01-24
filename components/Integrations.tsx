
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  Server: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  Globe: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  Activity: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  Refresh: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Settings: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  Key: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
};

interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'SIS' | 'LMS' | 'ERP' | 'Communication';
  status: 'Connected' | 'Error' | 'Syncing' | 'Paused';
  lastSync: string;
  uptime: string;
  description: string;
}

const Integrations: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'installed' | 'marketplace' | 'api'>('installed');
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string | null>(null);

  const integrations: Integration[] = [
    { id: 'INT-01', name: 'Technolutions Slate', category: 'CRM', status: 'Connected', lastSync: '2m ago', uptime: '99.99%', description: 'Bi-directional sync for applications, reader bins, and decision release status.' },
    { id: 'INT-02', name: 'Instructure Canvas', category: 'LMS', status: 'Syncing', lastSync: 'In Progress', uptime: '99.95%', description: 'Real-time grade passback, assignment alerts, and course enrollment provisioning.' },
    { id: 'INT-03', name: 'Ellucian Banner', category: 'SIS', status: 'Error', lastSync: '4h ago', uptime: '98.2%', description: 'System of record for student financials, registration, and academic history.' },
    { id: 'INT-04', name: 'Workday Human Capital', category: 'ERP', status: 'Connected', lastSync: '1h ago', uptime: '99.9%', description: 'Faculty and staff directory sync, payroll integration, and role-based access control.' },
    { id: 'INT-05', name: 'Microsoft Azure AD', category: 'ERP', status: 'Connected', lastSync: 'Real-time', uptime: '100%', description: 'Single Sign-On (SSO) provider and identity management source of truth.' },
    { id: 'INT-06', name: 'Salesforce Education', category: 'CRM', status: 'Paused', lastSync: '2d ago', uptime: '99.5%', description: 'Alumni relations and donor management system integration.' },
  ];

  const selectedIntegration = integrations.find(i => i.id === selectedIntegrationId);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Connectivity Mesh</h1>
          <p className="text-sm text-slate-500">Manage data pipelines, API connectors, and ecosystem synchronization.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm">
             <Icons.Key /> API Keys
           </button>
           <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-sm flex items-center gap-2">
             <Icons.Plus /> New Connection
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Pipes', val: '14', sub: '2 Syncing', color: 'text-blue-600', icon: <Icons.Activity /> },
          { label: 'API Throughput', val: '2.4k', sub: 'Reqs / min', color: 'text-emerald-600', icon: <Icons.Globe /> },
          { label: 'Avg Latency', val: '42ms', sub: 'Global', color: 'text-slate-900', icon: <Icons.Server /> },
          { label: 'Sync Errors', val: '1', sub: 'Banner SIS', color: 'text-red-600', icon: <Icons.Alert /> },
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
        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('installed')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'installed' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
          >
            Installed Connectors
          </button>
          <button 
            onClick={() => setActiveTab('marketplace')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'marketplace' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
          >
            Connector Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'api' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
          >
            Developer API
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          
          {activeTab === 'installed' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((int, i) => (
                   <div 
                     key={i} 
                     onClick={() => setSelectedIntegrationId(int.id)}
                     className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer group"
                   >
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                               {getInitials(int.name)}
                            </div>
                            <div>
                               <h3 className="font-bold text-slate-900">{int.name}</h3>
                               <div className="text-xs text-slate-500">{int.category}</div>
                            </div>
                         </div>
                         <div className={`w-2.5 h-2.5 rounded-full ${
                            int.status === 'Connected' ? 'bg-emerald-500' : 
                            int.status === 'Syncing' ? 'bg-blue-500 animate-pulse' : 
                            int.status === 'Paused' ? 'bg-amber-500' : 'bg-red-500'
                         }`}></div>
                      </div>
                      
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">{int.description}</p>
                      
                      <div className="flex items-center justify-between text-xs font-medium pt-4 border-t border-slate-50">
                         <div className="flex items-center gap-2 text-slate-600">
                            <Icons.Refresh />
                            <span>{int.lastSync}</span>
                         </div>
                         <div className={`${
                            int.uptime === '100%' ? 'text-emerald-600' : 'text-slate-600'
                         }`}>{int.uptime} Uptime</div>
                      </div>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'marketplace' && (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl font-bold">MK</div>
                <h3 className="text-lg font-bold text-slate-900">Connector Library</h3>
                <p className="text-sm text-slate-500 max-w-md">Browse 150+ pre-built integrations for higher education tools including Blackbaud, PowerCampus, Moodle, and more.</p>
                <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Browse Catalog</button>
             </div>
          )}

        </div>
      </div>

      {/* CONFIGURATION DRAWER */}
      {selectedIntegration && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedIntegrationId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="h-20 px-8 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-bold text-sm text-slate-700 shadow-sm">
                       {getInitials(selectedIntegration.name)}
                    </div>
                    <div>
                       <h2 className="text-lg font-bold text-slate-900">{selectedIntegration.name}</h2>
                       <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span className={`w-2 h-2 rounded-full ${
                             selectedIntegration.status === 'Connected' ? 'bg-emerald-500' : 
                             selectedIntegration.status === 'Error' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></span>
                          {selectedIntegration.status} • {selectedIntegration.category}
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedIntegrationId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors">
                    <Icons.Close />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                 
                 {/* Authentication Config */}
                 <div className="space-y-6 mb-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Authentication</h4>
                    <div className="space-y-4">
                       <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">API Endpoint URL</label>
                          <div className="flex gap-2">
                             <input type="text" value={`https://api.${selectedIntegration.name.toLowerCase().replace(' ', '')}.com/v1`} readOnly className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600" />
                             <button className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Test</button>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="text-xs font-bold text-slate-700 block mb-1">Client ID</label>
                             <input type="password" value="client_id_882192" readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-700 block mb-1">Client Secret</label>
                             <input type="password" value="••••••••••••••••" readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600" />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Sync Settings */}
                 <div className="space-y-6 mb-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Sync Configuration</h4>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex justify-between items-center">
                       <div>
                          <div className="text-sm font-bold text-blue-900">Auto-Sync Enabled</div>
                          <div className="text-xs text-blue-700">Synchronizing every 15 minutes.</div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked readOnly className="sr-only peer" />
                          <div className="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                       </label>
                    </div>

                    <div className="space-y-3">
                       <label className="text-xs font-bold text-slate-700 block">Entity Mapping</label>
                       {[
                          { entity: 'Students', mode: 'Bi-directional', status: 'Active' },
                          { entity: 'Courses', mode: 'Read-only', status: 'Active' },
                          { entity: 'Grades', mode: 'Write-only', status: 'Paused' },
                       ].map((map, i) => (
                          <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                             <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-900">{map.entity}</span>
                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{map.mode}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase ${map.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>{map.status}</span>
                                <Icons.Settings />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Logs */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Recent Logs</h4>
                    <div className="space-y-2 font-mono text-xs">
                       <div className="flex justify-between text-emerald-600">
                          <span>[SUCCESS] Sync batch #9921 completed (42 records)</span>
                          <span className="text-slate-400">14:02:21</span>
                       </div>
                       <div className="flex justify-between text-emerald-600">
                          <span>[SUCCESS] Token refresh successful</span>
                          <span className="text-slate-400">13:45:00</span>
                       </div>
                       <div className="flex justify-between text-red-600">
                          <span>[ERROR] Timeout waiting for endpoint /students/v2</span>
                          <span className="text-slate-400">10:12:44</span>
                       </div>
                    </div>
                 </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-4">
                 <button className="flex-1 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
                    View Full Logs
                 </button>
                 <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2">
                    <Icons.Refresh /> Force Sync Now
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;
