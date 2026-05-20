# Zelda UI Kit — AI Reference

> Concise reference for AI coding assistants generating code with `zelda-ui-kit`.

## Setup

```tsx
import { Button, Heart, Rupee } from 'zelda-ui-kit';
import 'zelda-ui-kit/dist/index.css';
```

All components are named exports from `zelda-ui-kit`. Import the CSS once at the app root.

---

## Components

### Button

```tsx
<Button type="primary" size="md" loading={false} icon={<Icon />}>
  Click me
</Button>
```

- `type`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` (default `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `loading`: `boolean`
- `icon`: `ReactNode`
- Extends `React.ButtonHTMLAttributes` (omit `'type'` to avoid conflict)

---

### Card

```tsx
<Card title="Quest" variant="sheikah" hoverable extra={<Badge>Active</Badge>}>
  Content here
</Card>
```

- `variant`: `'default' | 'elevated' | 'outlined' | 'sheikah'` (default `'default'`)
- `padding`: `'none' | 'sm' | 'md' | 'lg'` (default `'md'`)
- `hoverable`: `boolean`
- `title`: `ReactNode`
- `subtitle`: `ReactNode`
- `extra`: `ReactNode` — top-right action area
- `cover`: `ReactNode`
- `footer`: `ReactNode`
- Extends `React.HTMLAttributes` (omit `'title'`)

---

### Badge

```tsx
<Badge variant="success" count={5} overflowCount={99}>
  <Button>Messages</Button>
</Badge>
```

- `variant`: `'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'`
- `size`: `'sm' | 'md'`
- `dot`: `boolean` — show dot instead of count
- `count`: `number`
- `overflowCount`: `number` — show `99+` style
- Wraps `children` with a positioned badge

---

### Input

```tsx
<Input size="md" prefix={<SearchIcon />} suffix=".com" error helperText="Required" />
```

- `size`: `'sm' | 'md' | 'lg'`
- `prefix`: `ReactNode`
- `suffix`: `ReactNode`
- `error`: `boolean`
- `helperText`: `string`
- Extends `React.InputHTMLAttributes` (omit `'size' | 'prefix'`)

---

### Select

```tsx
<Select
  options={[{ label: 'Sword', value: 'sword' }, { label: 'Shield', value: 'shield' }]}
  value={val}
  onChange={setVal}
  placeholder="Pick one"
/>
```

- `options`: `SelectOption[]` — `{ label, value, disabled? }`
- `value` / `defaultValue`: `string | number`
- `placeholder`: `string`
- `disabled`: `boolean`
- `size`: `'sm' | 'md' | 'lg'`
- `onChange`: `(value: string | number) => void`

---

### Checkbox

```tsx
<Checkbox checked={val} onChange={setVal}>Accept</Checkbox>
```

- `checked` / `defaultChecked`: `boolean`
- `disabled`: `boolean`
- `onChange`: `(checked: boolean) => void`

---

### Switch

```tsx
<Switch checked={val} onChange={setVal} size="md" />
```

- `checked` / `defaultChecked`: `boolean`
- `disabled`: `boolean`
- `size`: `'sm' | 'md'`
- `onChange`: `(checked: boolean) => void`

---

### Tabs

```tsx
<Tabs
  items={[
    { key: 'weapons', label: 'Weapons', children: <WeaponList /> },
    { key: 'armor', label: 'Armor', children: <ArmorList /> },
  ]}
  activeKey={tab}
  onChange={setTab}
/>
```

- `items`: `TabItem[]` — `{ key, label, children?, disabled? }`
- `activeKey` / `defaultActiveKey`: `string`
- `onChange`: `(key: string) => void`

---

### Tag

```tsx
<Tag color="sheikah" closable onClose={() => {}}>Zelda</Tag>
```

- `color`: `'default' | 'gold' | 'sheikah' | 'success' | 'warning' | 'error'`
- `closable`: `boolean`
- `onClose`: `() => void`

---

### Tooltip

```tsx
<Tooltip title="Attack power +10" placement="top">
  <Button>Hover me</Button>
</Tooltip>
```

- `title`: `ReactNode`
- `placement`: `'top' | 'bottom' | 'left' | 'right'`
- `children`: must be a single `ReactElement`

---

### Modal

```tsx
<Modal open={show} title="Confirm" onClose={() => setShow(false)}>
  Are you sure?
</Modal>
```

- `open`: `boolean`
- `title`: `ReactNode`
- `footer`: `ReactNode | null` — `null` hides footer
- `closable`: `boolean`
- `maskClosable`: `boolean`
- `width`: `number | string`
- `onClose`: `() => void`

---

### Alert

