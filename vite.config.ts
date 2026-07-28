import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
    mainFields: ['module'],
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
