# ESLint + Prettier 工具鏈建置

**狀態**：已完成（2026-05-27）
**版本**：v0.3.0

## 目標

統一全專案程式碼風格，建立 linting 與格式化工具鏈。

## 安裝套件

```bash
npm install -D @nuxt/eslint prettier eslint-config-prettier
```

## 新增檔案

| 檔案 | 說明 |
|------|------|
| `eslint.config.mjs` | flat config，延伸 `@nuxt/eslint` 預設規則 |
| `.prettierrc` | 單引號、無分號、es5 trailing comma、printWidth 100 |
| `.prettierignore` | 排除 `.nuxt/`、`.output/`、`dist/` |

## ESLint 規則調整

- `vue/multi-word-component-names: off` — pages/layouts 單字命名合法
- `no-empty: allowEmptyCatch: true` — WSL2 workaround 腳本中的空 catch 是刻意設計

## 格式化結果

- 引號：全專案統一為單引號（`portfolioStore.ts`、`nuxt.config.ts` 原為雙引號）
- 分號：全部移除
- Trailing comma：補齊 es5 規範（multiline 物件/陣列）
- Vue template：`<br/>` → `<br>`，attribute 排序符合 Vue 規範

## npm scripts

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write ."
```
