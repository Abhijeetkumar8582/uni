
import React, { useState, useEffect } from 'react';
import { AppView, User, Campaign } from './types';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import EnrollmentHub from './components/EnrollmentHub';
import SuccessHub from './components/SuccessHub';
import AdvancementHub from './components/AdvancementHub';
import OperationsHub from './components/OperationsHub';
import Integrations from './components/Integrations';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';
import KnowledgeBaseEvaluation from './components/KnowledgeBaseEvaluation';
import KnowledgeBaseManage from './components/KnowledgeBaseManage';
import KnowledgeBaseTrain from './components/KnowledgeBaseTrain';
import CampaignManager from './components/CampaignManager';
import CampaignDetails from './components/CampaignDetails';
import CampaignCreate from './components/CampaignCreate';
import Conversations from './components/Conversations';
import AgentDetails from './components/AgentDetails';
import DocProcessing from './components/DocProcessing';
import HITLReview from './components/HITLReview';
import Layout from './components/Layout';
import ChatOverlay from './components/ChatOverlay';

const SESSION_KEY = 'unifuse_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function getStoredSession(): { user: User; expiresAt: number } | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { user: User; expiresAt: number };
    if (data.expiresAt < Date.now() || !data.user?.email) return null;
    return data;
  } catch {
    return null;
  }
}

function clearStoredSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Fall 2026 Welcome Sequence', channels: ['Email', 'SMS'], status: 'Active', audience: 'Admitted Students', audienceSize: 2847, engagement: 68, lastUpdated: '2h ago' },
  { id: 2, name: 'Financial Aid Retention Push', channels: ['Email', 'Voice'], status: 'Active', audience: 'At-Risk Enrollees', audienceSize: 1892, engagement: 54, lastUpdated: '5h ago' },
  { id: 3, name: 'Deposit Deadline Nurture', channels: ['SMS'], status: 'Scheduled', audience: 'Pending Deposit', audienceSize: 840, engagement: 0, lastUpdated: 'Jan 15' },
  { id: 4, name: 'Regional Outreach (Domestic)', channels: ['Email'], status: 'Paused', audience: 'Prospects (East Coast)', audienceSize: 4200, engagement: 32, lastUpdated: '3d ago' },
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  // Restore session from localStorage on mount (24hr window)
  useEffect(() => {
    const session = getStoredSession();
    if (session) {
      setUser(session.user);
      setView('dashboard');
    }
  }, []);

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const nextId = Math.max(0, ...campaigns.map(c => c.id)) + 1;
    setCampaigns(prev => [...prev, { ...campaign, id: nextId }]);
  };

  const handleLogin = (email: string) => {
    const userData: User = {
      name: 'Jane Doe',
      email: email,
      initials: 'JD',
      role: 'Platform Admin'
    };
    setUser(userData);
    setView('dashboard');
    const expiresAt = Date.now() + SESSION_DURATION_MS;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: userData, expiresAt }));
    } catch {
      /* ignore */
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    clearStoredSession();
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login onLogin={handleLogin} onForgot={() => setView('forgot-password')} />;
      case 'forgot-password':
        return <ForgotPassword onBack={() => setView('login')} />;
      default:
        return (
          <Layout 
            activeView={view} 
            setView={setView} 
            user={user!} 
            onLogout={handleLogout}
            onOpenChat={() => setIsChatOpen(true)}
          >
            {(() => {
              switch (view) {
                case 'dashboard': return <Dashboard setView={setView} />;
                case 'enrollment-hub': return <EnrollmentHub setView={setView} />;
                case 'success-hub': return <SuccessHub setView={setView} />;
                case 'advancement-hub': return <AdvancementHub setView={setView} />;
                case 'operations-hub': return <OperationsHub setView={setView} />;
                case 'integrations': return <Integrations setView={setView} />;
                case 'audit-logs': return <AuditLogs setView={setView} />;
                case 'settings': return <Settings setView={setView} />;
                case 'kb-evaluation': return <KnowledgeBaseEvaluation setView={setView} />;
                case 'kb-manage': return <KnowledgeBaseManage setView={setView} />;
                case 'kb-train': return <KnowledgeBaseTrain setView={setView} />;
                case 'campaigns': return <CampaignManager setView={setView} campaigns={campaigns} />;
                case 'campaign-details': return <CampaignDetails setView={setView} />;
                case 'campaign-create': return <CampaignCreate setView={setView} onAddCampaign={addCampaign} />;
                case 'conversations': return <Conversations setView={setView} />;
                case 'agent-details': return <AgentDetails setView={setView} />;
                case 'doc-processing': return <DocProcessing setView={setView} />;
                case 'hitl-review': return <HITLReview setView={setView} />;
                default: return <Dashboard setView={setView} />;
              }
            })()}
          </Layout>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
      {isChatOpen && user && (
        <ChatOverlay onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

export default App;
