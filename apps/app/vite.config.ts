import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: { port: 8080 },

  build: { target: 'esnext' },

  resolve: { alias: { '@': resolve(__dirname, './src/modules') } },

  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
      },
      manifest: {
        name: 'FiT',
        short_name: 'FiT',
        description: 'Фитнес трекер',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
