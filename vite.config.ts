import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
const pathSrc = path.resolve(__dirname, './src')
// https://vitejs.dev/config/
export default defineConfig({
	cacheDir: 'node_modules/.vite',
	envDir: path.resolve(__dirname, './env'),
	server: {
		port: 9998,
		proxy: {
			'/api': {
				target: 'https://douyinvalidate.pro.cenmetahome.cn/api/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},

		}
	},
	plugins: [
		vue({
			reactivityTransform: true
		}),
		vueJsx()
	],
	resolve: {
		alias: {
			'@': pathSrc,
		},
	},

})
