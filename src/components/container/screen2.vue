<script lang="ts" setup>
import overlayfixed from '../overlayfixed.vue';
const emit = defineEmits(['close'])
defineProps({
    Align:{
        type:String,
        default:'justify-start'
    }
})
</script>
<template>
    <teleport to="#modal2" defer>
        <div class=" fixed flex flex-col left-0 top-0 z-[110] w-screen h-screen  items-center overflow-scroll py-6" :class="Align">
            <overlayfixed @click="emit('close')" />
            <slot>
            </slot>


        </div>
    </teleport>

</template>