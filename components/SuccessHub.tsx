
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  User: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  TrendingUp: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  TrendingDown: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>,
  Alert: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  BookOpen: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Clock: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  CheckCircle: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Filter: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Calendar: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  ChevronRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
};

interface Student {
  id: string;
  name: string;
  major: string;
  year: string;
  gpa: string;
  riskScore: number; // 0-100
  riskFactors: string[];
  lastContact: string;
  status: 'At-Risk' | 'Watchlist' | 'Safe';
}

const SuccessHub: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'risk' | 'interventions' | 'appointments'>('risk');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const students: Student[] = [
    { id: 'S-9921', name: 'Jordan Hayes', major: 'Computer Science', year: 'Freshman', gpa: '2.1', riskScore: 88, riskFactors: ['Attendance < 50%', 'Low Canvas Activity'], lastContact: '2 weeks ago', status: 'At-Risk' },
    { id: 'S-9922', name: 'Mia Wong', major: 'Biology', year: 'Junior', gpa: '2.8', riskScore: 65, riskFactors: ['Midterm Grade Drop'], lastContact: '3 days ago', status: 'Watchlist' },
    { id: 'S-9923', name: 'David Kim', major: 'Business', year: 'Sophomore', gpa: '1.9', riskScore: 92, riskFactors: ['Probation Warning', 'Financial Hold'], lastContact: 'Yesterday', status: 'At-Risk' },
    { id: 'S-9924', name: 'Elena Rodriguez', major: 'Nursing', year: 'Senior', gpa: '3.2', riskScore: 45, riskFactors: ['Late Registration'], lastContact: '1 week ago', status: 'Watchlist' },
  ];

  const interventions = [
    { name: 'Low Attendance Nudge', type: 'SMS', target: 'Attendance < 60%', active: 142, engagement: '68%', status: 'Active' },
    { name: 'Midterm Grade Alert', type: 'Email', target: 'Grade < C-', active: 89, engagement: '42%', status: 'Active' },
    { name: 'Registration Hold Outreach', type: 'Call Task', target: 'Hold = True', active: 34, engagement: '91%', status: 'Paused' },
  ];

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-[#050505]">Student Success</h1>
          <p className="text-sm text-[#737373]">AI-driven retention monitoring and early intervention.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-[#DDDBCB] rounded-lg text-sm font-medium text-[#737373] hover:bg-[#FAFAFA] flex items-center gap-2">
             <Icons.Calendar /> Schedule Blast
           </button>
           <button className="px-4 py-2 bg-[#050505] text-white rounded-lg text-sm font-medium hover:bg-[#222] shadow-sm flex items-center gap-2">
             <Icons.Mail /> Create Intervention
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Retention Prediction', val: '89.2%', sub: 'Target: 90%', color: 'text-[#1B9AAA]', icon: <Icons.TrendingUp /> },
          { label: 'High Risk Students', val: '142', sub: '+12 this week', color: 'text-red-600', icon: <Icons.Alert /> },
          { label: 'Avg Engagement', val: '4.2/5', sub: 'LMS Activity', color: 'text-emerald-600', icon: <Icons.BookOpen /> },
          { label: 'Advisor Load', val: '94%', sub: 'Capacity Reached', color: 'text-amber-600', icon: <Icons.User /> },
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
            onClick={() => setActiveTab('risk')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'risk' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Risk Monitoring
          </button>
          <button 
            onClick={() => setActiveTab('interventions')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'interventions' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Automated Interventions
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${activeTab === 'appointments' ? 'text-[#1B9AAA] border-[#1B9AAA]' : 'text-[#737373] border-transparent hover:text-[#050505]'}`}
          >
            Appointments
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-[#DDDBCB] flex justify-between items-center gap-4">
           <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#DDDBCB] rounded-lg text-xs font-bold text-[#737373] hover:bg-[#FAFAFA]">
                 <Icons.Filter /> Filter
              </button>
              <div className="h-8 w-px bg-[#DDDBCB] mx-2 self-center"></div>
              <span className="text-xs font-medium text-[#737373] self-center">{students.length} Students Found</span>
           </div>
           <div className="relative w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]"><Icons.Search /></span>
              <input type="text" placeholder="Search students..." className="w-full pl-9 pr-3 py-2 bg-[#FAFAFA] border border-[#DDDBCB] rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#1B9AAA]" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'risk' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAFA] text-xs font-bold text-[#737373] border-b border-[#DDDBCB]">
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Risk Assessment</th>
                  <th className="px-6 py-3">Key Factors</th>
                  <th className="px-6 py-3">Last Contact</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAFAFA] text-sm">
                {students.map(student => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudentId(student.id)}
                    className="hover:bg-[#FAFAFA] cursor-pointer group transition-colors"
                  >
                    <td className="px-6 py-4">
                       <div className="font-bold text-[#050505]">{student.name}</div>
                       <div className="text-xs text-[#737373]">{student.major} • {student.year}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                             <span className={`font-bold ${student.riskScore > 80 ? 'text-red-600' : 'text-amber-600'}`}>{student.riskScore}/100</span>
                             <span className="text-[#737373]">Probability</span>
                          </div>
                          <div className="w-full bg-[#FAFAFA] h-1.5 rounded-full overflow-hidden">
                             <div className={`h-full rounded-full ${student.riskScore > 80 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${student.riskScore}%` }}></div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-wrap gap-1">
                          {student.riskFactors.map(f => (
                             <span key={f} className="px-2 py-0.5 bg-red-50 border border-red-100 text-red-700 text-[10px] font-bold rounded">{f}</span>
                          ))}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[#737373] text-xs">
                       {student.lastContact}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-[#DDDBCB] group-hover:text-[#1B9AAA] transition-colors"><Icons.ChevronRight /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'interventions' && (
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interventions.map((int, i) => (
                   <div key={i} className="bg-white border border-[#DDDBCB] rounded-xl p-5 hover:border-[#1B9AAA] hover:shadow-sm transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            int.type === 'SMS' ? 'bg-[#52D1DC]/10 text-[#1B9AAA]' : 
                            int.type === 'Email' ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                            {int.type === 'SMS' ? <Icons.TrendingUp /> : int.type === 'Email' ? <Icons.Mail /> : <Icons.User />}
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                            int.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-[#FAFAFA] text-[#737373] border-[#DDDBCB]'
                         }`}>{int.status}</span>
                      </div>
                      <h3 className="font-bold text-[#050505] text-sm mb-1">{int.name}</h3>
                      <p className="text-xs text-[#737373] mb-4">Trigger: {int.target}</p>
                      
                      <div className="flex items-center gap-4 text-xs font-medium border-t border-[#DDDBCB] pt-3">
                         <div>
                            <span className="text-[#737373] block text-[10px] uppercase tracking-wide">Active</span>
                            <span className="text-[#050505]">{int.active} Students</span>
                         </div>
                         <div>
                            <span className="text-[#737373] block text-[10px] uppercase tracking-wide">Engagement</span>
                            <span className="text-emerald-600">{int.engagement}</span>
                         </div>
                      </div>
                   </div>
                ))}
                
                <div className="border-2 border-dashed border-[#DDDBCB] rounded-xl flex flex-col items-center justify-center text-[#737373] p-6 hover:bg-[#FAFAFA] hover:border-[#737373] transition-all cursor-pointer">
                   <div className="text-3xl mb-2">+</div>
                   <div className="text-sm font-bold">New Workflow</div>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* STUDENT INSPECTOR DRAWER */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
           <div className="absolute inset-0 bg-[#050505]/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedStudentId(null)}></div>
           <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="h-20 px-8 border-b border-[#DDDBCB] flex items-center justify-between bg-[#FAFAFA]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1B9AAA] text-white flex items-center justify-center font-bold text-lg shadow-md">
                       {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                       <h2 className="text-lg font-bold text-[#050505]">{selectedStudent.name}</h2>
                       <div className="text-xs text-[#737373] font-medium">ID: {selectedStudent.id} • {selectedStudent.major}</div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedStudentId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#DDDBCB] text-[#737373] transition-colors">
                    <Icons.Close />
                 </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-white">
                 {/* Risk Alert Banner */}
                 <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-8 flex items-start gap-4">
                    <div className="text-red-500 mt-1"><Icons.Alert /></div>
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-red-900 mb-1">High Attrition Risk Detected</h3>
                       <p className="text-xs text-red-800 leading-relaxed mb-3">
                          AI prediction model indicates an 88% probability of stop-out within the next term due to attendance patterns and grade trajectory.
                       </p>
                       <div className="flex flex-wrap gap-2">
                          {selectedStudent.riskFactors.map(f => (
                             <span key={f} className="px-2 py-1 bg-white border border-red-100 rounded text-[10px] font-bold text-red-700 shadow-sm">{f}</span>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Academic Snapshot */}
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-[#737373] uppercase tracking-widest border-b border-[#DDDBCB] pb-2">Academic Health</h4>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#DDDBCB]">
                             <div className="text-[10px] font-bold text-[#737373] uppercase">Current GPA</div>
                             <div className="text-2xl font-bold text-[#050505]">{selectedStudent.gpa}</div>
                             <div className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                                <Icons.TrendingDown /> -0.4 vs last term
                             </div>
                          </div>
                          <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#DDDBCB]">
                             <div className="text-[10px] font-bold text-[#737373] uppercase">Credits Earned</div>
                             <div className="text-2xl font-bold text-[#050505]">42</div>
                             <div className="text-[10px] font-bold text-[#737373]">On Track</div>
                          </div>
                       </div>
                    </div>

                    {/* Engagement Metrics */}
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-[#737373] uppercase tracking-widest border-b border-[#DDDBCB] pb-2">Engagement</h4>
                       <div className="space-y-3">
                          {[
                             { label: 'LMS Logins (Weekly)', val: '2', target: '5+', status: 'Low' },
                             { label: 'Library Visits', val: '0', target: '1+', status: 'Low' },
                             { label: 'Advisor Meetings', val: '1', target: '2', status: 'Ok' },
                          ].map((m, i) => (
                             <div key={i} className="flex justify-between items-center text-sm">
                                <span className="text-[#737373]">{m.label}</span>
                                <div className="flex items-center gap-2">
                                   <span className="font-bold text-[#050505]">{m.val}</span>
                                   <span className={`w-2 h-2 rounded-full ${m.status === 'Low' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Recent Timeline */}
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-[#737373] uppercase tracking-widest border-b border-[#DDDBCB] pb-2">Activity Timeline</h4>
                    <div className="relative border-l-2 border-[#DDDBCB] ml-2 space-y-6 pl-6 py-2">
                       {[
                          { title: 'Missed Class: Intro to CS', time: 'Yesterday', icon: '⚠️', color: 'bg-red-100 text-red-600' },
                          { title: 'Submitted Assignment: Lab 3', time: '2 days ago', icon: '📝', color: 'bg-[#52D1DC]/10 text-[#1B9AAA]' },
                          { title: 'Advisor Note: Discussed tutoring', time: '1 week ago', icon: '🗣️', color: 'bg-amber-100 text-amber-600' },
                       ].map((event, i) => (
                          <div key={i} className="relative">
                             <div className={`absolute -left-[33px] w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs shadow-sm ${event.color}`}>
                                {event.icon}
                             </div>
                             <div>
                                <div className="text-sm font-bold text-[#050505]">{event.title}</div>
                                <div className="text-xs text-[#737373]">{event.time}</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-[#DDDBCB] bg-[#FAFAFA] flex gap-4">
                 <button className="flex-1 py-3 bg-white border border-[#DDDBCB] rounded-xl text-sm font-bold text-[#737373] hover:bg-[#FAFAFA] shadow-sm">
                    Add Note
                 </button>
                 <button className="flex-1 py-3 bg-[#1B9AAA] text-white rounded-xl text-sm font-bold hover:bg-[#157f8c] shadow-lg shadow-[#1B9AAA]/20 flex items-center justify-center gap-2">
                    <Icons.Mail /> Send Nudge
                 </button>
                 <button className="flex-1 py-3 bg-[#050505] text-white rounded-xl text-sm font-bold hover:bg-[#222] shadow-lg flex items-center justify-center gap-2">
                    <Icons.User /> Schedule Meeting
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SuccessHub;
