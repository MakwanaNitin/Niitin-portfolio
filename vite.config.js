import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // On GitHub Actions (GitHub Pages), the repository name subpath is required:
  base: process.env.GITHUB_ACTIONS ? '/Niitin-portfolio/' : './',
})
