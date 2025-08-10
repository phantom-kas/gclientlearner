<script setup lang="ts">
import Nav from '@/components/nav.vue';
import Footer from '@/components/footer.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import spinLinePules from '@/components/spinners/spinLinePules.vue';
import IconCi from '@/components/icons/IconCi.vue';
import { useLoaderStore } from '@/stores/loader';
const user = useUserStore();
const hasLoaded = ref(false)
onMounted(async () => {
  if (!user.isLoggedIn()) {
    window.alert(user.getRToken)
    hasLoaded.value = true
    return
  }

  await axios.get('check_token').finally(() => {
    hasLoaded.value = true
  }).then(res => {
    if (res.data.status != 'success') {
      user.getAToken = null
    };
  })
})

const loader = useLoaderStore()
</script>
<template>
  <template v-if="hasLoaded">
    <Nav></Nav>
    <main
      class=" w-full z-1 relative pt-15 h-screen ofov  sm:flex flex-col items-center justify-start overflow-hidden  darkmode:bg-black bg-white darkmode:text-neutral-300 text-black">
      <router-view></router-view>

      <Footer>
      </Footer>
    </main>
  </template>
  <!-- <Teleport to="#modal"> -->
  <div v-else-if="!hasLoaded || loader.loadSplash"
    class=" w-screen h-screen bg-blue flex flex-col items-center justify-center fixed top-0 left-0 z-50 darkmode">
    <!-- <h1>sadasd</h1> -->
    <IconCi :size="100" /> 
    <spinLinePules />
  </div>
  <!-- </Teleport> -->

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