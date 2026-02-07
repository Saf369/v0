'use client';

import { useState } from 'react';
import OnboardingPlatform from '@/components/onboarding-platform';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <OnboardingPlatform />
    </div>
  );
}
