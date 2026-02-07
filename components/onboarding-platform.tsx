'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ConfirmationView from './confirmation-view';

type ViewMode = 'landing' | 'confirmation';

interface OptionItem {
  name: string;
  description: string;
  bestFor: string;
  link: string;
  icon?: string;
}

const options = {
  authentication: [
    {
      name: 'JWT (JSON Web Tokens)',
      description: 'A simple and very common way to keep users logged in after they sign in once.',
      bestFor: 'Small to medium apps, APIs, learning backend auth',
      link: 'https://jwt.io/introduction',
    },
    {
      name: 'OAuth (Google, GitHub, etc.)',
      description: 'Lets users sign in using Google, GitHub, or other trusted accounts.',
      bestFor: 'Apps that want easy signup and trusted identity',
      link: 'https://oauth.net/2/',
    },
    {
      name: 'OTP (One-Time Password)',
      description: 'Users log in using a short code sent to email or phone. No passwords.',
      bestFor: 'Simple apps, mobile-first apps',
      link: 'https://auth0.com/docs/authenticate/passwordless',
    },
    {
      name: 'Magic Link',
      description: 'Users log in by clicking a secure link sent to their email.',
      bestFor: 'Beginner apps, SaaS products',
      link: 'https://magic.link/what-is-magic-link',
    },
  ],
  databases: [
    {
      name: 'PostgreSQL',
      description: 'A powerful, structured database used by startups and large companies.',
      bestFor: 'Most web apps, learning SQL',
      link: 'https://www.postgresql.org/docs/',
    },
    {
      name: 'MongoDB',
      description: 'A flexible database that stores data like JSON objects.',
      bestFor: 'Rapid development, flexible data',
      link: 'https://www.mongodb.com/docs/',
    },
    {
      name: 'MySQL',
      description: 'A widely-used relational database, very stable and beginner-friendly.',
      bestFor: 'Traditional web apps',
      link: 'https://dev.mysql.com/doc/',
    },
    {
      name: 'Redis',
      description: 'A very fast in-memory database, usually used alongside another database.',
      bestFor: 'Caching, sessions',
      link: 'https://redis.io/docs/',
    },
  ],
  languages: [
    {
      name: 'JavaScript / TypeScript',
      description: 'The most popular language for web development. Runs everywhere.',
      bestFor: 'Beginners, web apps, full-stack',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'Python',
      description: 'Easy to read and widely used for backend and data science.',
      bestFor: 'Beginners, APIs, automation',
      link: 'https://docs.python.org/3/tutorial/',
    },
    {
      name: 'Java',
      description: 'A strongly typed language used in enterprise systems.',
      bestFor: 'Large systems, corporate apps',
      link: 'https://docs.oracle.com/javase/tutorial/',
    },
    {
      name: 'Go (Golang)',
      description: 'A fast, simple language designed for backend services.',
      bestFor: 'APIs, performance-focused apps',
      link: 'https://go.dev/doc/',
    },
  ],
  stacks: [
    {
      name: 'Next.js + Node.js',
      description: 'A modern full-stack setup where frontend and backend work together.',
      bestFor: 'Beginners, SaaS apps',
      link: 'https://nextjs.org/docs',
    },
    {
      name: 'MERN Stack',
      description: 'A popular stack using MongoDB, Express, React, and Node.js.',
      bestFor: 'Learning full-stack development',
      link: 'https://www.mongodb.com/mern-stack',
    },
    {
      name: 'Django Stack',
      description: 'A Python-based framework that includes many features out of the box.',
      bestFor: 'Rapid backend development',
      link: 'https://docs.djangoproject.com/',
    },
  ],
};

