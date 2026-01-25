// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // 启用 SSR
  ssr: true,

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
    baseURL: './',  // 使用相对路径，符合插件上架规范
    head: {
      title: '多维表格脚本管理',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '飞书脚本管理平台' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: './favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
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

  // 路由配置 - 使用hash路由符合插件规范
  router: {
    options: {
      hashMode: true
    }
  },

  // Nitro 服务器配置
  nitro: {
    compressPublicAssets: true,
    output: {
      dir: 'dist'
    }
  },

  // 开发服务器配置
  devServer: {
    host: '0.0.0.0',  // 监听所有网络接口
    port: 3030,
    https: false      // 禁用HTTPS避免证书问题
  },

  // 日志配置
  logLevel: 'info',
})
