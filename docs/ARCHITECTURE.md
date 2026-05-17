# ARCHITECTURE.md

## 目錄結構

```
src/
├── assets/
│   └── images/              # 靜態圖片資源
├── components/
│   ├── ui/                  # 全站共用 UI 元件
│   │   ├── AppCursor.vue    # 自定義磁吸游標 (mix-blend-mode: difference)
│   │   ├── AppNav.vue       # 固定頂部導航 + 漢堡選單
│   │   └── AppFooter.vue    # 頁尾
│   ├── sections/            # 頁面區塊元件
│   │   ├── HeroSection.vue  # 全螢幕 Hero，GSAP 入場 + 視差背景
│   │   ├── MarqueeSection.vue # 跑馬燈文字分隔帶
│   │   ├── ProjectsSection.vue # 作品集網格 + 篩選器
│   │   ├── AboutSection.vue # 自我介紹 + 統計數字 + 技術 icon 跑馬燈 + 技術棧分類
│   │   └── ContactSection.vue # 聯絡資訊
│   └── project/
│       └── ProjectCard.vue  # 作品卡片 (hover 動畫、路由跳轉)
├── composables/
│   ├── useLenis.ts          # 全域 Lenis 平滑滾動 singleton
│   ├── useCursor.ts         # 游標狀態 + 磁吸 hook (useMagnetic)
│   ├── useScrollAnimation.ts # useReveal / useScrollMarquee / useScrollPin / useParallax
│   └── usePageTransition.ts # GSAP 頁面過渡 enter/leave
├── layouts/
│   └── DefaultLayout.vue    # 主版面 (Lenis init + ScrollTrigger sync)
├── pages/
│   ├── HomePage.vue         # 首頁：Hero → Marquee → Projects → About → Contact
│   └── ProjectDetailPage.vue # 作品詳情頁
├── router/
│   └── index.ts             # Vue Router 4，lazy-load 路由
├── stores/
│   └── portfolioStore.ts    # Pinia store：projects / stats / skills 資料
├── styles/
│   └── main.css             # Tailwind v4 入口 + @theme token + @layer utilities
├── types/
│   └── index.ts             # TypeScript interfaces (Project, CursorState, etc.)
├── utils/
│   └── helpers.ts           # lerp / clamp / mapRange / isTouchDevice
├── App.vue                  # RouterView + GSAP 頁面過渡
└── main.ts                  # createApp + Pinia + Router
```

## 啟動流程

1. `main.ts` → createApp + Pinia + Router → mount `#app`
2. `App.vue` → RouterView with GSAP transition hooks
3. `DefaultLayout.vue` → init Lenis singleton → sync ScrollTrigger
4. `AppCursor.vue` → global mousemove listener → RAF loop for ring lag
5. 各 Section 的 `useReveal` / `useParallax` → onMounted 時建立 GSAP context

## 關鍵設計決策

### Tailwind v4 Scoped Style
每個 `<style scoped>` 使用 `@apply` 前，必須在頂部加：
```css
@reference "@/styles/main.css";
```
自定義 utility（`text-gradient`、`glass`）在 `@apply` 中無法使用，需展開為原生 CSS。

### 游標系統 (Singleton Pattern)
`useCursor.ts` 以模組層級的 `ref` 儲存全域游標狀態。
任何元件呼叫 `setCursorVariant(variant)` 即可改變游標外觀。
`AppCursor.vue` 只需在 App 根層渲染一次。

### Lenis + GSAP ScrollTrigger 整合
Lenis 覆寫原生滾動，因此 ScrollTrigger 需透過 Lenis 事件更新：
```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### GSAP Context 清理
所有動畫透過 `gsap.context()` 包裹，在 `onBeforeUnmount` 中呼叫 `ctx.revert()` 確保動畫清理，避免記憶體洩漏。

### rAF 驅動的跑馬燈（AboutSection）
技術 icon strip 以 `requestAnimationFrame` 迴圈取代 CSS `@keyframes`，原因是 CSS animation 重啟（`animation: none` → 新 animation）在不同瀏覽器的時序行為不一致，導致拖曳後位置跳回。

rAF 模式下 `marqueeX` 為唯一位置真相：
- **自動捲動**：每幀 `marqueeX -= speed * dt`，超過 `-halfWidth` 時 `+= halfWidth` 無縫循環
- **暫停**：`isHoveringStrip = true` 讓迴圈跳過更新；`lastTs = null` 在恢復時重置時間基準，避免累積死時間造成跳躍
- **拖曳**：`onStripPointerDown` 記錄 `dragStartX = marqueeX`，`pointermove` 直接 `marqueeX = dragStartX + delta`，`pointerup` 後下一幀直接從新 `marqueeX` 繼續

RAF 迴圈在 `onMounted` 啟動，`onBeforeUnmount` 呼叫 `cancelAnimationFrame` 清理。

## 資料流

```
portfolioStore (Pinia)
    ↓ 提供 projects / stats / skills
ProjectsSection.vue → ProjectCard.vue (props: project, index)
AboutSection.vue → 直接讀 store
ProjectDetailPage.vue → getProject(id) from store
```
