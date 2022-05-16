<template>
    <div class="HEADER">
        <div class="left">
            <div class="system-logo">
                <svg-icon name="github" :width="40" :height="40" color="#ffffff"/>
            </div>
            <b>{{ $t('systemName') }}</b>
        </div>
        <div class="right">
            <div class="language">
                <span @click="changeLan('zhCn')" :class="{'check': lan == 'zhCn'}">中</span> /
                <span @click="changeLan('en')" :class="{'check': lan == 'en'}">EN</span>
            </div>
            <el-dropdown
            v-if="list && list.length"
            @command="toPath">
                <div class="avatar">
                    <el-avatar :size="26" :src="loginMsg.avatar" @error="errorHandler">
                        <svg-icon name="avatar-default" :width="26" :height="26" color="#ffffff"/>
                    </el-avatar>
                    <span style="padding-left: 8px; color: #fff;">{{ loginMsg.name }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in list" :key="item.title" :command="item.path">{{ $t(item.title) }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div v-else class="avatar">
                <el-avatar :size="26" :src="loginMsg.avatar" @error="errorHandler">
                    <svg-icon name="avatar-default" :width="26" :height="26" color="#ffffff"/>
                </el-avatar>
                <span style="padding-left: 8px;">JIKA</span>
            </div>
            <div class="line"></div>
            <svg-icon @click="logout" name="logout" :width="20" :height="20" color="#ffffff"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, reactive, getCurrentInstance, computed } from 'vue'
    import svgIcon from '@/components/SvgIcon.vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const lan = ref('zhCn')
    const $router = useRouter()
    const $store = useStore()
    
    const { t, locale } = getCurrentInstance().appContext.config.globalProperties.$i18n()
    const language = computed(() => $store.state.language.language)
    
    lan.value = language.value

    const changeLan = (type:string) => {
        if (type !== lan.value) {
            lan.value = type
            $store.commit('language/setLanguage', type)
            if (locale) {
                let saveLan = 'en'
                if (type == 'zhCn') {
                    saveLan = 'zh'
                    locale.value = 'zh-cn'
                } else {
                    locale.value = 'en-us'
                }

                if ($router.currentRoute.value.meta.title) {
                    let title = $router.currentRoute.value.meta.title[saveLan as keyof typeof $router.currentRoute.value.meta.title]
                    document.title = `${ title } | ${ t('systemName') }`
                } else {
                    document.title = `${ t('systemName') }`
                }
            }
        }
    }

    const loginMsg = reactive({
        name: 'JIKA',
        avatar: './src/assets/images/github.png',
    })
    const errorHandler = () => true
    const logout = () => {
        $router.push('/login')
    }

    const list = [
        {
            title: 'personal.profile',
            path: '/personal'
        },
        {
            title: 'personal.password',
            path: '/password'
        }
    ]

    const toPath = (path:string) => {
        $router.push(path)
    }

</script>
<style lang="scss" scoped>
.HEADER {
    width: 100vw;
    color: #fff;
    height: 50px;
    background-color: $minor-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    .left {
        display: inline-flex;
        align-items: center;
        .system-logo {
            padding: 0 10px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
        }
        b {
            font-size: 22px;
            letter-spacing: 2px;
        }
    }
    .right {
        cursor: pointer;
        padding: 0 20px;
        display: inline-flex;
        align-items: center;
        .language {
            font-size: 16px;
            margin: 0 30px;
            span {
                color: $minor-text-color;
                display: inline-block;
            }
            .check {
                color: #ffffff;
            }
        }
        .avatar {
            display: inline-flex;
            font-size: 18px;
            align-items: center;
        }
        .line {
            height: 18px;
            border: 1px solid #a1a1a1;
            margin: 20px;
        }
    }
}
</style>