```tsx
<Alert type="warning" title="Low Health" description="Find a shrine to heal." closable />
```

- `type`: `'info' | 'success' | 'warning' | 'error'`
- `title`: `ReactNode`
- `description`: `ReactNode`
- `closable`: `boolean`
- `showIcon`: `boolean`
- `onClose`: `() => void`

---

### Progress

```tsx
<Progress percent={75} status="normal" color="sheikah" showInfo />
```

- `percent`: `number` (0–100)
- `status`: `'normal' | 'success' | 'error'`
- `showInfo`: `boolean` — show percentage text
- `size`: `'sm' | 'md'`
- `color`: `'gold' | 'sheikah'`

---

### Divider

```tsx
<Divider orientation="left">Section</Divider>
```

- `orientation`: `'left' | 'center' | 'right'`
- `dashed`: `boolean`
- `children`: text label

---

### Collapse

```tsx
<Collapse
  items={[
    { key: '1', title: 'Stats', children: <StatsPanel /> },
    { key: '2', title: 'Inventory', children: <InventoryPanel /> },
  ]}
  activeKeys={openKeys}
  onChange={setOpenKeys}
/>
```

- `items`: `CollapseItem[]` — `{ key, title, children, disabled? }`
- `activeKeys` / `defaultActiveKeys`: `string[]`
- `accordion`: `boolean` — only one panel open at a time
- `onChange`: `(keys: string[]) => void`

---

### Loading

```tsx
<Loading spinning tip="Loading...">
  <Content />
</Loading>
```

- `spinning`: `boolean`
- `tip`: `ReactNode`
- `size`: `'sm' | 'md' | 'lg'`
- Wraps `children` with an overlay spinner

---

## Zelda Game Components

### Heart

```tsx
<Heart value={7} max={10} size="lg" animated showValue />
```

- `value`: `number` — current health (required)
- `max`: `number` (default `10`)
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `animated`: `boolean` — low-health pulse
- `showValue`: `boolean` — show `7/10` text
- Supports half-hearts (`value: 7.5`)

---

### Rupee

```tsx
<Rupee value={1234} color="green" size="lg" animated />
```

- `value`: `number` — currency amount (required)
- `color`: `'green' | 'blue' | 'red' | 'purple' | 'gold'` (default `'green'`)
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `animated`: `boolean` — shine animation
- `showIcon`: `boolean` (default `true`)
- Auto-formats large numbers (`10000` → `10k`)

---

### StaminaWheel

```tsx
<StaminaWheel value={80} max={100} size="md" showValue lowWarning />
```

- `value`: `number` — 0–100 (required)
- `max`: `number` (default `100`)
- `size`: `'sm' | 'md' | 'lg'` (default `'md'`)
- `showValue`: `boolean` — show percentage text
- `lowWarning`: `boolean` — pulse when ≤25% (default `true`)
- `strokeWidth`: `number` (default `6`)

---

### DialogueBox

```tsx
<DialogueBox
  speaker="Zelda"
  avatar={<span style={{ fontSize: 32 }}>👸</span>}
  typewriter
  closable
  onClose={() => setVisible(false)}
>
  Link, you must save Hyrule!
</DialogueBox>
```

- `speaker`: `string`
- `children`: `ReactNode` — dialogue text
- `typewriter`: `boolean` — typewriter effect (default `false`)
- `typeSpeed`: `number` — ms per character (default `30`)
- `closable`: `boolean` (default `true`)
- `onClose`: `() => void`
- `avatar`: `ReactNode`
- `visible`: `boolean` (default `true`)

---

### InventoryGrid

```tsx
const items: InventoryItem[] = [
  { id: '1', icon: '🗡️', name: 'Master Sword', count: 1, isNew: true, durability: 100 },
  { id: '2', icon: '🛡️', name: 'Shield', durability: 85 },
];

<InventoryGrid
  items={items}
  columns={5}
  totalSlots={20}
  selectedId={selected?.id ?? null}
  onSelect={setSelected}
/>
```

- `items`: `InventoryItem[]` — `{ id, icon, name, count?, isNew?, durability?, type? }`
- `columns`: `number` (default `5`)
- `totalSlots`: `number` (default `20`)
- `selectedId`: `string | null`
- `onSelect`: `(item: InventoryItem | null) => void`
- `showEmpty`: `boolean` (default `true`)
- `cellSize`: `'sm' | 'md' | 'lg'`
- Durability bar color: green >50, orange >25, red ≤25

---

### MapMarker

```tsx
<MapMarker type="shrine" label="Myahm Agana" active discovered />
```

