import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/graph-editor/',
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Enable PWA in dev mode
      },
      manifest: {
        name: 'Graph Editor',
        short_name: 'GraphEditor',
        start_url: '/graph-editor/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: '/graph-editor/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/graph-editor/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
