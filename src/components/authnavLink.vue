<script setup lang='ts'>
import type { PropType } from 'vue';
import type { RouteLocationAsRelativeGeneric } from 'vue-router';



defineProps({
    to: {
        type: Object as PropType<RouteLocationAsRelativeGeneric | string>,
        default: '/'
    },
    text:{
        type:String,
        default:'Link'
    }
})
</script>
<template>
    <router-link :to class=" py-2 px-3 sm:py-4 sm:px-8 font-[500]  sm:text-lg flex  justify-center gap-x-4 items-center hover:bg-[#014273] hover:text-white sm:flex-row flex-col text-xs">

        <slot name="icon">

        </slot>
        <slot>
            {{text}}
        </slot>
    </router-link>
</template>
<style scoped></style>