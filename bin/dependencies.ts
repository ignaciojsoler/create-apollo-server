import { execSync } from 'child_process';
import { PackageManager, Language } from './types.js';

function getInstallCommand(packageManager: PackageManager, packages: string[]): string {
  const pm = packageManager === 'npm' ? 'npm install' 
    : packageManager === 'pnpm' ? 'pnpm install'
    : 'bun add';
  return `${pm} ${packages.join(' ')}`;
}

function getDevInstallCommand(packageManager: PackageManager, packages: string[]): string {
  const pm = packageManager === 'npm' ? 'npm install --save-dev'
    : packageManager === 'pnpm' ? 'pnpm install --save-dev'
    : 'bun add --dev';
  return `${pm} ${packages.join(' ')}`;
}

export function installDependencies(packageManager: PackageManager): void {
  console.log(`Installing dependencies with ${packageManager}...`);
  const cmd = getInstallCommand(packageManager, ['@apollo/server', 'graphql']);
  
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    const err = error as Error;
    console.error('Error installing dependencies:', err.message);
    process.exit(1);
  }
}

export function installDevDependencies(packageManager: PackageManager, language: Language): void {
  if (language === 'ts') {
    console.log(`Installing TypeScript dependencies...`);
    const cmd = getDevInstallCommand(packageManager, ['typescript', '@types/node', 'tsx']);
    
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      const err = error as Error;
      console.error('Error installing TypeScript dependencies:', err.message);
      process.exit(1);
    }
  } else {
    console.log(`Installing dev dependencies...`);
    const cmd = getDevInstallCommand(packageManager, ['nodemon']);
    
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      const err = error as Error;
      console.error('Error installing dev dependencies:', err.message);
      process.exit(1);
    }
  }
}

export function getInstallInstructions(packageManager: PackageManager, language: Language): string {
  const mainCmd = getInstallCommand(packageManager, ['@apollo/server', 'graphql']);
  const devCmd = language === 'ts'
    ? getDevInstallCommand(packageManager, ['typescript', '@types/node', 'tsx'])
    : getDevInstallCommand(packageManager, ['nodemon']);
  
  return `${mainCmd} && ${devCmd}`;
}

