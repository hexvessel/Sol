import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import {config} from 'dotenv'

config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/Sol",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
