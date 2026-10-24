import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'images/fish/*.jpg',
        'images/fish/*.png',
      ],
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MB to precache all 44 high-res Moroccan fish specimens
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'L7OT · الحوت المغربي — Atlas Halieutique & Criée Royale',
        short_name: 'L7OT · الحوت',
        description: 'Moroccan Fish & Seafood Atlas in Darija, AI Camera Fish Scanner, market prices, Dahir 1973 maritime law, and High-Seas Marine Navigator.',
        lang: 'ar',
        theme_color: '#0b0908',
        background_color: '#0b0908',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        categories: ['food', 'education', 'navigation'],
        icons: [
          {
            src: 'favicon.svg',
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
