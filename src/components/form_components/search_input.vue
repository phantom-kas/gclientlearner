<script setup lang="ts">
// import Input from './Input.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
<template>
    <label class=" bg-white flex flex-row theme1cont justify-start items-center pl-4 shadow-md rounded-2xl theme1cont">
        <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="text-[#7F7E83]" size="lg"/>
        <input name="search" placeholder="Search Track" class="grow h-full px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none p-2.5 text-[18px] placeholder:text-[#7F7E83]" />

    </label>
</template>

<!-- box-shadow: 0px 1px 10px 0px ; -->


<style scoped></style>