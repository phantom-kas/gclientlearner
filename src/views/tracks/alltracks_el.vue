<script setup lang="ts">
import trackComponent from '@/components/container/trackComponent.vue';
import paginationList from '@/components/list/paginationList.vue';
import { getImageUrl } from '@/composabels/utilities';
import axios from 'axios';
import { onMounted, type PropType } from 'vue';


defineProps({
    showInstructor: {
        type: Boolean,
        default: true
    },
    showDropDown: {
        type: Boolean,
        default: true
    },
    params: {
        type: Object as PropType<{ [key: string]: any } | undefined>,
        default: undefined
    },
    showPaginationControls: {
        type: Boolean,
        default: true
    }, itemsPerPage: {
        type: Number,
        default: 10
    }
})
const emit = defineEmits(['fullList', 'edit', 'delete', 'editImage'])
onMounted(() => {
    // emit('fullList', tracks)
})

const cc = ()=>{
    window.alert('1')
}


let listParams = { search: undefined as undefined | string }

</script>
<template>
    <!-- <div class=" w-full  gap-x-7 tracks gap-y-7 grid lg:grid-cols-4 sm:grid-cols-2 place-items-center">
        <trackComponent class="" />
        <trackComponent class=" " />
        <trackComponent class=" " />
        <trackComponent class=" " /> -->
    <div class="w-full flex flex-col gap-y-6 items-start justify-start">
        <!-- {{ tracks }} -->
          <!-- {{ params }} -->
        <paginationList :params :itemsPerPage @fullList="e => emit('fullList', e)" :showPaginationControls component="div"
            class="w-full  gap-x-7 tracks  gap-y-7 grid lg:grid-cols-4 sm:grid-cols-2 place-items-center items-stretch"
            url="/tracks">
            <template #items="{ item, i }">
                <trackComponent  :showDropDown :showInstructor @editImage="(track: any) => {emit('editImage', { ...track,i })}"
                    @edit="track => emit('delete', { ...track,i })" @delete="track => emit('edit', { ...track,i })"
                    :track="{Instructor:item.Instructor, id: item.id, price: item.price, title: item.name, url: getImageUrl(item.image), duration: item.duration, courses: item.courses, num_courses: item.num_courses }"
                    class=" " />
                    <!-- {{ item.price }} -->
                <!-- {{ i }}
                    {{ item }} -->
            </template>
        </paginationList>
    </div>
    <!-- </div> -->
</template>



<style scoped>
.tracks {
    width: 300px;

}
</style>