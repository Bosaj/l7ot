import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'L7OT · الحوت المغربي — Atlas Halieutique & Criée Royale',
        short_name: 'L7OT · الحوت',
        description: 'Moroccan Fish & Seafood Atlas in Darija, AI Camera Fish Scanner, market prices, cleaning videos, and coastal recipes.',
        lang: 'ar',
        theme_color: '#0b0908',
        background_color: '#0b0908',
        display: 'standalone',
        start_url: '/',
        categories: ['food', 'education'],
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: false,
  },
})
