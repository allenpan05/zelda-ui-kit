# Zelda UI Kit 設計規格

## 概述
一款基於《薩爾達傳說：曠野之息》風格的 React UI 組件庫，混合 Sheikah 科技感與海拉爾自然風格。

## 設計原則
- **科技感與自然融合**: Sheikah 藍綠色為主，海拉爾大地色為輔
- **遊戲沉浸感**: 保留 Zelda 視覺語言，如幾何線條、發光效果
- **簡潔實用**: 組件易用，API 清晰

---

## 配色系統 (Design Tokens)

### 主色 (Sheikah 科技風)
| Token | 值 | 用途 |
|---|---|---|
| `--zelda-primary` | `#00C8B8` | 主要按鈕、焦點狀態 |
| `--zelda-primary-dark` | `#00A89C` | Hover 狀態 |
| `--zelda-primary-light` | `#B2F5EA` | 背景高亮 |
| `--zelda-primary-bg` | `#E6FFFA` | 淺色背景 |

### 輔助色 (海拉爾自然風)
| Token | 值 | 用途 |
|---|---|---|
| `--zelda-accent` | `#8B6914` | 金色點綴、重要標記 |
| `--zelda-green` | `#4A7C59` | 自然元素、成功狀態 |
| `--zelda-brown` | `#6B4423` | 文字、邊框 |
| `--zelda-sand` | `#F5E6D3` | 卡片背景 |

### 功能色
| Token | 值 | 用途 |
|---|---|---|
| `--zelda-heart` | `#FF4757` | 生命值 |
| `--zelda-rupee-green` | `#2ED573` | 綠色寶石 |
| `--zelda-rupee-blue` | `#1E90FF` | 藍色寶石 |
| `--zelda-rupee-red` | `#FF4757` | 紅色寶石 |
| `--zelda-rupee-purple` | `#9B59B6` | 紫色寶石 |
| `--zelda-rupee-gold` | `#FFD700` | 金色寶石 |
| `--zelda-warning` | `#FFA502` | 警告 |
| `--zelda-danger` | `#FF4757` | 危險 |

### 中性色
| Token | 值 | 用途 |
|---|---|---|
| `--zelda-text` | `#2D3436` | 主要文字 |
| `--zelda-text-secondary` | `#636E72` | 次要文字 |
| `--zelda-border` | `#DFE6E9` | 邊框 |
| `--zelda-bg` | `#FAFAF5` | 頁面背景 |
| `--zelda-white` | `#FFFFFF` | 卡片背景 |

---

## 字體

### Hylia Serif
- 用於: 標題、重要數字、遊戲風格文字
- 來源: 免費 fan-made 字體

### 系統字體後備
```css
font-family: 'Hylia Serif', 'Georgia', 'Times New Roman', serif;
```

---

## 組件清單

### 第一階段：基礎組件

#### 1. Button
- **屬性**:
  - `type`: `'primary' | 'secondary' | 'outline' | 'ghost'` (默認: `'primary'`)
  - `size`: `'sm' | 'md' | 'lg'` (默認: `'md'`)
  - `disabled`: `boolean`
  - `loading`: `boolean`
  - `icon`: `ReactNode`
- **樣式**:
  - 圓角: 4px
  - Sheikah 風格邊框
  - Hover 發光效果

#### 2. Card
- **屬性**:
  - `variant`: `'default' | 'elevated' | 'outlined'` (默認: `'default'`)
  - `padding`: `'sm' | 'md' | 'lg'` (默認: `'md'`)
  - `hoverable`: `boolean`
- **樣式**:
  - 背景: `--zelda-sand`
  - 邊框: 2px solid `--zelda-brown`
  - 圓角: 8px

#### 3. Badge
- **屬性**:
  - `variant`: `'default' | 'success' | 'warning' | 'danger'` (默認: `'default'`)
  - `size`: `'sm' | 'md'` (默認: `'md'`)
- **樣式**:
  - 圓角膠囊形
  - 細邊框

### 第二階段：核心遊戲組件

#### 4. Heart (生命值)
- **屬性**:
  - `value`: `number` (當前值)
  - `max`: `number` (最大值，默認: 10)
  - `size`: `'sm' | 'md' | 'lg'` (默認: `'md'`)
  - `animated`: `boolean` (是否顯示動畫)
- **樣式**:
  - 使用 CSS clip-path 創建心形
  - 填充動畫
  - 半心支持

#### 5. Rupee (寶石計數器)
- **屬性**:
  - `value`: `number`
  - `color`: `'green' | 'blue' | 'red' | 'purple' | 'gold'` (默認: `'green'`)
  - `size`: `'sm' | 'md' | 'lg'` (默認: `'md'`)
  - `animated`: `boolean`
- **樣式**:
  - 六邊形寶石形狀
  - 光澤效果
  - 數字使用 Hylia Serif

#### 6. DialogueBox (對話框)
- **屬性**:
  - `speaker`: `string` (說話者名稱)
  - `children`: `ReactNode`
  - `onClose`: `() => void`
  - `typewriter`: `boolean` (打字機效果，默認: `true`)
- **樣式**:
  - 半透明深色背景
  - 白色邊框
  - 右下角關閉按鈕

### 第三階段：進階組件

