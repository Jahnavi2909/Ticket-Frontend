import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests starting with /api will be forwarded
      '/api': {
        target:'http://new-ticket-alb-1121196781.ap-south-1.elb.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api') // optional, can keep the same
      }
    }
  }
})
