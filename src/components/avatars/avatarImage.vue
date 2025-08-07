
<template>
  <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
    <img
      v-if="!error"
      :src="url"
      @error="onError"
      alt="User Avatar"
      class="w-full h-full object-cover"
    />
    <div v-else class="text-gray-400">
      <svg
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

const props = defineProps({
  url: {
    type: String,
    //required: true,
  },
})

const error = ref(false)

const onError = () => {
  error.value = true
}

// Reset error when URL changes
watch(() => props.url, () => {
  error.value = false
})
</script>
