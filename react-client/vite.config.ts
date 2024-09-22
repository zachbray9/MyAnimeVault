import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../api/wwwroot',
    emptyOutDir: true
  },
  server: {
    https: true
  },
  plugins: [react(), mkcert()],
})
