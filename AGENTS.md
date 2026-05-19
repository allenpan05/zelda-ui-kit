# AGENTS.md

## Commands

```bash
npm run dev          # Dev server (default port 5173)
npm run build        # Library build: vite build + tsc declarations
npm run build:demo   # Demo site build
```

No test suite, linter, or formatter configured. Run `npm run build` to verify changes.

## Architecture

React component library using TypeScript + Less + Vite.

**Entry:** `src/index.ts` — exports all components + types + global styles.

**Build outputs:**
- `dist/es/index.js` (ESM)
- `dist/cjs/index.cjs` (CJS)
- `dist/index.css` (all styles bundled)
- `dist/types/` (TypeScript declarations)

## Component Pattern

Each component in `src/components/<Name>/`:
- `index.ts` — re-exports component + types
- `<Name>.tsx` — component implementation
- `style.less` — component styles

When adding a component:
1. Create the directory with above files
2. Export from `src/index.ts`

## Style System

- **Preprocessor:** Less (not CSS modules for components)
- **Design tokens:** `src/styles/variables.less`
- **Mixins:** `src/styles/mixins.less`
- **Fonts:** `src/styles/fonts.less` (Hylia Serif font in `src/assets/fonts/`)
- **Global styles:** `src/styles/index.less`

Import pattern in component styles:
```less
@import '../../styles/variables.less';
@import '../../styles/mixins.less';
```

## TypeScript Quirks

Props extending HTML attributes must omit conflicting names:
```typescript
// Correct — omit 'type' to avoid conflict with HTML button type
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType;
}

// Same for 'title' and 'onSelect'
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> { ... }
export interface InventoryGridProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> { ... }
```

## Less Quirks

- `@keyframes` blocks cannot reference mixin parameters directly — use CSS variables as workaround
- `@color` inside a mixin's `@keyframes` will fail at build time

## Vite Config

- Path alias: `@` → `src/`
- CSS modules: `zelda-[local]-[hash:base64:5]`
- Library mode: entry at `src/index.ts`
- Externals: `react`, `react-dom`, `react/jsx-runtime`
