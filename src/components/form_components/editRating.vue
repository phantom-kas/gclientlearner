<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { onBeforeMount, ref } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  num_stars: {
    type: Number,
    default: 0
  },showbuttons:{
    type:Boolean,
    default:true
  }
})
const stars = ref(0)
onBeforeMount(()=>{
  stars.value = props.num_stars
})

const handelHov = (e) => {
    let allstars = document.querySelectorAll('.starc')
 // let starse = document.querySelectorAll('.starc')
  for (let index = 0; index < 5; index++) {
    // const element = starc.value[index];
    const element = allstars[index];
    if (index < e) {
      element.classList.add('col1')
    }
    else {
      element.classList.remove('col1')
    
    }
  }
}

const starc = ref([] as HTMLElement[])

const handelHovLeave = (e) => {
  let allstars = document.querySelectorAll('.starc')
  // let starse = document.querySelectorAll('.starc')
  for (let index = 0; index < 5; index++) {
    // const element = starc.value[index];
    const element = allstars[index];
    console.log(starc.value.length)
    if (index < stars.value)
      element.classList.add('col1')
    else
      element.classList.remove('col1')
  }
}
const emit = defineEmits(['star','close','ok'])
</script>
<template>
  <div class=" flex flex-col w-max300">
    <span v-if="title" class="bold600 fs9">
      {{ title }}
    </span>
    <span v-if="description">{{ description }}</span>
    <div class="stars_c flex">
      <div ref="starc" @click="$emit('star', i)" class="starc col1 cursor-pointer" :class="'starc' + i" v-for="i in stars" @mouseleave="handelHovLeave(i)"
        @mouseenter="handelHov(i)" >
        <font-awesome-icon :class="'star' + i" class='star ' size="2x" 
          :icon="['fas', 'star']" />
          <!-- {{ i }} -->
      </div>
      <div :key=" stars + j" ref="starc" class="starc cursor-pointer" :class="'starc' + stars + j" v-for="j in (5 - stars)"
        @mouseleave="handelHovLeave(stars + j)" @mouseenter="handelHov(stars + j)"  @click="$emit('star',  stars + j)">
        <font-awesome-icon :class="'star' + stars + j" class='star ' size="2x" :icon="['fas', 'star']" />
        <!-- {{ stars + j }} -->
      </div>
    </div>

    <!-- {{ starc.length }} -->


  </div>
</template>
<style scoped>
.stars_c>*:hover {
  color: yellow;
}
.col1 {
  color: yellow;
}
</style>