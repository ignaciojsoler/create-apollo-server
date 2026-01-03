# create-apollo-api

A CLI tool to quickly set up an Apollo GraphQL server with TypeScript or JavaScript support.

## Installation

```bash
npm install -g create-apollo-api
```

Or use with npx (no installation needed):

```bash
npx create-apollo-api
```

## Usage

```bash
create-apollo-api [project-name] [options]
```

### Options

- `-p, --package-manager <manager>` - Package manager to use: `npm`, `pnpm`, or `bun` (default: `npm`)
- `-l, --language <lang>` - Language: `js` or `ts` (default: `ts`)
- `--no-install` - Skip installing dependencies

### Examples

Create a TypeScript project with npm (default):

```bash
create-apollo-api my-graphql-server
```

Create a JavaScript project with pnpm:

```bash
create-apollo-api my-server -l js -p pnpm
```

Create a project without installing dependencies:

```bash
create-apollo-api my-server --no-install
```

Create a TypeScript project with bun:

```bash
create-apollo-api my-server -p bun
```

## What it creates

The CLI tool automatically sets up:

- ✅ Project directory with `package.json` configured for ES modules
- ✅ `src/` directory with `index.ts` or `index.js` containing a working Apollo Server example
- ✅ TypeScript configuration (`tsconfig.json`) if using TypeScript
- ✅ All necessary dependencies (`@apollo/server`, `graphql`, and TypeScript packages if needed)
- ✅ Scripts in `package.json` to compile and run the server

## Generated Project Structure

```
project-name/
├── package.json
├── src/
│   └── index.ts (or index.js)
└── tsconfig.json (TypeScript only)
```

## Running the Server

After creation, navigate to your project and start the server:

```bash
cd project-name
npm start  # or pnpm start / bun start
```

The server will be available at `http://localhost:4000/`

## License

MIT

