<script setup lang="ts">
import list from './components/toasts/list.vue';
import { RouterView } from 'vue-router';
</script>
<template>
  <div id="modal"></div>
  <div id="modal2"></div>
  <!-- dsadsadas -->
  <RouterView class="text-[18px]" />
  <list/>
</template>

<style scoped></style>
