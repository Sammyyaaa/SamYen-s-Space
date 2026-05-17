# CLAUDE.md

## 專案概述

**SamYen — Immersive Digital Portfolio**
Vue 3 + TypeScript + Vite + Tailwind CSS v4 + GSAP + ScrollTrigger + Lenis + Swiper + VueUse

高質感沉浸式數位作品集網站，以暗黑科技美學、自定義磁吸游標、視差滾動、GSAP 動畫為核心視覺體驗。

## 常用指令

```bash
npm run dev        # 啟動開發伺服器 (http://localhost:5173)
npm run build      # 生產建置 → dist/
npm run preview    # 預覽生產建置
```

## 關鍵規則

1. **Tailwind v4 scoped style**：每個 `<style scoped>` 頂部必須加 `@reference "@/styles/main.css";`，否則 `@apply` 失效
2. **自定義 utility 不可 @apply**：`text-gradient`、`glass`、`noise-overlay` 等自定義類在 scoped style 中須展開為 CSS
3. **游標系統**：全站統一使用 `setCursorVariant(variant)` 切換游標，hover 元素必須加 `mouseenter/mouseleave` 事件
4. **動畫清理**：所有 GSAP `context` 必須在 `onBeforeUnmount` 呼叫 `ctx.revert()`
5. **計畫歸檔**：功能開發使用 `docs/plans/` 記錄計畫；完成後移至 `docs/plans/archive/`

## 詳細文件

- `./docs/README.md` — 項目介紹與快速開始
- `./docs/ARCHITECTURE.md` — 架構、目錄結構、資料流
- `./docs/DEVELOPMENT.md` — 開發規範、命名規則
- `./docs/FEATURES.md` — 功能列表與完成狀態
- `./docs/TESTING.md` — 測試規範與指南
- `./docs/CHANGELOG.md` — 更新日誌
