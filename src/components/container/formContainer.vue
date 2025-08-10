<script setup lang="ts">
import closeRow from '@/components/container/closeRow.vue';
// const formKey = defineModel()
defineProps({

    title: {
        type: String,
        default: ''
    },
    showClose: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['close', 'submit'])
</script>
<template>
    <form @submit.prevent="emit('submit')" ref="form" 
        class="flex-col justify-start items-start shadow-2xl z-30 py-[40px] px-[25px] flex gap-y-3  rounded-xl lg:w-min495 theme1cont w-min495">
        <closeRow @close="emit('close')" />
        <h1 class=" flex flex-row justify-center items-center w-full text-[28px] font-[700]">
          
            {{ title }}
        </h1>
        <slot>

        </slot>
    </form>
</template>


<style scoped></style>