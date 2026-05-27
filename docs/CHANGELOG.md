# CHANGELOG.md

## [0.2.0] - 2026-05-24

### Migration

- 從 Vue 3 + Vite 遷移至 Nuxt 4（srcDir: '.'，Nitro server，file-based routing）
- SSR hydration 修復：AppCursor 以 `<ClientOnly>` 包覆，isTouchDevice 加 `import.meta.client` guard
- 路由改以路徑字串導航（`navigateTo('/project/${id}')`），移除 Vue Router named-route 依賴
- 頁面過渡修復：`pages/index.vue` 改用單一根節點（`<div>` wrapper），解決 GSAP `leave()` Fragment 問題
- 游標系統修復：`leave()` 內新增 `setCursorVariant('default')` 防止跨頁後游標卡大
- `project` variant `dotScale`：0 → 0.4（游標小白點在專案卡 hover 時不再消失）
- 導航連結游標：`setCursorVariant('link')` → `'hover'`（Work / About / Skills 中白點正常反應）
- `AppNav scrollTo`：從非首頁點擊導航連結時設 `isReturningHome = true`，確保 deferred section 已 mount
- `AppNav` logo：改為 SPA 路由（`@click.prevent` + `goHome()`），不再觸發整頁重新整理
- GSAP null target 修復：`AppCursor` watch 加 ref null guard（touch 模式 refs 為 null）
- WSL2 開發環境：新增 `NITRO_NO_UNIX_SOCKET=1` + `scripts/fix-unix-socket.cjs` monkey-patch

### Removed

- `lenis` 套件（`npm uninstall lenis`）：移除慣性滾動，全站改為瀏覽器原生捲動（GPU 合成層級，在低階裝置上更流暢）
- `useLenis` composable 實作（改為空 stub 保留 import 相容性，`getLenis()` 永遠回傳 `null`）
- `HeroSection` 視差背景效果（移除 `useParallax(sectionRef, bgRef)`，消除每幀移動大型模糊元素的 GPU 開銷）

### Changed

- `DefaultLayout`：移除 Lenis RAF 驅動與 `ScrollTrigger.update` 同步；改由 ScrollTrigger 自動監聽原生 scroll；保留 `gsap.ticker.lagSmoothing(500, 33)` 防止掉幀追幀
- `AppCursor`：tick 函式加入靜止偵測（threshold `0.05px`），點與環各自獨立判斷，靜止時跳過 `quickSetter` 呼叫，減少不必要 GPU 合成觸發
- `HeroSection` orb：desktop 尺寸縮減（藍 `600px→500px`、紫 `500px→400px`），`filter: blur` 從 `80px` 降至 `50px`，降低 GPU 光柵化面積
- `useReveal` 預設參數：y `50→30`、duration `1→0.7`、ease `power4.out→power3.out`，section 入場幀工作量減少
- `ProjectsSection`：`useReveal` 傳入參數配合調整（y `60/50→30`，duration `1.1/1→0.7`）
- 所有 `getLenis()` 呼叫替換為原生 `window.scrollTo` / `element.scrollIntoView`（`AppNav`、`ScrollToTop`、`usePageTransition`、`ProjectDetailPage`）

### Removed

- `ContactSection`：移除引力追蹤球（RAF tick + 游標追蹤 + orbit 模式），改為純靜態背景 + scroll reveal + 磁吸 icon
- `swiper` 套件：確認未實際使用，從 dependencies 移除（bundle -90KB）

### Changed

- `AppCursor`：RAF 迴圈改用 `gsap.ticker.add(tick)`；`gsap.set()` 改為 `gsap.quickSetter()`，每幀屬性解析開銷降低約 10×
- `AboutSection` 技術 icon 跑馬燈：`requestAnimationFrame` 改為 `gsap.ticker.add(tickMarquee)`，利用 ticker 提供的 `deltaTime` 取代手動 `lastTs` 時間追蹤
- `ContactSection` 磁吸強度：`useMagnetic(0.7)` → `useMagnetic(1.2)`，吸力感明顯提升
- `vite.config.ts`：新增 `build.rollupOptions.output.manualChunks`（function 形式，相容 Vite 8 + rolldown），將 gsap / lenis / vue / ui libs 分離為獨立 vendor chunk，利於瀏覽器快取

### Technical

- 全站並行 RAF 迴圈從 3 條（cursor + contact + about marquee）合併為統一的 `gsap.ticker`，與 Lenis 共用同一條 RAF

