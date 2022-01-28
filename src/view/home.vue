<template>
    <div>
        <el-date-picker
        v-model="value1"
        type="datetime"
        >
        </el-date-picker>
        <el-button type="primary">{{ $t('group_1.button') }}</el-button>
        <span v-for="i in 300">{{i}}-{{ $t('navbar.home') }}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'home',
    components: {
        
    },
    setup () {
        const value1 = ''
        return {
            value1,
        }
    }
})
</script>
<style lang='scss' scoped>

</style>