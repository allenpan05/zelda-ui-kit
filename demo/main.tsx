import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.less';
import './demo.less';

import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { Badge } from '../src/components/Badge';
import { Heart } from '../src/components/Heart';
import { Rupee } from '../src/components/Rupee';
import { DialogueBox } from '../src/components/DialogueBox';
import { InventoryGrid } from '../src/components/InventoryGrid';
import { MapMarker } from '../src/components/MapMarker';
import { SheikahPanel } from '../src/components/SheikahPanel';
import { SheikahIcon } from '../src/components/SheikahIcon';
import { StaminaWheel } from '../src/components/StaminaWheel';
import { SelectionArrows } from '../src/components/SelectionArrows';
import { NotificationToast } from '../src/components/NotificationToast';
import { SheikahText } from '../src/components/SheikahText';
import { Compass } from '../src/components/Compass';
import { StealthMeter } from '../src/components/StealthMeter';
import { TemperatureGauge } from '../src/components/TemperatureGauge';
import { ItemDetail } from '../src/components/ItemDetail';
import { BossHealthBar } from '../src/components/BossHealthBar';
import { WeatherIcon } from '../src/components/WeatherIcon';
import { RuneCooldown } from '../src/components/RuneCooldown';

const App: React.FC = () => {
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [health, setHealth] = useState(7);
  const [stamina, setStamina] = useState(80);
  const [rupees, setRupees] = useState(1234);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [toastVisible, setToastVisible] = useState(false);
  const [questToastVisible, setQuestToastVisible] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const [stealthValue, setStealthValue] = useState(75);
  const [temperature, setTemperature] = useState(22);
  const [bossHealth, setBossHealth] = useState(80);
  const [runeCooldown, setRuneCooldown] = useState(60);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Set initial theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // 模擬物品數據
  const inventoryItems = [
    { id: '1', icon: '🗡️', name: 'Master Sword', count: 1, isNew: true, durability: 100, type: 'weapon' },
    { id: '2', icon: '🛡️', name: 'Hylian Shield', count: 1, durability: 85, type: 'shield' },
    { id: '3', icon: '🏹', name: 'Bow of Light', count: 1, durability: 60, type: 'weapon' },
    { id: '4', icon: '🍎', name: 'Apple', count: 15, type: 'food' },
    { id: '5', icon: '🍖', name: 'Meat', count: 8, type: 'food' },
    { id: '6', icon: '💎', name: 'Diamond', count: 3, type: 'material' },
    { id: '7', icon: '🔮', name: 'Ancient Core', count: 5, type: 'material' },
    { id: '8', icon: '🌿', name: 'Hearty Radish', count: 12, type: 'food' },
    { id: '9', icon: '⚡', name: 'Shock Arrow', count: 20, type: 'weapon' },
    { id: '10', icon: '🔥', name: 'Fire Arrow', count: 10, type: 'weapon' },
  ];

  // NPC 對話數據
  const dialogues = [
    {
      speaker: 'Zelda',
      text: 'Link... You are our last hope. The Calamity Ganon grows stronger with each passing moment. We must act now to save Hyrule from destruction!',
      avatar: '👸',
    },
    {
      speaker: 'Old Man',
      text: 'Ah, you\'re awake. You\'ve been asleep for quite some time... Welcome to the world of Hyrule!',
      avatar: '👴',
    },
    {
      speaker: 'Impa',
      text: 'The Sheikah Slate was left here for you by the Princess herself. It contains many useful functions.',
      avatar: '👵',
    },
  ];

  const [currentDialogue, setCurrentDialogue] = useState(0);

  return (
    <div className="demo">
      {/* Header */}
      <header className="demo-header">
        <div className="demo-header-content">
          <div className="demo-theme-toggle">
            <Button type="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </Button>
          </div>
          <div className="demo-logo">
            <span className="demo-triforce">◆</span>
          </div>
          <h1 className="demo-title">Zelda UI Kit</h1>
          <p className="demo-subtitle">Sheikah-inspired React Component Library</p>
          <div className="demo-header-actions">
            <a href="https://github.com/allenpan05/zelda-ui-kit#quick-start" target="_blank" rel="noopener noreferrer">
              <Button type="primary" size="sm">Get Started</Button>
            </a>
            <a href="https://github.com/allenpan05/zelda-ui-kit" target="_blank" rel="noopener noreferrer">
              <Button type="outline" size="sm">GitHub</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="demo-main">
        {/* 側邊導航 */}
        <nav className="demo-nav">
          <div className="demo-nav-inner">
            <h3 className="demo-nav-title">Components</h3>
            <ul className="demo-nav-list">
              <li><a href="#buttons">Buttons</a></li>
              <li><a href="#cards">Cards</a></li>
              <li><a href="#badges">Badges</a></li>
              <li><a href="#heart">Heart</a></li>
              <li><a href="#rupee">Rupee</a></li>
              <li><a href="#dialogue">DialogueBox</a></li>
              <li><a href="#inventory">InventoryGrid</a></li>
              <li><a href="#map">MapMarker</a></li>
              <li><a href="#sheikah">SheikahPanel</a></li>
              <li><a href="#stamina">StaminaWheel</a></li>
              <li><a href="#sheikah-icons">SheikahIcon</a></li>
              <li><a href="#sheikah-text">SheikahText</a></li>
              <li><a href="#toast">NotificationToast</a></li>
              <li><a href="#arrows">SelectionArrows</a></li>
              <li><a href="#compass">Compass</a></li>
              <li><a href="#stealth">StealthMeter</a></li>
              <li><a href="#temperature">TemperatureGauge</a></li>
              <li><a href="#item-detail">ItemDetail</a></li>
              <li><a href="#boss-health">BossHealthBar</a></li>
              <li><a href="#weather">WeatherIcon</a></li>
              <li><a href="#rune">RuneCooldown</a></li>
            </ul>
          </div>
        </nav>

        {/* 內容區域 */}
        <div className="demo-content">
          {/* Buttons */}
          <section id="buttons" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Buttons</h2>
              <p className="demo-section-desc">按鈕組件，支持多種類型、尺寸和狀態</p>
            </div>
            
            <div className="demo-block">
              <h3 className="demo-block-title">類型</h3>
              <div className="demo-row">
                <Button type="primary">Primary</Button>
                <Button type="secondary">Secondary</Button>
                <Button type="outline">Outline</Button>
                <Button type="ghost">Ghost</Button>
                <Button type="danger">Danger</Button>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">尺寸</h3>
              <div className="demo-row">
                <Button type="primary" size="sm">Small</Button>
                <Button type="primary" size="md">Medium</Button>
                <Button type="primary" size="lg">Large</Button>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">狀態</h3>
              <div className="demo-row">
                <Button type="primary" loading>Loading</Button>
                <Button type="primary" disabled>Disabled</Button>
                <Button type="primary" icon={<span>⚔️</span>}>With Icon</Button>
                <Button type="outline" icon={<span>🔍</span>}>Search</Button>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section id="cards" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Cards</h2>
              <p className="demo-section-desc">卡片容器，支持多種變體和懸停效果</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">變體</h3>
              <div className="demo-cards">
                <Card title="Default Card" hoverable>
                  <p>這是默認樣式的卡片，帶有基本的邊框和陰影。</p>
                </Card>
                <Card title="Elevated Card" variant="elevated" hoverable>
                  <p>這是浮起樣式的卡片，懸停時會有更明顯的陰影效果。</p>
                </Card>
                <Card title="Outlined Card" variant="outlined" hoverable>
                  <p>這是輪廓樣式的卡片，只有邊框沒有背景色。</p>
                </Card>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">Sheikah 風格</h3>
              <div className="demo-cards">
                <Card title="Shrine Quest" variant="sheikah" extra={<Badge variant="primary">Active</Badge>}>
                  <p>Discover and complete the hidden shrine in the Dueling Peaks region.</p>
                </Card>
                <Card title="Divine Beast" variant="sheikah" extra={<Badge variant="success">Completed</Badge>}>
                  <p>Free Vah Ruta from Ganon's corruption in the Lanayru region.</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Badges */}
          <section id="badges" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Badges</h2>
              <p className="demo-section-desc">徽章組件，用于標記狀態或顯示計數</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">顏色變體</h3>
              <div className="demo-row">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">計數模式</h3>
              <div className="demo-row">
                <Badge count={5}>
                  <Button type="outline">Messages</Button>
                </Badge>
                <Badge count={99}>
                  <Button type="outline">Items</Button>
                </Badge>
                <Badge count={150} overflowCount={99}>
                  <Button type="outline">Quests</Button>
                </Badge>
                <Badge dot>
                  <Button type="outline">Notifications</Button>
                </Badge>
              </div>
            </div>
          </section>

          {/* Heart */}
          <section id="heart" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Heart (生命值)</h2>
              <p className="demo-section-desc">心形生命值顯示，支持動態交互和動畫效果</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <div className="demo-heart-display">
                  <Heart value={health} max={10} size="lg" animated showValue />
                </div>
                <div className="demo-heart-controls">
                  <Button type="danger" size="sm" onClick={() => setHealth(Math.max(0, health - 1))}>
                    ⚔️ Damage
                  </Button>
                  <Button type="primary" size="sm" onClick={() => setHealth(Math.min(10, health + 1))}>
                    💚 Heal
                  </Button>
                  <Button type="ghost" size="sm" onClick={() => setHealth(10)}>
                    Full Restore
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同狀態</h3>
              <div className="demo-row">
                <div className="demo-heart-item">
                  <Heart value={5} max={5} size="md" />
                  <span>Full Health</span>
                </div>
                <div className="demo-heart-item">
                  <Heart value={3} max={5} size="md" />
                  <span>Partial</span>
                </div>
                <div className="demo-heart-item">
                  <Heart value={1} max={5} size="md" animated />
                  <span>Low Health</span>
                </div>
                <div className="demo-heart-item">
                  <Heart value={0} max={5} size="md" />
                  <span>Empty</span>
                </div>
              </div>
            </div>
          </section>

          {/* Rupee */}
          <section id="rupee" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Rupee (寶石計數器)</h2>
              <p className="demo-section-desc">寶石貨幣顯示，支持多種顏色和數字格式化</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">寶石顏色</h3>
              <div className="demo-rupees">
                <div className="demo-rupee-item">
                  <Rupee value={1} color="green" size="lg" />
                  <span>Green Rupee</span>
                  <span className="demo-rupee-value">1</span>
                </div>
                <div className="demo-rupee-item">
                  <Rupee value={5} color="blue" size="lg" />
                  <span>Blue Rupee</span>
                  <span className="demo-rupee-value">5</span>
                </div>
                <div className="demo-rupee-item">
                  <Rupee value={20} color="red" size="lg" />
                  <span>Red Rupee</span>
                  <span className="demo-rupee-value">20</span>
                </div>
                <div className="demo-rupee-item">
                  <Rupee value={50} color="purple" size="lg" />
                  <span>Purple Rupee</span>
                  <span className="demo-rupee-value">50</span>
                </div>
                <div className="demo-rupee-item">
                  <Rupee value={100} color="gold" size="lg" />
                  <span>Gold Rupee</span>
                  <span className="demo-rupee-value">100</span>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">數字格式化</h3>
              <div className="demo-row">
                <Rupee value={1234} color="green" size="lg" animated />
                <Rupee value={56789} color="blue" size="lg" />
                <Rupee value={10000} color="gold" size="lg" />
              </div>
            </div>
          </section>

          {/* DialogueBox */}
          <section id="dialogue" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">DialogueBox (對話框)</h2>
              <p className="demo-section-desc">NPC 對話框，支持打字機效果和頭像顯示</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-dialogue-controls">
                {dialogues.map((d, i) => (
                  <Button
                    key={i}
                    type={currentDialogue === i ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCurrentDialogue(i);
                      setDialogueVisible(true);
                    }}
                  >
                    {d.avatar} {d.speaker}
                  </Button>
                ))}
              </div>
              {dialogueVisible && (
                <DialogueBox
                  speaker={dialogues[currentDialogue].speaker}
                  avatar={<span style={{ fontSize: 32 }}>{dialogues[currentDialogue].avatar}</span>}
                  typewriter
                  closable
                  onClose={() => setDialogueVisible(false)}
                >
                  {dialogues[currentDialogue].text}
                </DialogueBox>
              )}
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">靜態示例</h3>
              <DialogueBox speaker="Old Man" avatar={<span style={{ fontSize: 32 }}>👴</span>}>
                Ah, you're awake. You've been asleep for quite some time...
                Welcome to the world of Hyrule!
              </DialogueBox>
            </div>
          </section>

          {/* InventoryGrid */}
          <section id="inventory" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">InventoryGrid (物品欄)</h2>
              <p className="demo-section-desc">遊戲風格物品欄，支持選擇、耐久度顯示和新物品標記</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">物品欄</h3>
              <div className="demo-inventory-container">
                <InventoryGrid
                  items={inventoryItems}
                  columns={5}
                  totalSlots={20}
                  selectedId={selectedItem?.id || null}
                  onSelect={(item) => setSelectedItem(item)}
                />
                {selectedItem && (
                  <Card title={selectedItem.name} variant="sheikah" className="demo-inventory-detail">
                    <div className="demo-inventory-info">
                      <span className="demo-inventory-icon">{selectedItem.icon}</span>
                      <div>
                        <p><strong>Type:</strong> {selectedItem.type}</p>
                        {selectedItem.durability !== undefined && (
                          <p><strong>Durability:</strong> {selectedItem.durability}%</p>
                        )}
                        {selectedItem.count > 1 && (
                          <p><strong>Count:</strong> {selectedItem.count}</p>
                        )}
                        {selectedItem.isNew && (
                          <Badge variant="warning" size="sm">New</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </section>

          {/* MapMarker */}
          <section id="map" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">MapMarker (地圖標記)</h2>
              <p className="demo-section-desc">地圖標記組件，支持多種類型和狀態</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">標記類型</h3>
              <div className="demo-map-grid">
                <div className="demo-map-item">
                  <MapMarker type="tower" label="Sheikah Tower" active />
                  <span>Tower</span>
                </div>
                <div className="demo-map-item">
                  <MapMarker type="shrine" label="Shrine" />
                  <span>Shrine</span>
                </div>
                <div className="demo-map-item">
                  <MapMarker type="stable" label="Stable" />
                  <span>Stable</span>
                </div>
                <div className="demo-map-item">
                  <MapMarker type="village" label="Village" />
                  <span>Village</span>
                </div>
                <div className="demo-map-item">
                  <MapMarker type="custom" label="Custom" />
                  <span>Custom</span>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">狀態</h3>
              <div className="demo-row">
                <MapMarker type="shrine" label="Discovered" />
                <MapMarker type="shrine" label="Undiscovered" discovered={false} />
                <MapMarker type="tower" label="Activated" active />
              </div>
            </div>
          </section>

          {/* SheikahPanel */}
          <section id="sheikah" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">SheikahPanel (希卡之石面板)</h2>
              <p className="demo-section-desc">Sheikah 風格面板，帶有科技感邊框和掃描線效果</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">基本用法</h3>
              <div className="demo-panels">
                <SheikahPanel title="Sheikah Slate" subtitle="Ancient Technology">
                  <p>Welcome, hero. I am your Sheikah Slate, a multipurpose ancient artifact.</p>
                  <p style={{ marginTop: 8 }}>Functions include: Map, Camera, Album, and Rune abilities.</p>
                </SheikahPanel>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">裝飾和發光效果</h3>
              <div className="demo-panels">
                <SheikahPanel title="Terminal" closable decorated glowing>
                  <p>Accessing Hyrule Castle network...</p>
                  <p style={{ marginTop: 8 }}>Calamity Ganon containment level: 87%</p>
                </SheikahPanel>
              </div>
            </div>
          </section>

          {/* StaminaWheel */}
          <section id="stamina" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">StaminaWheel (耐力環)</h2>
              <p className="demo-section-desc">BOTW 標誌性耐力計，圓形進度條帶低耐力警告</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <div className="demo-stamina-display">
                  <StaminaWheel value={stamina} max={100} size="lg" showValue />
                </div>
                <div className="demo-heart-controls">
                  <Button type="danger" size="sm" onClick={() => setStamina(Math.max(0, stamina - 10))}>
                    🏃 Use Stamina
                  </Button>
                  <Button type="primary" size="sm" onClick={() => setStamina(Math.min(100, stamina + 10))}>
                    💚 Rest
                  </Button>
                  <Button type="ghost" size="sm" onClick={() => setStamina(100)}>
                    Full Restore
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同尺寸</h3>
              <div className="demo-row" style={{ alignItems: 'center' }}>
                <div className="demo-heart-item">
                  <StaminaWheel value={75} max={100} size="sm" />
                  <span>Small</span>
                </div>
                <div className="demo-heart-item">
                  <StaminaWheel value={50} max={100} size="md" showValue />
                  <span>Medium</span>
                </div>
                <div className="demo-heart-item">
                  <StaminaWheel value={15} max={100} size="lg" showValue />
                  <span>Low Warning</span>
                </div>
              </div>
            </div>
          </section>

          {/* SheikahIcon */}
          <section id="sheikah-icons" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">SheikahIcon (海利亞符號)</h2>
              <p className="demo-section-desc">使用 Hylian Symbols 字體的 Zelda 圖騰圖標</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">符號展示</h3>
              <div className="demo-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
                {(['force', 'triforce', 'eye', 'sheikah', 'gerudo', 'kokiri', 'zora', 'goron', 'royal', 'din', 'farore', 'nayru', 'light', 'forest', 'water', 'spirit', 'shadow', 'heart'] as const).map(name => (
                  <div key={name} className="demo-heart-item" style={{ minWidth: 60 }}>
                    <SheikahIcon name={name} size="lg" glowing />
                    <span style={{ fontSize: 12 }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同尺寸</h3>
              <div className="demo-row" style={{ alignItems: 'center' }}>
                <SheikahIcon name="triforce" size="xs" />
                <SheikahIcon name="triforce" size="sm" />
                <SheikahIcon name="triforce" size="md" />
                <SheikahIcon name="triforce" size="lg" />
                <SheikahIcon name="triforce" size="xl" glowing />
              </div>
            </div>
          </section>

          {/* SheikahText */}
          <section id="sheikah-text" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">SheikahText (希卡文字)</h2>
              <p className="demo-section-desc">使用 clip-path 渲染的 Sheikah 字母表</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">支援的字母</h3>
              <div className="demo-row" style={{ flexWrap: 'wrap', gap: '12px' }}>
                {['a', 'b', 'c', 'g', 'y', 'x', '0', '1', '2', '?', '!', '.', '-'].map(ch => (
                  <div key={ch} className="demo-heart-item">
                    <SheikahText text={ch} size={32} glowing />
                    <span style={{ fontSize: 12, fontFamily: 'monospace' }}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">組合文字</h3>
              <div style={{ display: 'flex', gap: 32 }}>
                <div className="demo-heart-item">
                  <SheikahText text="abc" size={40} glowing />
                  <span>abc</span>
                </div>
                <div className="demo-heart-item">
                  <SheikahText text="123" size={40} glowing />
                  <span>123</span>
                </div>
              </div>
            </div>
          </section>

          {/* NotificationToast */}
          <section id="toast" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">NotificationToast (通知彈窗)</h2>
              <p className="demo-section-desc">BOTW 風格的通知彈窗，帶有 Sheikah 科技感</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">觸發通知</h3>
              <div className="demo-row">
                <Button type="primary" size="sm" onClick={() => setToastVisible(true)}>
                  📦 Show Item Toast
                </Button>
                <Button type="outline" size="sm" onClick={() => setQuestToastVisible(true)}>
                  🏆 Show Quest Toast
                </Button>
              </div>
              {toastVisible && (
                <NotificationToast
                  type="item"
                  title="Ancient Core"
                  description="Obtained from a Guardian Scout. A high-energy core used in ancient Sheikah technology."
                  duration={4000}
                  onClose={() => setToastVisible(false)}
                />
              )}
              {questToastVisible && (
                <NotificationToast
                  type="quest"
                  title="Quest Complete"
                  description="Defeated the Guardian Scout and recovered the ancient technology."
                  duration={4000}
                  onClose={() => setQuestToastVisible(false)}
                />
              )}
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">靜態示例</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <NotificationToast type="item" title="Hearty Radish" description="A rare radish that restores all hearts." duration={0} visible />
                  <NotificationToast type="quest" title="Shrine Quest Complete" description={'The "Myahm Agana" shrine has been discovered.'} duration={0} visible />
                <NotificationToast type="warning" title="Low Stamina" description="Consider resting before continuing." duration={0} visible />
              </div>
            </div>
          </section>

          {/* SelectionArrows */}
          <section id="arrows" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">SelectionArrows (選中箭頭)</h2>
              <p className="demo-section-desc">BOTW 物品欄風格的選中指示器，帶彈跳動畫</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">四方向箭頭</h3>
              <div className="demo-row" style={{ gap: 48 }}>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows />
                  <span style={{ fontSize: 12 }}>All</span>
                </div>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows position="top" />
                  <span style={{ fontSize: 12 }}>Top</span>
                </div>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows position="left" />
                  <span style={{ fontSize: 12 }}>Left</span>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">速度變體</h3>
              <div className="demo-row" style={{ gap: 48 }}>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows speed="slow" />
                  <span style={{ fontSize: 12 }}>Slow</span>
                </div>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows speed="normal" />
                  <span style={{ fontSize: 12 }}>Normal</span>
                </div>
                <div style={{ position: 'relative', width: 80, height: 80, background: 'rgba(0,200,184,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SelectionArrows speed="fast" />
                  <span style={{ fontSize: 12 }}>Fast</span>
                </div>
              </div>
            </div>
          </section>

          {/* Compass */}
          <section id="compass" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">Compass (指南針)</h2>
              <p className="demo-section-desc">遊戲風格指南針，顯示方向和自定義標記點</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <div className="demo-stamina-display">
                  <Compass
                    heading={compassHeading}
                    size="lg"
                    showDirections
                    showDegrees
                    markers={[
                      { angle: 45, label: 'Shrine', active: true },
                      { angle: 200, label: 'Tower' },
                    ]}
                  />
                </div>
                <div className="demo-heart-controls">
                  <Button type="primary" size="sm" onClick={() => setCompassHeading((compassHeading - 45 + 360) % 360)}>
                    ← Rotate Left
                  </Button>
                  <Button type="primary" size="sm" onClick={() => setCompassHeading((compassHeading + 45) % 360)}>
                    Rotate Right →
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同尺寸</h3>
              <div className="demo-row" style={{ alignItems: 'center', gap: 32 }}>
                <div className="demo-heart-item">
                  <Compass heading={0} size="sm" />
                  <span>Small</span>
                </div>
                <div className="demo-heart-item">
                  <Compass heading={90} size="md" showDegrees />
                  <span>Medium</span>
                </div>
                <div className="demo-heart-item">
                  <Compass heading={225} size="lg" showDirections showDegrees />
                  <span>Large</span>
                </div>
              </div>
            </div>
          </section>

          {/* StealthMeter */}
          <section id="stealth" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">StealthMeter (潛行計)</h2>
              <p className="demo-section-desc">潛行狀態指示器，顯示隱蔽程度和被發現警告</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <StealthMeter value={stealthValue} size="lg" />
                <div className="demo-heart-controls">
                  <Button type="danger" size="sm" onClick={() => setStealthValue(Math.max(0, stealthValue - 15))}>
                    👁️ More Visible
                  </Button>
                  <Button type="primary" size="sm" onClick={() => setStealthValue(Math.min(100, stealthValue + 15))}>
                    🫥 More Hidden
                  </Button>
                  <Button type="outline" size="sm" onClick={() => setStealthValue(0)}>
                    Detected!
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同狀態</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <StealthMeter value={90} size="md" />
                <StealthMeter value={50} size="md" />
                <StealthMeter value={10} size="md" detected />
              </div>
            </div>
          </section>

          {/* TemperatureGauge */}
          <section id="temperature" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">TemperatureGauge (溫度計)</h2>
              <p className="demo-section-desc">環境溫度指示器，顯示寒冷和炎熱警告</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <TemperatureGauge value={temperature} size="lg" showIcon showValue />
                <div className="demo-heart-controls">
                  <Button type="primary" size="sm" onClick={() => setTemperature(Math.max(-40, temperature - 10))}>
                    ❄️ Colder
                  </Button>
                  <Button type="danger" size="sm" onClick={() => setTemperature(Math.min(60, temperature + 10))}>
                    🔥 Warmer
                  </Button>
                  <Button type="outline" size="sm" onClick={() => setTemperature(22)}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同狀態</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TemperatureGauge value={-20} size="md" />
                <TemperatureGauge value={22} size="md" />
                <TemperatureGauge value={50} size="md" />
              </div>
            </div>
          </section>

          {/* ItemDetail */}
          <section id="item-detail" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">ItemDetail (物品詳情)</h2>
              <p className="demo-section-desc">物品詳情卡片，顯示屬性、效果和價格</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同稀有度</h3>
              <div className="demo-cards">
                <ItemDetail
                  name="Traveler's Sword"
                  description="A common sword often carried by travelers."
                  rarity="common"
                  stats={[
                    { label: 'Attack', value: 5 },
                    { label: 'Durability', value: 20 },
                  ]}
                  sellPrice={15}
                  closable
                />
                <ItemDetail
                  name="Flameblade"
                  description="A magical blade that burns with an eternal flame."
                  rarity="rare"
                  stats={[
                    { label: 'Attack', value: 24 },
                    { label: 'Durability', value: 60 },
                  ]}
                  effect="Fire damage in cold areas"
                  sellPrice={340}
                  closable
                />
                <ItemDetail
                  name="Master Sword"
                  description="The legendary blade that seals the darkness."
                  rarity="legendary"
                  stats={[
                    { label: 'Attack', value: 30 },
                    { label: 'Special', value: '60 vs Evil' },
                  ]}
                  effect="Bonus damage to Ganon-afflicted enemies"
                  closable
                />
              </div>
            </div>
          </section>

          {/* BossHealthBar */}
          <section id="boss-health" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">BossHealthBar (Boss 血量條)</h2>
              <p className="demo-section-desc">分段式 Boss 血量條，帶有低血量警告效果</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <div style={{ width: '100%', maxWidth: 500 }}>
                  <BossHealthBar
                    name="Calamity Ganon"
                    value={bossHealth}
                    max={100}
                    segments={5}
                    size="lg"
                    phase={2}
                  />
                </div>
                <div className="demo-heart-controls">
                  <Button type="danger" size="sm" onClick={() => setBossHealth(Math.max(0, bossHealth - 15))}>
                    ⚔️ Attack
                  </Button>
                  <Button type="ghost" size="sm" onClick={() => setBossHealth(100)}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">不同狀態</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
                <BossHealthBar name="Windblight Ganon" value={100} max={100} segments={4} size="md" phase={1} />
                <BossHealthBar name="Fireblight Ganon" value={45} max={100} segments={4} size="md" phase={2} />
                <BossHealthBar name="Waterblight Ganon" value={10} max={100} segments={4} size="md" staggered />
              </div>
            </div>
          </section>

          {/* WeatherIcon */}
          <section id="weather" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">WeatherIcon (天氣圖標)</h2>
              <p className="demo-section-desc">天氣指示器，帶有動態效果和溫度顯示</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">天氣類型</h3>
              <div className="demo-row" style={{ flexWrap: 'wrap', gap: 24 }}>
                {(['sunny', 'cloudy', 'rainy', 'stormy', 'snowy', 'foggy', 'windy'] as const).map(weather => (
                  <div key={weather} className="demo-heart-item">
                    <WeatherIcon weather={weather} size="lg" animated />
                    <span>{weather.charAt(0).toUpperCase() + weather.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">帶溫度顯示</h3>
              <div className="demo-row" style={{ gap: 32 }}>
                <WeatherIcon weather="snowy" size="lg" showLabel temperature={-5} />
                <WeatherIcon weather="sunny" size="lg" showLabel temperature={28} />
                <WeatherIcon weather="stormy" size="lg" showLabel temperature={18} />
              </div>
            </div>
          </section>

          {/* RuneCooldown */}
          <section id="rune" className="demo-section">
            <div className="demo-section-header">
              <h2 className="demo-section-title">RuneCooldown (符文冷卻)</h2>
              <p className="demo-section-desc">符文技能冷卻指示器，顯示可用狀態</p>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">交互式演示</h3>
              <div className="demo-interactive">
                <RuneCooldown
                  rune="magnesis"
                  cooldown={runeCooldown}
                  maxCooldown={100}
                  size="lg"
                  showLabel
                />
                <div className="demo-heart-controls">
                  <Button type="danger" size="sm" onClick={() => setRuneCooldown(Math.max(0, runeCooldown - 20))}>
                    Use Ability
                  </Button>
                  <Button type="primary" size="sm" onClick={() => setRuneCooldown(Math.min(100, runeCooldown + 20))}>
                    Recover
                  </Button>
                  <Button type="ghost" size="sm" onClick={() => setRuneCooldown(100)}>
                    Full Cooldown
                  </Button>
                </div>
              </div>
            </div>

            <div className="demo-block">
              <h3 className="demo-block-title">所有符文</h3>
              <div className="demo-row" style={{ gap: 24 }}>
                <RuneCooldown rune="magnesis" cooldown={100} size="md" showLabel />
                <RuneCooldown rune="stasis" cooldown={75} size="md" showLabel />
                <RuneCooldown rune="cryonis" cooldown={50} size="md" showLabel />
                <RuneCooldown rune="bombs" cooldown={25} size="md" showLabel />
                <RuneCooldown rune="camera" cooldown={0} size="md" showLabel />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="demo-footer">
        <div className="demo-footer-content">
          <p className="demo-footer-logo">◆ Zelda UI Kit</p>
          <p className="demo-footer-text">Inspired by The Legend of Zelda: Breath of the Wild</p>
          <p className="demo-footer-sub">This is a fan project for educational purposes only. Not affiliated with Nintendo.</p>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
