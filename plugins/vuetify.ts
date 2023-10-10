import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

let theme = 'light'
const localStorageTheme = localStorage && localStorage.getItem('theme')
if (localStorageTheme) theme = localStorageTheme

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: theme,
      themes: {
        light: {
          colors: {
            // primary: '',
            // secondary: '',
            // accent: '',
            // surface: '',
            // background: '',
            'artby-gray': '#AAAAAA',
            'hukkinen-gray': '#8B9799',
            'hukkinen-gray-2': '#8B908E',
            'hukkinen-blue': '#1D3A4B',
            'daliah-blue': '#1F425C',
            'daliah-dark-blue': '#031225',
            'daliah-red': '#951211',
            'hackett-red': '#73161F',
            'hackett-black-turquoise': '#01101B',
            'boson-black-blue': '#0F1B27',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        },
        dark: {
          colors: {
            // primary: '',
            // secondary: '',
            // accent: '',
            // surface: '',
            // background: '',
            'artby-gray': '#AAAAAA',
            'hukkinen-gray': '#8B9799',
            'hukkinen-gray-2': '#8B908E',
            'hukkinen-blue': '#1D3A4B',
            'daliah-blue': '#1F425C',
            'daliah-dark-blue': '#031225',
            'daliah-red': '#951211',
            'hackett-red': '#73161F',
            'hackett-black-turquoise': '#01101B',
            'boson-black-blue': '#0F1B27',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
