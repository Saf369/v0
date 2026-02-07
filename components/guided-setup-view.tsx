'use client';

import { useState } from 'react';
import StackOverviewTab from './tabs/stack-overview-tab';
import AuthenticationRolesTab from './tabs/authentication-roles-tab';
import ApiExamplesTab from './tabs/api-examples-tab';

interface GuidedSetupViewProps {
  config: any;
  onReset: () => void;
}

type TabType = 'overview' | 'auth' | 'api';

export default function GuidedSetupView({ config, onReset }: GuidedSetupViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [authMethod, setAuthMethod] = useState('JWT');
  const [selectedRole, setSelectedRole] = useState('User');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Stack Overview' },
    { id: 'auth', label: 'Authentication & Roles' },
    { id: 'api', label: 'API Examples' },
  ];

  return (
    <div className="w-full min-h-screen px-4 py-12 md:py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Your Recommended Stack
          </h1>
          <p className="text-muted">
            A beginner-friendly configuration tailored for your success
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg border border-border bg-secondary p-8">
          {activeTab === 'overview' && <StackOverviewTab config={config} />}
          {activeTab === 'auth' && (
            <AuthenticationRolesTab
              authMethod={authMethod}
              onAuthMethodChange={setAuthMethod}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />
          )}
          {activeTab === 'api' && (
            <ApiExamplesTab
              authMethod={authMethod}
              role={selectedRole}
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={onReset}
            className="flex-1 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:bg-secondary hover:border-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Explore More Options
          </button>
          <button
            className="flex-1 rounded-lg bg-primary px-6 py-3 font-medium text-foreground transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  );
}
