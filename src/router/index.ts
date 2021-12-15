import { RouteRecordRaw, createWebHashHistory, createRouter } from "vue-router"
import { clearPending } from "@/utils/http"

const routes: RouteRecordRaw[] = [
    { 
        path: '/', 
        redirect: '/home' 
    },
    { 
        path: '/home', 
        component: () => import('../view/home.vue') 
    },
    {
        path: '/lifecycle', 
        component: () => import('../view/lifecycle.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    //在跳转路由之前，先清除所有的请求
    clearPending()
    next()
})
export default router