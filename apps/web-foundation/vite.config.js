import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    exclude: ['@moduli/core', '@moduli/content']
  },
  ssr: {
    noExternal: ['@moduli/core', '@moduli/content']
  }
});
