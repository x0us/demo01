import { defineConfig } from '@solidjs/start/config'
import UnoCSS from 'unocss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  ssr: true,
  server: {
    baseURL: process.env.BASE_PATH,
    preset: "static"
  }
  ,
  vite: {
    plugins: [
      UnoCSS(),
      viteStaticCopy({
        targets: [
          {
            src: 'public/*',
            dest: 'assets/',
          },
        ],
      })
    ]
  },
})
