<script setup lang="ts">
import { onMounted } from 'vue';
import spin4Sec from '../spinners/spin4Sec.vue';
defineProps({
    label: {
        default: 'Button',
        type: String
    },
    isLoad: {
        type: Boolean,
        default: false
    },
    classes: {
        default: '',
        type: String
    },
    disabeldClass: {
        default: ' ',
        type: String
    }
    ,
    hoverClass: {
        default: ' ',
        type: String
    }
})

</script>
<template>
    <button :disabled="isLoad" :class="[classes, disabeldClass, hoverClass]"
        class="  relativ flex items-center justify-center gap-2 font-bold  px-3.5 py-2  cursor-pointer rounded-sm">

        <template v-if="!isLoad">
            <slot>
              
                    <span v-html="label"></span>
               
            </slot>
        </template>

        <template v-else>
            <spin4Sec size="1.56" /><span class=" opacity-0">i</span>
        </template>


    </button>
</template>
<style scoped></style>