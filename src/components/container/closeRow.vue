<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emit = defineEmits(['close'])
</script>
<template>
    <div class=" flex flex-row items-center justify-end w-full ">
       <div @click="emit('close')" class=" p-3 flex flex-col justify-center items-center rounded-xl hover:bg-neutral-500 dark:hover:bg-neutral-900 text-white3">
         <FontAwesomeIcon size="2x" class=" " :icon="['fas', 'xmark']" />
       </div>
    </div>
</template>