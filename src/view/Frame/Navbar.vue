<template>
    <div class="NAVBAR">
        <el-scrollbar height="calc(100vh - 50px)">
            <el-menu
            :default-active="activeIndex"
            :collapse="isCollapse"
            background-color="#7e63dc"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical">
                <template v-for="(item,i) in navlist" :key="i">
                    <template v-if="item.subs && item.subs.length">
                        <el-sub-menu :index="item.path">
                            <template #title>
                                <svg-icon
                                :name="item.icon"
                                :width="18"
                                :height="18"
                                :color="activeIndex == item.path ? '#ffd04b' : '#ffffff'"/>
                                <span class="padding-left">{{ t(item.name) }}</span>
                            </template>
                            <template v-for="(item2,j) in item.subs" :key="i+'-'+j">
                                <template v-if="item2.subs && item2.subs.length">
                                    <el-sub-menu :index="item2.path">
                                        <template #title>
                                            <span class="padding-left">{{ t(item2.name) }}</span>
                                        </template>
                                        <template v-for="(item3,k) in item2.subs" :key="i+'-'+j+'-'+k">
                                            <el-menu-item :index="item3.path" @click="toPath(item3)" :disabled="item3.disabled">
                                                <span class="padding-left">{{ t(item3.name) }}</span>
                                            </el-menu-item>
                                        </template>
                                    </el-sub-menu>
                                </template>
                                <template v-else>
                                    <el-menu-item :index="item2.path" @click="toPath(item2)" :disabled="item2.disabled">
                                        <span class="padding-left">{{ t(item2.name) }}</span>
                                    </el-menu-item>
                                </template>
                            </template>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.path" @click="toPath(item)" :disabled="item.disabled">
                            <svg-icon 
                            v-if="item.icon" 
                            :name="item.icon"
                            :width="18"
                            :height="18"
                            :color="activeIndex == item.path ? '#ffd04b' : '#ffffff'"/>
                            <template #title>
                                <span class="padding-left">{{ t(item.name) }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
        <button @click="isCollapse = !isCollapse" class="menu-collapse">
            <svg-icon :name="isCollapse ? 'open-menu' : 'close-menu'" :width="17" :height="17" color="#ffffff" class="collapse"/>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import svgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
    name: 'navbar',
    components: {
        svgIcon
    },
    setup () {
        const isCollapse = ref(true)
        const activeIndex = ref('')
        const $router = useRouter()
        const $store = useStore()
        const { t, locale } =  getCurrentInstance().appContext.config.globalProperties.$i18n()
        //最多支持三级目录
        const navlist: any[] = [
            {
                name: 'navbar.home',
                icon: 'home',
                path:'/home'
            },
            {
                name: 'navbar.schedule',
                icon: 'arrange',
                path:'/PBL',
                // disabled: true
            },
            {
                name: 'navbar.assets.assets',
                icon: 'goods',
                path: 'goods',
                subs: [
                    { name: 'navbar.assets.warehousing', path:'/A' },
                    { name: 'navbar.assets.borrow', path:'/B',disabled: true }
                ]
            },
            {
                name: 'navbar.employees.employees',
                icon: 'people',
                path: 'people',
                subs: [
                    {
                        name: 'navbar.employees.longTerm',
                        path: 'people_A',
                        subs: [
                            { name:'navbar.employees.joinOrExit', path:'/C',disabled: true },
                            { name: 'navbar.employees.assignment', path:'/lifecycle' }
                        ]
                    },
                    {
                        name: 'navbar.employees.shortTerm',
                        path: 'people_B',
                        subs: [
                            { name: 'navbar.employees.joinOrExit', path:'/D' },
                            { name: 'navbar.employees.assignment', path:'/E' }
                        ]
                    }
                ]
            }
        ]

        const toPath = (param: any) => {
            if (param.path) {
                $router.push(param.path)
            }
        }

        const changeMargin = () => {
            let clientWidth = document.body.clientWidth
            if (clientWidth < 1366) {
                isCollapse.value = true
            } else {
                isCollapse.value = false
            }
        }

        const loopTitle = () => {
            let titleArr:any = []
            const mark = ref(false)
            navlist.map(item1 => {
                if (item1.path === activeIndex.value) {
                    titleArr.push(item1.name)
                    mark.value = true
                }
                if (!mark.value && item1.subs && item1.subs.length) {
                    item1.subs.map((item2:any) => {
                        if (item2.path === activeIndex.value) {
                            titleArr.push(item1.name)
                            titleArr.push(item2.name)
                            mark.value = true
                        }
                        if (!mark.value && item2.subs && item2.subs.length) {
                            item2.subs.map((item3:any) => {
                                if (item3.path === activeIndex.value) {
                                    titleArr.push(item1.name)
                                    titleArr.push(item2.name)
                                    titleArr.push(item3.name)
                                    mark.value = true
                                }
                            })
                        }
                    })
                }
            })
            return titleArr
        }

        onMounted(() => {
            changeMargin()
        })

        watch(
            () => $router.currentRoute.value,
            (routeObj) => {
                //初始化选中菜单
                activeIndex.value = ''
                
                $store.commit('route/setTitle', [])

                setTimeout(()=> {
                    activeIndex.value = $router.currentRoute.value.path
                    
                    $store.commit('route/setTitle', loopTitle())

                    if (routeObj.meta && routeObj.meta.title) {
                        document.title = `${ locale.value == 'zh-cn' ? routeObj.meta.title.zh : routeObj.meta.title.en } | ${ t('systemName') }`
                    } else {
                        document.title = t('systemName')
                    }
                },500)
            }
        )
        return {
            t,
            isCollapse,
            activeIndex,
            navlist,
            toPath
        }
    }
})
</script>
<style lang="scss" scoped>
.NAVBAR {
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: $main-color;
    position: relative;
    .el-menu {
        border-right: 0;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        max-height: calc(100vh - 50px);
    }
    .padding-left {
        padding-left: .5rem;
    }
    .menu-collapse {
        border-color: transparent transparent transparent $minor-color;
        border-width: 9px 0 9px 20px;
        color: #ffffff;
        height: 64px;
        line-height: 50px;
        position: absolute;
        right: -20px;
        top: calc(50% - 32px );
        width: 0;
        z-index: 9;
        .collapse {
            position: relative;
            left: -18px;
            top: 3px;
        }
    }
}
</style>