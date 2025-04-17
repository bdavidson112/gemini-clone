import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional alias for cleaner imports
    },
  },
  build: {
    rollupOptions: {
      external: ['@google/genai'], // Mark @google/genai as an external dependency
    },
  },
});
