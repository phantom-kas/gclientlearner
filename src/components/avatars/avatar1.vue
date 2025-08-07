<script setup lang="ts">
defineProps({
    name: {
        type: String,
        default: 'Admin'
    },
    email: {
        type: String,
        default: ''
    },
    src:{
        type: String,
        default: '../../assets/images/p1.png'
    }
})
</script>
<template>
    <div class=" flex flex-row justify-start items-center gap-x-3">
        <img class=" size-10 rounded-[50%]" :src />
        <div class="flex flex-col justify-between h-full ">
            <slot name="name">
                <span class=" leading-4 font-[600]">{{name}}</span>
                <span class="leading-4">{{email}}</span>
            </slot>
        </div>
    </div>
</template>