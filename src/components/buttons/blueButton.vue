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
    <buttonLoads class="bg-blue text-white1  disabled:bg-blue-300 hover:bg-blue-400 , active:bg-blue-700" :label
        :isLoad>
        
        <slot name="label">
            <span v-html="label"></span>
        </slot>
    </buttonLoads>
</template>
<style scoped></style>