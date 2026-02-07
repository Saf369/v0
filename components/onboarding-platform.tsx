'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ConfirmationView from './confirmation-view';

type ViewMode = 'landing' | 'confirmation';

const options = {
  authentication: [
    {
      name: 'JWT (JSON Web Token)',
      description:
        'A simple way for apps to remember who you are after you log in. Very common in modern web apps.',
      badge: 'Beginner-friendly',
      link: 'https://jwt.io/introduction',
    },
    {
      name: 'OTP (One-Time Password)',
      description:
        'Login using a temporary code sent to your email or phone. No password to remember.',
      badge: 'Beginner-friendly',
      link: 'https://auth0.com/docs/authenticate/passwordless',
    },
    {
      name: 'Magic Link',
      description:
        'Login by clicking a secure link sent to your email. Simple and user-friendly.',
      badge: 'Popular',
      link: 'https://magic.link/what-is-magic-link',
    },
  ],
  databases: [
    {
      name: 'PostgreSQL',
      description:
        'A powerful and reliable database used by startups and big companies. Great for learning and real projects.',
      badge: 'Recommended',
      link: 'https://www.postgresql.org/docs/',
    },
    {
      name: 'MongoDB',
      description:
        'A flexible database that stores data like JSON. Easy to start with and very popular.',
      badge: 'Beginner-friendly',
      link: 'https://www.mongodb.com/docs/',
    },
  ],
  stacks: [
    {
      name: 'Next.js + Node.js',
      description:
        'A modern setup for building full websites with both frontend and backend together.',
      badge: 'Recommended default',
      link: 'https://nextjs.org/docs',
    },
    {
      name: 'MERN Stack',
      description:
        'A popular stack using MongoDB, Express, React, and Node.js. Great for learning full-stack development.',
      badge: 'Popular',
      link: 'https://www.mongodb.com/mern-stack',
    },
  ],
};

export default function OnboardingPlatform() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  const handleUseDefaults = () => {
    setViewMode('confirmation');
  };

  const handleExploreOwn = () => {
    // In a real app, navigate to exploration page
    console.log('[v0] User wants to explore on their own');
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {viewMode === 'landing' && (
        <LandingView
          onUseDefaults={handleUseDefaults}
          onExploreOwn={handleExploreOwn}
        />
      )}
      {viewMode === 'confirmation' && (
        <ConfirmationView onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

function LandingView({
  onUseDefaults,
  onExploreOwn,
}: {
  onUseDefaults: () => void;
  onExploreOwn: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
          Not sure where to start with coding?
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          We'll show you the most common tools developers use — and help you pick a simple starting setup.
        </p>
      </div>

      {/* Options Grid */}
      <div className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Popular choices beginners usually start with
        </h2>

        {/* Authentication Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Authentication (What controls login)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {options.authentication.map((option) => (
              <OptionCard key={option.name} option={option} />
            ))}
          </div>
        </div>

        {/* Databases Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Databases (Where data is stored)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.databases.map((option) => (
              <OptionCard key={option.name} option={option} />
            ))}
          </div>
        </div>

        {/* Tech Stacks Section */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tech Stacks (Tools you build with)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.stacks.map((option) => (
              <OptionCard key={option.name} option={option} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl w-full flex flex-col gap-4">
        <Button
          onClick={onUseDefaults}
          className="h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
        >
          Use recommended defaults
        </Button>
        <Button
          onClick={onExploreOwn}
          variant="outline"
          className="h-12 text-base font-semibold border-border text-foreground hover:bg-secondary"
        >
          I want to explore on my own
        </Button>
        <p className="text-center text-muted text-sm">
          You can change everything later — this just helps you start.
        </p>
      </div>
    </div>
  );
}

function OptionCard({
  option,
}: {
  option: (typeof options.authentication)[0];
}) {
  return (
    <Card className="p-4 bg-secondary border-border hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-foreground">{option.name}</h4>
        <p className="text-sm text-muted leading-relaxed">
          {option.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-white text-primary border-primary/30">
            {option.badge}
          </Badge>
          <a
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>
    </Card>
  );
}
