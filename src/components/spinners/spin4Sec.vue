<script setup lang="ts">
defineProps({
    size:{
        type:String,
        default:1
    }
})
</script>
<template>
    <span class="loader1" :style="{'--size':size}" ></span>
</template>
<style scoped>
.loader1 {
    width: calc(16px * var(--size));
    height: calc(16px * var(--size));
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: calc(4px * var(--size)) solid;
    box-sizing: border-box;
    animation: animloader 1s linear infinite alternate;
}

@keyframes animloader {
    0% {
        border-color: white rgba(255, 255, 255, 0) rgba(255, 255, 255, 0) rgba(255, 255, 255, 0);
    }

    33% {
        border-color: white white rgba(255, 255, 255, 0) rgba(255, 255, 255, 0);
    }

    66% {
        border-color: white white white rgba(255, 255, 255, 0);
    }

    100% {
        border-color: white white white white;
    }
}
</style>