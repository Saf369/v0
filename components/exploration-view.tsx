'use client';

import { useState } from 'react';
import OptionCard from './option-card';
import {
  AUTHENTICATION_OPTIONS,
  DATABASE_OPTIONS,
  TECH_STACK_OPTIONS,
} from '@/lib/options';

interface ExplorationViewProps {
  onStartDefault: () => void;
}

export default function ExplorationView({ onStartDefault }: ExplorationViewProps) {
  return (
    <div className="w-full px-4 py-12 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Start Building Your Project
          </h1>
          <p className="text-lg text-muted md:text-xl">
            Explore common options or let us guide you with a safe default configuration
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-12">
          {/* Authentication Methods */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Authentication Methods
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {AUTHENTICATION_OPTIONS.map((option) => (
                <OptionCard key={option.id} option={option} />
              ))}
            </div>
          </div>

          {/* Databases */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Databases
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DATABASE_OPTIONS.map((option) => (
                <OptionCard key={option.id} option={option} />
              ))}
            </div>
          </div>

          {/* Tech Stacks */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Tech Stacks
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TECH_STACK_OPTIONS.map((option) => (
                <OptionCard key={option.id} option={option} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={onStartDefault}
            className="rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-foreground transition-all hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            I don't know — recommend a safe default
          </button>
        </div>
      </div>
    </div>
  );
}
