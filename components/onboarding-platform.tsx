'use client';

import { useState } from 'react';
import ExplorationView from './exploration-view';
import GuidedSetupView from './guided-setup-view';

type ViewMode = 'exploration' | 'guided';

export default function OnboardingPlatform() {
  const [viewMode, setViewMode] = useState<ViewMode>('exploration');
  const [selectedStack, setSelectedStack] = useState<any>(null);

  const handleStartDefault = () => {
    const defaultConfig = {
      frontend: 'Next.js',
      backend: 'Node.js',
      database: 'PostgreSQL',
      authentication: 'JWT',
    };
    setSelectedStack(defaultConfig);
    setViewMode('guided');
  };

  const handleReset = () => {
    setViewMode('exploration');
    setSelectedStack(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {viewMode === 'exploration' && (
        <ExplorationView onStartDefault={handleStartDefault} />
      )}
      {viewMode === 'guided' && selectedStack && (
        <GuidedSetupView config={selectedStack} onReset={handleReset} />
      )}
    </div>
  );
}
