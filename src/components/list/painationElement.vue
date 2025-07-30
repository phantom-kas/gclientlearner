<script setup lang='ts'>
import type { PropType } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<{ currentPage: number, showNext: boolean }>
    },
    // totalPages: {
    //     type: Number,
    //     default: 0
    // }
})


const nextPage = () => {
    // if (props.data?.currentPage && props.data?.totalPages) {
    //     return
    // }
    // if ((props.data?.currentPage as number) >= (props.data?.totalPages as number)) {
    //     return
    // }
    if(props.data)
    props.data.currentPage++

    emit('changePage')

}
const prevPage = () => {
    if (!props.data) {
        return
    }
    if (props.data.currentPage > 1) props.data.currentPage--

    emit('changePage')
}

const emit = defineEmits(['changePage'])



</script>
<template>
    <div class=' flex flex-row items-center justify-start   w-max300 gap-4 '>
        <button class="  theme1cont hover:bg-neutral-600 p-3 rounded-2xl shadow-md cursor-pointer" @click="prevPage"
            :disabled="data?.currentPage === 1">Previous</button>
        <span class="">Page {{ data?.currentPage }}
            <!-- of -->
            <!-- {{ totalPages }} -->
        </span>
        <button v-if="data?.showNext" class="  theme1cont hover:bg-neutral-600 p-3 rounded-2xl shadow-md cursor-pointer" type="button"
            @click="nextPage" >Next</button>
    </div>
</template>