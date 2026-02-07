'use client';

interface StackOverviewTabProps {
  config: any;
}

export default function StackOverviewTab({ config }: StackOverviewTabProps) {
  const stackItems = [
    {
      category: 'Frontend',
      technology: config.frontend,
      description:
        'Modern React framework with built-in optimization, server components, and seamless API routing for full-stack development.',
    },
    {
      category: 'Backend',
      technology: config.backend,
      description:
        'JavaScript runtime for building fast, scalable backend services with extensive package ecosystem and real-time capabilities.',
    },
    {
      category: 'Database',
      technology: config.database,
      description:
        'Powerful relational database with ACID compliance, excellent performance, and strong data integrity guarantees.',
    },
    {
      category: 'Authentication',
      technology: config.authentication,
      description:
        'Token-based authentication standard that is stateless, scalable, and widely supported across web and mobile platforms.',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Why These Technologies?
        </h2>
        <p className="text-muted leading-relaxed">
          This configuration is specifically chosen for beginners because each technology is{' '}
          <span className="text-accent">well-documented</span>, has a{' '}
          <span className="text-accent">thriving community</span>, and provides a smooth learning curve.
          Together, they form a production-ready full-stack application.
        </p>
      </div>

      <div className="space-y-6">
        {stackItems.map((item) => (
          <div
            key={item.category}
            className="rounded-lg border border-border bg-background p-6 transition-all hover:border-accent"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-2xl font-bold text-foreground">{item.technology}</span>
            </div>
            <p className="text-muted leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-accent bg-blue-950 bg-opacity-30 p-6">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-accent">Pro Tip:</span> All these technologies integrate seamlessly
          with modern deployment platforms like Vercel, making it easy to take your app from local
          development to production in minutes.
        </p>
      </div>
    </div>
  );
}
