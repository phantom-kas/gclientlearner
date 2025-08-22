<script setup lang='ts'>

</script>
<template>
  <span class="load_placeholder_big"></span>
</template>
<style scoped>
.load_placeholder_big {
  /* width: 215px; */
  height: 215px;
  display: block;
  margin: auto;
  position: relative;
  background: var(--color-black);
  box-sizing: border-box;
}

.load_placeholder_big::after {
  content: '';
  width: calc(100% - 30px);
  height: calc(100% - 15px);
  top: 15px;
  left: 15px;
  position: absolute;
  background-image: linear-gradient(90deg, transparent, var(--color-neutral-400) 50%, transparent 100%),
    linear-gradient(var(--color-neutral-600), 100%, transparent 0);
  background-repeat: no-repeat;
  background-size: calc(100% - 10px) calc(100% - 10px);
  background-position: -185px 0, center 0, center 115px, center 142px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  to {
    background-position: 185px 0, center 0, center 115px, center 142px;
  }
}
</style>