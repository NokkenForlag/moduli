import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';  // <-- DETTE MANGLER!
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@moduli/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@moduli/types': path.resolve(__dirname, '../../packages/types/src'),
      '@moduli/content': path.resolve(__dirname, '../../packages/content/src'),
      '@moduli/graph': path.resolve(__dirname, '../../packages/graph/src'),
      '@moduli/config': path.resolve(__dirname, '../../packages/config/src'),
      '@moduli/utils': path.resolve(__dirname, '../../packages/utils/src'),
    }
  },
  server: {
    fs: {
      allow: ['../..']
    }
  }
});
