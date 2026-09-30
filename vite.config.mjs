import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cloudflare Workers Static Assets reads the build directory after npm run build.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(
      ['config', 'display', 'domain', 'general', 'reducing', 'util'].map(name => [
        name, fileURLToPath(new URL(`./src/${name}`, import.meta.url)),
      ]),
    ),
  },
  server: { host: 'localhost', port: 5173, strictPort: true },
  preview: { host: 'localhost', port: 5174, strictPort: true },
  build: {
    outDir: 'build',
  },
});
