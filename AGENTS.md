# AGENTS.md

## Commands

```bash
npm run dev          # Dev server (port 5173)
npm run build        # Library build: vite build + tsc declarations
npm run build:demo   # Demo site build
npm run test         # Run tests (vitest run)
npm run test:watch   # Watch mode tests
```

Verify changes with `npm run build`. No linter script configured.

## Behavioral Guidelines

**Think before coding.** State assumptions. If multiple interpretations exist, present them — don't pick silently. Push back when a simpler approach exists.

**Simplicity first.** Minimum code that solves the problem. No speculative features, no abstractions for single-use code, no error handling for impossible scenarios. If 200 lines could be 50, rewrite.

**Surgical changes.** Touch only what you must. Don't "improve" adjacent code, comments, or formatting. Match existing style even if you'd do it differently. Remove only imports/variables/functions YOUR changes made unused.

**Goal-driven execution.** Define success criteria before implementing:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```
"Fix the bug" → write a failing test reproducing it, then make it pass. "Add feature" → write tests for behavior, then implement.

## Architecture

React component library — TypeScript + Less + Vite. Single runtime dependency: `classnames`.

**Entry:** `src/index.ts` — exports all components + types + global styles (imported as side effect).

**Build outputs:**
- `dist/es/index.js` (ESM) / `dist/cjs/index.cjs` (CJS)
- `dist/index.css` (all styles bundled, no code-splitting)
- `dist/types/` (TypeScript declarations via `vite-plugin-dts`)

**Demo:** `demo/main.tsx` → `demo-dist/` (GitHub Pages at `/zelda-ui-kit/`)

## Component Pattern

Each component in `src/components/<Name>/`:
- `index.ts` — re-exports component + types
- `<Name>.tsx` — implementation
- `style.less` OR `<name>.module.less` — styles

All components use `forwardRef` and set `displayName`. Export from `src/index.ts` when adding new ones.

### Dual style approach

- **Plain Less** (global `.zelda-*` classes): Button, Card, Badge, Heart, Rupee, DialogueBox, InventoryGrid, MapMarker, SheikahPanel, SheikahIcon, SheikahText, SelectionArrows, NotificationToast, StaminaWheel, Compass, StealthMeter, TemperatureGauge, ItemDetail, BossHealthBar, WeatherIcon, RuneCooldown
- **CSS Modules** (scoped `zelda-[local]-[hash]`): Alert, Checkbox, Collapse, Divider, Input, Loading, Modal, Progress, Select, Switch, Tabs, Tag, Tooltip

Check neighboring files before choosing which approach for a new component.

## TypeScript

Props extending HTML attributes must omit conflicting names:
```typescript
// Omit 'type' to avoid conflict with HTML button type
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> { ... }
// Same for 'title', 'onSelect', 'size', 'prefix'
```

## Style System

```less
@import '../../styles/variables.less';  // Design tokens
@import '../../styles/mixins.less';     // Reusable mixins
```

**Tokens:** `src/styles/variables.less` — colors, spacing (`@space-*`), radius (`@radius-*`), font sizes, z-index, breakpoints.
**Mixins:** `src/styles/mixins.less` — `.font-hylia()`, `.sheikah-panel()`, `.glow-effect()`, `.glow-animation()`, etc.
**Fonts:** Hylia Serif (`src/assets/fonts/HyliaSerif-Regular.otf`), Hylian Symbols (`src/assets/fonts/HylianSymbols.ttf`).

## Testing & TDD

Framework: Vitest + @testing-library/react + jsdom. Setup: `src/test/setup.ts`.

Test files: `src/components/<Name>/<Name>.test.tsx`. Run a single test:
```bash
npx vitest run src/components/Alert/Alert.test.tsx
```

### TDD is mandatory

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

**Red-Green-Refactor cycle:**
1. **RED** — Write one minimal test for the next behavior. Run it. Watch it fail.
2. **GREEN** — Write the simplest code to pass. Run it. Watch it pass.
3. **REFACTOR** — Clean up. Keep tests green. Don't add behavior.

**Rules:**
- Write code before test? Delete it. Start over from the test.
- Test passes immediately? You're testing existing behavior. Fix the test.
- Test errors (not fails)? Fix the error, re-run until it fails correctly.
- Bug fix? Write failing test reproducing the bug first.

**Checklist before marking work done:**
- [ ] Every new function/component has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for the expected reason (feature missing)
- [ ] Wrote minimal code to pass
- [ ] All tests pass (`npm test`)
- [ ] Build passes (`npm run build`)

### Existing test coverage

9 components have tests; most do not. When modifying a tested component, keep its tests passing. When adding a new component, write tests.

### Test patterns in this project

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Test real behavior, not implementation details
// Use screen queries (getByText, getByRole) over container.querySelector
// Use userEvent over fireEvent for user interactions
```

## Code Style

Prettier (`.prettierrc`): 4-space tabs, single quotes, trailing commas, 100 char width. No ESLint configured.

## Less Quirks

- `@keyframes` blocks cannot reference mixin parameters directly — use CSS variables as workaround
- `@color` inside a mixin's `@keyframes` will fail at build time

## Vite Config

- Path alias: `@` → `src/`
- CSS modules: `zelda-[local]-[hash:base64:5]` with camelCase convention
- Library mode entry: `src/index.ts`
- Externals: `react`, `react-dom`, `react/jsx-runtime`
- Demo config auto-imports `variables.less` via `additionalData`

## CI/CD

- `deploy.yml` — On push to `main`: builds demo, deploys to GitHub Pages
- `publish.yml` — On GitHub release: builds library, publishes to npm

## Reference Docs

- `docs/design-spec.md` — Design tokens, component specs, animation guidelines
- `LLM.md` — Machine-readable API reference for all components (649 lines)
