<script setup lang="ts">
import { onBeforeMount, onMounted, ref, type Prop, type PropType } from 'vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const input = ref<HTMLInputElement | null>(null)

const props = defineProps({
    label: {
        type: String,
        default: 'Label'
    },
    type: {
        type: String,
        default: 'text'
    }, placeholder: {
        type: String,
        default: ''
    },
    val: {
        type: Object as PropType<string | number>,
        default: null
    },
    required: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object
    }, name: {
        type: String,
        required: true
    },
    options:{
        type:Object as PropType<{value:string,label:string}[]>,
        default:[{label:'Option 1',value:'1'},{label:'Option 1',value:'Option 1'},{label:'Option 1',value:'Option 1'},{label:'Option 1',value:'Option 1'}]
    }
})

const vData = ref(props.data ?? {})
const show = ref(false)
const vall = ref("")
onBeforeMount(() => {
    if (props.data) {
        vall.value = props.data[props.name] ?? ""
    }
    show.value = true
})

const passProps = ref(false)
const handelToggleSeen = () => {
    if (!props.data) {
        return
    }
    if (!input.value)
        return
    if (passProps.value) {
        passProps.value = false
        input.value.type = 'password'
        input.value.focus()
        return
    }
    passProps.value = true
    input.value.type = 'text'
    input.value.focus()
    return
}


const isInvalid = ref(false)
const msg = ref(null as string | null)
const checkValid = (e: string) => {
    // if(!e || e==''){
    //     return
    // }
    if(!props.data?.validate){
        return
    }
    if (!input.value) return
    if (!input.value.checkValidity()) {
        msg.value = input.value.validationMessage
        isInvalid.value = true
    }
    else {
        msg.value = null
        isInvalid.value = false
    }
}

onMounted(()=>{
    checkValid(vData.value[props.name] ?? '')
})
</script>

<template>
<label class="flex flex-col items-start justify-start relative">
  <span :class="{ 'text-red-500': isInvalid }">{{ label }}</span>
  <span class="text-xs leading-3 text-red-500 text-right w-full mb-1" v-html="msg"></span>
  
  <div :class="{'border-3 rounded-lg border-red-600 ring-red-500': isInvalid}" class="w-full h-10 inputel rounded-lg flex items-center justify-start relative">
    <select
      :value="vData[name] ?? ''"
      @change="e => { checkValid((e.target as HTMLInputElement).value); vData[name] = (e.target as HTMLInputElement).value; $emit('input', { name: name, value: (e.target as HTMLInputElement).value }) }"
      :required
      :name="name"
      ref="input"
      class="theme1cont grow h-full px-2 rounded-lg bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 appearance-none">
      
      <option disabled value="">-- {{ placeholder || 'Select an option' }} --</option>
      <option v-for="(option, i) in options" :key="i" :value="option.value">{{ option.label }}</option>
    </select>

    <div class="pointer-events-none absolute right-2 text-gray-400">
        <FontAwesomeIcon :icon="['fas','chevron-down']" />
    </div>
  </div>
</label>
</template>
<style scoped>
.inputel {
    box-shadow: 0px 1px 5px 2px rgba(57, 57, 57, 0.15);
}
</style>