
import React, { useState } from 'react';
import { AppView } from '../types';

// --- VISUAL ASSETS ---

const Icons = {
  Target: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  TrendingUp: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Map: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" /></svg>,
  Layout: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Rocket: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  BarChart: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Pie: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
};

interface EnrollmentWidget {
  id: string;
  title: string;
  type: 'funnel' | 'trend' | 'kpi' | 'map' | 'bar' | 'pie';
  size: 'small' | 'medium' | 'large';
  data: any;
  color: string;
  visible: boolean;
  isCustom?: boolean;
}

// Configuration Constants
const BUILDER_METRICS = ['Applications', 'Admitted', 'Deposits', 'Yield Rate', 'Melt Rate', 'Net Tuition'];
const BUILDER_DIMENSIONS = ['Time (Trend)', 'Geography (State)', 'Student Type', 'Source Channel', 'Department'];

const EnrollmentHub: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [timeRange, setTimeRange] = useState('Fall 2026');

  // Builder State
  const [buildMetric, setBuildMetric] = useState(BUILDER_METRICS[0]);
  const [buildDimensions, setBuildDimensions] = useState<string[]>([]);
  const [buildChartType, setBuildChartType] = useState<'trend' | 'bar' | 'pie' | 'map'>('trend');

  const [widgets, setWidgets] = useState<EnrollmentWidget[]>([
    { id: 'w1', title: 'Total Applications', type: 'kpi', size: 'small', color: 'text-[#1B9AAA]', data: { val: '12,402', trend: '+8.4% YoY', sub: 'Completed Apps' }, visible: true },
    { id: 'w2', title: 'Yield Rate Prediction', type: 'kpi', size: 'small', color: 'text-emerald-600', data: { val: '28.4%', trend: '+1.2% vs Goal', sub: 'AI Confidence: 92%' }, visible: true },
    { id: 'w3', title: 'Admissions Funnel', type: 'funnel', size: 'large', color: 'text-[#050505]', data: { inquiry: 45000, app: 12402, admit: 8200, deposit: 2340 }, visible: true },
    { id: 'w4', title: 'Geo-Demographic Heatmap', type: 'map', size: 'medium', color: 'text-[#52D1DC]', data: { top: ['California', 'Texas', 'New York'], emerging: 'Florida' }, visible: true },
    { id: 'w5', title: 'Financial Aid Usage', type: 'trend', size: 'medium', color: 'text-amber-600', data: [20, 35, 45, 50, 65, 78, 82], visible: true },
    { id: 'w6', title: 'Melt Risk', type: 'kpi', size: 'small', color: 'text-red-500', data: { val: '4.2%', trend: '-0.5% vs avg', sub: 'Est. 98 Students' }, visible: false },
    { id: 'w7', title: 'Campus Tour Bookings', type: 'trend', size: 'medium', color: 'text-violet-600', data: [10, 15, 25, 40, 35, 60, 55], visible: false },
  ]);

  const activeWidgets = widgets.filter(w => w.visible);

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
  };

  const removeCustomWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const strategies = [
    { name: 'Priority Deadline Nurture', status: 'Active', reach: '14.2k', engagement: '48%', roi: 'High', type: 'Email + SMS' },
    { name: 'FAFSA Completion Push', status: 'Active', reach: '8.1k', engagement: '32%', roi: 'Medium', type: 'SMS' },
    { name: 'Honors College Invite', status: 'Scheduled', reach: '1.2k', engagement: '-', roi: '-', type: 'Multi-channel' },
  ];

  // --- BUILDER LOGIC ---

  const handleDimensionToggle = (dim: string) => {
    if (buildDimensions.includes(dim)) {
      setBuildDimensions(buildDimensions.filter(d => d !== dim));
    } else {
      setBuildDimensions([...buildDimensions, dim]);
    }
  };

  const getRecommendedChart = () => {
    if (buildDimensions.includes('Geography (State)')) return 'map';
    if (buildDimensions.includes('Time (Trend)')) return 'trend';
    if (buildDimensions.length > 0) return 'bar';
    return 'kpi';
  };

  const addCustomWidget = () => {
    const newId = `custom-${Date.now()}`;
    const chartType = buildChartType; 
    let mockData: any = {};

    // Generate mock data based on type
    if (chartType === 'trend') mockData = [45, 52, 49, 60, 58, 65, 72];
    if (chartType === 'bar') mockData = { current: 65, target: 100, unit: '%' }; // Simplified for now
    if (chartType === 'map') mockData = { top: ['New York', 'New Jersey'], emerging: 'Connecticut' };
    if (chartType === 'pie') mockData = { segments: [{l: 'A', v: 30}, {l: 'B', v: 70}] };

    const newWidget: EnrollmentWidget = {
      id: newId,
      title: `${buildMetric} by ${buildDimensions.join(' & ')}`,
      type: chartType as any,
      size: 'medium',
      color: 'text-[#1B9AAA]',
      data: mockData,
      visible: true,
      isCustom: true
    };

    setWidgets([...widgets, newWidget]);
    setBuildDimensions([]);
    setIsEditing(false); // Close drawer to show result
  };

  // --- SUB-COMPONENTS ---

  const AreaChart = ({ color, data }: { color: string; data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d - min) / (max - min)) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="w-full h-24 overflow-hidden relative mt-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" className={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor="currentColor" className={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`M0,100 L0,${100 - ((data[0]-min)/(max-min))*80} ${points.split(' ').map((p,i) => `L${p}`).join(' ')} L100,100 Z`} fill={`url(#grad-${color})`} className={color} />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className={color} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    );
  };

  const FunnelViz = ({ data }: { data: any }) => {
    const max = data.inquiry;
    const steps = [
      { label: 'Inquiries', val: data.inquiry, color: 'bg-[#DDDBCB]' },
      { label: 'Applicants', val: data.app, color: 'bg-[#52D1DC]/40' },
      { label: 'Admitted', val: data.admit, color: 'bg-[#1B9AAA]/60' },
      { label: 'Deposits', val: data.deposit, color: 'bg-[#1B9AAA]' },
    ];

    return (
      <div className="space-y-4 mt-2">
        {steps.map((step, i) => (
          <div key={step.label} className="relative group">
            <div className="flex justify-between text-xs font-bold text-[#737373] mb-1 z-10 relative">
              <span>{step.label}</span>
              <span>{step.val.toLocaleString()}</span>
            </div>
            <div className="h-8 w-full bg-[#FAFAFA] rounded-lg overflow-hidden relative">
              <div 
                className={`h-full ${step.color} rounded-lg transition-all duration-1000 ease-out`} 
                style={{ width: `${(step.val / max) * 100}%` }}
              ></div>
              {i > 0 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#737373] opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.round((step.val / steps[i-1].val) * 100)}% Conv.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Mock Bar Chart for Custom Widgets
  const BarChart = ({ color, data }: { color: string, data: any }) => (
    <div className="h-full flex items-end justify-between gap-2 mt-4 px-2">
       {[60, 45, 78, 52, 90, 30].map((h, i) => (
         <div key={i} className="w-full bg-[#FAFAFA] rounded-t-sm relative group h-32 flex items-end">
            <div 
              className={`w-full ${color.replace('text', 'bg')} opacity-80 group-hover:opacity-100 transition-all rounded-t-sm`} 
              style={{ height: `${h}%` }}
            ></div>
         </div>
       ))}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#DDDBCB] pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#050505] tracking-tight">Enrollment Command</h1>
          <p className="text-[#737373] mt-1">Lifecycle orchestration from lead generation to matriculation.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 bg-white border border-[#DDDBCB] rounded-lg px-3 py-2 text-sm font-medium text-[#737373] shadow-sm hover:bg-[#FAFAFA] cursor-pointer">
              <Icons.Calendar />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              >
                <option>Fall 2026</option>
                <option>Spring 2026</option>
                <option>Fall 2025 (Hist)</option>
              </select>
           </div>
           <button 
             onClick={() => setIsEditing(!isEditing)}
             className={`px-4 py-2 border rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
               isEditing ? 'bg-[#1B9AAA] text-white border-[#1B9AAA] shadow-md' : 'bg-white text-[#737373] border-[#DDDBCB] hover:bg-[#FAFAFA]'
             }`}
           >
             <Icons.Layout /> {isEditing ? 'Done' : 'Customize'}
           </button>
           <button 
             onClick={() => setView('campaign-create')}
             className="px-4 py-2 bg-[#050505] text-white rounded-lg text-sm font-bold hover:bg-[#222] shadow-lg flex items-center gap-2"
           >
             <Icons.Rocket /> New Strategy
           </button>
        </div>
      </div>

      {/* --- EDIT MODE / METRIC COMPOSER DRAWER --- */}
      {isEditing && (
        <div className="bg-[#FAFAFA] border border-[#DDDBCB] rounded-2xl p-8 mb-8 animate-in slide-in-from-top-4 shadow-inner">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left: Visibility Toggles */}
              <div className="space-y-4 border-r border-[#DDDBCB] pr-8">
                 <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2 mb-4">
                    <Icons.Filter /> Active Widgets
                 </h3>
                 <div className="grid grid-cols-1 gap-2">
                    {widgets.map(w => (
                       <div key={w.id} className="flex items-center justify-between p-2 bg-white border border-[#DDDBCB] rounded-lg">
                          <span className="text-sm font-medium text-[#737373]">{w.title}</span>
                          <div className="flex items-center gap-2">
                             {w.isCustom && <button onClick={() => removeCustomWidget(w.id)} className="text-red-400 hover:text-red-600 px-2"><Icons.Trash /></button>}
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={w.visible} onChange={() => toggleWidget(w.id)} className="sr-only peer" />
                                <div className="w-9 h-5 bg-[#DDDBCB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDDBCB] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1B9AAA]"></div>
                             </label>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Right: Metric Composer */}
              <div className="lg:col-span-2 space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-[#050505] flex items-center gap-2">
                       <Icons.Plus /> Metric Composer
                    </h3>
                    <span className="text-xs font-bold text-[#737373] uppercase tracking-widest">Create Custom Graph</span>
                 </div>

                 <div className="bg-white rounded-xl border border-[#DDDBCB] p-6 space-y-6">
                    {/* Step 1: Metric */}
                    <div>
                       <label className="text-xs font-bold text-[#737373] uppercase tracking-wide block mb-2">1. Analyze Metric</label>
                       <div className="flex flex-wrap gap-2">
                          {BUILDER_METRICS.map(m => (
                             <button 
                                key={m}
                                onClick={() => setBuildMetric(m)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                                   buildMetric === m ? 'bg-[#1B9AAA]/10 border-[#1B9AAA] text-[#1B9AAA]' : 'bg-white border-[#DDDBCB] text-[#737373] hover:border-[#737373]'
                                }`}
                             >
                                {m}
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* Step 2: Dimensions */}
                    <div>
                       <label className="text-xs font-bold text-[#737373] uppercase tracking-wide block mb-2">2. Broken Down By (Context)</label>
                       <div className="flex flex-wrap gap-2">
                          {BUILDER_DIMENSIONS.map(d => (
                             <button 
                                key={d}
                                onClick={() => handleDimensionToggle(d)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                   buildDimensions.includes(d) ? 'bg-[#52D1DC]/10 border-[#52D1DC] text-[#1B9AAA]' : 'bg-white border-[#DDDBCB] text-[#737373] hover:border-[#737373]'
                                }`}
                             >
                                {d}
                             </button>
                          ))}
                       </div>
                    </div>

                    {/* Step 3: Visualization */}
                    <div className="flex items-end justify-between">
                       <div>
                          <label className="text-xs font-bold text-[#737373] uppercase tracking-wide block mb-2">3. Visualize As</label>
                          <div className="flex gap-2">
                             {[
                                { id: 'trend', icon: <Icons.TrendingUp />, label: 'Trend' },
                                { id: 'bar', icon: <Icons.BarChart />, label: 'Distribution' },
                                { id: 'pie', icon: <Icons.Pie />, label: 'Ratio' },
                                { id: 'map', icon: <Icons.Map />, label: 'Map' },
                             ].map(t => (
                                <button 
                                   key={t.id}
                                   onClick={() => setBuildChartType(t.id as any)}
                                   className={`flex flex-col items-center justify-center w-16 h-14 rounded-lg border transition-all ${
                                      buildChartType === t.id ? 'bg-[#050505] text-white border-[#050505]' : 'bg-white border-[#DDDBCB] text-[#737373] hover:text-[#050505]'
                                   }`}
                                >
                                   {t.icon}
                                   <span className="text-[9px] mt-1">{t.label}</span>
                                </button>
                             ))}
                          </div>
                       </div>

                       <button 
                         onClick={addCustomWidget}
                         disabled={buildDimensions.length === 0}
                         className="px-6 py-3 bg-[#1B9AAA] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-[#157f8c] disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
                       >
                          <Icons.Plus /> Add to Dashboard
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- WIDGET GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {activeWidgets.map(w => (
            <div 
              key={w.id} 
              className={`bg-white p-5 rounded-2xl border border-[#DDDBCB] shadow-sm flex flex-col justify-between 
                ${w.size === 'large' ? 'md:col-span-2 xl:col-span-2 row-span-2' : ''} 
                ${w.size === 'medium' ? 'md:col-span-2 xl:col-span-1' : ''}
                ${isEditing ? 'animate-pulse ring-2 ring-[#1B9AAA]/20' : ''}
              `}
            >
               <div className="flex justify-between items-start">
                  <div>
                     <div className="flex items-center gap-2">
                        {w.isCustom && <span className="px-1.5 py-0.5 rounded-md bg-[#52D1DC]/10 text-[#1B9AAA] text-[9px] font-bold uppercase tracking-wide border border-[#52D1DC]/20">Custom</span>}
                        <h3 className="text-sm font-bold text-[#050505]">{w.title}</h3>
                     </div>
                     {w.type === 'kpi' && <div className="text-[10px] font-medium text-[#737373] mt-1">{w.data.sub}</div>}
                  </div>
                  {w.type === 'kpi' && <div className={`text-2xl font-bold ${w.color}`}>{w.data.val}</div>}
               </div>

               {/* KPI Visualization */}
               {w.type === 'kpi' && (
                  <div className="mt-4 flex items-center gap-2">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${w.data.trend.includes('-') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {w.data.trend}
                     </span>
                  </div>
               )}

               {/* Funnel Visualization */}
               {w.type === 'funnel' && <FunnelViz data={w.data} />}

               {/* Trend Visualization */}
               {w.type === 'trend' && <AreaChart color={w.color} data={w.data} />}

               {/* Bar Chart Visualization (For Custom Widgets) */}
               {w.type === 'bar' && <BarChart color={w.color} data={w.data} />}

               {/* Map Visualization (Simplified) */}
               {w.type === 'map' && (
                  <div className="mt-4 space-y-3">
                     <div className="flex items-center gap-2 text-xs font-medium text-[#737373]">
                        <Icons.Map />
                        Top Markets
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {w.data.top.map((place: string) => (
                           <span key={place} className="px-2 py-1 bg-[#FAFAFA] rounded text-[10px] font-bold text-[#737373] border border-[#DDDBCB]">
                              {place}
                           </span>
                        ))}
                     </div>
                     <div className="text-[10px] text-[#737373] mt-2">Emerging: <span className="text-[#1B9AAA] font-bold">{w.data.emerging || 'N/A'}</span></div>
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* --- STRATEGY ENGINE & INSIGHTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Strategy Monitor */}
         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#DDDBCB] shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-[#050505] flex items-center gap-2">
                  <Icons.Target /> Strategy Engine
               </h3>
               <button className="text-xs font-bold text-[#1B9AAA] hover:text-[#157f8c]">View All Campaigns</button>
            </div>
            
            <div className="space-y-4">
               {strategies.map((strat, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-[#DDDBCB] hover:border-[#1B9AAA] transition-colors group">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow-sm ${
                           strat.status === 'Active' ? 'bg-white text-emerald-600' : 'bg-[#DDDBCB] text-[#737373]'
                        }`}>
                           {strat.status === 'Active' ? '⚡' : '📅'}
                        </div>
                        <div>
                           <div className="font-bold text-[#050505] text-sm group-hover:text-[#1B9AAA] transition-colors">{strat.name}</div>
                           <div className="text-xs text-[#737373]">{strat.type} • Reach: {strat.reach}</div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-6 text-right">
                        <div>
                           <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">Engagement</div>
                           <div className="font-bold text-[#050505]">{strat.engagement}</div>
                        </div>
                        <div>
                           <div className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">ROI</div>
                           <div className="font-bold text-emerald-600">{strat.roi}</div>
                        </div>
                        <button className="p-2 text-[#DDDBCB] hover:text-[#1B9AAA] transition-colors">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* AI Feed / Quick Actions */}
         <div className="space-y-6">
            <div className="bg-[#050505] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                     Live Intelligence
                  </h3>
                  <div className="space-y-4">
                     {[
                        { time: '10m ago', msg: 'Yield prediction increased to 28.5% due to high deposit volume from Texas.' },
                        { time: '1h ago', msg: 'Competitor "State U" extended deadline. Suggested action: Send reminder SMS.' },
                     ].map((feed, i) => (
                        <div key={i} className="flex gap-3 text-xs leading-relaxed opacity-90">
                           <span className="font-mono text-[#737373] whitespace-nowrap">{feed.time}</span>
                           <span>{feed.msg}</span>
                        </div>
                     ))}
                  </div>
                  <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                     View Intelligence Report
                  </button>
               </div>
               {/* Decorative BG */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B9AAA]/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
            </div>

            <div className="bg-white rounded-2xl border border-[#DDDBCB] p-6 shadow-sm">
               <h3 className="text-xs font-bold text-[#737373] uppercase tracking-widest mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setView('kb-manage')} className="p-3 rounded-lg border border-[#DDDBCB] hover:bg-[#FAFAFA] text-xs font-bold text-[#737373] transition-colors text-center">
                     Update Docs
                  </button>
                  <button onClick={() => setView('doc-processing')} className="p-3 rounded-lg border border-[#DDDBCB] hover:bg-[#FAFAFA] text-xs font-bold text-[#737373] transition-colors text-center">
                     Review Queue (35)
                  </button>
                  <button className="col-span-2 p-3 rounded-lg bg-[#1B9AAA] hover:bg-[#157f8c] text-white text-xs font-bold transition-colors text-center shadow-md shadow-[#1B9AAA]/20">
                     Launch Flash Campaign
                  </button>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default EnrollmentHub;
