import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export default createI18n({
    legacy: true,   //让 setup 函数可以通过 t 访问
    globalInjection: true, // 让 template 可以使用 $t 来访问
    messages: {
        'zh-cn': {
            ...zh
        },
        'en-us': {
            ...en
        }
    }
})