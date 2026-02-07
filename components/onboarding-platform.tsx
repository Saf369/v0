'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CommandOutput from './command-output';

type ViewMode = 'selection' | 'commands';

interface Option {
  id: string;
  name: string;
  description: string;
  link: string;
}

interface DatabaseCategory {
  category: string;
  items: Option[];
}

const databases: DatabaseCategory[] = [
  {
    category: 'Relational (SQL)',
    items: [
      {
        id: 'postgres',
        name: 'PostgreSQL',
        description: 'Structured, powerful, industry standard',
        link: 'https://www.postgresql.org/docs/',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        description: 'Popular, stable, beginner-friendly',
        link: 'https://dev.mysql.com/doc/',
      },
    ],
  },
  {
    category: 'NoSQL',
    items: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: 'Flexible, JSON-like data storage',
        link: 'https://www.mongodb.com/docs/',
      },
      {
        id: 'dynamodb',
        name: 'DynamoDB',
        description: 'Serverless NoSQL by AWS',
        link: 'https://docs.aws.amazon.com/dynamodb/',
      },
      {
        id: 'firestore',
        name: 'Firestore',
        description: 'Google Firebase real-time database',
        link: 'https://firebase.google.com/docs/firestore',
      },
    ],
  },
  {
    category: 'In-Memory',
    items: [
      {
        id: 'redis',
        name: 'Redis',
        description: 'Ultra-fast cache and session store',
        link: 'https://redis.io/docs/',
      },
    ],
  },
  {
    category: 'File / Embedded',
    items: [
      {
        id: 'sqlite',
        name: 'SQLite',
        description: 'Lightweight database stored in a file',
        link: 'https://www.sqlite.org/docs.html',
      },
    ],
  },
  {
    category: 'Time-Series',
    items: [
      {
        id: 'influxdb',
        name: 'InfluxDB',
        description: 'Optimized for metrics and time-based data',
        link: 'https://docs.influxdata.com/',
      },
    ],
  },
  {
    category: 'Graph',
    items: [
      {
        id: 'neo4j',
        name: 'Neo4j',
        description: 'Relationship-based data (graphs)',
        link: 'https://neo4j.com/docs/',
      },
    ],
  },
];

const languages: Option[] = [
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    description: 'Most popular for web. Runs everywhere.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Easy to read, widely used for backend.',
    link: 'https://docs.python.org/3/tutorial/',
  },
  {
    id: 'go',
    name: 'Go',
    description: 'Fast and simple language for backends.',
    link: 'https://go.dev/doc/',
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Strongly typed, used in enterprise systems.',
    link: 'https://docs.oracle.com/javase/tutorial/',
  },
];

const authentication: Option[] = [
  {
    id: 'jwt',
    name: 'JWT',
    description: 'Simple tokens, developer-controlled.',
    link: 'https://jwt.io/introduction',
  },
  {
    id: 'oauth',
    name: 'OAuth (Google, GitHub)',
    description: 'Let users sign in with trusted accounts.',
    link: 'https://oauth.net/2/',
  },
  {
    id: 'otp',
    name: 'OTP / Magic Link',
    description: 'Passwordless authentication via email/SMS.',
    link: 'https://auth0.com/docs/authenticate/passwordless',
  },
  {
    id: 'firebase-auth',
    name: 'Firebase Auth',
    description: 'Google Firebase authentication service.',
    link: 'https://firebase.google.com/docs/auth',
  },
  {
    id: 'supabase-auth',
    name: 'Supabase Auth',
    description: 'Auth built into Supabase (PostgreSQL-based).',
    link: 'https://supabase.com/docs/guides/auth',
  },
];

const backends: Option[] = [
  {
    id: 'nodejs-express',
    name: 'Node.js (Express / API routes)',
    description: 'Full control backend using JavaScript.',
    link: 'https://nodejs.org/en/docs/',
  },
  {
    id: 'django',
    name: 'Django',
    description: 'Python backend with many features built in.',
    link: 'https://docs.djangoproject.com/',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: "Google's backend platform with auth, database, and hosting.",
    link: 'https://firebase.google.com/docs',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open-source Firebase alternative built on PostgreSQL.',
    link: 'https://supabase.com/docs',
  },
];

