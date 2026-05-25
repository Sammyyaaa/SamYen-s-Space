# DEVELOPMENT.md

## 命名規則

| 類型 | 規則 | 範例 |
|------|------|------|
| 元件 | PascalCase | `ProjectCard.vue` |
| Composable | camelCase + use 前綴 | `useScrollAnimation.ts` |
| Store | camelCase + Store 後綴 | `portfolioStore.ts` |
| CSS 類 | BEM kebab-case | `.project-card__title` |
| TypeScript interface | PascalCase | `Project`, `CursorState` |
| GSAP timeline | 描述性 camelCase | `heroEntranceTl` |

## 環境變數

| 變數 | 用途 | 必要 | 預設值 |
|------|------|------|--------|
| `VITE_APP_TITLE` | 網站標題 | 否 | `SamYen` |
| `BASE_URL` | 部署基礎路徑 | 否 | `/` |

## 新增頁面

1. 在 `src/pages/` 新增 `MyPage.vue`，使用 `DefaultLayout` 包裹
2. 在 `src/router/index.ts` 新增路由（使用 lazy import）
3. 若有新資料，在 `src/stores/portfolioStore.ts` 新增 state

## 新增 Section 元件

1. 在 `src/components/sections/` 新增元件
2. 使用 `useReveal(ref, options)` 加入滾動揭示動畫
3. hover 元素加 `@mouseenter="setCursorVariant('hover')" @mouseleave="setCursorVariant('default')"`
4. `<style scoped>` 頂部加 `@reference "@/styles/main.css";`

## 計畫歸檔流程

1. 計畫檔案命名格式：`YYYY-MM-DD-<feature-name>.md`
2. 計畫文件結構：User Story → Spec → Tasks
3. 功能完成後：移至 `docs/plans/archive/`
4. 更新 `docs/FEATURES.md` 和 `docs/CHANGELOG.md`

## Tailwind v4 注意事項

- `@apply` 在 scoped style 需要 `@reference "@/styles/main.css";`
- 自定義 `@layer utilities` 中的類無法透過 `@apply` 在 scoped style 中使用
- 新增 Token 請在 `src/styles/main.css` 的 `@theme {}` 區塊定義
- `--color-*` 命名的 Token 會自動生成 Tailwind utility 類

## GSAP 最佳實踐

```ts
// ✅ 使用 context 確保清理
let ctx: gsap.Context
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(el.value, { ... })
  })
})
onBeforeUnmount(() => ctx?.revert())

// ✅ ScrollTrigger 動畫加 once: true (只執行一次)
scrollTrigger: { trigger: el, start: 'top 85%', once: true }

// ✅ 使用 transform 屬性 (不觸發 layout)
gsap.to(el, { x: 100, y: 50, scale: 1.2, opacity: 0 })

// ❌ 避免 layout 觸發屬性
gsap.to(el, { width: '200px', height: '100px', top: '50px' })
```