### Added

- `AboutSection`：Tech Stack 標題下方新增技術 Icon 跑馬燈 strip
  - 以 `requestAnimationFrame` 驅動無限水平捲動，取代 CSS `@keyframes`，解決拖曳後位置跳回的問題
  - 支援 hover 暫停、pointer 拖曳（`pointerdown / pointermove / pointerup` + `setPointerCapture`）
  - 游標 variant 整合：hover → `hover`、拖曳中 → `drag`
  - 使用 `@iconify/vue` 套件，映射 26 個技術名稱至 `logos:*` icon
  - `overflow-x: clip` 取代 `overflow: hidden`，解決 hover 上浮動畫被裁切的問題
  - icon 框框改為黑白主題變數（`--tech-icon-bg/border` 等），暗色為白色半透明、亮色為黑色半透明，不再使用藍色 accent
- `ContactSection`：新增 Email icon（`x0710078@gmail.com`）與 GitHub icon 並排
  - Email icon 觸發相同的引力球環繞效果（`useMagnetic` + `onIconEnter` 共用邏輯）
  - 兩個 icon 以 48px 尺寸、5rem 間距水平排列
  - 描述文字更新為「歡迎透過 Email 或 GitHub 找我」
- `ProjectDetailPage`：「前往查看」按鈕移至標題正下方
  - 有連結：`<a>` 標籤，可點擊
  - 無連結（如南山人壽）：`<button disabled>` + `opacity: 0.35`，視覺呈現 disabled
- `ProjectCard`：標題加入 `text-overflow: ellipsis`，過長標題自動截斷
- `portfolioStore`：更新七個專案為完整正式名稱
  - 南山人壽 — 團險自費加保平台
  - 南山產險 — 網路投保中心（前台）/ 網路會員管理平台（後台）
  - 南山產險 — 銷售作業平台
  - Foomosa 臺中美食餐廳資訊整合平台

### Fixed

- `AboutSection` 技術 icon 標籤在亮模式下不可見：改用 `text-surface-400 / text-surface-100` Tailwind 類，透過 `html.light-mode` CSS 變數自動適配兩種模式

### Technical

- 新增依賴 `@iconify/vue ^5.0.1`
- `main.css` 新增 `--tech-icon-bg / --tech-icon-border / --tech-icon-bg-hover / --tech-icon-border-hover / --tech-icon-shadow-hover` 五組主題變數，分別定義於 `:root`（暗色）與 `html.light-mode`（亮色）

## [0.1.0] - 2026-05-17

### Added

- 完整專案架構建立（Vite + Vue 3 TS + Tailwind CSS v4 + GSAP + Lenis）
- `AppCursor`：雙層磁吸自定義游標，6 種 variant，mix-blend-mode: difference
- `AppNav`：固定導航列，滾動玻璃擬態，行動版全螢幕選單
- `HeroSection`：全螢幕 Hero，GSAP 文字入場，視差背景，浮動 CTA
- `MarqueeSection`：純 CSS 無限跑馬燈，prefers-reduced-motion 支援
- `ProjectsSection`：6 個作品，All/Featured 篩選，3 欄 RWD 網格
- `ProjectCard`：封面縮放 hover，游標 project variant，鍵盤可訪問
- `AboutSection`：個人簡介，統計數字，技術棧分類
- `ContactSection`：Email 連結，社群連結，背景光暈
- `DefaultLayout`：Lenis singleton + GSAP ScrollTrigger 同步
- `useReveal`：ScrollTrigger 滾動揭示動畫 composable
- `useParallax`：scrub 視差 composable
- `useCursor` + `useMagnetic`：全域游標狀態 + 磁吸效果
- `usePageTransition`：GSAP 頁面 fade+slide 過渡
- `useLenis`：Lenis singleton composable
- `portfolioStore`：Pinia store，6 個作品 + 統計 + 技術棧資料
- 完整文件：CLAUDE.md + docs/（README / ARCHITECTURE / DEVELOPMENT / FEATURES / TESTING / CHANGELOG）
- TypeScript 全型別覆蓋

### Technical

- Tailwind CSS v4（`@tailwindcss/vite` plugin），自訂 `@theme` token
- 所有 scoped style 加入 `@reference "@/styles/main.css"` 解決 v4 相容問題
- GSAP context 模式確保動畫記憶體安全清理
