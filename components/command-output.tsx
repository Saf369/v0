'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CommandOutputProps {
  language: string;
  stack: string;
  database: string;
  auth: string;
  onBack: () => void;
}

interface Tab {
  id: string;
  label: string;
  commands: string[];
}

export default function CommandOutput({
  language,
  stack,
  database,
  auth,
  onBack,
}: CommandOutputProps) {
  const [activeTab, setActiveTab] = useState<string>('project');
  const [copied, setCopied] = useState<string | null>(null);

  const getTabs = (): Tab[] => {
    const getLangName = (langId: string) => {
      const langMap: Record<string, string> = {
        javascript: 'JavaScript',
        python: 'Python',
        go: 'Go',
        java: 'Java',
      };
      return langMap[langId] || 'JavaScript';
    };

    const getStackName = (stackId: string) => {
      const stackMap: Record<string, string> = {
        'nextjs-node': 'Next.js + Node.js',
        mern: 'MERN',
        django: 'Django',
        springboot: 'Spring Boot',
      };
      return stackMap[stackId] || 'Next.js + Node.js';
    };

    const getDbName = (dbId: string) => {
      const dbMap: Record<string, string> = {
        postgres: 'PostgreSQL',
        mysql: 'MySQL',
        mongodb: 'MongoDB',
        dynamodb: 'DynamoDB',
        redis: 'Redis',
        sqlite: 'SQLite',
        influxdb: 'InfluxDB',
        neo4j: 'Neo4j',
      };
      return dbMap[dbId] || 'PostgreSQL';
    };

    const getAuthName = (authId: string) => {
      const authMap: Record<string, string> = {
        jwt: 'JWT',
        oauth: 'OAuth',
        otp: 'OTP',
      };
      return authMap[authId] || 'JWT';
    };

    return [
      {
        id: 'project',
        label: 'Project Setup',
        commands: [
          `mkdir my-app && cd my-app`,
          `npm init -y`,
          `npm install ${stack === 'nextjs-node' ? 'next react react-dom' : stack === 'mern' ? 'express react react-dom' : stack === 'django' ? 'django' : 'gradle'}`,
        ],
      },
      {
        id: 'backend',
        label: 'Backend Setup',
        commands: [
          `# Initialize ${getStackName(stack)} backend`,
          `npm install dotenv cors express`,
          `echo "BACKEND_PORT=3001" > .env`,
        ],
      },
      {
        id: 'database',
        label: 'Database Setup',
        commands: [
          `# Install ${getDbName(database)} driver`,
          database === 'postgres'
            ? `npm install pg`
            : database === 'mongodb'
              ? `npm install mongodb`
              : database === 'sqlite'
                ? `npm install sqlite3`
                : `npm install redis`,
          `# Initialize database connection`,
          `touch db-config.js`,
        ],
      },
      {
        id: 'auth',
        label: 'Auth Setup',
        commands: [
          `# Install ${getAuthName(auth)} packages`,
          auth === 'jwt'
            ? `npm install jsonwebtoken bcryptjs`
            : auth === 'oauth'
              ? `npm install passport passport-google-oauth20`
              : `npm install otp-generator`,
          `# Create auth middleware`,
          `touch middleware/auth.js`,
        ],
      },
    ];
  };

  const tabs = getTabs();
  const activeTabData = tabs.find((t) => t.id === activeTab);

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command).then(() => {
      const copyKey = `${activeTab}-${index}`;
      setCopied(copyKey);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6"
          >
            ← Back to selection
          </Button>
          <h1 className="text-4xl font-bold mb-4">Start Building</h1>
          <p className="text-lg text-muted">
            Run these commands in your terminal to set up your project:
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Commands */}
        {activeTabData && (
          <Card className="p-6 bg-card border-border space-y-4">
            {activeTabData.commands.map((command, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-secondary/50 rounded-lg p-4"
              >
                <code className="flex-1 text-sm font-mono text-accent">
                  {command}
                </code>
                <button
                  onClick={() => handleCopy(command, idx)}
                  className="px-3 py-1 rounded text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {copied === `${activeTab}-${idx}` ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </Card>
        )}

        {/* Summary */}
        <Card className="mt-8 p-6 bg-card border-border">
          <h3 className="font-semibold text-foreground mb-4">Your Setup</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted uppercase mb-1">Language</p>
              <p className="font-medium text-foreground">{language}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Stack</p>
              <p className="font-medium text-foreground">{stack}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Database</p>
              <p className="font-medium text-foreground">{database}</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase mb-1">Auth</p>
              <p className="font-medium text-foreground">{auth}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
