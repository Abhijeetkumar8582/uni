
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  Diamond: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  CreditCard: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Receipt: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Users: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
};

interface Donor {
  id: string;
  name: string;
  classYear?: string;
  type: 'Alumni' | 'Corporation' | 'Parent' | 'Foundation';
  lifetimeGiving: string;
  lastGift: string;
  wealthScore: number; // 1-100
  engagementScore: number; // 1-100
  status: 'Active' | 'Lapsed' | 'New';
  major: string;
  employer: string;
}

interface Transaction {
  id: string;
  donorName: string;
  amount: string;
  date: string;
  method: 'Credit Card' | 'ACH' | 'Stock' | 'Check';
  status: 'Processed' | 'Pending' | 'Failed';
  type: 'One-time' | 'Recurring' | 'Pledge Payment';
  campaign: string;
  invoiceId?: string;
}

const AdvancementHub: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'donors' | 'transactions'>('campaigns');
  const [selectedDonorId, setSelectedDonorId] = useState<string | null>(null);

  const donors: Donor[] = [
    { id: 'D-8821', name: 'Robert Smith', classYear: '1998', type: 'Alumni', lifetimeGiving: '$124,500', lastGift: '2 days ago', wealthScore: 92, engagementScore: 88, status: 'Active', major: 'Economics', employer: 'Goldman Sachs' },
    { id: 'D-8822', name: 'TechGlobal Inc.', type: 'Corporation', lifetimeGiving: '$500,000', lastGift: '1 month ago', wealthScore: 99, engagementScore: 45, status: 'Active', major: 'N/A', employer: 'N/A' },
    { id: 'D-8823', name: 'Sarah Jenkins', classYear: '2005', type: 'Alumni', lifetimeGiving: '$5,200', lastGift: '1 year ago', wealthScore: 65, engagementScore: 72, status: 'Lapsed', major: 'Art History', employer: 'Metropolitan Museum' },
    { id: 'D-8824', name: 'Michael & Angela Lee', type: 'Parent', lifetimeGiving: '$25,000', lastGift: '3 months ago', wealthScore: 84, engagementScore: 60, status: 'Active', major: 'N/A', employer: 'Kaiser Permanente' },
  ];

  const transactions: Transaction[] = [
    { id: 'TRX-9921', donorName: 'Robert Smith', amount: '$5,000.00', date: 'Oct 14, 2025', method: 'Credit Card', status: 'Processed', type: 'One-time', campaign: 'Annual Fund', invoiceId: 'INV-2025-001' },
    { id: 'TRX-9922', donorName: 'TechGlobal Inc.', amount: '$25,000.00', date: 'Oct 12, 2025', method: 'ACH', status: 'Pending', type: 'Pledge Payment', campaign: 'Engineering Hall', invoiceId: 'INV-2025-002' },
    { id: 'TRX-9923', donorName: 'Elena Rodriguez', amount: '$150.00', date: 'Oct 10, 2025', method: 'Credit Card', status: 'Failed', type: 'Recurring', campaign: 'Scholarship Fund' },
  ];

  const campaigns = [
    { name: '2026 Annual Fund', raised: '$3.4M', goal: '$5.0M', percent: 68, donors: '12,421', daysLeft: 142 },
    { name: 'Engineering Innovation Hall', raised: '$12.1M', goal: '$15.0M', percent: 81, donors: '482', daysLeft: 45 },
    { name: 'Women in STEM Scholarship', raised: '$420k', goal: '$1.0M', percent: 42, donors: '891', daysLeft: 210 },
  ];

  const selectedDonor = donors.find(d => d.id === selectedDonorId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#050505]">Philanthropy Command Center</h1>
          <p className="text-sm text-[#737373]">Fundraising intelligence, donor stewardship, and gift processing.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-[#DDDBCB] rounded-lg text-sm font-medium text-[#737373] hover:bg-[#FAFAFA] flex items-center gap-2 shadow-sm">
             <Icons.Receipt /> Create Invoice
           </button>
           <button className="px-4 py-2 bg-[#050505] text-white rounded-lg text-sm font-medium hover:bg-[#222] shadow-sm flex items-center gap-2">
             <Icons.CreditCard /> Process Gift
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Raised (YTD)', val: '$15.9M', sub: '↑ 12.4% YoY', color: 'text-amber-600', icon: <Icons.Diamond /> },
          { label: 'Active Donors', val: '14,201', sub: 'Retention: 84%', color: 'text-[#1B9AAA]', icon: <Icons.Users /> },
          { label: 'Avg Gift Size', val: '$1,120', sub: 'Major Gifts: 42', color: 'text-emerald-600', icon: <Icons.TrendingUp /> },
          { label: 'Pledge Fulfillment', val: '92.4%', sub: '$2.1M Outstanding', color: 'text-[#52D1DC]', icon: <Icons.Receipt /> },
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
            onClick={() => setActiveTab('campaigns')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'campaigns' ? 'text-amber-600 border-amber-600' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Campaigns
          </button>
          <button 
            onClick={() => setActiveTab('donors')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'donors' ? 'text-amber-600 border-amber-600' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Donor Stewardship
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'transactions' ? 'text-amber-600 border-amber-600' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Transactions & Invoices
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-[#DDDBCB] flex justify-between items-center gap-4">
           <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDDBCB] rounded-lg text-xs font-bold text-[#737373] hover:bg-[#FAFAFA]">
                 <Icons.Filter /> Filter
              </button>
              <div className="h-8 w-px bg-[#DDDBCB] mx-2 self-center"></div>
              {activeTab === 'donors' && <span className="text-xs font-medium text-[#737373] self-center">Showing Top 50 Donors</span>}
              {activeTab === 'transactions' && <span className="text-xs font-medium text-[#737373] self-center">Recent Activity</span>}
           </div>
           <div className="relative w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"><Icons.Search /></span>
              <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-[#FAFAFA] border border-[#DDDBCB] rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-100" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]/30">
          
          {/* CAMPAIGNS TAB */}
          {activeTab === 'campaigns' && (
             <div className="grid grid-cols-1 gap-6">
                {campaigns.map((camp, i) => (
                   <div key={i} className="bg-white border border-[#DDDBCB] rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <h3 className="text-lg font-bold text-[#050505]">{camp.name}</h3>
                            <p className="text-xs text-[#737373]">{camp.donors} donors • {camp.daysLeft} days remaining</p>
                         </div>
                         <div className="text-right">
                            <div className="text-2xl font-bold text-[#050505]">{camp.raised}</div>
                            <div className="text-xs text-[#737373]">of {camp.goal} Goal</div>
                         </div>
                      </div>
                      <div className="w-full bg-[#FAFAFA] h-3 rounded-full overflow-hidden mb-2">
                         <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${camp.percent}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-[#737373]">
                         <span>0%</span>
                         <span>{camp.percent}% Funded</span>
                         <span>100%</span>
                      </div>
                   </div>
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-[#050505] rounded-xl text-white relative overflow-hidden">
                      <div className="relative z-10">
                         <h3 className="font-bold text-lg mb-2">AI Prospect Identification</h3>
                         <p className="text-sm text-[#737373] mb-6">Our model identified 124 alumni with high capacity who haven't given in 2 years.</p>
                         <button className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors">
                            Generate Call List
                         </button>
                      </div>
                      <div className="absolute -right-6 -bottom-6 text-slate-800 text-9xl opacity-20">🎯</div>
                   </div>
                   <div className="p-6 bg-white border border-[#DDDBCB] rounded-xl flex items-center justify-center text-center cursor-pointer hover:bg-[#FAFAFA] border-dashed border-2">
                      <div>
                         <div className="w-12 h-12 bg-[#FAFAFA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#737373]">
                            <Icons.Plus />
                         </div>
                         <h3 className="font-bold text-[#050505]">Start New Campaign</h3>
                         <p className="text-xs text-[#737373]">Define goal, timeline, and segments</p>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* DONORS TAB */}
          {activeTab === 'donors' && (
             <div className="bg-white border border-[#DDDBCB] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-[#FAFAFA] text-xs font-bold text-[#737373] border-b border-[#DDDBCB]">
                         <th className="px-6 py-4">Donor Name</th>
                         <th className="px-6 py-4">Type / Affiliation</th>
                         <th className="px-6 py-4">Lifetime Giving</th>
                         <th className="px-6 py-4">AI Wealth Score</th>
                         <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#FAFAFA] text-sm">
                      {donors.map(donor => (
                         <tr 
                           key={donor.id} 
                           onClick={() => setSelectedDonorId(donor.id)}
                           className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                         >
                            <td className="px-6 py-4">
                               <div className="font-bold text-[#050505]">{donor.name}</div>
                               <div className="text-xs text-[#737373]">ID: {donor.id}</div>
                            </td>
                            <td className="px-6 py-4">
                               <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                  donor.type === 'Alumni' ? 'bg-[#52D1DC]/10 text-[#1B9AAA] border-[#52D1DC]/20' :
                                  donor.type === 'Corporation' ? 'bg-[#FAFAFA] text-[#737373] border-[#DDDBCB]' :
                                  'bg-emerald-50 text-emerald-700 border-emerald-100'
                               }`}>
                                  {donor.type} {donor.classYear && `'${donor.classYear.slice(2)}`}
                               </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-[#050505] font-medium">
                               {donor.lifetimeGiving}
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                     donor.wealthScore > 90 ? 'bg-emerald-500' : donor.wealthScore > 70 ? 'bg-[#1B9AAA]' : 'bg-[#737373]'
                                  }`}>
                                     {donor.wealthScore}
                                  </div>
                                  <div className="text-[10px] text-[#737373] leading-tight">Propensity<br/>Index</div>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-[#737373] hover:text-amber-600 transition-colors">View Profile →</button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === 'transactions' && (
             <div className="bg-white border border-[#DDDBCB] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-[#FAFAFA] text-xs font-bold text-[#737373] border-b border-[#DDDBCB]">
                         <th className="px-6 py-4">Transaction ID</th>
                         <th className="px-6 py-4">Donor</th>
                         <th className="px-6 py-4">Amount / Campaign</th>
                         <th className="px-6 py-4">Method / Status</th>
                         <th className="px-6 py-4 text-right">Invoice / Receipt</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#FAFAFA] text-sm">
                      {transactions.map(trx => (
                         <tr key={trx.id} className="hover:bg-[#FAFAFA] transition-colors">
                            <td className="px-6 py-4 text-xs font-mono text-[#737373]">{trx.id}</td>
                            <td className="px-6 py-4 font-bold text-[#050505]">{trx.donorName}</td>
                            <td className="px-6 py-4">
                               <div className="font-bold text-[#050505]">{trx.amount}</div>
                               <div className="text-xs text-[#737373]">{trx.campaign}</div>
                            </td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-[#737373]">{trx.method}</span>
                                  <span className={`w-2 h-2 rounded-full ${
                                     trx.status === 'Processed' ? 'bg-emerald-500' :
                                     trx.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                                  }`}></span>
                               </div>
                               <span className={`text-[10px] font-bold uppercase tracking-wide ${
                                   trx.status === 'Processed' ? 'text-emerald-600' :
                                   trx.status === 'Pending' ? 'text-amber-600' : 'text-red-600'
                               }`}>{trx.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                               {trx.invoiceId ? (
                                  <button className="px-3 py-1 bg-white border border-[#DDDBCB] rounded text-xs font-bold text-[#1B9AAA] hover:bg-[#FAFAFA] flex items-center gap-1 ml-auto">
                                     <Icons.Download /> {trx.invoiceId}
                                  </button>
                               ) : (
                                  <span className="text-xs text-[#737373] italic">N/A</span>
                               )}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}

        </div>
      </div>

      {/* DONOR INSPECTOR DRAWER */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-[#050505]/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedDonorId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="h-24 px-8 border-b border-[#DDDBCB] flex items-center justify-between bg-[#FAFAFA] relative overflow-hidden">
                 <div className="absolute top-0 right-0 text-[#DDDBCB] opacity-50 -mt-4 -mr-4">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                 </div>
                 <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
                       {selectedDonor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                       <h2 className="text-xl font-bold text-[#050505]">{selectedDonor.name}</h2>
                       <div className="flex items-center gap-2 text-sm text-[#737373] font-medium">
                          <span>{selectedDonor.type}</span>
                          <span>•</span>
                          <span>{selectedDonor.major}</span>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedDonorId(null)} className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FAFAFA] text-[#737373] transition-colors">
                    <Icons.Close />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                 
                 {/* Wealth Profile */}
                 <div className="bg-[#050505] rounded-2xl p-6 text-white mb-8 shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <h3 className="font-bold text-lg">AI Wealth Profile</h3>
                          <p className="text-xs text-[#737373]">Powered by WealthEngine & Internal Data</p>
                       </div>
                       <div className="px-3 py-1 bg-amber-500 rounded text-xs font-bold text-white shadow-sm">Top 5% Prospect</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                       <div className="p-3 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold text-amber-400">{selectedDonor.wealthScore}</div>
                          <div className="text-[10px] uppercase tracking-wide text-[#737373]">Capacity Score</div>
                       </div>
                       <div className="p-3 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold text-blue-400">$125k</div>
                          <div className="text-[10px] uppercase tracking-wide text-[#737373]">Est. Annual Giving</div>
                       </div>
                       <div className="p-3 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold text-emerald-400">High</div>
                          <div className="text-[10px] uppercase tracking-wide text-[#737373]">Liquidity</div>
                       </div>
                    </div>
                 </div>

                 {/* Key Stats */}
                 <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-[#737373] uppercase tracking-widest border-b border-[#DDDBCB] pb-2">Giving History</h4>
                       <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Lifetime Total</span>
                             <span className="font-bold text-[#050505]">{selectedDonor.lifetimeGiving}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Last Gift Date</span>
                             <span className="font-bold text-[#050505]">{selectedDonor.lastGift}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Largest Gift</span>
                             <span className="font-bold text-[#050505]">$50,000</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-[#737373] uppercase tracking-widest border-b border-[#DDDBCB] pb-2">Engagement</h4>
                       <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Event Attendance</span>
                             <span className="font-bold text-[#050505]">8 / 12</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Email Open Rate</span>
                             <span className="font-bold text-emerald-600">92%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                             <span className="text-[#737373]">Volunteer?</span>
                             <span className="font-bold text-[#1B9AAA]">Yes (Mentor)</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Contact & Employment */}
                 <div className="p-5 border border-[#DDDBCB] rounded-xl bg-[#FAFAFA] space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white border border-[#DDDBCB] flex items-center justify-center text-[#737373]"><Icons.Users /></div>
                        <div>
                           <div className="text-xs font-bold text-[#737373] uppercase">Current Employer</div>
                           <div className="text-sm font-bold text-[#050505]">{selectedDonor.employer}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white border border-[#DDDBCB] flex items-center justify-center text-[#737373]">📧</div>
                        <div>
                           <div className="text-xs font-bold text-[#737373] uppercase">Preferred Email</div>
                           <div className="text-sm font-bold text-[#050505]">r.smith@goldmansachs.com</div>
                        </div>
                     </div>
                 </div>

              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-[#DDDBCB] bg-[#FAFAFA] flex gap-4">
                 <button className="flex-1 py-3 bg-white border border-[#DDDBCB] rounded-xl text-sm font-bold text-[#737373] hover:bg-[#FAFAFA] shadow-sm">
                    Log Contact
                 </button>
                 <button className="flex-1 py-3 bg-[#050505] text-white rounded-xl text-sm font-bold hover:bg-[#222] shadow-lg flex items-center justify-center gap-2">
                    <Icons.CreditCard /> Process New Gift
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdvancementHub;
