export type PackageManager = 'npm' | 'pnpm' | 'bun';
export type Language = 'js' | 'ts';

export interface Options {
  packageManager?: PackageManager;
  language?: Language;
  install?: boolean;
}

export interface ProjectConfig {
  projectName: string;
  packageManager: PackageManager;
  language: Language;
  install: boolean;
}

