<template>
    <template v-if="list.subs && list.subs.length">
        <el-sub-menu :index="list.path">
            <template #title>
                <svg-icon
                v-if="list.icon"
                :name="list.icon"
                :width="18"
                :height="18"
                :color="activeIndex == list.path ? '#ffd04b' : '#ffffff'"/>
                <span class="padding-left">{{ t(list.name) }}</span>
            </template>
            <template v-for="(item,i) in list.subs" :key="i">
                <sub-menu v-if="item" :list="item"></sub-menu>
            </template>
        </el-sub-menu>
    </template>
    <template v-else>
        <el-menu-item :index="list.path" @click="toPath(list)" :disabled="list.disabled">
            <svg-icon 
            v-if="list.icon" 
            :name="list.icon"
            :width="18"
            :height="18"
            :color="activeIndex == list.path ? '#ffd04b' : '#ffffff'"/>
            <template #title>
                <span class="padding-left">{{ t(list.name) }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import svgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
    name: 'navbar',
    props: {
        list: Object,
        activeItem: String
    },
    components: {
        svgIcon
    },
    setup (props) {
        const activeIndex = ref('')
        const $router = useRouter()
        const { t } =  getCurrentInstance().appContext.config.globalProperties.$i18n()

        const toPath = (param: any) => {
            if (param.path) {
                $router.push(param.path)
            }
        }

        watch (props,({ activeItem }) => {
                activeIndex.value = activeItem
            },
            {
                immediate: true,
                deep: true
            }
        )

        return {
            t,
            activeIndex,
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
}
</style>