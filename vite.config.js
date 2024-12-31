import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    solid(),
    viteStaticCopy({
      // 你的复制配置...
    })
  ],
  // 其他配置...
}); 