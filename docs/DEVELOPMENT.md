# DEVELOPMENT.md — Nuxt 4

## 命名規範

| 類型 | 規範 | 範例 |
|------|------|------|
| 元件 | PascalCase | `ProjectCard.vue` |
| Composable | `use` 前綴 + camelCase | `useScrollAnimation.ts` |
| Store | camelCase + `Store` 後綴 | `portfolioStore.ts` |
| CSS class | BEM kebab-case | `.project-card__title` |
| TypeScript 型別 | PascalCase | `Project`、`CursorVariant` |
| GSAP timeline 變數 | 描述性 camelCase | `heroEntranceTl` |

## 新增頁面

在 `pages/` 建立 `.vue` 檔，Nuxt file-based routing 自動生效：

```
pages/about.vue          → /about
pages/project/[id].vue   → /project/:id（動態路由）
```

頁面元件結構範例：

```vue
<script setup lang="ts">
// auto-imports 生效：無需手動 import ref、useRoute 等
const route = useRoute()
</script>

<template>
  <div><!-- 單一根節點，GSAP 頁面過渡必要 --></div>
</template>
```

## 新增 Section 元件

1. 在 `components/sections/` 建立 `XxxSection.vue`
2. 在 `pages/index.vue` 中引入並加入頁面順序
3. 使用 `useReveal()` 加入滾動揭示動畫：

```vue
<script setup lang="ts">
import { useReveal } from '~/composables/useScrollAnimation'
const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef, { y: 30, stagger: 0.1 })
</script>
```

## 程式碼風格

專案使用 ESLint（`@nuxt/eslint`）+ Prettier，規則：
- 單引號、無分號、es5 trailing comma、printWidth 100

```bash
npm run lint       # 檢查
npm run lint:fix   # 自動修正
npm run format     # Prettier 格式化全專案
```

新增或修改程式碼後執行 `npm run lint:fix` 確保符合規範。

## Tailwind v4 Scoped Style

每個 `<style scoped>` 頂部加 `@reference`，否則 `@apply` 失效：

```css
<style scoped>
@reference "~/assets/styles/main.css";

.my-class {
  @apply text-surface-50 font-medium;  /* ✅ */
}
</style>
```

自定義 utility（`text-gradient`、`glass`、`noise-overlay`）**不可** `@apply`，須展開為原生 CSS。

## GSAP 最佳實踐

```ts
// ✅ 正確：context 包覆 + onBeforeUnmount 清理
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(el, { opacity: 0, y: 30, duration: 0.7 })
  })
})

onBeforeUnmount(() => ctx?.revert())
```

- ScrollTrigger 一律加 `once: true`（揭示型動畫）
- 只對 `transform` 屬性（`x`、`y`、`scale`、`rotation`）做動畫，避免 `width`、`height`、`top` 觸發 layout
- `prefersReducedMotion()` / `isTouchDevice()` 為 true 時，用 `gsap.set()` 跳過動畫

## 游標系統

```ts
import { setCursorVariant } from '~/composables/useCursor'

// hover 元素
el.addEventListener('mouseenter', () => setCursorVariant('hover'))
el.addEventListener('mouseleave', () => setCursorVariant('default'))
```

可用 variant：`default`、`hover`、`text`、`link`、`project`、`drag`

## 計畫歸檔

- 功能開發前在 `docs/plans/` 建立計畫文件
- 完成後移至 `docs/plans/archive/`
