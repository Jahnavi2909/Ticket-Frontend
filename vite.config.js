import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests starting with /api will be forwarded
      '/api': {
        target: 'http://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // optional, can keep the same
      }
    }
  }
})
