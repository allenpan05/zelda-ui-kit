// 全局样式
import './styles/index.less';

// ============================================
// 基础 UI 组件
// ============================================
export { Alert } from './components/Alert';
export type { AlertProps, AlertType } from './components/Alert';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge';

export { Button } from './components/Button';
export type { ButtonProps, ButtonType, ButtonSize } from './components/Button';

export { Card } from './components/Card';
export type { CardProps, CardVariant, CardPadding } from './components/Card';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { Collapse } from './components/Collapse';
export type { CollapseProps, CollapseItem } from './components/Collapse';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Input } from './components/Input';
export type { InputProps, InputSize } from './components/Input';

export { Loading } from './components/Loading';
export type { LoadingProps } from './components/Loading';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Progress } from './components/Progress';
export type { ProgressProps } from './components/Progress';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Tabs } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { Tag } from './components/Tag';
export type { TagProps, TagColor } from './components/Tag';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

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

export { ErrorBoundary } from './components/ErrorBoundary';
export type { ErrorBoundaryProps, ErrorBoundaryState } from './components/ErrorBoundary';

// ============================================
// 新增 Zelda 組件 (來自 Figma BOTW UI Kit)
// ============================================
export { Compass } from './components/Compass';
export type { CompassProps, CompassSize } from './components/Compass';

export { StealthMeter } from './components/StealthMeter';
export type { StealthMeterProps, StealthMeterSize } from './components/StealthMeter';

export { TemperatureGauge } from './components/TemperatureGauge';
export type { TemperatureGaugeProps, TemperatureGaugeSize, TemperatureUnit } from './components/TemperatureGauge';

export { ItemDetail } from './components/ItemDetail';
export type { ItemDetailProps, ItemDetailRarity } from './components/ItemDetail';

export { BossHealthBar } from './components/BossHealthBar';
export type { BossHealthBarProps, BossHealthBarSize } from './components/BossHealthBar';

export { WeatherIcon } from './components/WeatherIcon';
export type { WeatherIconProps, WeatherType, WeatherIconSize } from './components/WeatherIcon';

export { RuneCooldown } from './components/RuneCooldown';
export type { RuneCooldownProps, RuneCooldownSize, RuneType } from './components/RuneCooldown';
