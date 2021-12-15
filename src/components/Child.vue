<template>
    <p>Child子组件</p>
    <p>{{ msg }}</p>
    <button @click="modify">更新数据</button>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
export default defineComponent({
    name: 'Child',
    beforeCreate () {
        console.log('2.beforeCreate')
    },
    created () {
        console.log('2.created')
    },
    beforeMount () {
        console.log('2.beforeMount')
    },
    mounted () {
        console.log('2.mounted')
    },
    beforeUpdate () {
        console.log('2.beforeUpdate')
    },
    updated () {
        console.log('2.updated')
    },
    beforeUnmount () {
        console.log('2.beforeUnmount')
    },
    unmounted () {
        console.log('2.unmounted')
    },
    setup () {
        console.log('3.setup()')
        
        let msg = ref(5)
        const modify = () => {
            msg.value = msg.value * 10
        }

        onBeforeMount (() => {
            console.log('3.onBeforeMount')
        })
        onMounted(() => {
            console.log('3.onMounted')
        })
        onBeforeUpdate(() => {
            console.log('3.onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('3.onUpdated')
        })
        onBeforeUnmount(() => {
            console.log('3.onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('3.onUnmounted')
        })

        return {
            msg,
            modify
        }
    }
})
</script>
<style lang="scss" scoped>

</style>