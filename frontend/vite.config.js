import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// Plugin to ensure _redirects is copied to dist root
const copyRedirectsPlugin = () => {
  return {
    name: 'copy-redirects',
    writeBundle() {
      const src = join(__dirname, 'public', '_redirects')
      const dest = join(__dirname, 'dist', '_redirects')
      try {
        copyFileSync(src, dest)
        console.log('✅ Copied _redirects to dist/')
      } catch (err) {
        console.warn('⚠️ Could not copy _redirects:', err.message)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyRedirectsPlugin()],
  server: {
    port: 4001,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          // Ensure _redirects is copied to dist root
          if (assetInfo.name === '_redirects') {
            return '[name]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  publicDir: 'public'  // Ensure public folder contents are copied to dist
})

