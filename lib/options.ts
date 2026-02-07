export interface Option {
  id: string;
  name: string;
  description: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  tooltip: string;
}

export const AUTHENTICATION_OPTIONS: Option[] = [
  {
    id: 'jwt',
    name: 'JWT',
    description:
      'Stateless token-based authentication using JSON Web Tokens for secure API access.',
    complexity: 'Beginner',
    tooltip:
      'Best for: Scalable APIs, mobile apps, and microservices. No server-side session storage needed.',
  },
  {
    id: 'oauth',
    name: 'OAuth',
    description:
      'Delegated authentication protocol allowing users to log in via third-party providers.',
    complexity: 'Intermediate',
    tooltip:
      'Best for: Social login integration, reduced password management burden, better user experience.',
  },
  {
    id: 'otp',
    name: 'OTP',
    description:
      'One-Time Password authentication using SMS or email for passwordless security.',
    complexity: 'Intermediate',
    tooltip:
      'Best for: High-security applications, mobile-first platforms, improved user privacy.',
  },
  {
    id: 'magic-link',
    name: 'Magic Link',
    description: 'Passwordless authentication via unique email links for frictionless access.',
    complexity: 'Beginner',
    tooltip:
      'Best for: User-friendly experiences, reduced support overhead, modern SaaS applications.',
  },
];

export const DATABASE_OPTIONS: Option[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description:
      'Powerful open-source relational database with strong consistency and advanced features.',
    complexity: 'Beginner',
    tooltip:
      'Best for: Complex data relationships, ACID compliance needed, web applications.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'NoSQL document database offering flexible schemas and horizontal scalability.',
    complexity: 'Intermediate',
    tooltip:
      'Best for: Rapid prototyping, document-heavy data, flexible data structures.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    description:
      'Reliable relational database widely used for web applications and data integrity.',
    complexity: 'Beginner',
    tooltip: 'Best for: Web applications, traditional business logic, proven reliability.',
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'High-performance in-memory data store for caching and real-time analytics.',
    complexity: 'Advanced',
    tooltip:
      'Best for: Caching layers, session storage, real-time features, high-speed operations.',
  },
];

export const TECH_STACK_OPTIONS: Option[] = [
  {
    id: 'mern',
    name: 'MERN',
    description:
      'MongoDB, Express, React, Node.js stack for full-stack JavaScript development.',
    complexity: 'Intermediate',
    tooltip:
      'Best for: JavaScript developers, rapid development, single language across stack.',
  },
  {
    id: 'nextjs-nodejs',
    name: 'Next.js + Node.js',
    description: 'Modern React framework with Node.js backend for optimal performance.',
    complexity: 'Beginner',
    tooltip:
      'Best for: SEO-friendly apps, server-side rendering, best-in-class developer experience.',
  },
  {
    id: 'django',
    name: 'Django',
    description: 'Python-based web framework with batteries included for rapid development.',
    complexity: 'Intermediate',
    tooltip:
      'Best for: Python developers, rapid prototyping, built-in admin interface needed.',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: 'Java-based framework for enterprise applications with strong typing.',
    complexity: 'Advanced',
    tooltip:
      'Best for: Enterprise applications, microservices, high performance required.',
  },
];
