import { mkdirSync, writeFileSync, existsSync, rmSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { Language } from './types.js';
import { promptOverwrite } from './prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getTemplateDir(): string {
  return join(__dirname, '..', 'templates');
}

export function resolveProjectPath(projectName: string): { projectPath: string; isCurrentDir: boolean } {
  const projectPath = resolve(projectName);
  const currentDir = cwd();
  const isCurrentDir = projectPath === currentDir;
  return { projectPath, isCurrentDir };
}

export async function handleExistingDirectory(projectName: string, projectPath: string, isCurrentDir: boolean): Promise<void> {
  if (!existsSync(projectName)) return;
  
  const shouldOverwrite = await promptOverwrite(projectName);
  
  if (!shouldOverwrite) {
    console.log('Operation cancelled.');
    process.exit(0);
  }
  
  console.log(`Removing existing directory...`);
  
  if (isCurrentDir) {
    const entries = readdirSync(projectPath);
    for (const entry of entries) {
      const entryPath = join(projectPath, entry);
      const stat = statSync(entryPath);
      if (stat.isDirectory()) {
        rmSync(entryPath, { recursive: true, force: true });
      } else {
        rmSync(entryPath, { force: true });
      }
    }
  } else {
    rmSync(projectName, { recursive: true, force: true });
  }
}

export function createProjectDirectory(projectName: string, isCurrentDir: boolean): void {
  if (!isCurrentDir) {
    mkdirSync(projectName, { recursive: true });
    process.chdir(projectName);
  }
}

export function getPackageName(projectName: string): string {
  return (projectName === './' || projectName === '.') 
    ? basename(cwd())
    : projectName;
}

export function createPackageJson(packageName: string, language: Language): void {
  const packageJson = {
    name: packageName,
    version: '1.0.0',
    type: 'module' as const,
    scripts: language === 'ts' 
      ? {
          compile: 'tsc',
          start: 'tsc && node ./dist/index.js',
          dev: 'tsx watch src/index.ts'
        }
      : {
          start: 'node src/index.js',
          dev: 'nodemon src/index.js'
        }
  };
  
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
}

export function createSourceFiles(language: Language): void {
  mkdirSync('src', { recursive: true });
  
  const templateDir = getTemplateDir();
  const indexTemplate = readFileSync(
    join(templateDir, `index.${language}`),
    'utf-8'
  );
  writeFileSync(`src/index.${language}`, indexTemplate);
  
  if (language === 'ts') {
    const tsconfigTemplate = readFileSync(
      join(templateDir, 'tsconfig.json'),
      'utf-8'
    );
    writeFileSync('tsconfig.json', tsconfigTemplate);
  }
}

export function createGitFiles(): void {
  const gitattributesContent = `# Auto detect text files and perform LF normalization
* text=auto
`;
  writeFileSync('.gitattributes', gitattributesContent);
  
  const gitignoreContent = `node_modules/
dist/
`;
  writeFileSync('.gitignore', gitignoreContent);
}

