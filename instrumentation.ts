import { validateEnvironmentOrExit } from './lib/validate-env';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    validateEnvironmentOrExit();
  }
}
