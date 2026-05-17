import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Project, Stat, Skill } from '@/types'


export const usePortfolioStore = defineStore('portfolio', () => {
  // ── Projects ──
  const projects = ref<Project[]>([
    {
      id: 'nanshan-life-insurance',
      title: '南山人壽 — 團險自費加保平台',
      subtitle: '金融保險 · 前台 / 後台',
      description:
        '專案為新開發產品，專門為各企業對員工提供客製化的投保計畫，依照規格文件所規範的尺寸、顏色、間距等，進行開發共用元件，提升開發效率與維護性。與 PM 和 UI&UX 設計師討論優化操作介面，並與後端提供的 Swagger 文件進行串接 API。',
      tags: ['Vite', 'Vue 3', 'TypeScript', 'Vue Router', 'Vue Animation', 'Pinia', 'Axios', 'SCSS', 'TailwindCSS', 'VeeValidate', 'Vue Draggable', 'Vue Datepicker', 'Swiper'],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2023/9 — 2024/9',
      category: 'company',
      cover: '/images/project-nanshan-life.jpg',
      color: '#4461f2',
      featured: true,
      sections: [
        {
          title: '前台功能',
          items: [
            '企業員工帳號登入及登出',
            '首頁套用後台自定義的網頁模板、保單明細及規範、保單異動申請進度',
            '員工進行本人和家屬的投保計畫申請 / 異動、已投保計畫查詢',
            '上傳身份證明文件，由後端影像辨識簽名文字',
          ],
        },
        {
          title: '後台功能',
          items: [
            '系統 Saml Token 驗證登入及登出',
            '設定該企業的前台登入碼及名單',
            '角色權限的編輯，依照角色調整權限操作範圍',
            '管理員帳號選用角色權限、資料編輯、切換帳號使用狀態',
            '編輯前台網站保單資訊和使用規則',
            '自定義該企業前台網站首頁模版',
            '客製化該企業保單計畫內容，提供員工在前台網站選擇投保計畫',
          ],
        },
      ],
    },
    {
      id: 'nanshan-property-insurance',
      title: '南山產險 — 網路投保中心（前台）/ 網路會員管理平台（後台）',
      subtitle: '平台整合優化 · 前台 / 後台',
      description:
        '專案為產品的整併優化案，於南山網路投保中心和南山 LINE 兩大投保平台進行資料庫整合，因此在前後台需大規模改動 API 流程和 OTP 驗證步驟。',
      tags: ['AngularCli', 'TypeScript', 'Angular Forms', 'Angular Material', 'Axios', 'SCSS', 'Bootstrap', 'RxJS', 'Moment.js'],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2024/6 — 2024/9',
      category: 'company',
      cover: '/images/project-nanshan-property.jpg',
      color: '#a855f7',
      featured: true,
      link: 'https://ecrwd.nanshangeneral.com.tw/nanshanEC/',
      sections: [
        {
          title: '前台優化',
          items: [
            '兩大平台整合，重構部分產品既有 API 架構，重新設計 API 資料流程',
            '根據帳號合併的狀態，執行對應的 OTP 驗證邏輯',
          ],
        },
        {
          title: '後台優化',
          items: [
            '兩大平台整合，重構後台所有 API 架構與流程',
            '後台操作 UI/UX 介面優化',
            '新增帳號合併狀態相關欄位，並增設管理權限功能',
          ],
        },
      ],
    },
    {
      id: 'nanshan-sales-platform',
      title: '南山產險 — 銷售作業平台',
      subtitle: '功能擴充 · UI 優化',
      description:
        '此專案為新增功能、UI 優化案，提供銷售人員銷售作業平台中多種保單業務查詢，UI 介面優化使銷售人員更直覺使用投保業務功能。',
      tags: ['AngularCli', 'TypeScript', 'Angular Forms', 'Angular Material', 'Axios', 'SCSS', 'Bootstrap', 'RxJS', 'Moment.js'],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2024/3 — 2024/8',
      category: 'company',
      cover: '/images/project-nanshan-sales.jpg',
      color: '#06b6d4',
      featured: true,
      link: 'https://www.nanshangeneral.com.tw/',
      sections: [
        {
          title: '優化',
          items: [
            '個人保險（汽車、機車、旅遊等保險）UI/UX 操作介面優化',
          ],
        },
        {
          title: '新增功能',
          items: [
            '新增企業保險（工程保險、商業火險）申請、異動、保單明細查詢功能',
            '跨平台查詢個人旅遊險資料功能',
          ],
        },
      ],
    },
    {
      id: 'blog-nuxt3',
      title: '文章部落格網站',
      subtitle: 'Side Project · Nuxt 3',
      description:
        '以 Nuxt 3 開發的文章部落格網站，使用者在頁面上在未登入時，可操作搜尋、排序進行文章閱覽，經由登入驗證後才會顯示並操作新增、修改、刪除等編輯文章功能，使用 Neon 作為雲端 SQL 資料庫，透過 Nuxt 3 Server API，與資料庫進行 API 串接，開發過程中，使用 Git 進行版本控制，並將程式碼推上同步至 GitHub。最後，透過 Vercel 進行 Nuxt 3 專案的部屬，確保網站具備動態資料即時更新。',
      tags: ['Nuxt 3', 'TypeScript', 'Server API', 'Neon DB'],
      tools: ['Git', 'GitHub', 'Vercel'],
      year: '2025',
      period: '2025/3',
      category: 'personal',
      cover: '/images/project-blog.jpg',
      color: '#10b981',
      link: 'https://nuxt-article-blog.vercel.app/',
      sections: [
        {
          title: '主要功能',
          items: [
            '未登入：搜尋、排序進行文章閱覽',
            '登入驗證後：新增、修改、刪除等編輯文章功能',
            'Neon 雲端 SQL 資料庫，透過 Nuxt 3 Server API 串接',
            'Git 版本控制，程式碼推送至 GitHub',
            '透過 Vercel 部署，動態資料即時更新',
          ],
        },
      ],
    },
    {
      id: 'social-vue',
      title: '社群網站',
      subtitle: 'Side Project · Vue.js',
      description:
        '以社群為主的網站，與好友有著良好互動以及留言、點讚、收藏等功能。這個網站使用 Vue 3 作為前端框架，來創建各種功能豐富的組件，例如個人資料頁面、文章頁面、評論系統等。運用 Vuex 進行全域狀態管理，使用 Vue Router 達成各頁面間的切換，以及 Vite 作為開發工具。',
      tags: ['Vue 3', 'Vuex', 'Vue Router', 'Vite'],
      tools: ['Git'],
      year: '2023',
      period: '2023/6',
      category: 'personal',
      cover: '/images/project-social.jpg',
      color: '#f59e0b',
      link: 'https://sammyyaaa.github.io/SocialNetworkingSite.github.io/',
      sections: [
        {
          title: '主要功能',
          items: [
            '個人資料頁面、文章頁面、評論系統元件',
            '留言、點讚、收藏等好友互動功能',
            'Vuex 全域狀態管理，有效讀取文章與個人資料',
            'Vue Router 實現個人資料、文章、編輯頁面間的切換',
          ],
        },
      ],
    },
    {
      id: 'foomosa',
      title: 'Foomosa 臺中美食餐廳資訊整合平台',
      subtitle: '團隊協作 · Node.js',
      description:
        '專案負責頁面「會員專區」，透過 Chart.js 做出幸運轉盤旋轉動畫效果。經由 Node.js 串接 MySQL 資料庫取得動態資料，Session 會接收不同使用者 ID 狀態，顯示該使用者登入頁面。jQuery Ajax 請求遵守 RESTful API 動態編輯資料，在 EJS 模板中渲染出會員專區的個人介面。',
      tags: ['Node.js', 'MySQL', 'jQuery', 'EJS', 'Chart.js', 'Ajax', 'RESTful API'],
      tools: ['GitHub', 'SourceTree'],
      year: '2023',
      period: '2023/4',
      category: 'team',
      cover: '/images/project-foomosa.jpg',
      color: '#f97316',
      link: 'https://github.com/Sammyyaaa/foomosa',
      sections: [
        {
          title: '會員專區功能',
          items: [
            '幸運轉盤旋轉動畫效果，中獎時資料寫入資料庫',
            'Node.js 串接 MySQL 資料庫，Session 接收使用者 ID 狀態',
            'jQuery Ajax 遵守 RESTful API 動態編輯資料',
            'EJS 模板渲染會員專區個人介面',
            '優惠券輸入有效驗證判斷功能',
            '編輯從店家頁面收藏的美食口袋名單',
            '店家評論與評分功能實現',
          ],
        },
      ],
    },
    {
      id: 'architect-website',
      title: '建築師形象網站',
      subtitle: 'Side Project · Bootstrap',
      description:
        '展示和介紹建築公司或服務內容。網站使用簡約的設計風格和黑灰白色調來呈現建築師品牌形象和建築相關作品。確保網站在不同設備和螢幕尺寸上的良好顯示，使用 RWD 來開發網站。網站介面以 Bootstrap Grid 完成主要架構，互動功能使用 JavaScript 來完成輪播圖、彈出視窗等功能，並以套件 AOS 完成動畫效果展示。',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'AOS'],
      tools: ['Git'],
      year: '2023',
      period: '2023/3',
      category: 'personal',
      cover: '/images/project-architect.jpg',
      color: '#94a3b8',
      link: 'https://sammyyaaa.github.io/Architect-Firm-Image-Website.github.io/Architect%20Firm%20Image%20Webside/',
      sections: [
        {
          title: '主要特色',
          items: [
            '簡約黑灰白設計風格，呈現建築師品牌形象與建築相關作品',
            'RWD 確保在不同設備和螢幕尺寸上的良好顯示',
            'Bootstrap Grid 完成主要架構',
            'JavaScript 完成輪播圖、彈出視窗等互動功能',
            'AOS 套件完成動畫效果展示',
          ],
        },
      ],
    },
  ])

  const featuredProjects = computed(() =>
    projects.value.filter((p) => p.featured),
  )

  const companyProjects = computed(() =>
    projects.value.filter((p) => p.category === 'company'),
  )

  const personalProjects = computed(() =>
    projects.value.filter((p) => p.category === 'personal'),
  )

  function getProject(id: string): Project | undefined {
    return projects.value.find((p) => p.id === id)
  }

  // ── Stats ──
  const stats = ref<Stat[]>([
    { value: '1+', label: '年前端開發' },
    { value: '7', label: '項完成專案' },
    { value: '3', label: '金融保險系統' },
    { value: '∞', label: '對細節的執著' },
  ])

  // ── Skills ──
  const skills = ref<Skill[]>([
    { name: 'HTML5', category: 'basics' },
    { name: 'CSS3', category: 'basics' },
    { name: 'RWD', category: 'basics' },
    { name: 'JavaScript ES6+', category: 'basics' },
    { name: 'TypeScript', category: 'basics' },
    { name: 'jQuery', category: 'basics' },
    { name: 'Sass', category: 'styling' },
    { name: 'Bootstrap', category: 'styling' },
    { name: 'Tailwind CSS', category: 'styling' },
    { name: 'Vue', category: 'frameworks' },
    { name: 'Nuxt 3', category: 'frameworks' },
    { name: 'Angular', category: 'frameworks' },
    { name: 'Vuex', category: 'state' },
    { name: 'Pinia', category: 'state' },
    { name: 'RxJS', category: 'state' },
    { name: 'Vite', category: 'build' },
    { name: 'npm', category: 'build' },
    { name: 'Yarn', category: 'build' },
    { name: 'Ajax', category: 'api' },
    { name: 'Axios', category: 'api' },
    { name: 'Fetch', category: 'api' },
    { name: 'RESTful', category: 'api' },
    { name: 'Photoshop', category: 'uiux' },
    { name: 'Illustrator', category: 'uiux' },
    { name: 'Figma', category: 'uiux' },
    { name: 'ESLint', category: 'devtools' },
    { name: 'Prettier', category: 'devtools' },
    { name: 'Git', category: 'devtools' },
    { name: 'GitHub', category: 'devtools' },
    { name: 'SourceTree', category: 'devtools' },
    { name: 'Postman', category: 'devtools' },
    { name: 'Claude Code', category: 'aitools' },
    { name: 'Spec-driven Development', category: 'aitools' },
    { name: 'Sandbox', category: 'aitools' },
  ])

  return {
    projects,
    featuredProjects,
    companyProjects,
    personalProjects,
    stats,
    skills,
    getProject,
  }
})
