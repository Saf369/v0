'use client';

import { useState } from 'react';

interface Option {
  id: string;
  name: string;
  description: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  tooltip: string;
}

interface OptionCardProps {
  option: Option;
}

const complexityColors = {
  Beginner: 'bg-green-900 text-green-100',
  Intermediate: 'bg-yellow-900 text-yellow-100',
  Advanced: 'bg-red-900 text-red-100',
};

export default function OptionCard({ option }: OptionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg border border-border bg-secondary p-6 transition-all duration-300 hover:border-accent hover:bg-opacity-80">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{option.name}</h3>
          <button
            className="ml-2 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-border hover:text-foreground"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="More information"
          >
            ?
          </button>
        </div>

        <p className="mb-4 text-sm text-muted leading-relaxed">{option.description}</p>

        <div className="flex justify-between items-end">
          <span
            className={`inline-block rounded px-2 py-1 text-xs font-medium ${
              complexityColors[option.complexity]
            }`}
          >
            {option.complexity}
          </span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-border bg-secondary p-3 shadow-lg">
          <p className="text-sm text-foreground">{option.tooltip}</p>
          <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-secondary border-t border-l border-border" />
        </div>
      )}
    </div>
  );
}
