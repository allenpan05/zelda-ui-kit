// 全局样式
import './styles/index.less';

// ============================================
// 基础 UI 组件
// ============================================
export { Button } from './components/Button';
export type { ButtonProps, ButtonType, ButtonSize } from './components/Button';

export { Card } from './components/Card';
export type { CardProps, CardVariant, CardPadding } from './components/Card';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

// ============================================
// Zelda 遊戲組件
// ============================================
export { Heart } from './components/Heart';
export type { HeartProps, HeartSize } from './components/Heart';

export { Rupee } from './components/Rupee';
export type { RupeeProps, RupeeColor, RupeeSize } from './components/Rupee';

export { DialogueBox } from './components/DialogueBox';
export type { DialogueBoxProps } from './components/DialogueBox';

export { InventoryGrid } from './components/InventoryGrid';
export type { InventoryGridProps, InventoryItem } from './components/InventoryGrid';

export { MapMarker } from './components/MapMarker';
export type { MapMarkerProps, MapMarkerType } from './components/MapMarker';

export { SheikahPanel } from './components/SheikahPanel';
export type { SheikahPanelProps } from './components/SheikahPanel';

// ============================================
// 新增 Zelda 組件 (來自線上資源融合)
// ============================================
export { SheikahIcon } from './components/SheikahIcon';
export type { SheikahIconProps, SheikahIconName, SheikahIconSize } from './components/SheikahIcon';

export { StaminaWheel } from './components/StaminaWheel';
export type { StaminaWheelProps, StaminaWheelSize } from './components/StaminaWheel';

export { SelectionArrows } from './components/SelectionArrows';
export type { SelectionArrowsProps, SelectionArrowsPosition } from './components/SelectionArrows';

export { NotificationToast } from './components/NotificationToast';
export type { NotificationToastProps, NotificationToastType } from './components/NotificationToast';

export { SheikahText } from './components/SheikahText';
export type { SheikahTextProps, SheikahLetter } from './components/SheikahText';
