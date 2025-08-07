<template>
  <div
    class="rating"
    :style="{
      '--rating': rating,
      '--max-stars': maxStars,
      'font-size': size + 'px'
    }"
    role="img"
    :aria-label="`${rating} out of ${maxStars}`"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps({
  rating: { type: Number, required: true }, // e.g., 3.7
  maxStars: { type: Number, default: 5 },
  size: { type: Number, default: 24 }
})
</script>

<style scoped>
.rating {
  unicode-bidi: bidi-override;
  color: #ccc; /* empty star color */
  position: relative;
  display: inline-block;
  line-height: 1;
}

.rating::before {
  content: "★★★★★"; /* background stars */
}

.rating::after {
  content: "★★★★★"; /* filled stars */
  color: gold;
  position: absolute;
  top: 0;
  left: 0;
  width: calc((var(--rating) / var(--max-stars)) * 100%);
  overflow: hidden;
  white-space: nowrap;
}
</style>
