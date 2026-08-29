import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project, ProjectSection, Stat, Skill } from '@/types'

type Locale = 'zh-tw' | 'en'

interface LocalizedProjectContent {
  title: string
  subtitle: string
  description: string
  contribution?: string
  sections?: ProjectSection[]
}

interface RawProject extends Omit<Project, 'title' | 'subtitle' | 'description' | 'contribution' | 'sections'> {
  content: Record<Locale, LocalizedProjectContent>
}

export const usePortfolioStore = defineStore('portfolio', () => {
  // useI18n() requires an active component instance on first call — only safe because
  // every current call site invokes usePortfolioStore() at the top of <script setup>.
  // Calling it from a plugin/middleware/server route or a detached async callback would throw.
  const { locale, t } = useI18n()

  // ── Projects ──
  const rawProjects: RawProject[] = [
    {
      id: 'nanshan-life-insurance',
      tags: [
        'Vite',
        'Vue 3',
        'TypeScript',
        'Vue Router',
        'Vue Animation',
        'Pinia',
        'Axios',
        'SCSS',
        'TailwindCSS',
        'VeeValidate',
        'Vue Draggable',
        'Vue Datepicker',
        'Swiper',
      ],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2023/9 — 2024/9',
      category: 'company',
      cover: '/images/project-nanshan-life.jpg',
      color: '#4461f2',
      featured: true,
      content: {
        'zh-tw': {
          title: '南山人壽 — 團險自費加保平台',
          subtitle: '金融保險 · 前台 / 後台',
          description:
            '專案為新開發產品，專門為各企業對員工提供客製化的投保計畫，依照規格文件所規範的尺寸、顏色、間距等，進行開發共用元件，提升開發效率與維護性。與 PM 和 UI&UX 設計師討論優化操作介面，並與後端提供的 Swagger 文件進行串接 API。',
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
        en: {
          title: 'Nan Shan Life — Group Insurance Voluntary Top-up Platform',
          subtitle: 'Financial Insurance · Front-end / Back-office',
          description:
            "A newly developed product offering customized group insurance plans that companies provide to their employees. Built shared components following spec documents defining sizing, color, and spacing standards to improve development efficiency and maintainability. Collaborated with the PM and UI/UX designer to refine the interface, and integrated APIs based on the backend's Swagger documentation.",
          sections: [
            {
              title: 'Front-end Features',
              items: [
                'Employee account sign-in and sign-out',
                'Homepage using an admin-customizable web template, policy details and rules, and application-progress tracking for policy changes',
                'Employees apply for or modify insurance plans for themselves and dependents, and view existing plan enrollments',
                'Upload identification documents, with backend image recognition for signature text',
              ],
            },
            {
              title: 'Back-office Features',
              items: [
                'SAML token-based system login and logout verification',
                "Configure the company's front-end login codes and enrollment lists",
                'Role-permission editing, adjusting operation scope based on role',
                'Admin accounts select role permissions, edit data, and toggle account status',
                'Edit front-end site policy information and usage rules',
                'Customize the front-end homepage template for each company',
                "Customize each company's policy plan content for employees to select on the front-end site",
              ],
            },
          ],
        },
      },
    },
    {
      id: 'nanshan-property-insurance',
      tags: [
        'AngularCli',
        'TypeScript',
        'Angular Forms',
        'Angular Material',
        'Axios',
        'SCSS',
        'Bootstrap',
        'RxJS',
        'Moment.js',
      ],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2024/6 — 2024/9',
      category: 'company',
      cover: '/images/project-nanshan-property.jpg',
      color: '#a855f7',
      featured: true,
      link: 'https://ecrwd.nanshangeneral.com.tw/nanshanEC/',
      content: {
        'zh-tw': {
          title: '南山產險 — 網路投保中心（前台）/ 網路會員管理平台（後台）',
          subtitle: '平台整合優化 · 前台 / 後台',
          description:
            '專案為產品的整併優化案，於南山網路投保中心和南山 LINE 兩大投保平台進行資料庫整合，因此在前後台需大規模改動 API 流程和 OTP 驗證步驟。',
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
        en: {
          title: 'Nan Shan General Insurance — Online Insurance Center (Front-end) / Online Member Management Platform (Back-office)',
          subtitle: 'Platform Integration & Optimization · Front-end / Back-office',
          description:
            "A product consolidation and optimization initiative that merged the databases behind Nan Shan's Online Insurance Center and Nan Shan LINE insurance platforms, requiring large-scale changes to the API flow and OTP verification steps across both front-end and back-office.",
          sections: [
            {
              title: 'Front-end Optimization',
              items: [
                'Integrated the two platforms and refactored parts of the existing API architecture, redesigning the API data flow',
                'Executed corresponding OTP verification logic based on account-merge status',
              ],
            },
            {
              title: 'Back-office Optimization',
              items: [
                'Integrated the two platforms and refactored the entire back-office API architecture and flow',
                'Optimized the back-office UI/UX',
                'Added fields related to account-merge status and new admin permission features',
              ],
            },
          ],
        },
      },
    },
    {
      id: 'nanshan-sales-platform',
      tags: [
        'AngularCli',
        'TypeScript',
        'Angular Forms',
        'Angular Material',
        'Axios',
        'SCSS',
        'Bootstrap',
        'RxJS',
        'Moment.js',
      ],
      tools: ['ESLint', 'Prettier', 'SourceTree', 'Postman', 'Git'],
      year: '2024',
      period: '2024/3 — 2024/8',
      category: 'company',
      cover: '/images/project-nanshan-sales.jpg',
      color: '#06b6d4',
      featured: true,
      link: 'https://www.nanshangeneral.com.tw/',
      content: {
        'zh-tw': {
          title: '南山產險 — 銷售作業平台',
          subtitle: '功能擴充 · UI 優化',
          description:
            '此專案為新增功能、UI 優化案，提供銷售人員銷售作業平台中多種保單業務查詢，UI 介面優化使銷售人員更直覺使用投保業務功能。',
          sections: [
            {
              title: '優化',
              items: ['個人保險（汽車、機車、旅遊等保險）UI/UX 操作介面優化'],
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
        en: {
          title: 'Nan Shan General Insurance — Sales Operations Platform',
          subtitle: 'Feature Expansion · UI Optimization',
          description:
            'A feature-addition and UI-optimization project providing sales staff with a variety of policy inquiry tools on the sales operations platform, with UI improvements making insurance operations more intuitive for sales agents.',
          sections: [
            {
              title: 'Optimization',
              items: [
                'UI/UX optimization for personal insurance operations (auto, motorcycle, travel insurance, etc.)',
              ],
            },
            {
              title: 'New Features',
              items: [
                'Added application, modification, and policy-detail inquiry features for corporate insurance (engineering insurance, commercial fire insurance)',
                'Cross-platform inquiry feature for personal travel insurance data',
              ],
            },
          ],
        },
      },
    },
    {
      id: 'blog-nuxt3',
      tags: [
        'Nuxt 3',
        'TanStack Query',
        'TypeScript',
        'Neon DB',
        'Tailwind CSS',
        'marked',
        'nuxt-icon',
        'nuxt-particles',
      ],
      tools: ['Git', 'GitHub', 'Vercel'],
      year: '2025',
      period: '2025/3',
      category: 'personal',
      cover: '/images/project-blog.jpg',
      color: '#10b981',
      link: 'https://nuxt-article-blog.vercel.app/',
      content: {
        'zh-tw': {
          title: '文章部落格網站',
          subtitle: 'Side Project · Nuxt 3',
          description:
            '基於 Nuxt 3 建置的文章部落格，支援 Markdown 撰寫、文章標籤分類、圖片輪播，以 TanStack Query（Vue Query）管理資料請求與快取，搭配 JWT 驗證保護管理功能，串接 Neon Serverless PostgreSQL 雲端資料庫，並部署於 Vercel，推送至 GitHub 後自動觸發部署。',
          sections: [
            {
              title: '主要功能',
              items: [
                '未登入：搜尋、排序、標籤分類進行文章閱覽、圖片輪播',
                'JWT 驗證登入後：Markdown 撰寫，新增、修改、刪除文章',
                'TanStack Query 全域快取管理、useQuery / useMutation',
                'SSR dehydrate/hydrate、removeQueries + prefetchQuery 背景預熱',
                'Neon Serverless PostgreSQL，透過 Nuxt 3 Server API 串接',
                '推送至 GitHub 後自動部署至 Vercel',
              ],
            },
          ],
        },
        en: {
          title: 'Article Blog Website',
          subtitle: 'Side Project · Nuxt 3',
          description:
            'A blogging site built with Nuxt 3, supporting Markdown authoring, tag-based categorization, and image carousels. Uses TanStack Query (Vue Query) to manage data fetching and caching, JWT authentication to protect admin features, and Neon Serverless PostgreSQL as the cloud database — deployed on Vercel with automatic deployment on push to GitHub.',
          sections: [
            {
              title: 'Key Features',
              items: [
                'Logged out: browse articles via search, sort, and tag filters, with image carousels',
                'Logged in via JWT: write Markdown posts and create, edit, or delete articles',
                'TanStack Query global cache management with useQuery / useMutation',
                'SSR dehydrate/hydrate, plus removeQueries + prefetchQuery for background pre-warming',
                'Neon Serverless PostgreSQL integrated via Nuxt 3 server API',
                'Automatic deployment to Vercel on push to GitHub',
              ],
            },
          ],
        },
      },
    },
    {
      id: 'social-vue',
      tags: ['Vue 3', 'Vuex', 'Vue Router', 'Vite'],
      tools: ['Git'],
      year: '2023',
      period: '2023/6',
      category: 'personal',
      cover: '/images/project-social.jpg',
      color: '#f59e0b',
      link: 'https://sammyyaaa.github.io/SocialNetworkingSite.github.io/',
      content: {
        'zh-tw': {
          title: '社群網站',
          subtitle: 'Side Project · Vue.js',
          description:
            '以 Vue 3 作為前端框架，仿 Instagram 的社群網站，實作個人資料頁面、文章頁面、評論系統、文章編輯等功能模組。透過 Vuex 進行全域狀態管理，統一管理文章資料、使用者資訊與頁面狀態，提升資料讀取與維護效率。',
          contribution:
            'Vue Router 建立多頁面路由架構，完成個人資料頁、文章詳情頁與編輯頁之間的切換流程。專案並採用 Vite 作為開發建置工具，加快開發環境啟動速度與前端開發效率。',
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
        en: {
          title: 'Social Networking Site',
          subtitle: 'Side Project · Vue.js',
          description:
            'An Instagram-inspired social networking site built with Vue 3, implementing profile pages, post pages, a comment system, and post-editing modules. Uses Vuex for global state management to unify post data, user information, and page state, improving data-access and maintenance efficiency.',
          contribution:
            'Built a multi-page routing architecture with Vue Router, completing the navigation flow between the profile page, post detail page, and edit page. The project also used Vite as the build tool to speed up dev-server startup and front-end development.',
          sections: [
            {
              title: 'Key Features',
              items: [
                'Profile page, post page, and comment system components',
                'Friend-interaction features including comments, likes, and bookmarks',
                'Global state management with Vuex for efficient reading of posts and profile data',
                'Vue Router enabling navigation between profile, post, and edit pages',
              ],
            },
          ],
        },
      },
    },
    {
      id: 'foomosa',
      tags: ['Node.js', 'MySQL', 'jQuery', 'EJS', 'Chart.js', 'Ajax', 'RESTful API'],
      tools: ['GitHub', 'SourceTree'],
      year: '2023',
      period: '2023/4',
      category: 'team',
      cover: '/images/project-foomosa.jpg',
      color: '#f97316',
      link: 'https://github.com/Sammyyaaa/foomosa',
      content: {
        'zh-tw': {
          title: 'Foomosa 臺中美食餐廳資訊整合平台',
          subtitle: '團隊協作 · Node.js',
          description:
            '以 Node.js + Express + MySQL 建構的台灣美食發現平台，消費者端可依時段與天氣智能推薦餐廳、瀏覽菜單與活動優惠、留下評論評分、管理收藏清單與兌換積分；店家後台則提供菜單管理、活動上架、業務分析圖表。',
          contribution:
            '專案負責頁面「會員專區」，透過 Chart.js 做出幸運轉盤旋轉動畫效果。經由 Node.js 串接 MySQL 資料庫取得動態資料，Session 會接收不同使用者 ID 狀態，顯示該使用者登入頁面。jQuery Ajax 請求遵守 RESTful API 動態編輯資料，在 EJS 模板中渲染出會員專區的個人介面。',
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
        en: {
          title: 'Foomosa — Taichung Restaurant Discovery Platform',
          subtitle: 'Team Collaboration · Node.js',
          description:
            'A Taiwanese food-discovery platform built with Node.js + Express + MySQL. Consumers get smart restaurant recommendations based on time of day and weather, browse menus and promotions, leave reviews and ratings, manage a favorites list, and redeem points; the merchant back-office provides menu management, promotion publishing, and business analytics charts.',
          contribution:
            "Responsible for the 'Member Zone' page, building a lucky-wheel spin animation with Chart.js. Fetched dynamic data from a MySQL database via Node.js, with sessions tracking different user ID states to render each user's personalized login page. Used jQuery Ajax requests following RESTful API conventions to dynamically edit data, rendering the member zone's personal interface in EJS templates.",
          sections: [
            {
              title: 'Member Zone Features',
              items: [
                'Lucky-wheel spin animation, writing results to the database on a win',
                'Node.js integration with MySQL, with sessions tracking user ID state',
                'jQuery Ajax dynamically edits data following RESTful API conventions',
                "EJS templates render the member zone's personal interface",
                'Coupon-code input validation feature',
                'Editing a favorites list of dishes bookmarked from merchant pages',
                'Merchant review and rating feature',
              ],
            },
          ],
        },
      },
    },
    {
      id: 'architect-website',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'AOS'],
      tools: ['Git'],
      year: '2023',
      period: '2023/3',
      category: 'personal',
      cover: '/images/project-architect.jpg',
      color: '#94a3b8',
      link: 'https://sammyyaaa.github.io/Architect-Firm-Image-Website.github.io/Architect%20Firm%20Image%20Webside/',
      content: {
        'zh-tw': {
          title: '建築師形象網站',
          subtitle: 'Side Project · Bootstrap',
          description:
            '展示和介紹建築公司或服務內容。網站使用簡約的設計風格和黑灰白色調來呈現建築師品牌形象和建築相關作品。確保網站在不同設備和螢幕尺寸上的良好顯示，使用 RWD 來開發網站。網站介面以 Bootstrap Grid 完成主要架構，互動功能使用 JavaScript 來完成輪播圖、彈出視窗等功能，並以套件 AOS 完成動畫效果展示。',
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
        en: {
          title: 'Architect Firm Image Website',
          subtitle: 'Side Project · Bootstrap',
          description:
            "Showcases and introduces an architecture firm and its services. The site uses a minimalist design in black, gray, and white tones to present the architect's brand image and related work, and is built responsively (RWD) to display well across devices and screen sizes. The layout is structured with Bootstrap Grid, interactive features (carousels, modals) are built with JavaScript, and the AOS package handles the animation effects.",
          sections: [
            {
              title: 'Key Features',
              items: [
                "Minimalist black/gray/white design presenting the architect's brand image and related work",
                'RWD ensures good display across devices and screen sizes',
                'Main layout built with Bootstrap Grid',
                'JavaScript-powered interactive features including carousels and modals',
                'Animation effects implemented with the AOS package',
              ],
            },
          ],
        },
      },
    },
  ]

  const projects = computed<Project[]>(() =>
    rawProjects.map((p) => {
      const { content, ...rest } = p
      const localized = content[locale.value as Locale] ?? content['zh-tw']
      return { ...rest, ...localized }
    })
  )

  const featuredProjects = computed(() => projects.value.filter((p) => p.featured))

  const companyProjects = computed(() => projects.value.filter((p) => p.category === 'company'))

  const personalProjects = computed(() => projects.value.filter((p) => p.category === 'personal'))

  function getProject(id: string): Project | undefined {
    return projects.value.find((p) => p.id === id)
  }

  // ── Stats ──
  const stats = computed<Stat[]>(() => [
    { value: '20+', label: t('stats.technologies') },
    { value: '7', label: t('stats.projectsCompleted') },
    { value: '3', label: t('stats.financeSystems') },
    { value: '∞', label: t('stats.detailObsession') },
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
    { name: 'TanStack Query', category: 'api' },
    { name: 'Photoshop', category: 'uiux' },
    { name: 'Illustrator', category: 'uiux' },
    { name: 'Figma', category: 'uiux' },
    { name: 'VSCode', category: 'devtools' },
    { name: 'ESLint', category: 'devtools' },
    { name: 'Prettier', category: 'devtools' },
    { name: 'Git', category: 'devtools' },
    { name: 'GitHub', category: 'devtools' },
    { name: 'SourceTree', category: 'devtools' },
    { name: 'Postman', category: 'devtools' },
    { name: 'Claude Code', category: 'aitools' },
    { name: 'GitHub Copilot', category: 'aitools' },
    { name: 'Codex CLI', category: 'aitools' },
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
