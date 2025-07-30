<script setup lang="ts">
import Nav from '@/components/nav.vue';
import Footer from '@/components/footer.vue';
</script>
<template>

  <Nav></Nav>

  <main
    class=" w-full z-1 relative pt-15 h-screen ofov  sm:flex flex-col items-center justify-start overflow-hidden  darkmode:bg-black bg-white darkmode:text-neutral-300 text-black">
    <router-view></router-view>
    <Footer>
    </Footer>
  </main>
</template>

<style scoped>
.ofov {
  overflow: scroll;
  overflow: overlay;
}

.mainw {
  width: min(100%, 1500px);
}
</style>