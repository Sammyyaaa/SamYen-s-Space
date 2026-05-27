# FEATURES.md

## 功能清單

### ✅ 已完成

#### 自定義磁吸游標

- 雙層游標設計：dot（即時跟蹤）+ ring（延遲跟蹤，流體感）
- `mix-blend-mode: difference` 讓游標在任何背景上保持可見
- 6 種 variant：`default / hover / text / link / project / drag`
- 觸控裝置自動停用（`isTouchDevice()` 檢測）
- 磁吸效果：`useMagnetic(strength)` 讓按鈕在游標靠近時吸附
- 靜止偵測優化：移動量 < 0.05px 時跳過 GPU 更新，減少不必要合成觸發

#### Hero Section

- 全螢幕高度（`100dvh`）
- GSAP 入場動畫：標題文字逐字 stagger 上浮
- 背景動態光暈（CSS animation + blur）

#### 頁面滾動

- 瀏覽器原生捲動（GPU 合成層級，在低階裝置上最流暢）
- GSAP ScrollTrigger 自動監聽原生 scroll，section 動畫正常觸發
- 支援鍵盤導航

#### 導航列

- 滾動後玻璃擬態效果（backdrop-blur + 透明邊框）
- 桌面：水平連結 + hover 底線動畫
- 行動裝置：全螢幕覆蓋選單（display font 大字）
- GSAP 入場（從頂部滑入）

#### 作品集網格 (ProjectsSection)

- 6 個作品展示
- 篩選：All / Featured
- 3 欄 RWD 網格（1欄 → 2欄 → 3欄）
- 篩選切換使用 Vue TransitionGroup

#### About Section

- 個人介紹文字
- 4 格統計數字卡（年資、專案數等）
- **技術 Icon 跑馬燈**：Tech Stack 標題正下方顯示一整排彩色技術 icon，以 `gsap.ticker` 驅動無限水平捲動
  - 速度：80 px/s，捲到 `-halfWidth` 時補回 `+halfWidth` 形成無縫循環；delta 時間由 ticker 的 `deltaTime` 參數直接提供
  - **Hover 暫停**：滑鼠進入整條 strip 時停止捲動；離開後從原位繼續
  - **拖曳捲動**：`pointerdown / pointermove / pointerup` 手勢直接拖動 strip，鬆手後從拖放位置無縫繼續自動捲動
  - **游標互動**：hover 切換為 `hover` variant；拖曳時切換為 `drag` variant
  - Icon 使用 `@iconify/vue` `logos:*` 系列，涵蓋 26 個技術（無官方 icon 的項目自動略過）
  - 左右兩側以 `mask-image` 漸層遮罩製造景深感
  - 亮／暗模式自動適配：標籤文字使用 `surface-400 / surface-100` CSS 變數；icon 框框改為黑白主題變數（暗色白色半透明、亮色黑色半透明）
- 技術棧分類展示（9 個分類：Basics / Styling / Frameworks / State Management / Building Tools / API / UI/UX / Dev Tools / AI Development Tools）

#### 跑馬燈分隔帶 (MarqueeSection)

- 純 CSS `animation` 無限水平滾動
- 淡入淡出邊緣遮罩
- `prefers-reduced-motion` 停用動畫

#### Contact Section

- Email icon（`x0710078@gmail.com`）+ GitHub icon 並排，48px 尺寸、5rem 間距
- 兩個 icon 具備磁吸效果（`useMagnetic(1.2)`），hover 時游標切換為 `hover` variant
- 背景漸層光暈

#### 頁面過渡

- GSAP `fade + slide` 頁面切換效果（out: 0.4s, in: 0.7s）

#### 作品卡片 (ProjectCard)

- hover 時封面圖縮放（GSAP scale 1.06）
- hover 遮罩淡入（"View Project →"）
- 底部漸層強調線滑入動畫
- 游標切換為 `project` variant
- 鍵盤可訪問（role="button", tabindex）
- 標題 `text-overflow: ellipsis`，過長名稱自動截斷顯示

#### 作品詳情頁

- 返回按鈕
- 「前往查看」按鈕緊接標題下方：有連結可點擊，無連結呈現 disabled（`opacity: 0.35`）
- 作品描述、功能分區、技術標籤、開發工具
- 相關作品推薦（3格）

### 🚧 待開發

- [ ] 實際作品截圖圖片
- [ ] WebGL / Three.js 背景粒子效果
- [ ] Mouse parallax（游標帶動元素偏移）
- [ ] 深色/淺色主題切換
- [ ] 聯絡表單（with validation）
- [ ] OG 圖片 meta 自動生成
- [ ] sitemap.xml / robots.txt
- [ ] PWA manifest
