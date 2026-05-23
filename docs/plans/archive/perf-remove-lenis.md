# 效能優化：移除 Lenis 並調整動畫參數

**狀態**：已完成（2026-05-23）

## 問題

Lenis 平滑滾動在低階裝置有額外 JS 開銷，造成滾動卡頓。初次到首頁往下滑動時，各 section 動畫與 hero orb 並行也造成明顯卡頓。

## 解決方案

### 移除 Lenis

- `src/composables/useLenis.ts` → 改為空 stub（`getLenis()` 永遠回傳 `null`）
- `src/layouts/DefaultLayout.vue` → 移除 RAF 驅動，ScrollTrigger 改監聽原生 scroll
- `src/components/ui/AppNav.vue`、`ScrollToTop.vue`、`src/composables/usePageTransition.ts`、`src/pages/ProjectDetailPage.vue` → 所有 `getLenis()` 改為 `window.scrollTo` / `scrollIntoView`
- `vite.config.ts` → 移除 `vendor-lenis` chunk
- `package.json` → `npm uninstall lenis`

### 游標靜止偵測

- `src/components/ui/AppCursor.vue` → tick 函式加入 `THRESHOLD = 0.05` 判斷，靜止時跳過 `quickSetter`

### Hero 視覺優化

- `src/components/sections/HeroSection.vue` → 移除 `useParallax`；orb 尺寸縮減，blur 80px → 50px

### 動畫加速

- `src/composables/useScrollAnimation.ts` → `useReveal` 預設 y `50→30`、duration `1→0.7`、ease `power4→power3`
- `src/components/sections/ProjectsSection.vue` → reveal 參數同步調整
