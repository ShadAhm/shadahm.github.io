/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
    mainFields: ['module'],
  },
  plugins: [angular({ tsconfig: resolve(__dirname, 'src/tsconfig.spec.json') })],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/main.ts', 'src/polyfills.ts']
    }
  },
});