export default function OnboardingPlatform() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  const handleUseDefaults = () => {
    setViewMode('confirmation');
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {viewMode === 'landing' && (
        <LandingView onUseDefaults={handleUseDefaults} />
      )}
      {viewMode === 'confirmation' && (
        <ConfirmationView onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

function LandingView({ onUseDefaults }: { onUseDefaults: () => void }) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12 md:py-16">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
          Not sure where to start with coding?
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          We'll show you the most common tools developers use, explain what they do, and help you pick a simple starting setup.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl w-full space-y-16">
        {/* Section 1: Authentication */}
        <Section
          title="How users sign in to apps"
          subtitle="Authentication"
          items={options.authentication}
          columns="grid-cols-1 md:grid-cols-2"
        />

        {/* Comparison Table for Auth */}
        <ComparisonTable
          title="Quick comparison"
          rows={[
            {
              method: 'JWT',
              traits: 'Simple, fast, developer-controlled',
            },
            {
              method: 'OAuth',
              traits: 'Easiest for users, external dependency',
            },
            {
              method: 'OTP/Magic Link',
              traits: 'Passwordless, simpler UX',
            },
          ]}
        />

        <Separator className="my-4" />

        {/* Section 2: Databases */}
        <Section
          title="Where your app stores data"
          subtitle="Databases"
          items={options.databases}
          columns="grid-cols-1 md:grid-cols-2"
        />

        {/* Comparison for Databases */}
        <ComparisonTable
          title="Quick comparison"
          rows={[
            {
              method: 'SQL (Postgres/MySQL)',
              traits: 'Structured, reliable',
            },
            {
              method: 'NoSQL (MongoDB)',
              traits: 'Flexible, fast to start',
            },
            {
              method: 'Redis',
              traits: 'Support tool, not main storage',
            },
          ]}
        />

        <Separator className="my-4" />

        {/* Section 3: Programming Languages */}
        <Section
          title="Languages you write your app in"
          subtitle="Programming Languages"
          items={options.languages}
          columns="grid-cols-1 md:grid-cols-2"
        />

        {/* Recommendation for Languages */}
        <div className="bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-foreground">Tip:</strong> If you're unsure, JavaScript or Python are the easiest places to start.
          </p>
        </div>

        <Separator className="my-4" />

        {/* Section 4: Tech Stacks */}
        <Section
          title="How tools work together"
          subtitle="Tech Stacks"
          items={options.stacks}
          columns="grid-cols-1 md:grid-cols-1"
        />
      </div>

      {/* Action Buttons */}
      <div className="max-w-2xl w-full flex flex-col gap-4 mt-20 mb-12">
        <Button
          onClick={onUseDefaults}
          className="h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
        >
          Use recommended defaults
        </Button>
        <Button
          variant="outline"
          className="h-12 text-base font-semibold border-border text-foreground hover:bg-secondary"
        >
          I want to compare and choose myself
        </Button>
        <p className="text-center text-muted text-sm">
          You can change everything later.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
  columns,
}: {
  title: string;
  subtitle: string;
  items: OptionItem[];
  columns: string;
}) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">
          {subtitle}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
      </div>
      <div className={`grid ${columns} gap-4`}>
        {items.map((item) => (
          <OptionCard key={item.name} option={item} />
        ))}
      </div>
    </div>
  );
}

function OptionCard({ option }: { option: OptionItem }) {
  return (
    <Card className="p-5 bg-card border-border hover:shadow-lg transition-shadow flex flex-col gap-4">
      <div>
        <h3 className="font-semibold text-foreground mb-2 text-lg">
          {option.name}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {option.description}
        </p>
      </div>
      <div className="flex-1" />
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Best for
          </p>
          <p className="text-sm text-foreground">{option.bestFor}</p>
        </div>
        <a
          href={option.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Learn more →
        </a>
      </div>
    </Card>
  );
}

interface ComparisonRow {
  method: string;
  traits: string;
}

function ComparisonTable({
  title,
  rows,
}: {
  title: string;
  rows: ComparisonRow[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.method}
            className="flex gap-4 text-sm border border-border rounded-lg p-4 bg-secondary/50"
          >
            <span className="font-semibold text-foreground min-w-fit">
              {row.method}
            </span>
            <span className="text-muted">{row.traits}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
