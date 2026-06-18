import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['icon.svg'], manifest: { name: 'Body Food Tracker', short_name: 'BodyFood', description: 'Локальний трекер харчування та самопочуття', theme_color: '#0b0f0e', background_color: '#0b0f0e', display: 'standalone', start_url: '/', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] } })] });
