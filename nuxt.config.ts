import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { replaceCodePlugin } from './plugins/vite-plugin-replace'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

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
  },

  modules: [ '@pinia/nuxt' ],

  /**
   * Vuetify Config
   * See https://codybontecou.com/how-to-use-vuetify-with-nuxt-3.html
   * See https://pictogrammers.github.io/@mdi/font/7.1.96/
   */
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [
      nodePolyfills(),
      replaceCodePlugin({
        replacements: [
          {
            from: `if ((crypto && crypto.getRandomValues) || !process.browser) {
  exports.randomFill = randomFill
  exports.randomFillSync = randomFillSync
} else {
  exports.randomFill = oldBrowser
  exports.randomFillSync = oldBrowser
}`,
            to: `exports.randomFill = randomFill
exports.randomFillSync = randomFillSync`,
          }
        ]
      })
    ]
  },

  /**
   * Vue Router Config
   */
  pages: true,

  runtimeConfig: {
    public: {
      arweave: {
        protocol: 'http',
        host: 'localhost',
        port: 1984
      },
      artbycity: {
        environment: 'development',
        contracts: {
          usernames: '-0MjbNd0EwwmnNgHefa5axa0we64kNM3BOnXITcF7n0',
          curation: {
            ownable: '18WFZLc9rAfNpwWKKUNDycKaLXoknfjCUq42O6IK07Q',
            whitelist: 'N4JmgBHUu5ZHbcgaOUsKAydcVlQTSi5L7pwvq_NPZuA',
            collaborative: 'KNrobEq1MzK7121Tzd-J61trXcxKZujqPQ_B3ojZeb8',
            collaborativeWhitelist:
              '06Llbzymx4RI8Y0Ygen1grv4hM7MwjmmcCdCqeU9mAI'            
          },
          following: 'uPPmKBhY4L4MKAaGi2pCDU30nnEo9VtMb9Sw-zSApFY',
          galleryHero: 'ZDIykujDgVmzKFtTcjx9pNoIi26Ew-eQTKzS02PU8kY'
        }
      }
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag === 'model-viewer'
    }
  }
})
