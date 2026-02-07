'use client';

import { useState } from 'react';

interface ApiExamplesTabProps {
  authMethod: string;
  role: string;
}

type ExampleType = 'request' | 'payload' | 'response';

const getApiExamples = (authMethod: string, role: string) => {
  const requestBody = {
    email: 'developer@example.com',
    password: 'SecurePassword123!',
    username: 'devbuilder',
    ...(role === 'Admin' && { department: 'Engineering', permissions: ['read', 'write', 'delete'] }),
    ...(role === 'User' && { profile_url: 'https://example.com/profile', bio: 'Building awesome apps' }),
  };

  return {
    request: JSON.stringify(
      {
        method: 'POST',
        endpoint: '/api/auth/register',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Method': authMethod,
        },
        body: requestBody,
      },
      null,
      2
    ),
    payload: JSON.stringify(requestBody, null, 2),
    successResponse: JSON.stringify(
      {
        success: true,
        user: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'developer@example.com',
          username: 'devbuilder',
          role: role,
          createdAt: '2026-02-07T10:30:00Z',
        },
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJyb2xlIjoiJHtyb2xlfSIsImlhdCI6MTY2NjAwMDAwMH0.xxx`,
      },
      null,
      2
    ),
    errorResponse: JSON.stringify(
      {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Email or password is incorrect',
          details: 'User with this email does not exist',
        },
      },
      null,
      2
    ),
  };
};

export default function ApiExamplesTab({ authMethod, role }: ApiExamplesTabProps) {
  const [activeExample, setActiveExample] = useState<ExampleType>('request');
  const [isLoading, setIsLoading] = useState(false);
  const examples = getApiExamples(authMethod, role);

  const handleTestFlow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveExample('response');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          API Integration Example
        </h3>
        <p className="mb-6 text-muted">
          Below are formatted examples for your {authMethod} authentication flow with the{' '}
          <span className="font-mono text-accent">{role}</span> role:
        </p>
      </div>

      {/* Example Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-4">
          {[
            { id: 'request' as ExampleType, label: 'Expected Request JSON' },
            { id: 'payload' as ExampleType, label: 'Sample API Payload' },
            { id: 'response' as ExampleType, label: 'Mock API Response' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveExample(tab.id)}
              className={`px-4 py-2 font-medium transition-all border-b-2 -mb-px ${
                activeExample === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Block */}
      <div className="rounded-lg border border-border bg-background p-4 font-mono text-sm">
        <pre className="overflow-x-auto text-foreground">
          {activeExample === 'request' && examples.request}
          {activeExample === 'payload' && examples.payload}
          {activeExample === 'response' && examples.successResponse}
        </pre>
      </div>

      {/* Copy and Test Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            const text =
              activeExample === 'request'
                ? examples.request
                : activeExample === 'payload'
                  ? examples.payload
                  : examples.successResponse;
            navigator.clipboard.writeText(text);
          }}
          className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-all hover:bg-secondary hover:border-accent"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handleTestFlow}
          disabled={isLoading}
          className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-foreground transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
              Testing...
            </>
          ) : (
            'Test Flow'
          )}
        </button>
      </div>

      {/* Error Response Example */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Error Response Example</h4>
        <div className="rounded-lg border border-border bg-background p-4 font-mono text-sm">
          <pre className="overflow-x-auto text-foreground">{examples.errorResponse}</pre>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-accent bg-cyan-900 bg-opacity-20 p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-accent">Next Steps:</span> These examples show how to structure
          your API calls. Copy the JSON patterns and integrate them into your frontend using fetch or axios.
          Handle both success and error responses appropriately.
        </p>
      </div>
    </div>
  );
}
