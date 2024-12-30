import { defineConfig } from '@solidjs/start/config'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  ssr: true,
  server: {
    baseURL: process.env.BASE_PATH,
    preset: "static"
  }
  ,
  vite: {
    plugins: [
      UnoCSS()
    ]
  },
})
