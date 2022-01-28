<template>
    <div>
        <p>lifecycle</p>
        <button @click="showChild = !showChild">加载/卸载Child</button>
        <hr>
        <Child v-if="showChild"></Child>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from '@/components/Child.vue'
export default defineComponent({
    name: 'lifecycle',
    components: {
        Child
    },
    setup () {
        const showChild = ref(true)
        return {
            showChild
        }
    }
})
</script>
<style lang="scss" scoped>

</style>