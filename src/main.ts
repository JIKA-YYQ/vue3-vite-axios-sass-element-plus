import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { useI18n } from 'vue-i18n'
import 'virtual:svg-icons-register'
import '@/assets/scss/index.scss'
import '@/assets/scss/resetElement.scss'


const app = createApp(App)
app.config.globalProperties.$ELEMENT = { size: 'small' }
app.config.globalProperties.$i18n = useI18n

app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')