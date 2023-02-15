import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置自动导入插件
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Components({
        resolvers: [NaiveUiResolver()]
      })
  ],

})
