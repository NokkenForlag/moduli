import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@moduli/ui': path.resolve('./../../packages/ui/src'),
      '@moduli/types': path.resolve('./../../packages/types/src'),
      '@moduli/content': path.resolve('./../../packages/content/src'),
      '@moduli/config': path.resolve('./../../packages/config/src'),
      '@moduli/utils': path.resolve('./../../packages/utils/src'),
    }
  },
  server: {
    fs: {
      allow: ['../..']
    }
  },
  css: {
    // Disable CSS modules and PostCSS for now
    modules: false
  }
});
