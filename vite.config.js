import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // On Vercel or root domain use '/', on GitHub Pages use repository subpath:
  base: process.env.GITHUB_ACTIONS ? '/Niitin-portfolio/' : '/',
})
