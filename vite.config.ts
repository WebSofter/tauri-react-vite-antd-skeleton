import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindConfig from './tailwind.config.mjs';
import CONFIG from './config';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: CONFIG.appName,
          metaTitle: CONFIG.metaTags.title,
          metaDescription: CONFIG.metaTags.description,
          metaImageURL: CONFIG.metaTags.imageURL,
        },
      },
    }),
    ...(CONFIG.enablePWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.png'],
            manifest: {
              name: CONFIG.appName,
              short_name: CONFIG.appName,
              description: CONFIG.metaTags.description,
              theme_color: CONFIG.theme.accentColor,
              icons: [
                {
                  src: 'icon.png',
                  sizes: '64x64 32x32 24x24 16x16 192x192 512x512',
                  type: 'image/png',
                },
              ],
            },
          }),
        ]
      : []),],
      css: {
        postcss: {
          plugins: [tailwind(tailwindConfig), autoprefixer],
        },
      },
      define: {
        CONFIG: CONFIG,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
