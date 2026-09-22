// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/color-mode', '@nuxtjs/turnstile', '@nuxtjs/i18n'],

  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/css/tailwind.css'],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Jonatan Monti · Desarrollador Full-Stack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio de Jonatan Monti, Desarrollador Full-Stack especializado en C#, ASP.NET Core, Angular y Vue.js.'
        },
        { property: 'og:title', content: 'Jonatan Monti · Desarrollador Full-Stack' },
        {
          property: 'og:description',
          content:
            'Portfolio de Jonatan Monti, Desarrollador Full-Stack especializado en C#, ASP.NET Core, Angular y Vue.js.'
        },
        { property: 'og:type', content: 'website' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: './favicon.svg' }]
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark'
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Space Grotesk', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' }
    ]
  },

  icon: {
    mode: 'svg',
    serverBundle: { collections: ['devicon', 'simple-icons', 'mdi', 'circle-flags'] }
  },

  i18n: {
    locales: [
      { code: 'es', iso: 'es-AR', name: 'Español', file: 'es.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: 'pt.json' }
    ],
    defaultLocale: 'es',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'no prefix'
    }
  },

  runtimeConfig: {
    resendApiKey: '',
    contactToEmail: '',
    public: {}
  },

  nitro: {
    preset: process.env.NITRO_PRESET || 'vercel',
    prerender: {
      routes: [process.env.NUXT_APP_BASE_URL || '/']
    }
  }
})