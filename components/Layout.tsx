
import React, { useState } from 'react';
import { AppView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  user: User;
  onLogout: () => void;
  onOpenChat: () => void;
}

// Simple SVG Icons components
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Target: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Shield: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Diamond: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
  Bolt: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Chart: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Database: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Rocket: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, // Reusing bolt for rocket/action
  Message: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  File: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  List: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
  ChevronDown: () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
};

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, user, onLogout, onOpenChat }) => {
  const [isEnrollmentExpanded, setIsEnrollmentExpanded] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Orchestration Hub', icon: <Icons.Dashboard /> },
    { id: 'enrollment-hub', label: 'Enrollment', icon: <Icons.Target />, hasSub: true },
    { id: 'success-hub', label: 'Student Success', icon: <Icons.Shield /> },
    { id: 'advancement-hub', label: 'Advancement', icon: <Icons.Diamond /> },
    { id: 'operations-hub', label: 'Operations', icon: <Icons.Bolt /> },
  ];

  const enrollmentSub = [
    { id: 'enrollment-hub', label: 'Overview', icon: <Icons.Chart /> },
    { id: 'kb-manage', label: 'Knowledge Base', icon: <Icons.Database /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Icons.Rocket /> },
    { id: 'conversations', label: 'Interactions', icon: <Icons.Message /> },
    { id: 'doc-processing', label: 'Documents', icon: <Icons.File /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#050505] border-r border-[#222] z-50 flex flex-col">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#222]">
           <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('dashboard')}>
            <div className="relative">
               <span className="text-xl font-bold text-white tracking-tight">Unifuse</span>
               <span className="absolute -top-1 -right-3 text-[10px] font-bold text-[#52D1DC]">AI</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map(item => (
            <div key={item.id}>
              <button
                onClick={() => item.hasSub ? setIsEnrollmentExpanded(!isEnrollmentExpanded) : setView(item.id as AppView)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  activeView === item.id || (item.hasSub && enrollmentSub.some(s => s.id === activeView))
                    ? 'bg-[#1B9AAA]/20 text-white' 
                    : 'text-[#737373] hover:bg-[#222] hover:text-[#FAFAFA]'
                }`}
              >
                <span className={`${activeView === item.id ? 'text-white' : 'text-[#737373]'}`}>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasSub && (
                  <span className={`transform transition-transform text-[#737373] ${isEnrollmentExpanded ? 'rotate-180' : ''}`}>
                    <Icons.ChevronDown />
                  </span>
                )}
              </button>
              
              {item.hasSub && isEnrollmentExpanded && (
                <div className="ml-9 mt-1 space-y-0.5 border-l border-[#333] pl-3">
                  {enrollmentSub.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setView(sub.id as AppView)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                        activeView === sub.id || (sub.id === 'conversations' && activeView === 'agent-details')
                          ? 'text-white bg-[#1B9AAA]/10' 
                          : 'text-[#737373] hover:text-[#FAFAFA]'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-6 pb-2 px-3 text-[10px] font-semibold text-[#555] uppercase tracking-wider">Administration</div>
          <button onClick={() => setView('integrations')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#737373] hover:bg-[#222] hover:text-[#FAFAFA] transition-colors">
            <span className="text-[#737373]"><Icons.Settings /></span>
            <span>Integrations</span>
          </button>
          <button onClick={() => setView('audit-logs')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#737373] hover:bg-[#222] hover:text-[#FAFAFA] transition-colors">
            <span className="text-[#737373]"><Icons.List /></span>
            <span>Audit Logs</span>
          </button>
        </div>

        {/* User Footer */}
        <div 
          onClick={() => setView('settings')}
          className="p-4 border-t border-[#222] cursor-pointer hover:bg-[#222] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1B9AAA] flex items-center justify-center text-sm font-bold text-white border border-[#222]">
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user.name}</div>
              <div className="text-xs text-[#737373] truncate">Platform Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <header className="h-16 bg-[#FAFAFA] border-b border-[#DDDBCB] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-xs font-medium text-[#737373]">
            <span>Institutional Control</span>
            <span className="text-[#DDDBCB]">/</span> 
            <span className="text-[#050505] capitalize">{activeView.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#737373] hover:text-[#050505] relative">
              <Icons.Bell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#FAFAFA]"></span>
            </button>
            <button 
              onClick={onOpenChat} 
              className="px-4 py-2 bg-[#1B9AAA] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#157f8c] transition-colors flex items-center gap-2"
            >
              <Icons.Bolt /> AI Assistant
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
