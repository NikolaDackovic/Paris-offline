import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// BASE_PATH omogućava rad i na root domenu ("/") i na GitHub Pages podputanji ("/ime-repozitorijuma/").
// Primer: BASE_PATH=/paris-offline/ npm run build
const rawBase = process.env.BASE_PATH || '/';
const base = rawBase.endsWith('/') ? rawBase : rawBase + '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      manifest: {
        id: base,
        name: 'Pariz Offline',
        short_name: 'Pariz',
        description: 'Lični offline vodič za 4 dana u Parizu (5–9. novembar 2026).',
        lang: 'sr-Latn',
        dir: 'ltr',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F7F2EA',
        theme_color: '#F7F2EA',
        categories: ['travel'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,json}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        // Nema runtime keširanja spoljnih resursa — aplikacija ih ne koristi.
        runtimeCaching: []
      },
      devOptions: { enabled: false }
    })
  ],
  build: {
    target: 'es2019',
    sourcemap: false
  }
});
