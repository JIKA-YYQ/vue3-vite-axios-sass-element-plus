<template>
    <h4 :style="{'color': color}">GrandSon孙子组件</h4>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
export default defineComponent({
    name: 'GrandSon',
    setup () {
        let color = ref('')
        color = inject('color')
        
        return {
            color
        }
    }
})
</script>
<style lang="scss" scoped>

</style>