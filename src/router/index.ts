import { RouteRecordRaw, createWebHashHistory, createRouter } from "vue-router"
import { clearPending } from "@/utils/http"
import { setLocal } from'@/utils/local'

const routes: RouteRecordRaw[] = [
    { 
        path: '/', 
        redirect: '/home' 
    },
    {
        path: '/login',
        component: () => import('../view/login.vue'),
        meta: { 
            title: {
                zh: '登录',
                en: 'Login'
            }
        }
    },
    { 
        path: '/home', 
        component: () => import('../view/home.vue'),
        meta: { 
            title: {
                zh: '主页',
                en: 'Home'
            }
        }
    },
    {
        path: '/lifecycle', 
        component: () => import('../view/lifecycle.vue'),
        meta: { 
            title: {
                zh: '生命周期',
                en: 'Lifecycle'
            }
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    setLocal('fromRoute',from.path)

    //在跳转路由之前，先清除所有的请求
    clearPending()
    
    next()
})
export default router