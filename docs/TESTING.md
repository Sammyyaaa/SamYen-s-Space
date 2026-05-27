# TESTING.md — Nuxt 4

## 程式碼品質

每次修改後執行：

```bash
npm run lint       # ESLint 檢查（目標：0 errors）
npm run lint:fix   # 自動修正可修正的問題
npm run format     # Prettier 格式化
```

## 手動測試清單

### 桌面（≥ 1024px）

- [ ] 自定義游標跟隨滑鼠，所有 section 皆可見（mix-blend-mode）
- [ ] hover 元素游標 variant 正確切換（`hover`、`link`、`project`、`drag`）
- [ ] 磁吸效果：AppNav logo、Contact icon 有吸力感
- [ ] Hero 入場動畫（文字、CTA 依序出現）
- [ ] ScrollTrigger 揭示動畫（各 section 滾動時觸發）
- [ ] Projects 篩選（All / Featured 切換正確）
- [ ] About 技術 icon 跑馬燈：自動捲動 → hover 暫停 → 拖曳移動
- [ ] 頁面過渡：首頁 → 詳情頁 → 返回，動畫流暢無閃爍
- [ ] 亮色 / 暗色主題切換，重整後保持偏好
- [ ] ScrollToTop 按鈕（滾動一定距離後出現，點擊回頂）

### 行動裝置（375px）

- [ ] 自定義游標不顯示
- [ ] AppNav 行動版選單開關正常
- [ ] RWD 排版：Projects 1 欄、About 統計 2 欄
- [ ] 動畫跳過（`isTouchDevice()` 為 true 時直接顯示）
- [ ] 技術 icon 跑馬燈觸控拖曳正常

### 平板（768px）

- [ ] Projects 2 欄排版
- [ ] AppNav 導覽連結顯示（md breakpoint）

## 效能測試

```bash
npm run build && npm run preview
```

使用 Chrome DevTools Lighthouse 在 `http://localhost:3000` 執行：

| 指標 | 目標 |
|------|------|
| Performance | ≥ 85 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| FCP | ≤ 2s |
| CLS | 0 |

## 已知限制

- 作品封面為 CSS 漸層 placeholder（無實際截圖）
- 無 E2E 測試（Playwright / Cypress 尚未建立）
- 部分 `prefers-reduced-motion` 行為僅在桌面模式有效測試路徑
