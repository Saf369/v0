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
      {
        id: 'mariadb',
        name: 'MariaDB',
        description: 'MySQL-compatible open source alternative',
        link: 'https://mariadb.org/documentation/',
      },
      {
        id: 'oracle',
        name: 'Oracle Database',
        description: 'Enterprise-grade relational database',
        link: 'https://docs.oracle.com/en/database/',
      },
    ],
  },
  {
    category: 'NoSQL (Document / Key-Value)',
    items: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        description: 'Flexible, JSON-like data storage',
        link: 'https://www.mongodb.com/docs/',
      },
      {
        id: 'couchdb',
        name: 'CouchDB',
        description: 'Document database with sync capabilities',
        link: 'https://docs.couchdb.org/',
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
    category: 'In-Memory / Cache',
    items: [
      {
        id: 'redis',
        name: 'Redis',
        description: 'Ultra-fast cache and session store',
        link: 'https://redis.io/docs/',
      },
      {
        id: 'memcached',
        name: 'Memcached',
        description: 'Simple distributed memory cache',
        link: 'https://memcached.org/',
      },
    ],
  },
  {
    category: 'Embedded / Local',
    items: [
      {
        id: 'sqlite',
        name: 'SQLite',
        description: 'Lightweight database stored in a file',
        link: 'https://www.sqlite.org/docs.html',
      },
      {
        id: 'duckdb',
        name: 'DuckDB',
        description: 'In-process analytical database',
        link: 'https://duckdb.org/docs/',
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
      {
        id: 'arangodb',
        name: 'ArangoDB',
        description: 'Multi-model database (documents, graphs, search)',
        link: 'https://www.arangodb.com/docs/',
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
      {
        id: 'timescaledb',
        name: 'TimescaleDB',
        description: 'PostgreSQL extension for time-series',
        link: 'https://docs.timescale.com/',
      },
    ],
  },
  {
    category: 'Search / Analytics',
    items: [
      {
        id: 'elasticsearch',
        name: 'Elasticsearch',
        description: 'Search and analytics engine',
        link: 'https://www.elastic.co/guide/',
      },
      {
        id: 'opensearch',
        name: 'OpenSearch',
        description: 'Open-source search and analytics',
        link: 'https://opensearch.org/docs/',
      },
    ],
  },
];

const languages: Option[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'JavaScript with type safety. Most popular for web.',
    link: 'https://www.typescriptlang.org/docs/',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'The language of the web. Runs everywhere.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Easy to read, widely used for backend and data.',
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
  {
    id: 'rust',
    name: 'Rust',
    description: 'Safe, fast language for performance-critical apps.',
    link: 'https://doc.rust-lang.org/book/',
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
    id: 'paseto',
    name: 'Paseto',
    description: 'Modern alternative to JWT with simpler API.',
    link: 'https://paseto.io/',
  },
  {
    id: 'oauth',
    name: 'OAuth 2.0',
    description: 'Industry-standard for delegated access.',
    link: 'https://oauth.net/2/',
  },
  {
    id: 'openid',
    name: 'OpenID Connect',
    description: 'Authentication layer built on OAuth 2.0.',
    link: 'https://openid.net/connect/',
  },
  {
    id: 'google-auth',
    name: 'Google Auth',
    description: 'Sign in with Google account.',
    link: 'https://developers.google.com/identity',
  },
  {
    id: 'github-auth',
    name: 'GitHub Auth',
    description: 'Sign in with GitHub account.',
    link: 'https://docs.github.com/en/apps/oauth-apps',
  },
  {
    id: 'otp',
    name: 'OTP (Email / SMS)',
    description: 'Passwordless authentication via code.',
    link: 'https://auth0.com/docs/authenticate/passwordless',
  },
  {
    id: 'magic-link',
    name: 'Magic Link',
    description: 'Passwordless authentication via email link.',
    link: 'https://magic.link/what-is-magic-link',
  },
  {
    id: 'webauthn',
    name: 'WebAuthn (Passkeys)',
    description: 'Biometric and hardware security keys.',
    link: 'https://webauthn.guide/',
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
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Comprehensive authentication and identity platform.',
    link: 'https://auth0.com/docs',
  },
  {
    id: 'clerk',
    name: 'Clerk',
    description: 'Modern auth platform for developers.',
    link: 'https://clerk.com/docs',
  },
  {
    id: 'keycloak',
    name: 'Keycloak',
    description: 'Open-source identity and access management.',
    link: 'https://www.keycloak.org/documentation',
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
    id: 'fastapi',
    name: 'FastAPI',
    description: 'Modern Python backend with automatic API docs.',
    link: 'https://fastapi.tiangolo.com/',
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    description: 'Java-based framework for production apps.',
    link: 'https://spring.io/projects/spring-boot',
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
  {
    id: 'appwrite',
    name: 'Appwrite',
    description: 'Open-source backend-as-a-service platform.',
    link: 'https://appwrite.io/docs',
  },
  {
    id: 'pocketbase',
    name: 'PocketBase',
    description: 'Self-hostable backend with built-in admin UI.',
    link: 'https://pocketbase.io/docs',
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
    } else if (backendId === 'appwrite' || backendId === 'pocketbase') {
      // AppWrite and PocketBase use internal databases but can work with various storage
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
    } else if (authId === 'clerk' && !selectedBackend) {
      setSelectedBackend('nodejs-express');
    } else if (authId === 'auth0' && !selectedBackend) {
      setSelectedBackend('nodejs-express');
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
                          (selectedBackend === 'supabase' && db.id !== 'postgres') ||
                          (selectedBackend === 'appwrite' && db.id !== 'postgres') ||
                          (selectedBackend === 'pocketbase' && db.id !== 'postgres')
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
