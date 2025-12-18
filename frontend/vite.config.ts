import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// Plugin to copy netlify.toml and _headers to dist after build
const copyNetlifyConfig = () => {
  return {
    name: 'copy-netlify-config',
    closeBundle() {
      // Copy netlify.toml from multiple possible locations
      const sources = [
        join(__dirname, 'netlify.toml'),
        join(__dirname, 'public', 'netlify.toml')
      ]
      const dest = join(__dirname, 'dist', 'netlify.toml')
      
      for (const src of sources) {
        try {
          if (require('fs').existsSync(src)) {
            copyFileSync(src, dest)
            console.log(`✅ Copied netlify.toml to dist/ from ${src}`)
            return
          }
        } catch (err) {
          // Try next source
        }
      }
      console.warn('⚠️ Could not find netlify.toml to copy')
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyNetlifyConfig()],
  server: {
    port: 4001,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    // Ensure proper file extensions and copy _headers file
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    // Copy _headers file to dist root for Netlify
    copyPublicDir: true
  }
})

