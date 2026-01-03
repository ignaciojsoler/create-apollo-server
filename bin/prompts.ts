import prompts from 'prompts';
import { PackageManager, Language } from './types.js';

export async function promptPackageManager(): Promise<PackageManager> {
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which package manager would you like to use?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'pnpm', value: 'pnpm' },
      { title: 'bun', value: 'bun' }
    ],
    initial: 0
  });
  
  if (!response.value) process.exit(1);
  return response.value as PackageManager;
}

export async function promptLanguage(): Promise<Language> {
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: 'Which language would you like to use?',
    choices: [
      { title: 'TypeScript', value: 'ts' },
      { title: 'JavaScript', value: 'js' }
    ],
    initial: 0
  });
  
  if (!response.value) process.exit(1);
  return response.value as Language;
}

export async function promptInstall(): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: 'Install dependencies now?',
    initial: true
  });
  
  return response.value;
}

export async function promptOverwrite(projectName: string): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: `Directory "${projectName}" already exists. Do you want to overwrite it?`,
    initial: false
  });
  
  return response.value ?? false;
}

