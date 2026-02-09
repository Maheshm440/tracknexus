interface EnvValidation {
  name: string;
  required: boolean;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

const envValidations: EnvValidation[] = [
  // Critical Production Variables
  {
    name: 'DATABASE_URL',
    required: true,
    validator: (val) => {
      if (process.env.NODE_ENV === 'production') {
        return val.startsWith('postgres://') || val.startsWith('postgresql://');
      }
      return true;
    },
    errorMessage: 'DATABASE_URL must use PostgreSQL in production'
  },
  {
    name: 'JWT_SECRET',
    required: true,
    validator: (val) => val.length >= 64,
    errorMessage: 'JWT_SECRET must be at least 64 characters'
  },
  {
    name: 'CSRF_SECRET',
    required: false, // Made optional for now to not break dev
    validator: (val) => val.length >= 64,
    errorMessage: 'CSRF_SECRET must be at least 64 characters'
  },
  {
    name: 'ADMIN_EMAIL',
    required: true,
    validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    errorMessage: 'ADMIN_EMAIL must be a valid email'
  },
  {
    name: 'ADMIN_PASSWORD_HASH',
    required: true,
    validator: (val) => val.startsWith('$2b$') || val.startsWith('$2a$'),
    errorMessage: 'ADMIN_PASSWORD_HASH must be a bcrypt hash'
  },
  {
    name: 'SMTP_HOST',
    required: true,
  },
  {
    name: 'SMTP_USER',
    required: true,
  },
  {
    name: 'SMTP_PASS',
    required: true,
  },
  {
    name: 'NODE_ENV',
    required: false,
    validator: (val) => ['development', 'production', 'test'].includes(val),
    errorMessage: 'NODE_ENV must be development, production, or test'
  },

  // Production-Only Required
  ...(process.env.NODE_ENV === 'production' ? [
    {
      name: 'CORS_ALLOWED_ORIGINS',
      required: true,
      validator: (val: string) => val.split(',').every(origin => origin.startsWith('https://')),
      errorMessage: 'CORS_ALLOWED_ORIGINS must use HTTPS in production'
    },
    {
      name: 'FRONTEND_URL',
      required: true,
      validator: (val: string) => val.startsWith('https://'),
      errorMessage: 'FRONTEND_URL must use HTTPS in production'
    }
  ] : []),
];

export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const validation of envValidations) {
    const value = process.env[validation.name];

    // Check if required variable exists
    if (validation.required && !value) {
      errors.push(`Missing required environment variable: ${validation.name}`);
      continue;
    }

    // Run custom validator
    if (value && validation.validator && !validation.validator(value)) {
      errors.push(
        validation.errorMessage ||
        `Invalid value for ${validation.name}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateEnvironmentOrExit(): void {
  const { valid, errors } = validateEnvironment();

  if (!valid) {
    console.error('❌ Environment Validation Failed:\n');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease fix environment variables before starting the application.\n');

    if (process.env.NODE_ENV === 'production') {
      throw new Error('Environment validation failed. Fix environment variables before starting.');
    } else {
      console.warn('⚠️  Continuing in development mode with errors...\n');
    }
  } else {
    console.log('✅ Environment validation passed\n');
  }
}
