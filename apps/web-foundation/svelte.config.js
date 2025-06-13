import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      '@moduli/core': '../../packages/core/src',
      '@moduli/core/server': '../../packages/core/src/server.ts',
      '@moduli/content': '../../packages/content/src'
    }
  }
};

export default config;
