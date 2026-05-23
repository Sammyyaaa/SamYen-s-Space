# Vue 3 + Vite → Nuxt 4.1.3 升級計畫

> 建立日期：2026-05-23

---

## 結構對照：Vue 3 原版 vs Nuxt 4

```
Vue 3 + Vite（vue3-project 分支）     Nuxt 4（nuxt4-project 分支）
─────────────────────────────────     ────────────────────────────
index.html                        →   (Nuxt 自動生成，內容移至 nuxt.config.ts app.head)
vite.config.ts                    →   nuxt.config.ts
src/main.ts                       →   (移除，Nuxt 自動初始化)
src/App.vue                       →   app.vue（RouterView → NuxtPage）
src/router/index.ts               →   (移除，改為 pages/ 檔案路由)
                                      middleware/cursor-reset.ts（取代 router.beforeEach）
src/pages/HomePage.vue            →   pages/index.vue
src/pages/ProjectDetailPage.vue   →   pages/project/[id].vue
src/layouts/DefaultLayout.vue     →   layouts/default.vue
src/components/ui/                →   components/ui/
src/components/sections/          →   components/sections/
src/components/project/           →   components/project/
src/composables/useCursor.ts      →   composables/useCursor.ts（module-level refs → cursorStore）
src/composables/usePageTransition →   composables/usePageTransition.ts（module-level refs → transitionStore）
src/composables/useScrollAnimation→   composables/useScrollAnimation.ts（直接搬移）
src/stores/portfolioStore.ts      →   stores/portfolioStore.ts（直接搬移）
                                      stores/cursorStore.ts（新增）
                                      stores/transitionStore.ts（新增）
                                      plugins/gsap.client.ts（新增，取代 layout 內的 gsap.registerPlugin）
src/types/index.ts                →   types/index.ts（直接搬移）
src/utils/helpers.ts              →   utils/helpers.ts（直接搬移）
src/styles/main.css               →   assets/styles/main.css
public/                           →   public/（原封不動）
```

### 路由名稱對照

| Vue 3 路由名稱 | Nuxt 4 自動生成名稱 | 路徑 |
|--------------|------------------|------|
| `home` | `index` | `/` |
| `project` | `project-id` | `/project/:id` |

---

## 背景與目標

專案目前為 Vue 3 + Vite 8 架構，升級至 Nuxt 4.1.3 可獲得：

- **SSR / SSG 能力**：改善 SEO，view-source 直接有內容
- **基於檔案的自動路由**：`pages/` 目錄自動生成路由，無需手動維護 router
- **Auto-import**：composables、components、stores 自動導入，減少 import 樣板
- **更完整的 Meta 管理**：`useHead()` / `useSeoMeta()` 取代 `document.title` 操作
- **Nuxt 生態系**：`@nuxt/image`、`@nuxtjs/tailwindcss`、nuxi CLI 等

探索結果顯示專案整體約 **75% 已準備好遷移**，有三個關鍵破壞性問題需先處理。

---

## 關鍵破壞性問題（必須解決）

| # | 問題 | 位置 | 原因 |
|---|------|------|------|
| 1 | module-level refs | `src/composables/useCursor.ts` L6-9 | SSR 中 module-level 狀態跨請求共享，導致狀態污染 |
| 2 | module-level refs + `router.beforeEach` | `src/composables/usePageTransition.ts` | 同上；且 module 層呼叫 router 會在 Nuxt hydration 前執行 |
| 3 | 手動 `createRouter` | `src/router/index.ts` | Nuxt 自動管理 router，手動建立需移除 |

---

## 目標目錄結構（Nuxt 4）

```
samyen-s-space/
├── nuxt.config.ts              ← 新增（取代 vite.config.ts）
├── app.vue                     ← 原 src/App.vue（調整）
├── pages/
│   ├── index.vue               ← 原 src/pages/HomePage.vue
│   └── project/
│       └── [id].vue            ← 原 src/pages/ProjectDetailPage.vue
├── layouts/
│   └── default.vue             ← 原 src/layouts/DefaultLayout.vue
├── components/
│   ├── ui/                     ← 原封不動搬移
│   ├── sections/               ← 原封不動搬移
│   └── project/                ← 原封不動搬移
├── composables/
│   ├── useCursor.ts            ← 重寫（移除 module-level refs）
│   ├── usePageTransition.ts    ← 重寫（移除 module-level refs + router hook）
│   ├── useScrollAnimation.ts   ← 直接搬移（無需修改）
│   └── useLenis.ts             ← 直接搬移或刪除
├── middleware/
│   └── cursor-reset.ts         ← 新增（取代 router.beforeEach 游標重置）
├── stores/
│   ├── portfolioStore.ts       ← 直接搬移（Composition API 風格已相容）
│   ├── cursorStore.ts          ← 新增（從 useCursor module-level refs 抽出）
│   └── transitionStore.ts      ← 新增（從 usePageTransition module-level refs 抽出）
├── plugins/
│   └── gsap.client.ts          ← 新增（GSAP plugin 註冊，.client 僅瀏覽器執行）
├── types/
│   └── index.ts                ← 直接搬移
├── utils/
│   └── helpers.ts              ← 直接搬移
├── assets/
│   └── styles/
│       └── main.css            ← 原 src/styles/main.css（調整參考路徑）
└── public/                     ← 原封不動
```

