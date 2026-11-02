import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
    watch: {
      // Ignore text files, logs, and temp documents
      ignored: ['**/*.txt', '**/*.log', '**/New Text Document*']
    }
  }
})