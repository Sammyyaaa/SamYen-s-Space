# SamYen — Immersive Digital Portfolio

從 Vue 3 + Vite 到 Nuxt 4 的完整重構 — 沉浸式動畫、自定義磁吸游標、SSR 首屏優化，呈現暗黑科技美學的數位個人作品集。
支援亮色模式切換，整合 GSAP ScrollTrigger、GPU 合成層原生捲動與頁面過渡，實現全場景流暢互動體驗。

## 重構升級紀錄

### v0.1.0 → v0.2.0：從 Vue 3 + Vite 升級至 Nuxt 4（2026-05-24）

**原始技術棧（v0.1.0）**
- Vue 3 + Vite（純 CSR）+ Vue Router 4
- Lenis 慣性滾動 + Swiper 輪播
- 手動維護 `vite.config.ts` chunk 分割

**升級動機**
- 引入 SSR / SSG 支援，改善 SEO 與首屏效能
- 接入 Nuxt 生態（`@pinia/nuxt`、`@nuxtjs/sitemap`）
- file-based routing 取代 Vue Router 手動設定

**主要變更**
- Nitro server 取代 Vite dev server；`srcDir: '.'` 維持原有目錄結構
- SSR hydration 處理：`AppCursor` 以 `<ClientOnly>` 包覆，`isTouchDevice` 加 `import.meta.client` guard
- 移除 Lenis，改用瀏覽器原生捲動（GPU 合成層）
- 移除 Swiper（bundle 減少約 90KB）
- 統一 3 條獨立 RAF 為 `gsap.ticker` 單一管線

## 核心特色

- **自定義磁吸游標**：雙層設計，6 種 variant，`mix-blend-mode: difference` 全場景可見
- **暗色 / 亮色主題**：`html.light-mode` class 驅動，所有色彩透過 CSS 變數自動切換
- **GSAP 動畫系統**：ScrollTrigger 滾動揭示、頁面 fade+slide 過渡、Hero 文字入場
- **原生捲動優化**：瀏覽器原生捲動（GPU 合成層），GSAP ScrollTrigger 自動同步，`lagSmoothing` 防幀率跳動
- **技術 Icon 跑馬燈**：`gsap.ticker` 驅動無限捲動，支援 hover 暫停與 pointer 拖曳
- **作品詳情頁**：完整專案說明、技術標籤、連結按鈕（無連結時自動 disabled）

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Nuxt 4 + Vue 3 (Composition API, `<script setup>`) |
| 語言 | TypeScript |
| 建置 | Nitro（Nuxt 內建） |
| 樣式 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 動畫 | GSAP 3 + ScrollTrigger |
| 滾動 | 原生瀏覽器捲動（GPU 合成優化）|
| Icon | @iconify/vue 5 (`logos:*` 系列) |
| 工具 | VueUse 14、Pinia 3、Nuxt 內建路由 |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
# → http://localhost:3000

# 生產建置
npm run build

# 預覽生產建置
npm run preview
```

## 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動 HMR 開發伺服器 |
| `npm run build` | TypeScript 型別檢查 + 生產建置 |
| `npm run preview` | 本地預覽 .output/ |
| `npm run prepare` | 生成 Nuxt TypeScript 型別宣告 |

## 頁面結構

```
首頁 (/)
├── HeroSection      — 全螢幕 Hero，GSAP 入場動畫，視差背景
├── MarqueeSection   — 純 CSS 無限跑馬燈文字帶
├── ProjectsSection  — 作品集網格（All / Featured 篩選）
├── AboutSection     — 個人簡介、統計數字、技術 icon 跑馬燈、技術棧分類
└── ContactSection   — Email + GitHub icon（磁吸效果）

作品詳情頁 (/project/:id)
└── 完整說明、功能分區、技術標籤、前往查看按鈕
```

## 文件索引

| 文件 | 說明 |
|------|------|
| [CHANGELOG.md](./docs/CHANGELOG.md) | 更新日誌 |

> ARCHITECTURE.md、DEVELOPMENT.md、FEATURES.md、TESTING.md 描述舊版 Vue 3 + Vite 架構，已歸檔至 [docs/archive/](./docs/archive/)。