- `type`: `'tower' | 'shrine' | 'stable' | 'village' | 'custom'` (default `'custom'`)
- `label`: `string`
- `active`: `boolean` — pulse animation
- `discovered`: `boolean` (default `true`) — false dims the marker
- `icon`: `ReactNode` — override default icon
- `onClick`: `() => void`

---

### SheikahPanel

```tsx
<SheikahPanel title="Sheikah Slate" subtitle="Ancient Tech" decorated glowing closable onClose={close}>
  Panel content
</SheikahPanel>
```

- `title`: `ReactNode`
- `subtitle`: `ReactNode`
- `children`: `ReactNode` (required)
- `footer`: `ReactNode`
- `decorated`: `boolean` — corner decorations (default `true`)
- `glowing`: `boolean` — glow animation (default `false`)
- `closable`: `boolean`
- `onClose`: `() => void`
- Extends `React.HTMLAttributes` (omit `'title'`)

---

### SheikahIcon

```tsx
<SheikahIcon name="triforce" size="lg" glowing />
```

- `name`: `'force' | 'triforce' | 'eye' | 'sheikah' | 'gerudo' | 'kokiri' | 'zora' | 'goron' | 'royal' | 'din' | 'farore' | 'nayru' | 'light' | 'forest' | 'water' | 'spirit' | 'shadow' | 'heart' | 'drop' | 'question' | 'exclamation'`
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default `'md'`)
- `glowing`: `boolean`
- `color`: `string` — CSS color

---

### SheikahText

```tsx
<SheikahText text="abc" size={40} glowing />
```

- `text`: `string` — supported chars: `a b c g y x 0 1 2 ? ! . -`
- `size`: `number` — pixel size (default `24`)
- `color`: `string`
- `glowing`: `boolean`
- Unsupported chars render as blank space

---

### SelectionArrows

Wrap a relatively-positioned container:

```tsx
<div style={{ position: 'relative', width: 80, height: 80 }}>
  <SelectionArrows position="all" speed="normal" />
  <span>Content</span>
</div>
```

- `position`: `'top' | 'bottom' | 'left' | 'right' | 'all'` (default `'all'`)
- `visible`: `boolean` (default `true`)
- `speed`: `'slow' | 'normal' | 'fast'` (default `'normal'`)
- `color`: `string`
- Parent must have `position: relative`

---

### NotificationToast

```tsx
<NotificationToast
  type="item"
  title="Ancient Core"
  description="Obtained from a Guardian Scout."
  duration={3000}
  onClose={() => setVisible(false)}
/>
```

- `type`: `'item' | 'quest' | 'info' | 'success' | 'warning'` (default `'info'`)
- `title`: `string` (required)
- `description`: `string`
- `icon`: `ReactNode` — override default type icon
- `visible`: `boolean` — controlled mode
- `duration`: `number` — ms, `0` = no auto-close (default `3000`)
- `onClose`: `() => void`
- `afterClose`: `() => void` — fires after exit animation
- Extends `React.HTMLAttributes` (omit `'title'`)

---

## Design Tokens (Less Variables)

Import in `.less` files:

```less
@import 'zelda-ui-kit/src/styles/variables.less';
@import 'zelda-ui-kit/src/styles/mixins.less';
```

### Colors

| Variable | Value | Use |
|---|---|---|
| `@zelda-primary` | `#00C8B8` | Sheikah teal — primary actions |
| `@zelda-primary-dark` | `#00A89C` | Hover state |
| `@zelda-primary-light` | `#B2F5EA` | Highlights |
| `@zelda-primary-bg` | `#E6FFFA` | Light backgrounds |
| `@zelda-accent` | `#8B6914` | Gold accents |
| `@zelda-green` | `#4A7C59` | Nature/success |
| `@zelda-brown` | `#6B4423` | Text, borders |
| `@zelda-sand` | `#F5E6D3` | Card backgrounds |
| `@zelda-heart` | `#FF4757` | Health |
| `@zelda-stamina` | `#00C8B8` | Stamina |
| `@zelda-rupee-green` | `#2ED573` | Green rupee |
| `@zelda-rupee-blue` | `#1E90FF` | Blue rupee |
| `@zelda-rupee-red` | `#FF4757` | Red rupee |
| `@zelda-rupee-purple` | `#9B59B6` | Purple rupee |
| `@zelda-rupee-gold` | `#FFD700` | Gold rupee |
| `@zelda-success` | `#2ED573` | Success state |
| `@zelda-warning` | `#FFA502` | Warning state |
| `@zelda-danger` | `#FF4757` | Danger state |
| `@zelda-info` | `#1E90FF` | Info state |
| `@zelda-text` | `#2D3436` | Primary text |
| `@zelda-text-secondary` | `#636E72` | Secondary text |
| `@zelda-text-light` | `#B2BEC3` | Light text |
| `@zelda-border` | `#DFE6E9` | Borders |
| `@zelda-bg` | `#FAFAF5` | Page background |
| `@zelda-white` | `#FFFFFF` | Card backgrounds |
| `@zelda-sheikah-bg` | `#1A2B3C` | Sheikah panel dark |
| `@zelda-sheikah-border` | `#00C8B8` | Sheikah border |
| `@zelda-sheikah-glow` | `rgba(0,200,184,0.3)` | Sheikah glow |

