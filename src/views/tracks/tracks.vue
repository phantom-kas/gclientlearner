<script setup lang='ts'>
import tracks3 from '@/components/tracks/tracks3.vue';
import search_input from '@/components/form_components/search_input.vue';
</script>
<template>
    <div class=" flex flex-col justify-center items-center p-13 bg-blue w-full text-3xl font-[700] text-white">
        Tracks
    </div>
    <section class="plr flex flex-col items-center justify-start w-full py-25">

        <div class=" flex flex-col gap-y-4  w-max1200 items-center ">
            <search_input class=" w-[min(700px,100%)] mb-6" />
            <h1 class=" w-full text-start font-[700] text-xl">Top Courses</h1>
            <tracks3 class=" max-sm:grid-cols-1 gap-y-10" />
        </div>
    </section>
</template>
<style scoped></style>