// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  app: {
    baseURL: '/',
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'Description',
          content: 'Art x By x City'
        }
      ],
      link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/logo/art-by-city/art-by-city-favicon.png'
      }]
    }
  },

  experimental: {
    writeEarlyHints: false
  }
})
