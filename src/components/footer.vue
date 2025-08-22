<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import IconCi from './icons/IconCi.vue';


const scroll = ()=>{
    window.scrollTo(0, 0);
}
</script>
<template>
    <section
        class="plr flex flex-col items-center justify-start w-full pt-10 bg-blue text-white darkmode:bg-neutral-950 text-lg">
        <div
            class=" flex  flex-col lg:flex-row items-start  lg:justify-start lg:items-end gap-y-10 mt-6 w-max1200 relative">
            <IconCi :size="80" class="darkmode w-[min(100%,300px)]" />
            <div
                class=" sm:flex-row flex justify-between gap-x-30 ml-auto lg:w-[unset] w-full flex-col items-center sm:text-start text-center gap-y-10">
                <div class=" flex flex-col items-center sm:items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to="">Menu</router-link>
                    <router-link to="/">Home</router-link>
                    <router-link :to="{ name: 'tracks' }">Tracks</router-link>
                </div>

                <div class=" flex flex-col items-center sm:items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to=''>Contact</router-link>
                    <router-link to="/">+23341002000</router-link>
                    <router-link to="/">New Reiss ,Ghana, Accra </router-link>
                </div>


                <div class=" flex flex-col items-center sm:items-start justify-start gap-2">
                    <router-link class="font-[700] text-lg" to=''>Social</router-link>
                    <router-link to="/">LinkedIn</router-link>
                    <router-link to="/">Facebook</router-link>
                </div>
            </div>
        </div>
        <div
            class=" flex flex-row justify-between items-center sm:items-start gap-x-4 mt-10 py-5 border-t-2 border-white w-max1200">
            <span>@ copyright 2025 - G-client, All rights reserved</span>
            <button @click="scroll">Back to top
                <span class=" p-1 border-white border-1 ">

                    <FontAwesomeIcon :icon="['fas', 'arrow-up']" />
                </span>
            </button >
        </div>
    </section>
</template>
<style scoped></style>