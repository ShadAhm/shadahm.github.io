import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
    mainFields: ['module'],
  },
  // Configured here rather than via a postcss.config.js so it resolves from the
  // repo root, not Vite's `root: 'src'`.
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: resolve(__dirname, 'tailwind.config.js') }),
        autoprefixer(),
      ],
    },
  },
  plugins: [angular()],
  server: {
    port: 4200,
  },
  build: {
    outDir: '../dist/shadahmio',
    emptyOutDir: true,
    sourcemap: true,
  },
});
