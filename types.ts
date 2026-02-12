
import React from 'react';

export interface Campaign {
  id: number;
  name: string;
  channels: ('Email' | 'SMS' | 'Voice' | 'WhatsApp')[];
  status: 'Active' | 'Scheduled' | 'Draft' | 'Completed' | 'Paused';
  audience: string;
  audienceSize: number;
  engagement: number;
  lastUpdated: string;
}

export type AppView = 
  | 'login' 
  | 'forgot-password'
  | 'dashboard' 
  | 'enrollment-hub'
  | 'success-hub'
  | 'advancement-hub'
  | 'operations-hub'
  | 'integrations'
  | 'audit-logs'
  | 'settings'
  | 'kb-evaluation'
  | 'kb-manage'
  | 'kb-train'
  | 'campaigns'
  | 'campaign-details'
  | 'campaign-create'
  | 'conversations'
  | 'agent-details'
  | 'doc-processing'
  | 'hitl-review';

export interface User {
  name: string;
  email: string;
  initials: string;
  role: 'Platform Admin' | 'Org Admin' | 'Bot Admin' | 'Viewer';
}

export type AudienceType = 'Public' | 'Prospects' | 'Applicants' | 'Students' | 'Alumni' | 'Staff' | 'Admin';
export type AuthMethod = 'None' | 'SSO' | 'Token' | 'OTP' | 'Magic Link';
export type ChannelType = 'Web' | 'SMS' | 'WhatsApp' | 'Voice' | 'Email';
export type BotStatus = 'Online' | 'Maintenance' | 'Offline' | 'Busy';

export interface BotVersion {
  version: string;
  deployedAt: string;
  status: 'Live' | 'Draft' | 'Rollback';
  author: string;
}

export interface AllowedAction {
  id: string;
  name: string;
  type: 'Read' | 'Write';
  enabled: boolean;
  requiresApproval: boolean;
}

export interface ExpertNode {
  id: string;
  name: string;
  department: string;
  description: string;
  status: BotStatus;
  channels: ChannelType[];
  allowedAudiences: AudienceType[];
  authMethod: AuthMethod;
  owner: string;
  currentVersion: string;
  lastDeployed: string;
  kpiTarget: string;
  businessGoal: string;
  operatingHours: string;
  knowledgeRefresh: string;
  responseTone: string;
  guardrails: string[];
  allowedActions: AllowedAction[];
  escalationEnabled: boolean;
  health: { 
    kb: 'Healthy' | 'Stale' | 'Syncing'; 
    connectors: 'Operational' | 'Degraded' | 'Down';
  };
}

export interface RoutingRule {
  id: string;
  domain: string;
  targetBotId: string;
  priority: number;
  confidenceThreshold: number;
}

export interface SharedEntity {
  id: string;
  name: string;
  dataType: string;
  validationRule: string;
  pii: boolean;
}

export interface UnicoreConfig {
  // Governance
  piiRedaction: boolean;
  dataRetentionDays: number;
  complianceStandard: 'FERPA' | 'GDPR' | 'None';
  globalFailSafe: boolean;
  incidentThreshold: number;
  
  // Orchestration
  routingRules: RoutingRule[];
  sharedEntities: SharedEntity[];
  thinkingBudget: number;
  
  // Security
  allowedIPs: string[];
  requireMFA: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  logicPath?: string;
}

export interface CustomMetaTag {
  id: string;
  key: string;
  value: string;
  isSystem?: boolean;
}

export interface KBChunk {
  id: string;
  vectorId: string;
  content: string;
  tokenCount: number;
  relevanceScore?: number; // For simulation
}

export interface KBDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  source?: string;
  status: 'Live' | 'Syncing' | 'Error' | 'Indexing';
  visibility?: string;
  department: string;
  lastSync: string;
  customTags: CustomMetaTag[];
  folderId: string | null;
  chunks?: KBChunk[]; // For RAG inspection
}

export interface KBFolder {
  id: string;
  name: string;
  parentId: string | null;
  itemCount: number;
}

export interface ChatHistoryEntry {
  id: string;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  channel: string;
  timestamp: string;
  lastMessage: string;
  status: 'Active' | 'Resolved' | 'Error';
  summary: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  accuracyScore: number;
  tags: string[];
  isLive?: boolean;
  errorCode?: string;
  errorDetail?: string;
}
