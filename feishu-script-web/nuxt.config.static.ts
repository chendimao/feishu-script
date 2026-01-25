// 静态部署配置
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // 禁用 SSR，启用静态生成
  ssr: false,

  // 模块配置
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],

  // Element Plus 配置
  elementPlus: {
    /** Options */
  },

  // Pinia 配置
  pinia: {
    storesDirs: ['./stores/**']
  },

  // 自动导入
  imports: {
    dirs: ['stores', 'composables'],
  },

  // TypeScript 配置
  typescript: {
    strict: false,
    typeCheck: false,
  },

  // 应用配置
  app: {
    head: {
      title: '多维表格脚本管理',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '飞书脚本管理平台' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // CSS 配置
  css: [
    'element-plus/theme-chalk/display.css',
  ],

  // 运行时配置
  runtimeConfig: {
    // 私有配置（服务器端可访问）
    feishuAppId: '',
    feishuAppSecret: '',
    // 公共配置（客户端可访问）
    public: {
      appName: '多维表格脚本管理',
    },
  },

  // Nitro 服务器配置
  nitro: {
    compressPublicAssets: true,
  },

  // 日志配置
  logLevel: 'info',
})
