import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/routes/**/*.{ts,tsx,js,jsx}',
    './app/components/**/*.{ts,tsx,js,jsx}'
  ],
  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            DEFAULT: { value: '#268FE3' },
            '50': { value: '#deeefb' },
            '100': { value: '#d4e9f9' },
            '200': { value: '#c9e3f8' },
            '300': { value: '#a8d2f4' },
            '400': { value: '#67b1eb' },
            '500': { value: '#268FE3' },
            '600': { value: '#2281cc' },
            '700': { value: '#1d6baa' },
            '800': { value: '#175688' },
            '900': { value: '#13466f' }
          },
          secondary: {
            DEFAULT: { value: '#8C4812' },
            '50': { value: '#eee4db' },
            '100': { value: '#e8dad0' },
            '200': { value: '#e2d1c4' },
            '300': { value: '#d1b6a0' },
            '400': { value: '#af7f59' },
            '500': { value: '#8C4812' },
            '600': { value: '#7e4110' },
            '700': { value: '#69360e' },
            '800': { value: '#542b0b' },
            '900': { value: '#452309' }
          }
        }
      }
    }
  },

  // The output directory for your css system
  outdir: 'styled-system'
})
