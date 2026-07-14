import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const feastflowDark = {
  dark: true,
  colors: {
    background: '#0A0A0F',
    surface: '#1A1A2E',
    'surface-variant': '#16213E',
    'surface-bright': '#242440',
    primary: '#FF6B35',
    'primary-darken-1': '#E55A25',
    secondary: '#FF8A65',
    'secondary-darken-1': '#E07750',
    accent: '#FFD93D',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    'on-background': '#E8E8EE',
    'on-surface': '#E8E8EE',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
  },
}

const feastflowLight = {
  dark: false,
  colors: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    'surface-variant': '#F5F5F5',
    'surface-bright': '#FFFFFF',
    primary: '#FF6B35',
    'primary-darken-1': '#E55A25',
    secondary: '#FF8A65',
    'secondary-darken-1': '#E07750',
    accent: '#FFD93D',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    'on-background': '#1A1A2E',
    'on-surface': '#1A1A2E',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'feastflowDark',
    themes: {
      feastflowDark,
      feastflowLight,
    },
  },
  defaults: {
    VBtn: {
      rounded: 'xl',
      variant: 'flat',
    },
    VCard: {
      rounded: 'xl',
      variant: 'flat',
    },
    VChip: {
      rounded: 'lg',
    },
    VTextField: {
      variant: 'outlined',
      rounded: 'xl',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      rounded: 'xl',
      density: 'comfortable',
    },
    VTextarea: {
      rounded: 'xl',
    },
    VFab: {
      rounded: 'xl',
    },
  },
})
