
import React, { useState, useMemo } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Message: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Phone: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  ChevronRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Zap: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Users: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
};

interface Campaign {
  id: number;
  name: string;
  channels: ('Email' | 'SMS' | 'Voice')[];
  status: 'Active' | 'Scheduled' | 'Draft' | 'Completed' | 'Paused';
  audience: string;
  audienceSize: number;
  engagement: number;
  lastUpdated: string;
}

const CampaignManager: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<string>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const campaigns: Campaign[] = [
    { id: 1, name: 'Fall 2026 Welcome Sequence', channels: ['Email', 'SMS'], status: 'Active', audience: 'Admitted Students', audienceSize: 2847, engagement: 68, lastUpdated: '2h ago' },
    { id: 2, name: 'Financial Aid Retention Push', channels: ['Email', 'Voice'], status: 'Active', audience: 'At-Risk Enrollees', audienceSize: 1892, engagement: 54, lastUpdated: '5h ago' },
    { id: 3, name: 'Deposit Deadline Nurture', channels: ['SMS'], status: 'Scheduled', audience: 'Pending Deposit', audienceSize: 840, engagement: 0, lastUpdated: 'Jan 15' },
    { id: 4, name: 'Regional Outreach (Domestic)', channels: ['Email'], status: 'Paused', audience: 'Prospects (East Coast)', audienceSize: 4200, engagement: 32, lastUpdated: '3d ago' },
  ];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'all' || c.status.toLowerCase() === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [campaigns, searchQuery, activeTab]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Campaign Orchestration</h1>
          <p className="text-sm text-slate-500">Cross-channel engagement strategies and automation.</p>
        </div>
        <button 
          onClick={() => setView('campaign-create')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 shadow-sm transition-all flex items-center gap-2"
        >
          <Icons.Plus />
          New Strategy
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Audience Reach', val: '124.5k', change: '+12% vs last term', icon: <Icons.Users /> },
          { label: 'Avg Engagement Rate', val: '48.2%', change: '+3.4% vs avg', icon: <Icons.Zap /> },
          { label: 'Active Automations', val: '14', change: 'All systems operational', icon: <Icons.Filter /> },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
               <div className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</div>
               <div className="text-2xl font-bold text-slate-900">{kpi.val}</div>
               <div className="text-xs font-medium text-emerald-600 mt-1">{kpi.change}</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex-1 flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
             {['active', 'scheduled', 'paused', 'all'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                   activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>

           <div className="relative w-full md:w-64">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></div>
             <input 
               type="text" 
               placeholder="Search strategies..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
             />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
           {filteredCampaigns.length > 0 ? (
             <div className="divide-y divide-slate-50">
                {filteredCampaigns.map(campaign => (
                  <div 
                    key={campaign.id} 
                    onClick={() => setView('campaign-details')}
                    className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center gap-4"
                  >
                     {/* Status Indicator */}
                     <div className="shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          campaign.status === 'Active' ? 'border-emerald-100 bg-emerald-50 text-emerald-600' :
                          campaign.status === 'Paused' ? 'border-amber-100 bg-amber-50 text-amber-600' :
                          'border-slate-100 bg-slate-50 text-slate-400'
                        }`}>
                          {campaign.status === 'Active' ? <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div> : 
                           campaign.status === 'Paused' ? <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div> : 
                           <div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div>}
                        </div>
                     </div>

                     {/* Content */}
                     <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-4">
                           <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{campaign.name}</h3>
                           <div className="flex items-center gap-2 mt-1">
                             {campaign.channels.map(ch => (
                               <span key={ch} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-500">
                                 {ch === 'Email' ? <Icons.Mail /> : ch === 'SMS' ? <Icons.Message /> : <Icons.Phone />}
                                 {ch}
                               </span>
                             ))}
                           </div>
                        </div>

                        <div className="md:col-span-3">
                           <div className="text-xs text-slate-500">Audience Segment</div>
                           <div className="text-sm font-medium text-slate-800 truncate">{campaign.audience}</div>
                           <div className="text-[10px] text-slate-400">{campaign.audienceSize.toLocaleString()} recipients</div>
                        </div>

                        <div className="md:col-span-3">
                           <div className="flex justify-between items-end mb-1">
                              <span className="text-xs text-slate-500">Engagement</span>
                              <span className="text-xs font-bold text-slate-900">{campaign.engagement}%</span>
                           </div>
                           <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${campaign.engagement > 50 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                style={{ width: `${campaign.engagement}%` }}
                              ></div>
                           </div>
                        </div>
                        
                        <div className="md:col-span-2 text-right">
                           <div className="text-xs text-slate-400 mb-1">Updated {campaign.lastUpdated}</div>
                           <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                              campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                              campaign.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                           }`}>
                              {campaign.status}
                           </span>
                        </div>
                     </div>

                     <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                        <Icons.ChevronRight />
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Icons.Filter />
                <p className="mt-2 text-sm font-medium">No campaigns found matching filter.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CampaignManager;
