
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
				additionalData: `@use "@/assets/scss/definedElement.scss" as *;`,
			}
		}
	},
	plugins: [
		vue(),
		viteSvgIcons({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
		}),
		AutoImport({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
				importStyle: "sass"
			})],
		}),
		Components({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色，使用预处理样式
				importStyle: "sass",
			})],
		}),
	]
})