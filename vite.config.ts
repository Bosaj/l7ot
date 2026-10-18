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
        name: 'L7OT · الحوت — Moroccan Fish & Seafood Encyclopedia',
        short_name: 'L7OT',
        description: 'Moroccan Fish names in Darija, live images, market freshness guide, and coastal recipes.',
        lang: 'ar',
        theme_color: '#0369a1',
        background_color: '#082f49',
        display: 'standalone',
        start_url: '/',
        categories: ['food', 'education'],
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
