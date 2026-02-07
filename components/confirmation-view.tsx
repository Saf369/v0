'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ConfirmationView({
  onBackToLanding,
}: {
  onBackToLanding: () => void;
}) {
  const defaultConfig = {
    language: 'JavaScript',
    stack: 'Next.js + Node.js',
    database: 'PostgreSQL',
    authentication: 'JWT',
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 py-12 md:py-20">
      {/* Success Message */}
      <div className="max-w-2xl w-full text-center mb-12">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          You're all set!
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-4">
          We've picked a popular and beginner-friendly setup used by many developers.
        </p>
        <p className="text-base text-muted">
          Here's what you'll be using to build:
        </p>
      </div>

      {/* Config Display */}
      <Card className="max-w-md w-full p-6 bg-card border-border mb-8 space-y-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Language
          </p>
          <p className="text-lg font-semibold text-foreground">
            {defaultConfig.language}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Tech Stack
          </p>
          <p className="text-lg font-semibold text-foreground">
            {defaultConfig.stack}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Database
          </p>
          <p className="text-lg font-semibold text-foreground">
            {defaultConfig.database}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Authentication
          </p>
          <p className="text-lg font-semibold text-foreground">
            {defaultConfig.authentication}
          </p>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="max-w-md w-full text-center">
        <Button
          onClick={onBackToLanding}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white mb-3"
        >
          Get started building
        </Button>
        <Button
          onClick={onBackToLanding}
          variant="ghost"
          className="w-full text-primary hover:bg-primary/10"
        >
          Back to options
        </Button>
        <p className="text-xs text-muted mt-4">
          You can always change these choices as you learn more.
        </p>
      </div>
    </div>
  );
}