export default function OnboardingPlatform() {
  const [viewMode, setViewMode] = useState<ViewMode>('selection');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedBackend, setSelectedBackend] = useState<string>('');
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedAuth, setSelectedAuth] = useState<string>('');

  // Handle auto-selection based on backend/auth compatibility
  const handleBackendChange = (backendId: string) => {
    setSelectedBackend(backendId);
    // Auto-set database for BaaS options
    if (backendId === 'firebase') {
      setSelectedDatabase('firestore');
    } else if (backendId === 'supabase') {
      setSelectedDatabase('postgres');
    }
  };

  const handleAuthChange = (authId: string) => {
    setSelectedAuth(authId);
    // Auto-set backend if using specific auth
    if (authId === 'firebase-auth' && !selectedBackend) {
      setSelectedBackend('firebase');
      setSelectedDatabase('firestore');
    } else if (authId === 'supabase-auth' && !selectedBackend) {
      setSelectedBackend('supabase');
      setSelectedDatabase('postgres');
    }
  };

  const handleUseDefaults = () => {
    setSelectedLanguage('typescript');
    setSelectedBackend('supabase');
    setSelectedDatabase('postgres');
    setSelectedAuth('supabase-auth');
  };

  const handleStartBuilding = () => {
    if (selectedLanguage && selectedBackend && selectedDatabase && selectedAuth) {
      setViewMode('commands');
    }
  };

  const handleBackToSelection = () => {
    setViewMode('selection');
  };

  const isReady = selectedLanguage && selectedBackend && selectedDatabase && selectedAuth;

  if (viewMode === 'commands') {
    return (
      <CommandOutput
        language={selectedLanguage}
        backend={selectedBackend}
        database={selectedDatabase}
        auth={selectedAuth}
        onBack={handleBackToSelection}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Choose Your Tech Stack
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Select one option from each category to get started building immediately.
          </p>
        </div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Languages */}
          <SelectionSection
            title="Programming Language"
            items={languages}
            selected={selectedLanguage}
            onSelect={setSelectedLanguage}
          />

          {/* Backend */}
          <SelectionSection
            title="How your app's backend works"
            items={backends}
            selected={selectedBackend}
            onSelect={handleBackendChange}
          />

          {/* Authentication */}
          <SelectionSection
            title="Authentication"
            items={authentication}
            selected={selectedAuth}
            onSelect={handleAuthChange}
          />

          {/* Databases */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                4
              </span>
              Database
            </h2>
            <div className="space-y-6">
              {databases.map((category) => (
                <div key={category.category}>
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
                    {category.category}
                  </p>
                  <div className="space-y-2">
                    {category.items.map((db) => (
                      <SelectableCard
                        key={db.id}
                        option={db}
                        selected={selectedDatabase === db.id}
                        onSelect={() => setSelectedDatabase(db.id)}
                        disabled={
                          (selectedBackend === 'firebase' && db.id !== 'firestore') ||
                          (selectedBackend === 'supabase' && db.id !== 'postgres')
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Button
              onClick={handleUseDefaults}
              className="h-12 px-8 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Use recommended defaults
            </Button>
            <Button
              onClick={handleStartBuilding}
              disabled={!isReady}
              className="h-12 px-8 text-base font-semibold"
            >
              Start Building
            </Button>
          </div>
          {!isReady && (
            <p className="text-sm text-muted">
              Select one option from each category to continue
            </p>
          )}
          {isReady && (
            <p className="text-sm text-accent">
              We'll generate the commands you can run in your terminal.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectionSection({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: Option[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const index = ['Programming Language', 'Tech Stack', 'Authentication'].indexOf(
    title
  ) + 1;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
          {index}
        </span>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <SelectableCard
            key={item.id}
            option={item}
            selected={selected === item.id}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SelectableCard({
  option,
  selected,
  onSelect,
  disabled = false,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        disabled
          ? 'border-border bg-card/50 opacity-50 cursor-not-allowed'
          : selected
            ? 'border-primary bg-primary/10'
            : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
      <p className="text-sm text-muted">{option.description}</p>
    </button>
  );
}
