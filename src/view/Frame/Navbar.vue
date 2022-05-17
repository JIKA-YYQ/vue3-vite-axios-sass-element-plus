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
                <template v-if="navlist.length" v-for="(item,i) in navlist" :key="i">
                    <sub-menu v-if="item" :list="item" :activeItem="activeIndex"></sub-menu>
                </template>
            </el-menu>
        </el-scrollbar>
        <button @click="isCollapse = !isCollapse" class="menu-collapse">
            <svg-icon :name="isCollapse ? 'open-menu' : 'close-menu'" :width="17" :height="17" color="#ffffff" class="collapse"/>
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import svgIcon from '@/components/SvgIcon.vue'
import subMenu from '@/view/Frame/subMenu.vue'

export default defineComponent({
    name: 'navbar',
    components: {
        svgIcon,
        subMenu
    },
    setup () {
        const isCollapse = ref(true)
        const activeIndex = ref('')
        const $router = useRouter()
        const $store = useStore()
        const { t, locale } =  getCurrentInstance().appContext.config.globalProperties.$i18n()
        let pathLists:Array<string> = []

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
                            { name: 'navbar.employees.assignment', path:'/E', 
                                subs: [
                                    { name: 'navbar.employees.joinOrExit', path:'/F' },
                                    { name: 'navbar.employees.assignment', path:'/G' }
                                ] 
                            }
                        ]
                    }
                ]
            }
        ]

        const changeMargin = () => {
            let clientWidth = document.body.clientWidth
            if (clientWidth < 1366) {
                isCollapse.value = true
            } else {
                isCollapse.value = false
            }
        }

        const loop = function (list:any[], target:string, pathList?:string[]) {
            let saveList = [];
            let copyPath = pathList ? JSON.parse(JSON.stringify(pathList)) : [];
            for (let i = 0; i < list.length; i++) {
                saveList = [...copyPath, list[i].name]
                if (list[i].path === target) {
                    pathLists = saveList;
                    break
                }

                if (list[i].subs && list[i].subs.length) {
                    loop(list[i].subs, target, saveList)
                }
            }
        }
        
        const loopTitle = () => {
          loop(navlist, activeIndex.value)
          return pathLists
        }

        onMounted(() => {
            changeMargin()
        })

        watch(
            () => $router.currentRoute.value,
            (routeObj:any) => {
                //初始化选中菜单
                activeIndex.value = ''
                
                $store.commit('route/setTitle', [])

                nextTick(()=> {
                    activeIndex.value = $router.currentRoute.value.path;
                    $store.commit('route/setTitle', loopTitle())

                    if (routeObj.meta.title) {
                        document.title = `${ locale.value == 'zh-cn' ? routeObj.meta.title.zh : routeObj.meta.title.en } | ${ t('systemName') }`
                    } else {
                        document.title = t('systemName')
                    }
                })
            }
        )
        return {
            isCollapse,
            activeIndex,
            navlist
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