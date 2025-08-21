<script setup lang="ts">
import { onMounted } from 'vue';
import list from './components/toasts/list.vue';
import { RouterView } from 'vue-router';
import { useThemeStore } from './stores/theme';

// const theme = useThemeStore()



const theme = useThemeStore()

onMounted(() => {
  theme.applyTheme(theme.value)

})
</script>
<template>
  <div id="modal"></div>
  <div id="modal2"></div>
  <!-- dsadsadas -->
  <RouterView class="text-[18px]" />
  <list />
</template>

<style scoped></style>
