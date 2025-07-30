<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, type PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
    label: {
        type: String,
        default: 'Select Label'
    },
    placeholder: {
        type: String,
        default: ''
    },
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
    options: {
        type: Array as PropType<{ value: string | number; label: string }[]>,
        required: true
    },
    icon: {
        type: Object as PropType<[string, string]>,
        default: ['fas', 'trash-can']
    }
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

const checkValid = (e: string | number) => {
    if (!props.data?.validate) return
    if (!e) {
        msg.value = 'This field is required'
        isInvalid.value = true
    } else {
        msg.value = null
        isInvalid.value = false
    }
}

onMounted(() => {
    checkValid(vall.value)
})
</script>

<template>
    <div class="relative w-[460px] theme1cont flex items-center pl-2 gap-x-3 not-darkmode:bg-[#F5F5F5]!">
        <slot>
            <FontAwesomeIcon size="lg" :icon />
        </slot>
        <select :id="name" v-model="vData[name]" :required="required" @blur="checkValid(vData[name])"
            class="peer w-full px-4 pt-5 pb-2   placeholder-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option class=" theme1cont" disabled value="">{{ placeholder || 'Select...' }}</option>
            <option class=" theme1cont" v-for="opt in options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
            </option>
        </select>
        <label :class="{ 'top-3.5 text-gray-400': !vData[name], 'top-0': !!vData[name] }" :for="name"
            class="absolute left-11   text-sm transition-all  peer-placeholder-shown:text-base  peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500">
            {{ label }}
        </label>
        
        

        <p v-if="isInvalid" class="text-sm text-red-500 mt-1">{{ msg }}</p>
    </div>
</template>