### Spacing

| Variable | Value |
|---|---|
| `@space-xs` | `4px` |
| `@space-sm` | `8px` |
| `@space-md` | `16px` |
| `@space-lg` | `24px` |
| `@space-xl` | `32px` |
| `@space-2xl` | `48px` |

### Border Radius

| Variable | Value |
|---|---|
| `@radius-sm` | `4px` |
| `@radius-md` | `8px` |
| `@radius-lg` | `12px` |
| `@radius-xl` | `16px` |
| `@radius-full` | `9999px` |

### Font Sizes

| Variable | Value |
|---|---|
| `@font-size-xs` | `12px` |
| `@font-size-sm` | `14px` |
| `@font-size-md` | `16px` |
| `@font-size-lg` | `18px` |
| `@font-size-xl` | `20px` |
| `@font-size-2xl` | `24px` |
| `@font-size-3xl` | `30px` |
| `@font-size-4xl` | `36px` |

### Shadows

| Variable | Value |
|---|---|
| `@shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `@shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` |
| `@shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` |
| `@shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` |
| `@glow-primary` | `0 0 10px #00C8B8, 0 0 20px #B2F5EA` |
| `@glow-sheikah` | `0 0 15px rgba(0,200,184,0.3), 0 0 30px rgba(0,200,184,0.1)` |

### Transitions

| Variable | Value |
|---|---|
| `@transition-fast` | `all 0.15s ease` |
| `@transition-normal` | `all 0.2s ease` |
| `@transition-slow` | `all 0.3s ease` |

### Z-Index

| Variable | Value |
|---|---|
| `@z-dropdown` | `1000` |
| `@z-sticky` | `1020` |
| `@z-fixed` | `1030` |
| `@z-modal-backdrop` | `1040` |
| `@z-modal` | `1050` |
| `@z-popover` | `1060` |
| `@z-tooltip` | `1070` |

### Breakpoints

| Variable | Value |
|---|---|
| `@breakpoint-sm` | `640px` |
| `@breakpoint-md` | `768px` |
| `@breakpoint-lg` | `1024px` |
| `@breakpoint-xl` | `1280px` |

---

## Mixins

```less
@import 'zelda-ui-kit/src/styles/mixins.less';
```

| Mixin | Description |
|---|---|
| `.font-hylia()` | Hylia Serif font family |
| `.font-body()` | System font stack |
| `.font-hylian-symbol()` | Hylian Symbols icon font |
| `.button-base()` | Standard button reset |
| `.button-size-sm()` / `.button-size-md()` / `.button-size-lg()` | Button sizing |
| `.card-base()` / `.card-elevated()` | Card styles |
| `.sheikah-panel()` | Dark Sheikah panel with glow |
| `.glow-effect(@color)` | Box shadow glow |
| `.glow-border(@color)` | Border + glow |
| `.glow-animation(@color)` | Animated glow keyframes |
| `.heart-shape(@size)` | CSS heart shape |
| `.rupee-shape(@size, @color)` | CSS hexagon gem |
| `.typewriter-cursor()` | Blinking cursor |
| `.pulse-animation()` | Opacity pulse |
| `.respond-to(@breakpoint)` | Media query wrapper |

---

## CSS Custom Properties

All tokens are also available as CSS variables:

```css
var(--zelda-primary)
var(--zelda-sheikah-bg)
var(--space-md)
var(--radius-lg)
/* etc. */
```

---

## Fonts

- **Hylia Serif** — headings, game-style numbers. Class: `.font-hylia` or mixin `.font-hylia()`
- **Hylian Symbols** — icon glyphs via `SheikahIcon` component or mixin `.font-hylian-symbol()`

Both are bundled in `dist/index.css`.

---

## Conventions

- All components accept `className` for custom styling
- Zelda game components use `Sheikah` dark theme (teal on dark blue)
- Basic UI components default to light theme
- Props extending HTML attributes use `Omit<>` for conflicting names (`title`, `type`, `onSelect`)
- Use `classNames` library for conditional classes
- Less is the stylesheet language (not CSS Modules for component styles)
