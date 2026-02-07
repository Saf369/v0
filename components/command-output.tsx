'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CommandOutputProps {
  language: string;
  backend: string;
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
  backend,
  database,
  auth,
  onBack,
}: CommandOutputProps) {
  const [activeTab, setActiveTab] = useState<string>('frontend');
  const [copied, setCopied] = useState<string | null>(null);

  const getTabs = (): Tab[] => {
    const getLangName = (langId: string) => {
      const langMap: Record<string, string> = {
        typescript: 'TypeScript',
        javascript: 'JavaScript',
        python: 'Python',
        go: 'Go',
        java: 'Java',
        rust: 'Rust',
      };
      return langMap[langId] || 'JavaScript';
    };

    const getBackendName = (backendId: string) => {
      const backendMap: Record<string, string> = {
        'nodejs-express': 'Node.js Express',
        django: 'Django',
        fastapi: 'FastAPI',
        springboot: 'Spring Boot',
        firebase: 'Firebase',
        supabase: 'Supabase',
        appwrite: 'Appwrite',
        pocketbase: 'PocketBase',
      };
      return backendMap[backendId] || 'Node.js Express';
    };

    const getDbName = (dbId: string) => {
      const dbMap: Record<string, string> = {
        postgres: 'PostgreSQL',
        mysql: 'MySQL',
        mariadb: 'MariaDB',
        oracle: 'Oracle',
        mongodb: 'MongoDB',
        couchdb: 'CouchDB',
        dynamodb: 'DynamoDB',
        firestore: 'Firestore',
        redis: 'Redis',
        memcached: 'Memcached',
        sqlite: 'SQLite',
        duckdb: 'DuckDB',
        neo4j: 'Neo4j',
        arangodb: 'ArangoDB',
        influxdb: 'InfluxDB',
        timescaledb: 'TimescaleDB',
        elasticsearch: 'Elasticsearch',
        opensearch: 'OpenSearch',
      };
      return dbMap[dbId] || 'PostgreSQL';
    };

    const getAuthName = (authId: string) => {
      const authMap: Record<string, string> = {
        jwt: 'JWT',
        paseto: 'Paseto',
        oauth: 'OAuth 2.0',
        openid: 'OpenID Connect',
        'google-auth': 'Google Auth',
        'github-auth': 'GitHub Auth',
        otp: 'OTP',
        'magic-link': 'Magic Link',
        webauthn: 'WebAuthn',
        'firebase-auth': 'Firebase Auth',
        'supabase-auth': 'Supabase Auth',
        auth0: 'Auth0',
        clerk: 'Clerk',
        keycloak: 'Keycloak',
      };
      return authMap[authId] || 'JWT';
    };

    return [
      {
        id: 'frontend',
        label: 'Frontend Setup',
        commands: [
          `npx create-next-app@latest my-app --typescript`,
          `cd my-app`,
          `npm install`,
        ],
      },
      {
        id: 'backend',
        label: 'Backend Setup',
        commands:
          backend === 'firebase'
            ? [
                `npm install firebase firebase-admin`,
                `echo "NEXT_PUBLIC_FIREBASE_API_KEY=your_key" > .env.local`,
                `# Follow Firebase setup at https://firebase.google.com/docs`,
              ]
            : backend === 'supabase'
              ? [
                  `npm install @supabase/supabase-js`,
                  `echo "NEXT_PUBLIC_SUPABASE_URL=your_url" > .env.local`,
                  `echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" >> .env.local`,
                ]
              : backend === 'appwrite'
                ? [
                    `npm install appwrite`,
                    `echo "NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint" > .env.local`,
                    `echo "NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id" >> .env.local`,
                  ]
                : backend === 'pocketbase'
                  ? [
                      `# Download PocketBase from https://pocketbase.io/`,
                      `./pocketbase serve`,
                      `npm install pocketbase`,
                    ]
                  : backend === 'django'
                    ? [
                        `pip install django djangorestframework python-dotenv`,
                        `django-admin startproject myproject`,
                        `cd myproject && python manage.py startapp api`,
                      ]
                    : backend === 'fastapi'
                      ? [
                          `pip install fastapi uvicorn python-dotenv`,
                          `touch main.py`,
                          `uvicorn main:app --reload`,
                        ]
                      : backend === 'springboot'
                        ? [
                            `# Use Spring Initializr: https://start.spring.io/`,
                            `# Or: spring boot cli new myapp --from-bing=web`,
                            `gradle build`,
                          ]
                        : [
                            `npm install express cors dotenv`,
                            `mkdir -p server && cd server`,
                            `npm init -y && npm install express`,
                          ],
      },
      {
        id: 'database',
        label: 'Database Setup',
        commands:
          database === 'postgres'
            ? [
                `npm install pg`,
                `# Set up PostgreSQL connection in .env`,
                `echo "DATABASE_URL=postgresql://user:pass@localhost/dbname" >> .env.local`,
              ]
            : database === 'mysql' || database === 'mariadb'
              ? [
                  `npm install mysql2`,
                  `echo "DATABASE_URL=mysql://user:pass@localhost/dbname" >> .env.local`,
                ]
              : database === 'mongodb' || database === 'couchdb'
                ? [
                    `npm install mongodb`,
                    `echo "MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname" >> .env.local`,
                  ]
                : database === 'sqlite' || database === 'duckdb'
                  ? [
                      `npm install better-sqlite3`,
                      `touch database.db`,
                    ]
                  : database === 'firestore'
                    ? [
                        `# Firestore is included with Firebase`,
                        `npm install firebase`,
                      ]
                    : database === 'redis' || database === 'memcached'
                      ? [
                          `npm install ${database === 'redis' ? 'redis' : 'memcached'}`,
                          `# Configure cache connection in your backend`,
                        ]
                      : database === 'neo4j' || database === 'arangodb'
                        ? [
                            `npm install ${database === 'neo4j' ? 'neo4j' : 'arangojs'}`,
                            `# Follow ${getDbName(database)} setup guide`,
                          ]
                        : database === 'elasticsearch' || database === 'opensearch'
                          ? [
                              `npm install @elastic/elasticsearch`,
                              `# Install and start ${getDbName(database)} locally or use cloud`,
                            ]
                          : database === 'timescaledb' || database === 'influxdb'
                            ? [
                                `npm install pg`,
                                `# ${getDbName(database)} runs on ${database === 'timescaledb' ? 'PostgreSQL' : 'InfluxDB'} protocol`,
                              ]
                            : database === 'oracle'
                              ? [
                                  `npm install oracledb`,
                                  `# Configure Oracle connection string`,
                                ]
                              : database === 'dynamodb'
                                ? [
                                    `npm install @aws-sdk/client-dynamodb`,
                                    `# Configure AWS credentials`,
                                  ]
                                : [
                                    `npm install ${getDbName(database).toLowerCase()}`,
                                    `# Follow driver setup for ${getDbName(database)}`,
                                  ],
      },
      {
        id: 'auth',
        label: 'Auth Setup',
        commands:
          auth === 'jwt'
            ? [
                `npm install jsonwebtoken bcryptjs`,
                `touch lib/auth.ts`,
                `# Implement JWT middleware in your backend`,
              ]
            : auth === 'paseto'
              ? [
                  `npm install paseto`,
                  `touch lib/paseto-auth.ts`,
                  `# Implement Paseto token management`,
                ]
              : auth === 'oauth' || auth === 'google-auth' || auth === 'github-auth'
                ? [
                    `npm install next-auth`,
                    `# Follow NextAuth.js setup at https://next-auth.js.org`,
                    `# Add providers for Google/GitHub`,
                  ]
                : auth === 'openid'
                  ? [
                      `npm install openid-client`,
                      `# Configure OpenID Connect provider`,
                    ]
                  : auth === 'otp'
                    ? [
                        `npm install otp-generator nodemailer`,
                        `# Implement OTP generation and SMS/email`,
                      ]
                    : auth === 'magic-link'
                      ? [
                          `npm install jsonwebtoken nodemailer`,
                          `# Implement magic link generation and delivery`,
                        ]
                      : auth === 'webauthn'
                        ? [
                            `npm install @simplewebauthn/server @simplewebauthn/browser`,
                            `# Implement WebAuthn/Passkey authentication`,
                          ]
                        : auth === 'firebase-auth'
                          ? [
                              `npm install firebase`,
                              `# Firebase Auth is ready to use with your backend`,
                            ]
                          : auth === 'supabase-auth'
                            ? [
                                `npm install @supabase/supabase-js`,
                                `# Supabase Auth is included with Supabase client`,
                              ]
                            : auth === 'auth0'
                              ? [
                                  `npm install auth0`,
                                  `# Configure Auth0 tenant and API`,
                                  `# Follow: https://auth0.com/docs`,
                                ]
                              : auth === 'clerk'
                                ? [
                                    `npm install @clerk/nextjs`,
                                    `# Follow Clerk setup: https://clerk.com/docs`,
                                  ]
                                : auth === 'keycloak'
                                  ? [
                                      `npm install keycloak-js`,
                                      `# Deploy and configure Keycloak server`,
                                    ]
                                  : [
                                      `npm install otp-generator`,
                                      `# Implement OTP logic in your backend`,
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
              <p className="text-xs text-muted uppercase mb-1">Backend</p>
              <p className="font-medium text-foreground">{backend}</p>
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
