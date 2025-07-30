<script setup lang='ts'>
import buttonLoads from './buttonLoads.vue';

defineProps({
    label: {
        default: 'Button',
        type: String
    },
    isLoad: {
        type: Boolean,
        default: false
    },
})
</script>
<template>
    <buttonLoads
        class=" text-blue  disabled:opacity-30 hover:bg-blue-400 hover:inset-ring-blue-400 hover:text-white2 active:bg-blue-700 inset-ring-blue  inset-ring-2"
        :label :isLoad>
        <slot>
           
        </slot>
    </buttonLoads>
</template>
<style scoped></style>