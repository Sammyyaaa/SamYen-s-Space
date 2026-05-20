# SamYen — Immersive Digital Portfolio

高質感沉浸式數位作品集，以科技感暗黑美學、流暢動畫與互動敘事為核心。

## 核心特色

- **自定義磁吸游標**：雙層設計，6 種 variant，`mix-blend-mode: difference` 全場景可見
- **暗色 / 亮色主題**：`html.light-mode` class 驅動，所有色彩透過 CSS 變數自動切換
- **GSAP 動畫系統**：ScrollTrigger 滾動揭示、頁面 fade+slide 過渡、Hero 文字入場
- **Lenis 慣性滾動**：與 GSAP ScrollTrigger 完整同步，所有 RAF 動畫統一至 `gsap.ticker`
- **技術 Icon 跑馬燈**：`gsap.ticker` 驅動無限捲動，支援 hover 暫停與 pointer 拖曳
- **作品詳情頁**：完整專案說明、技術標籤、連結按鈕（無連結時自動 disabled）

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Vue 3 (Composition API, `<script setup>`) |
| 語言 | TypeScript |
| 建置 | Vite 8 |
| 樣式 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 動畫 | GSAP 3 + ScrollTrigger |
| 滾動 | Lenis 1 (慣性平滑滾動) |
| Icon | @iconify/vue 5 (`logos:*` 系列) |
| 工具 | VueUse 14、Pinia 3、Vue Router 4 |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
# → http://localhost:5173

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
| `npm run preview` | 本地預覽 dist/ |

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
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 架構設計、目錄結構、資料流 |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | 開發規範、命名規則、新增流程 |
| [FEATURES.md](./FEATURES.md) | 功能清單與完成狀態 |
| [TESTING.md](./TESTING.md) | 測試規範與指南 |
| [CHANGELOG.md](./CHANGELOG.md) | 更新日誌 |
