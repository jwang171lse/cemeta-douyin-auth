import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from './router/router'
import './style.scss'
import '@arco-design/web-vue/dist/arco.css';
import { Icon } from '@arco-design/web-vue';
import { permissionDirective } from './directive/permission'


export const IconFont = Icon.addFromIconFontCn({ src: 'https://at.alicdn.com/t/c/font_4249979_ej8dcwilahq.js' });
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.component('iconfont', IconFont)

app.directive('permission', permissionDirective)

app.mount('#app')
