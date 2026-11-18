import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'package-assets',
      generateBundle() {
        const license = new URL('./LICENSE', import.meta.resolve('lucide-react/package.json'))
        this.emitFile({ type: 'asset', fileName: 'LICENSE-lucide.txt', source: readFileSync(license, 'utf8') })
        for (const fileName of ['index.d.ts', 'style.d.css.ts', 'backend-overview.svg']) {
          const source = readFileSync(new URL('./lib/' + fileName, import.meta.url), 'utf8')
          this.emitFile({ type: 'asset', fileName, source })
        }
      },
    },
  ],
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: 'lib/index.js',
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: { banner: '"use client";' },
    },
  },
})
