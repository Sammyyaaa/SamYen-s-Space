# TESTING.md

## 測試策略

本專案目前以手動測試為主，重點驗證：
- 視覺效果與動畫流暢度
- RWD 響應式排版（375px / 768px / 1440px）
- 鍵盤可訪問性
- 效能指標（Core Web Vitals）

## 手動測試清單

### 桌面（≥1024px）
- [ ] Hero 入場動畫完整播放
- [ ] 游標 dot + ring 跟蹤流暢，不卡頓
- [ ] 磁吸效果（CTA 按鈕、Logo）有感覺但不誇張
- [ ] 滾動視差背景正常移動
- [ ] 作品卡片 hover 動畫（封面縮放 + 遮罩）
- [ ] 導航列滾動後玻璃擬態效果

### 行動裝置（375px）
- [ ] 游標不顯示（觸控裝置）
- [ ] 漢堡選單正常開關
- [ ] Hero 文字不溢出
- [ ] 作品網格切換為單欄
- [ ] Contact email 可以點擊撥打

### 效能
- [ ] Lighthouse Performance ≥ 85
- [ ] FCP ≤ 2s
- [ ] CLS = 0（無版面偏移）
- [ ] 無 unused JS bundle

## 執行 Lighthouse

```bash
npm run build && npm run preview
# 在 Chrome 開 DevTools → Lighthouse → Generate report
```

## 已知限制

- 目前作品封面使用 CSS 漸層佔位，實際圖片需放置於 `src/assets/images/`
- E2E 測試（Playwright/Cypress）尚未設置
