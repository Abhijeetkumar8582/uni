
import React, { useState } from 'react';
import { AppView } from '../types';

// Professional SVG Icons
const Icons = {
  User: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Lock: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Check: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ShieldCheck: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
};

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Platform Admin' | 'Org Admin' | 'Bot Admin' | 'Viewer';
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
  initials: string;
}

const Settings: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'security' | 'notifications'>('team');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Bot Admin');

  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Jane Doe', email: 'jane.doe@university.edu', role: 'Platform Admin', status: 'Active', lastActive: 'Now', initials: 'JD' },
    { id: '2', name: 'Marcus Chen', email: 'm.chen@university.edu', role: 'Org Admin', status: 'Active', lastActive: '2h ago', initials: 'MC' },
    { id: '3', name: 'Sarah Miller', email: 's.miller@university.edu', role: 'Bot Admin', status: 'Active', lastActive: '1d ago', initials: 'SM' },
    { id: '4', name: 'David Wilson', email: 'd.wilson@university.edu', role: 'Viewer', status: 'Invited', lastActive: '-', initials: 'DW' },
  ]);

  const handleInvite = () => {
    if (inviteEmail) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0], // Placeholder name
        email: inviteEmail,
        role: inviteRole as any,
        status: 'Invited',
        lastActive: '-',
        initials: inviteEmail.substring(0, 2).toUpperCase()
      };
      setMembers([...members, newMember]);
      setIsInviteModalOpen(false);
      setInviteEmail('');
    }
  };

  const handleRoleChange = (id: string, newRole: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole as any } : m));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const RoleBadge = ({ role }: { role: string }) => {
    const styles = {
      'Platform Admin': 'bg-purple-100 text-purple-700 border-purple-200',
      'Org Admin': 'bg-blue-100 text-blue-700 border-blue-200',
      'Bot Admin': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Viewer': 'bg-slate-100 text-slate-600 border-slate-200'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${styles[role as keyof typeof styles]}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">Manage your workspace</p>
        </div>
        
        {[
          { id: 'profile', label: 'My Profile', icon: <Icons.User /> },
          { id: 'team', label: 'Team & Roles', icon: <Icons.Users /> },
          { id: 'security', label: 'Security', icon: <Icons.Lock /> },
          { id: 'notifications', label: 'Notifications', icon: <Icons.Bell /> },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === item.id 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* --- TEAM & ROLES (RBAC) --- */}
        {activeTab === 'team' && (
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Team Members</h2>
                <p className="text-xs text-slate-500">Manage access levels and permissions.</p>
              </div>
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2"
              >
                <Icons.Plus /> Invite Member
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">User</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Role</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Last Active</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-300">
                            {member.initials}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{member.name}</div>
                            <div className="text-xs text-slate-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative group">
                           <RoleBadge role={member.role} />
                           {/* Simple role switcher logic simulation */}
                           <select 
                             className="absolute inset-0 opacity-0 cursor-pointer"
                             value={member.role}
                             onChange={(e) => handleRoleChange(member.id, e.target.value)}
                           >
                             <option>Platform Admin</option>
                             <option>Org Admin</option>
                             <option>Bot Admin</option>
                             <option>Viewer</option>
                           </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                          member.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                        {member.lastActive}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="Remove User"
                        >
                          <Icons.Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PROFILE --- */}
        {activeTab === 'profile' && (
          <div className="p-8 max-w-2xl space-y-8">
             <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-3xl font-bold shadow-lg">JD</div>
                <div>
                   <h2 className="text-xl font-bold text-slate-900">Jane Doe</h2>
                   <p className="text-sm text-slate-500">Platform Admin • Admissions Dept.</p>
                   <button className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700">Change Avatar</button>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                   <input type="text" defaultValue="Jane Doe" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
                   <input type="email" defaultValue="jane.doe@university.edu" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none" />
                </div>
             </div>

             <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Password</h3>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">Reset Password</button>
             </div>
          </div>
        )}

        {/* --- SECURITY --- */}
        {activeTab === 'security' && (
           <div className="p-8 max-w-2xl space-y-8">
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-4">Authentication</h3>
                 <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Icons.ShieldCheck /></div>
                       <div>
                          <div className="font-bold text-sm text-slate-900">Two-Factor Authentication</div>
                          <div className="text-xs text-slate-500">Secure your account with 2FA.</div>
                       </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" defaultChecked className="sr-only peer" />
                       <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                 </div>
              </div>

              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-4">Active Sessions</h3>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                       <div className="flex items-center gap-3">
                          <div className="text-2xl">💻</div>
                          <div>
                             <div className="text-sm font-bold text-slate-900">MacBook Pro (Chrome)</div>
                             <div className="text-xs text-slate-500">San Francisco, CA • Current Session</div>
                          </div>
                       </div>
                       <span className="text-xs font-bold text-emerald-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                       <div className="flex items-center gap-3">
                          <div className="text-2xl">📱</div>
                          <div>
                             <div className="text-sm font-bold text-slate-900">iPhone 14 (App)</div>
                             <div className="text-xs text-slate-500">San Francisco, CA • 2h ago</div>
                          </div>
                       </div>
                       <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- NOTIFICATIONS --- */}
        {activeTab === 'notifications' && (
           <div className="p-8 max-w-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Alert Preferences</h3>
              {[
                 { label: 'Security Alerts', desc: 'Login attempts, password changes, and RBAC updates.' },
                 { label: 'System Downtime', desc: 'Notifications when major hubs or connectors go offline.' },
                 { label: 'Weekly Reports', desc: 'Summary of enrollment stats and AI performance.' },
              ].map((n, i) => (
                 <div key={i} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <div>
                       <div className="text-sm font-bold text-slate-900">{n.label}</div>
                       <div className="text-xs text-slate-500 leading-relaxed">{n.desc}</div>
                    </div>
                 </div>
              ))}
           </div>
        )}

      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsInviteModalOpen(false)}></div>
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Invite Team Member</h3>
              <p className="text-sm text-slate-500 mb-6">Send an invitation to join the organization workspace.</p>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Email Address</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Mail /></span>
                       <input 
                         type="email" 
                         value={inviteEmail}
                         onChange={(e) => setInviteEmail(e.target.value)}
                         placeholder="colleague@university.edu"
                         className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Role Access</label>
                    <select 
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 appearance-none"
                    >
                       <option>Platform Admin</option>
                       <option>Org Admin</option>
                       <option>Bot Admin</option>
                       <option>Viewer</option>
                    </select>
                 </div>

                 <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setIsInviteModalOpen(false)}
                      className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                    >
                       Cancel
                    </button>
                    <button 
                      onClick={handleInvite}
                      disabled={!inviteEmail}
                      className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-50"
                    >
                       Send Invite
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
