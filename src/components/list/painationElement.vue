<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PropType } from 'vue';
const props = defineProps({
    data: {
        type: Object as PropType<{ currentPage: number, showNext: boolean }>
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const nextPage = () => {
    if (props.data)
        props.data.currentPage++
    emit('changePage')
}
const prevPage = () => {
    if (!props.data) {
        return
    }
    if (props.data.currentPage > 1) props.data.currentPage--
    emit('prev')
}
const emit = defineEmits(['changePage', 'prev'])
</script>
<template>
    <div class=' flex flex-row items-center justify-start   w-max300 gap-4 '>
        <button class="  theme1cont hover:bg-neutral-600 p-3 rounded-2xl shadow-md cursor-pointer" @click="prevPage"
            :disabled="data?.currentPage === 1 || disabled">Previous</button>
        <span class="">Page {{ data?.currentPage }}
        </span>

        <button v-show="!disabled" :disabled v-if="data?.showNext"
            class="  theme1cont hover:bg-neutral-600 p-3 rounded-2xl shadow-md cursor-pointer" type="button"
            @click="nextPage">Next</button>
        <FontAwesomeIcon v-if="disabled" size="lg" icon="fa-solid fa-spinner" spin-pulse />
    </div>
</template>