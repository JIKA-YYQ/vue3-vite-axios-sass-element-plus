<template>
    <div>msg:{{ MSG }}</div>
    <button @click="updateTxt">更新子组件</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'name',
    props: ['MSG'],
    setup (props, { attrs, emit }) {
        console.log(props.MSG)  //获取props中接收的参数
        console.log(attrs.MSG2) //获取props之外传入的参数
        
        const updateTxt = () => {
            emit('update','!')  //事件分发，相当于this.$emit
        }
        return {
            updateTxt
        }
    }
})
</script>
<style lang="scss" scoped>

</style>