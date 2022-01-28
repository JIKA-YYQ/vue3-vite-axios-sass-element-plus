
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'vue-i18n':'vue-i18n/dist/vue-i18n.cjs.js'
		}
	},
	// css预处理器
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "@/assets/scss/definedElement.scss" as *;',
			}
		}
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色，使用预处理样式
				importStyle: "sass",
			})],
		}),
		viteSvgIcons({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		})
	]
})