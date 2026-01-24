
import React, { useState, useEffect } from 'react';
import { AppView, User } from './types';
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

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLogin = (email: string) => {
    setUser({
      name: 'Jane Doe',
      email: email,
      initials: 'JD'
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
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
                case 'campaigns': return <CampaignManager setView={setView} />;
                case 'campaign-details': return <CampaignDetails setView={setView} />;
                case 'campaign-create': return <CampaignCreate setView={setView} />;
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
