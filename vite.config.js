import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const localFile = (path) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig(({ command }) => ({
  base: './',
  plugins: command === 'serve' ? [tailwindcss()] : [],
  resolve: {
    // Develop against live sources. Production resolves the actual package exports.
    alias: command === 'serve' ? [
      { find: /^org-atlas-react\/style\.css$/, replacement: localFile('./lib/style.css') },
      { find: 'org-atlas-react', replacement: localFile('./lib/index.js') },
    ] : [],
  },
  build: { outDir: 'dist/demo' },
}))
