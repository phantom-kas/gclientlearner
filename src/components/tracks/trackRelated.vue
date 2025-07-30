<script setup lang='ts'>
import { getImageUrl } from '@/composabels/utilities';
import tracks3 from './tracks3.vue';
</script>
<template>
    <div class=" w-full flex flex-col ">
        <h1 class=" text-xl font-[600] mb-6">
            Explore related courses
        </h1>


        <tracks3 :limit="1" class=" sm:grid-cols-2 max-sm:grid-cols-1! grid! w-full gap-6">
            <template #item="{ item, i }">
                <router-link :to="{name:'track',params:{id:item.id}}" class="flex justify-start gap-5 p-4 theme1cont">
                    <img :src="getImageUrl(item.image)" class=" w-[50%] " alt="">
                    <div class="flex flex-col gap-4 w-[40%]">
                        <h2 v-html="item.name"></h2>
                        <span v-html="item.description" class="description break-words w-full"></span>
                    </div>
                </router-link>
            </template>
        </tracks3>
    </div>
</template>
<style scoped>
.description {
    display: -webkit-box;
    line-clamp: 3;
    box-orient: vertical;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>