---

## 分階段執行計畫

### Phase 0｜前置準備

> **Vercel 說明**：Vercel 預設部署 `main`，遷移完成後 `main` 才會切換為 Nuxt 版本。  
> 開發期間 Vue 3 版本持續正常上線；必須在任何變動前先建立保存分支。

**分支策略（依序執行）：**

```bash
# 1. 從目前 main 建立 Vue 3 永久保存分支（不切換）
git branch vue3-project

# 2. 建立 Nuxt 4 開發分支並切換
git checkout -b nuxt4-project
```

**三個分支的用途：**

| 分支 | 用途 |
|------|------|
| `main` | Vercel 部署目標；遷移完成後由 `nuxt4-project` merge 進來 |
| `vue3-project` | 永久保存 Vue 3 + Vite 原版，不會被動到，隨時可取回 |
| `nuxt4-project` | Nuxt 4 遷移工作分支，完成測試後 merge → `main` |

**其他準備：**

- 刪除 `node_modules/`、`dist/`
- 確認移除的 Vite devDependencies：
  - `vite`
  - `@vitejs/plugin-vue`
  - `@tailwindcss/vite`
  - `vite-plugin-vue-devtools`
  - `@vue/tsconfig`

---

### Phase 1｜初始化 Nuxt 4 環境

```bash
npx nuxi@latest init . --force
npm install
```

**`nuxt.config.ts` 核心設定範本：**

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  vite: {
    plugins: [tailwindcss()],   // Tailwind CSS v4
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('gsap'))     return 'vendor-gsap'
            if (id.includes('@iconify')) return 'vendor-ui'
          },
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      title: "SamYen's Space",
      meta: [
        { name: 'description', content: 'SamYen 的前端工程作品集' },
        { name: 'keywords', content: 'portfolio, frontend engineer, Vue, Nuxt, TypeScript' },
        { property: 'og:title', content: "SamYen's Space" },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        /* Google Fonts <link> 移至此 */
      ],
    },
  },
})
```

---

### Phase 2｜目錄結構搬移

| 動作 | 來源（現況） | 目標（Nuxt 4） |
|------|-------------|----------------|
| 搬移 | `src/components/` | `components/` |
| 搬移 | `src/stores/portfolioStore.ts` | `stores/portfolioStore.ts` |
| 搬移 | `src/types/index.ts` | `types/index.ts` |
| 搬移 | `src/utils/helpers.ts` | `utils/helpers.ts` |
| 搬移 | `src/styles/main.css` | `assets/styles/main.css` |
| 重命名 | `src/layouts/DefaultLayout.vue` | `layouts/default.vue` |
| 重命名 | `src/pages/HomePage.vue` | `pages/index.vue` |
| 重命名 | `src/pages/ProjectDetailPage.vue` | `pages/project/[id].vue` |
| 調整內容 | `src/App.vue` | `app.vue` |
| **刪除** | `src/router/index.ts` | — （Nuxt 自動路由） |
| **刪除** | `src/main.ts` | — （Nuxt 自動初始化） |

---

### Phase 3｜關鍵程式碼修改

#### 3-A：GSAP 改為 Nuxt Plugin

新建 `plugins/gsap.client.ts`（`.client` 後綴確保僅瀏覽器端執行）：

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.ticker.lagSmoothing(500, 33)
})
```

移除 `layouts/default.vue` 中原本的 `gsap.registerPlugin()` 呼叫。

---

#### 3-B：useCursor.ts — module-level refs → Pinia store

**現況問題：** `cursorX`, `cursorY`, `cursorVariant`, `isVisible` 定義在 module 頂層

新建 `stores/cursorStore.ts`：

```ts
import type { CursorVariant } from '@/types'

export const useCursorStore = defineStore('cursor', () => {
  const x = ref(0)
  const y = ref(0)
  const variant = ref<CursorVariant>('default')
  const isVisible = ref(false)

  function setVariant(v: CursorVariant) {
    variant.value = v
  }

  return { x, y, variant, isVisible, setVariant }
})
```

