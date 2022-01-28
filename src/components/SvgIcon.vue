<template>
    <svg aria-hidden="true" :style="{'width': width+'px','height': height+'px'}" class="svg-icon-spin">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'svgIcon',
    props: {
        prefix: {
            type: String,
            default: 'icon'
        },
        name: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            default: 16
        },
        height: {
            type: Number,
            default: 16
        },
        color: {
            type: String,
            default: '#7e63dc'
        }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)
        return { symbolId }
    }
})
</script>
<style lang="scss" scoped>
.svg-icon-spin {
    fill: currentColor;
    vertical-align: 0;
}
</style>

