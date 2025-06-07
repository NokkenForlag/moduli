import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss()
  ],
  
  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    host: true
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    strictPort: false
  },
  
  // Build optimizations
  build: {
    target: 'esnext'
  },
  
  // Optimizations
  optimizeDeps: {
    include: ['lucide-svelte', 'katex']
  }
});