`useCursor.ts` 改為從 store 讀寫狀態；`setCursorVariant()` 改為 `useCursorStore().setVariant()`。

---

#### 3-C：usePageTransition.ts — module-level refs → Pinia store

**現況問題：** `isTransitioning`, `isReturningHome`, `isProjectToProject`, `pendingScrollTarget`, `savedHomeScrollY` 全部在 module 頂層；且在 module 層呼叫 `router.beforeEach()`

新建 `stores/transitionStore.ts`：

```ts
export const useTransitionStore = defineStore('transition', () => {
  const isTransitioning = ref(false)
  const isReturningHome = ref(false)
  const isProjectToProject = ref(false)
  const pendingScrollTarget = ref<string | null>(null)
  const savedHomeScrollY = ref(0)

  return {
    isTransitioning, isReturningHome, isProjectToProject,
    pendingScrollTarget, savedHomeScrollY,
  }
})
```

移除 `usePageTransition.ts` 中 module 層的 `router.beforeEach()`。

---

#### 3-D：新增路由 Middleware

新建 `middleware/cursor-reset.ts`（取代 `router.beforeEach` 游標重置）：

```ts
export default defineNuxtRouteMiddleware(() => {
  const cursor = useCursorStore()
  cursor.setVariant('default')
})
```

---

#### 3-E：app.vue 調整

- 移除 `import { RouterView } from 'vue-router'`（Nuxt 內建 `<NuxtPage />`）
- 將 `<RouterView>` 改為 `<NuxtPage />`（或保留 `<RouterView>` 搭配 `<Transition>`）
- `usePageTransition()` 的 enter/leave 改從 `useTransitionStore()` 取得

---

#### 3-F：pages/project/[id].vue 調整

| 現況 | 改為 |
|------|------|
| `route.params.id` | 不需修改（Nuxt 相容） |
| `router.push({ name: 'project', params: { id } })` | `navigateTo({ name: 'project-id', params: { id } })` |
| `if (!project) router.push('/')` | `throw createError({ statusCode: 404 })` |
| `document.title = ...` | `useHead({ title: ... })` |

---

#### 3-G：Tailwind CSS v4 路徑更新

各 `<style scoped>` 的 `@reference` 路徑從：
```css
@reference "@/styles/main.css";
```
改為：
```css
@reference "~/assets/styles/main.css";
```

---

### Phase 4｜SEO Meta 整合

將 `index.html` 中所有 meta 標籤移至 `nuxt.config.ts` 的 `app.head`，  
`index.html` 本身由 Nuxt 自動生成，不再手動維護。

各頁面個別的 title 改用：
```ts
// pages/index.vue
useHead({ title: "SamYen's Space" })

// pages/project/[id].vue
useHead({ title: `${project.title} — SamYen` })
```

---

### Phase 5｜驗證清單

- [ ] `npm run dev` → 首頁正常，GSAP 動畫、游標、跑馬燈均可運作
- [ ] 瀏覽器直接訪問 `/project/xxx` → `view-source` 有 HTML 內容（SSR 正常）
- [ ] 頁面切換 → GSAP 過渡動畫正常，無 console 報錯
- [ ] 游標 variant 在頁面切換後正確重置為 `default`
- [ ] `npm run build && npm run preview` → 生產建置無錯誤
- [ ] Lighthouse 跑分：SEO / Performance 相較升級前提升

---

## 不需修改的檔案

| 檔案 | 原因 |
|------|------|
| `composables/useScrollAnimation.ts` | 無 module-level state，直接搬移 |
| `composables/useLenis.ts` | stub 佔位，可直接刪除 |
| `stores/portfolioStore.ts` | Composition API 風格，Nuxt 完整相容 |
| `types/index.ts` | 純 TypeScript interface，無框架依賴 |
| `utils/helpers.ts` | 純函式，無框架依賴 |
| `components/` 所有組件 | 整體相容，僅需將 `setCursorVariant()` 呼叫改為 store action |

---

## 風險評估

| 風險 | 等級 | 緩解策略 |
|------|------|---------|
| GSAP ScrollTrigger SSR 報錯 | 高 | 所有 GSAP 相關程式碼加 `import.meta.client` 判斷或放入 `.client.ts` plugin |
| `window`/`document` 直接存取 | 中 | 改用 Nuxt 的 `useNuxtApp().$el` 或 `onMounted` 內存取 |
| 游標狀態 SSR hydration mismatch | 中 | `AppCursor` 加 `<ClientOnly>` 包裹 |
| Tailwind v4 + Nuxt module 相容 | 低 | 優先使用 `@tailwindcss/vite` 而非 `@nuxtjs/tailwindcss` |
