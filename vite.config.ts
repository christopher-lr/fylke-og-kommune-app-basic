import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/fylke-og-kommune-app-basic/',
  base: process.env.NODE_ENV === 'production' ? 'fylke-og-kommune-app-basic/' : '/',
})
