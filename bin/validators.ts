import { PackageManager, Language } from './types.js';

export function validatePackageManager(pm: string): pm is PackageManager {
  return ['npm', 'pnpm', 'bun'].includes(pm);
}

export function validateLanguage(lang: string): lang is Language {
  return ['js', 'ts'].includes(lang);
}