#### 7. InventoryGrid (物品欄網格)
- **屬性**:
  - `items`: `InventoryItem[]`
  - `columns`: `number` (默認: 5)
  - `selected`: `number | null`
  - `onSelect`: `(index: number) => void`
  - `onKeyDown`: `(e: KeyboardEvent) => void`
- **樣式**:
  - CSS Grid 佈局
  - 選中項高亮邊框
  - 空位顯示虛線框

#### 8. MapMarker (地圖標記)
- **屬性**:
  - `type`: `'tower' | 'shrine' | 'stable' | 'village' | 'custom'`
  - `label`: `string`
  - `active`: `boolean`
  - `onClick`: `() => void`
- **樣式**:
  - Sheikah 風格圖標
  - 懸停放大效果

#### 9. SheikahPanel (希卡之石面板)
- **屬性**:
  - `title`: `string`
  - `children`: `ReactNode`
  - `footer`: `ReactNode`
- **樣式**:
  - 深色科技感背景
  - 青色邊框
  - 圓角 + 內發光

---

## 動畫規範

### 過渡效果
- **基礎過渡**: `transition: all 0.2s ease`
- **懸停效果**: `transform: scale(1.05)`
- **點擊效果**: `transform: scale(0.95)`

### 特殊動畫
- **發光效果**: 用於焦點狀態
  ```css
  box-shadow: 0 0 10px var(--zelda-primary), 0 0 20px var(--zelda-primary-light);
  ```
- **打字機效果**: 用於對話框文字
- **脈動效果**: 用於生命值低時的警告

---

## 間距系統
| Token | 值 |
|---|---|
| `--space-xs` | `4px` |
| `--space-sm` | `8px` |
| `--space-md` | `16px` |
| `--space-lg` | `24px` |
| `--space-xl` | `32px` |
| `--space-2xl` | `48px` |

---

## 圓角系統
| Token | 值 |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `12px` |
| `--radius-full` | `9999px` |

---

## 技術棧
- React 18+
- TypeScript
- Less (樣式)
- Vite (構建)
- classnames (類名管理)

---

## 文件結構
```
src/
├── components/
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── Button.tsx
│   │   └── style.less
│   ├── Card/
│   ├── Badge/
│   ├── Heart/
│   ├── Rupee/
│   ├── DialogueBox/
│   ├── InventoryGrid/
│   ├── MapMarker/
│   └── SheikahPanel/
├── styles/
│   ├── variables.less    (設計 tokens)
│   ├── mixins.less       (可復用樣式)
│   └── fonts.less        (字體定義)
├── index.ts              (統一導出)
└── typings.d.ts          (類型定義)
```

---

## 下一步
1. 更新 package.json 和 vite 配置
2. 創建設計 tokens (Less 變量)
3. 下載並配置 Hylia Serif 字體
4. 按順序實現組件
5. 創建 Demo 頁面展示所有組件

---

## 線上資源融合 (2026-05)

### 參考來源
- **gwannon/Zelda-breath-of-the-wild-theme-css** — Hylian Symbols 字體、Sheikah 字母表 (clip-path)、寶石多層漸變
- **masbagal/react-sheikah-ui** — React Sheikah UI 庫架構參考
- **dev.to/flagrede BOTW 教程** — 選中三角箭頭動畫、物品欄交互設計

### 新增字體
| 字體 | 文件 | 用途 |
|---|---|---|
| Hylian Symbols | `HylianSymbols.ttf` | Zelda 圖騰符號 (力量三角、Sheikah 眼、種族徽章等) |

### 新增組件

#### SheikahIcon
- **用途**: 使用 Hylian Symbols 字體顯示 Zelda 圖騰
- **支援圖標**: force, triforce, eye, sheikah, gerudo, kokiri, zora, goron, royal, din, farore, nayru, light, forest, water, spirit, shadow, heart, drop, question, exclamation
- **屬性**: `name`, `size` (xs/sm/md/lg/xl), `glowing`, `color`

#### StaminaWheel
- **用途**: 圓形耐力環 (BOTW 標誌性 UI)
- **屬性**: `value` (0-100), `max`, `size` (sm/md/lg), `showValue`, `lowWarning`, `strokeWidth`
- **樣式**: SVG 圓環、低耐力脈動警告、空耐力紅色

#### SelectionArrows
- **用途**: 選中項的三角箭頭動畫指示器
- **屬性**: `position` (top/bottom/left/right/all), `visible`, `speed` (slow/normal/fast), `color`
- **樣式**: CSS 三角形 + 彈跳動畫

#### NotificationToast
- **用途**: BOTW 風格物品拾取/任務通知
- **屬性**: `type` (item/quest/info/success/warning), `title`, `description`, `icon`, `duration`, `onClose`
- **樣式**: Sheikah 科技感背景、頂部發光條、滑入/滑出動畫

#### SheikahText
- **用途**: 使用 clip-path 渲染 Sheikah 字母表
- **支援字母**: a, b, c, g, y, x, 0, 1, 2, ?, !, ., -
- **屬性**: `text`, `size`, `color`, `glowing`

### 樣式增強
- **Rupee 組件**: 升級為 gwannon 多層漸變效果 (90度水平漸變 + 內部高光層 + 反射邊緣)
- **Hylian Symbols 字體**: 新增 font-face 和 `.font-hylian-symbol()` mixin
