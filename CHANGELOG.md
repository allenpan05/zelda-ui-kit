# Changelog

## v0.3.0

### Features
- Add Compass component: in-game compass with N/S/E/W directions, custom markers, and rotation
- Add StealthMeter component: stealth gauge with hidden/partial/detected states
- Add TemperatureGauge component: temperature indicator with cold/hot/comfortable warnings
- Add ItemDetail component: item info card with rarity levels, stats, effects, and pricing
- Add BossHealthBar component: segmented boss health bar with phase display and low-health warnings
- Add WeatherIcon component: 7 weather types (sunny/cloudy/rainy/stormy/snowy/foggy/windy) with animations
- Add RuneCooldown component: rune ability cooldown indicator (Magnesis/Stasis/Cryonis/Bombs/Camera)

## v0.2.0

### Features
- Add Vitest + React Testing Library testing framework with 76 tests across 9 components (#1)
- Add ARIA roles, keyboard navigation, and focus trap for accessible components (#1)
- Add forwardRef support to all 28 components (#1)
- Add ErrorBoundary component with fallback, onError, and reset support (#1)
- Add LLM.md AI reference doc and export all 27 components
- Add Zelda-inspired components from online resources

### Bug Fixes
- Fix links to Get Started and GitHub buttons in demo
- Fix base path for GitHub Pages demo
- Fix empty Quest Toast handler in demo (#1)

### Maintenance
- Unify all component exports as named exports (#1)
- Remove dead code: unused .module.less, reset.less, default.less (#1)
- Add LICENSE (MIT) file (#1)
- Add npm publish CI/CD workflow (#1)
- Add useMergedRef hook to deduplicate ref merging (#1)
- Use classNames consistently in Modal and Select (#1)

## v0.1.0

Initial release with 27 Zelda-inspired React UI components.
