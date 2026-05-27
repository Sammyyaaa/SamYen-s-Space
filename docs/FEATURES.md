# FEATURES.md — Nuxt 4

## 已完成

### 游標系統
- 雙層磁吸自定義游標（dot + ring）
- 6 種 variant：`default`、`hover`、`text`、`link`、`project`、`drag`
- `mix-blend-mode: difference`，全場景可見
- 觸控裝置（`pointer: coarse`）自動隱藏

### 主題
- 亮色 / 暗色主題切換（`useTheme`）
- `html.light-mode` class 驅動，所有色彩透過 CSS 變數自動切換
- `localStorage` 持久化偏好設定

### Hero Section
- 全螢幕 Hero（100dvh）
- GSAP 文字逐字入場動畫
- Typed.js 效果打字機文字
- 浮動光暈 orb（CSS animation）
- CTA 按鈕群（滾動 / 查看作品）

### Marquee Section
- 純 CSS 無限跑馬燈文字帶
- `prefers-reduced-motion` 支援

### Projects Section
- 7 個作品，3 欄 RWD 網格（1 → 2 → 3 欄）
- All / Featured 篩選切換
- 作品卡片 hover 動畫、游標 project variant
- 標題 `text-overflow: ellipsis` 截斷

### About Section
- 個人簡介與統計數字卡片（3 欄）
- 技術 icon 跑馬燈（`gsap.ticker` 驅動）
  - 26 個技術 icon（`@iconify/vue`，`logos:*` 系列）
  - hover 暫停、pointer 拖曳
  - 游標 variant 整合（hover / drag）
  - mask gradient 邊緣漸隱
  - 亮 / 暗主題自動適配
- 技術棧分類（9 類）

### Contact Section
- Email + GitHub icon 並排（磁吸效果 `useMagnetic`）
- 滾動揭示動畫

### 頁面過渡
- GSAP fade + slide（out-in 模式）
- `cursor-reset` middleware 確保跨頁游標正常

### 作品詳情頁（`/project/:id`）
- 完整專案說明、功能分區列表
- 技術標籤、開發工具標籤
- 「前往查看」按鈕：有連結可點擊、無連結顯示 disabled
- 返回按鈕

### 基礎建設
- Sitemap（`@nuxtjs/sitemap`）
- Schema.org JSON-LD（Person + WebSite）
- OG / Twitter meta tags
- ESLint + Prettier 工具鏈

---

## 待實作

| 項目 | 說明 |
|------|------|
| 實際專案截圖 | 目前封面為 CSS 漸層 placeholder |
| OG Image 生成 | 動態 OG 圖片（`@nuxtjs/og-image` 或靜態圖） |
| Contact Form | 表單送出功能（Email 服務串接） |
| E2E 測試 | Playwright 或 Cypress |
