import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Pre-cache all JS/CSS/HTML and every image in the public folder
        globPatterns: ['**/*.{js,css,html,ico,svg,webp,png}'],
        runtimeCaching: [
          {
            // Cache audio on first play; serve from cache on every subsequent play
            urlPattern: /\/music\/.*\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: { statuses: [200] },
              rangeRequests: true,
            },
          },
        ],
      },
      manifest: {
        name: 'PyQuest',
        short_name: 'PyQuest',
        description: 'Interactive Educational Tour — DJM 2026',
        theme_color: '#1a1510',
        background_color: '#000000',
        display: 'standalone',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
