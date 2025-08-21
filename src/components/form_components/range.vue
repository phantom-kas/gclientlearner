<script setup lang="ts">
import type { PropType } from 'vue';
import { onBeforeMount, onMounted, ref } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: 'Select Label'
  },
  // placeholder: {
  //     type: String,
  //     default: ''
  // },
  val: {
    type: [String, Number] as PropType<string | number>,
    default: null
  },
  required: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  },
  name: {
    type: String,
    required: true
  },
  // options: {
  //     type: Array as PropType<{ value: string | number; label: string }[]>,
  //     required: true
  // },
  // icon: {
  //     type: Object as PropType<[string, string]>,
  //     default: ['fas', 'trash-can']
  // },
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
})

const vData = ref(props.data ?? {})
const vall = ref('')
const isInvalid = ref(false)
const msg = ref<string | null>(null)

onBeforeMount(() => {
  // if(!vData.value[props.name]){
  //     vData.value[props.name] = null
  // }
  if (props.data) {
    vall.value = props.data[props.name] ?? ''
  }
})

// const checkValid = (e: string | number) => {
//   if (!props.data?.validate) return
//   if (!e) {
//     msg.value = 'This field is required'
//     isInvalid.value = true
//   } else {
//     msg.value = null
//     isInvalid.value = false
//   }
// }

onMounted(() => {
  // checkValid(vall.value)
})

const emit = defineEmits(['inputed'])
</script>

<template>
  <div class="">
    <label class="block text-sm font-medium  mb-1">
      {{ label }}: <span class="font-bold">
        <slot name="value" v-bind="{ value: vData[name] }">
          {{ vData[name] }}
        </slot>
      </span>
    </label>
    <!-- {{ vData[name] }} -->
    <input  :value="vData[name] ?? ''" type="range" @input="e => {  vData[name] = (e.target as HTMLInputElement)?.value; emit('inputed', { name: name, value: (e.target as HTMLInputElement)?.value }) }"  :min :max step="1" class=" w-full" />
  </div>
</template>
<style scoped>
/* input[type='range']::-webkit-slider-thumb {
  appearance: none;
  height: 24px;
  width: 24px;
  background-color: #facc15; 
  border-radius: 9999px;
  cursor: pointer;
  border: none;
  margin-top: -11px;
}

input[type='range']::-moz-range-thumb {
  height: 24px;
  width: 24px;
  background-color: #facc15;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
} */
</style>
