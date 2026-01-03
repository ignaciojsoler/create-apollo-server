#!/usr/bin/env node

import { program } from 'commander';
import { Options, ProjectConfig } from './types.js';
import { validatePackageManager, validateLanguage } from './validators.js';
import { promptPackageManager, promptLanguage, promptInstall } from './prompts.js';
import { setupProject } from './project-setup.js';

program
  .name('create-apollo-api')
  .description('Quickly set up an Apollo GraphQL server')
  .argument('[project-name]', 'Project name', 'graphql-server-example')
  .option('-p, --package-manager <manager>', 'Package manager (npm|pnpm|bun)')
  .option('-l, --language <lang>', 'Language (js|ts)')
  .option('--no-install', 'Skip installing dependencies')
  .action(async (projectName: string, options: Options) => {
    const installExplicitlySet = process.argv.includes('--no-install');
    
    let packageManager = options.packageManager;
    if (!packageManager) {
      packageManager = await promptPackageManager();
    }
    
    if (!validatePackageManager(packageManager)) {
      console.error('Error: Package manager must be npm, pnpm, or bun');
      process.exit(1);
    }
    
    let language = options.language;
    if (!language) {
      language = await promptLanguage();
    }
    
    if (!validateLanguage(language)) {
      console.error('Error: Language must be js or ts');
      process.exit(1);
    }
    
    let install = options.install;
    if (!installExplicitlySet) {
      install = await promptInstall();
    } else {
      install = false;
    }
    
    const config: ProjectConfig = {
      projectName,
      packageManager,
      language,
      install: install ?? true
    };
    
    await setupProject(config);
  });

program.parse();
