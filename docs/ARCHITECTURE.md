# ARCHITECTURE.md — Nuxt 4

## 目錄結構

```
samyen-s-space/
├── app.vue                  # 根元件：游標、導覽、頁面過渡
├── nuxt.config.ts           # Nuxt 設定（模組、Vite plugins、head）
├── assets/
│   └── styles/main.css      # Tailwind v4 主題 token + 全域樣式
├── components/
│   ├── ui/                  # 全站共用（AppCursor、AppNav、AppFooter、ScrollToTop）
│   ├── sections/            # 頁面 Section（Hero、Marquee、Projects、About、Contact）
│   └── project/             # ProjectCard
├── composables/
│   ├── useCursor.ts         # 游標移動追蹤、磁吸效果（useMagnetic）
│   ├── useScrollAnimation.ts# useReveal、useScrollMarquee、useScrollPin、useParallax
│   ├── usePageTransition.ts # GSAP 頁面 enter / leave 動畫
│   └── useTheme.ts          # 亮色 / 暗色主題切換
├── layouts/
│   └── default.vue          # slot + AppFooter + ScrollToTop
├── middleware/
│   └── cursor-reset.ts      # 路由切換時重置游標 variant
├── pages/
│   ├── index.vue            # 首頁（組合所有 Section）
│   └── project/[id].vue     # 作品詳情頁（動態路由）
├── plugins/
│   └── gsap.client.ts       # 註冊 ScrollTrigger + lagSmoothing（客戶端限定）
├── stores/
│   ├── cursorStore.ts       # 游標座標、variant、可見性
│   ├── portfolioStore.ts    # 作品資料、統計數字、技術棧
│   └── transitionStore.ts   # 頁面過渡狀態（isReturningHome）
├── types/index.ts           # 全域 TypeScript 型別
└── utils/helpers.ts         # isTouchDevice、prefersReducedMotion
```

## 啟動流程

```
nuxt.config.ts
  └── plugins/gsap.client.ts    # 註冊 ScrollTrigger、設定 lagSmoothing(500, 33)
        └── app.vue
              ├── <ClientOnly><AppCursor /></ClientOnly>   # SSR 安全
              ├── <AppNav />
              └── <NuxtLayout>
                    └── layouts/default.vue               # slot + Footer + ScrollToTop
                          └── <NuxtPage :transition="..." />
                                └── pages/index.vue | pages/project/[id].vue
```

## 關鍵設計決策

### Tailwind v4 Scoped Style
每個 `<style scoped>` 頂部必須加：
```css
@reference "~/assets/styles/main.css";
```
否則 `@apply` 無法解析自訂 token。自定義 utility（`text-gradient`、`glass`）須展開為原生 CSS，不可 `@apply`。

### 游標系統
- Pinia `cursorStore` 儲存座標、variant、可見性
- `setCursorVariant(variant)` 為全站統一 API，在任何元件皆可呼叫
- hover 元素必須加 `mouseenter` / `mouseleave` 事件
- `AppCursor` 包在 `<ClientOnly>` 避免 SSR hydration mismatch
- `useMagnetic()` 提供磁吸吸力效果（composables/useCursor.ts）

### GSAP 管線
- `plugins/gsap.client.ts` 統一註冊 ScrollTrigger 與 `lagSmoothing`（防掉幀追幀）
- 所有動畫用 `gsap.context()` 包覆，`onBeforeUnmount` 呼叫 `ctx.revert()` 清理
- `useReveal` 的 ScrollTrigger 一律 `once: true`，`prefersReducedMotion` / `isTouchDevice` 時直接 `gsap.set` 跳過動畫
- Tech icon 跑馬燈使用 `gsap.ticker.add()` 驅動，取代 `requestAnimationFrame`

### SSR 處理
- `AppCursor`：`<ClientOnly>` 包覆（含 `import.meta.client` guard）
- `isTouchDevice()`：呼叫前加 `import.meta.client` 判斷，避免 SSR 存取 `navigator`
- `AppCursor` 放在 `app.vue` 頂層而非 layout 內，防止 GSAP 頁面過渡 transform 使 `position: fixed` 偏移

### Nuxt Auto-imports
`ref`、`computed`、`defineStore`、`useRoute`、`navigateTo` 等 Vue / Nuxt / Pinia API 無需手動 import，Nuxt 自動注入。

## 資料流

```
portfolioStore（Pinia）
  ├── projects[]  →  ProjectsSection → ProjectCard
  ├── stats[]     →  AboutSection（統計數字）
  └── skills[]    →  AboutSection（技術棧分類）
```
