import { ProjectConfig } from './types.js';
import { resolveProjectPath, handleExistingDirectory, createProjectDirectory, getPackageName, createPackageJson, createSourceFiles, createGitFiles } from './file-utils.js';
import { installDependencies, installDevDependencies, getInstallInstructions } from './dependencies.js';

export async function setupProject(config: ProjectConfig): Promise<void> {
  const { projectName, packageManager, language, install } = config;
  
  console.log(`Creating Apollo GraphQL server: ${projectName}`);
  
  const { projectPath, isCurrentDir } = resolveProjectPath(projectName);
  await handleExistingDirectory(projectName, projectPath, isCurrentDir);
  createProjectDirectory(projectName, isCurrentDir);
  
  console.log('Initializing package.json...');
  const packageName = getPackageName(projectName);
  createPackageJson(packageName, language);
  
  createSourceFiles(language);
  createGitFiles();
  
  if (install) {
    installDependencies(packageManager);
    installDevDependencies(packageManager, language);
  } else {
    console.log('Skipping dependency installation');
    console.log('\nTo install dependencies later, run:');
    console.log(`  ${getInstallInstructions(packageManager, language)}`);
  }
  
  console.log('\nProject created successfully!');
  console.log(`\nNext steps:`);
  console.log(`  cd ${projectName}`);
  if (!install) {
    console.log(`  ${packageManager} install`);
  }
  console.log(`  ${packageManager} start`);
}

