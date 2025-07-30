<script setup lang='ts'>
import IconCi from './icons/IconCi.vue';
</script>
<template>
    <section
        class="plr flex flex-col items-center justify-start w-full pt-10 bg-blue text-white darkmode:bg-neutral-950 text-lg">
        <div
            class=" flex  flex-col lg:flex-row items-start  lg:justify-start lg:items-end gap-y-10 mt-6 w-max1200 relative">
            <IconCi  :size="80" class="darkmode w-[min(100%,300px)]" />
            <div class=" sm:flex-row flex justify-between gap-x-30 ml-auto lg:w-[unset] w-full flex-col items-center sm:text-start text-center gap-y-10">
                <div class=" flex flex-col items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to="">Menu</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link to="/">Home</router-link>
                </div>

                <div class=" flex flex-col items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to=''>Menu</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link to="/">Home</router-link>
                </div>


                <div class=" flex flex-col items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to=''>Menu</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link to="/">Home</router-link>
                </div>
            </div>
        </div>
        <div class=" flex flex-row justify-between items-center gap-x-4 mt-10 py-5 border-t-2 border-white w-max1200">
            <span>@ copyright 2025 - G-client, All rights reserved</span>
            <span>Back to top</span>
        </div>
    </section>
</template>
<style scoped></style>