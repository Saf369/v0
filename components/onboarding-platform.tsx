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
];

const stacks: Option[] = [
  {
    id: 'nextjs-node',
    name: 'Next.js + Node.js',
    description: 'Modern full-stack with frontend and backend.',
    link: 'https://nextjs.org/docs',
  },
  {
    id: 'mern',
    name: 'MERN Stack',
    description: 'MongoDB, Express, React, Node.js.',
    link: 'https://www.mongodb.com/mern-stack',
  },
  {
    id: 'django',
    name: 'Django',
    description: 'Python framework with batteries included.',
    link: 'https://docs.djangoproject.com/',
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    description: 'Java-based framework for production apps.',
    link: 'https://spring.io/projects/spring-boot',
  },
];

export default function OnboardingPlatform() {
  const [viewMode, setViewMode] = useState<ViewMode>('selection');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedStack, setSelectedStack] = useState<string>('');
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedAuth, setSelectedAuth] = useState<string>('');

  const handleStartBuilding = () => {
    if (selectedLanguage && selectedStack && selectedDatabase && selectedAuth) {
      setViewMode('commands');
    }
  };

  const handleBackToSelection = () => {
    setViewMode('selection');
  };

  const isReady = selectedLanguage && selectedStack && selectedDatabase && selectedAuth;

  if (viewMode === 'commands') {
    return (
      <CommandOutput
        language={selectedLanguage}
        stack={selectedStack}
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

          {/* Stacks */}
          <SelectionSection
            title="Tech Stack"
            items={stacks}
            selected={selectedStack}
            onSelect={setSelectedStack}
          />

          {/* Authentication */}
          <SelectionSection
            title="Authentication"
            items={authentication}
            selected={selectedAuth}
            onSelect={setSelectedAuth}
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
          <Button
            onClick={handleStartBuilding}
            disabled={!isReady}
            className="h-12 px-8 text-base font-semibold"
          >
            Start Building
          </Button>
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
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        selected
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <h3 className="font-semibold text-foreground mb-1">{option.name}</h3>
      <p className="text-sm text-muted">{option.description}</p>
    </button>
  );
}
