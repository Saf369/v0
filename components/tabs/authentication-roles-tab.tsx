'use client';

interface AuthenticationRolesTabProps {
  authMethod: string;
  onAuthMethodChange: (method: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const AUTH_METHODS = ['JWT', 'OAuth', 'OTP', 'Magic Link'];

const ROLES = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full access to all features and system settings',
  },
  {
    id: 'user',
    name: 'User',
    description: 'Standard access with personal data management',
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to shared resources',
  },
];

export default function AuthenticationRolesTab({
  authMethod,
  onAuthMethodChange,
  selectedRole,
  onRoleChange,
}: AuthenticationRolesTabProps) {
  // Generate required fields based on role
  const getRequiredFields = (role: string) => {
    const baseFields = ['email', 'password', 'username'];
    switch (role.toLowerCase()) {
      case 'admin':
        return [...baseFields, 'department', 'permissions'];
      case 'user':
        return [...baseFields, 'profile_url', 'bio'];
      case 'viewer':
        return baseFields;
      default:
        return baseFields;
    }
  };

  const requiredFields = getRequiredFields(selectedRole);

  return (
    <div className="space-y-8">
      {/* Authentication Method Selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Authentication Method</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {AUTH_METHODS.map((method) => (
            <button
              key={method}
              onClick={() => onAuthMethodChange(method)}
              className={`rounded-lg border-2 p-4 text-left font-medium transition-all ${
                authMethod === method
                  ? 'border-primary bg-blue-900 bg-opacity-20 text-primary'
                  : 'border-border bg-background text-foreground hover:border-muted'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">User Role</h3>
        <div className="space-y-3">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.name)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedRole === role.name
                  ? 'border-accent bg-cyan-900 bg-opacity-20'
                  : 'border-border bg-background hover:border-muted'
              }`}
            >
              <div className="font-semibold text-foreground">{role.name}</div>
              <div className="text-sm text-muted">{role.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Required Fields */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Required Fields for {selectedRole} Role
        </h3>
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex flex-wrap gap-2">
            {requiredFields.map((field) => (
              <span
                key={field}
                className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Info */}
      <div className="rounded-lg border border-accent bg-cyan-900 bg-opacity-20 p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold text-accent">Configuration:</span> Your{' '}
          <span className="font-mono text-accent">{authMethod}</span> authentication with{' '}
          <span className="font-mono text-accent">{selectedRole}</span> role will include all
          required fields for this user tier.
        </p>
      </div>
    </div>
  );
}
