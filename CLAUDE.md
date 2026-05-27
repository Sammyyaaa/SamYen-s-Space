# CLAUDE.md

## 專案概述

**SamYen — Immersive Digital Portfolio**
Nuxt 4 + Vue 3 + TypeScript + Tailwind CSS v4 + GSAP + ScrollTrigger + VueUse

高質感沉浸式數位作品集網站，以暗黑科技美學、自定義磁吸游標、原生捲動優化、GSAP 動畫為核心視覺體驗。

## 常用指令

```bash
npm run dev        # 啟動開發伺服器 (http://localhost:3000)
npm run build      # TypeScript 型別檢查 + 生產建置 → .output/
npm run preview    # 預覽生產建置
npm run lint       # ESLint 檢查
npm run lint:fix   # ESLint 自動修正
npm run format     # Prettier 格式化全專案
```

## 關鍵規則

1. **Tailwind v4 scoped style**：每個 `<style scoped>` 頂部必須加 `@reference "@/styles/main.css";`，否則 `@apply` 失效
2. **自定義 utility 不可 @apply**：`text-gradient`、`glass`、`noise-overlay` 等自定義類在 scoped style 中須展開為 CSS
3. **游標系統**：全站統一使用 `setCursorVariant(variant)` 切換游標，hover 元素必須加 `mouseenter/mouseleave` 事件
4. **動畫清理**：所有 GSAP `context` 必須在 `onBeforeUnmount` 呼叫 `ctx.revert()`
5. **計畫歸檔**：功能開發使用 `docs/plans/` 記錄計畫；完成後移至 `docs/plans/archive/`
6. **程式碼風格**：單引號、無分號、es5 trailing comma（Prettier 管理）；新增或修改程式碼後執行 `npm run lint:fix` 確保符合規範

## 詳細文件

- `./README.md` — 項目介紹、技術棧、重構升級紀錄
- `./docs/CHANGELOG.md` — 更新日誌
- `./docs/ARCHITECTURE.md` — Nuxt 4 架構說明、啟動流程、關鍵設計決策
- `./docs/DEVELOPMENT.md` — 命名規範、開發流程、GSAP 最佳實踐
- `./docs/FEATURES.md` — 功能清單（已完成 / 待實作）
- `./docs/TESTING.md` — 測試策略、Lighthouse 效能指標
- `./docs/archive/` — 舊版 Vue 3 + Vite 架構文件（歷史參考）
