<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onBeforeMount, onMounted, ref, type PropType } from 'vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeSlash from '../icons/IconEyeSlash.vue';
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
    icon: {
        type: Object as PropType<[string, string]>,
        default: ['fas', 'trash-can']
    },
    disabled:{
        type:Boolean,
        default:false
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
    input.value.focus()
    passProps.value = true
    input.value.type = 'text'
    return
}


const isInvalid = ref(false)
const msg = ref(null as string | null)
const checkValid = (e: string) => {
    // if(!e || e==''){
    //     return
    // }
    if (!props.data?.validate) {
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

onMounted(() => {
    checkValid(vData.value[props.name] ?? '')
})
</script>
<template>
    <div class="relative  theme1cont flex items-center pl-2 gap-x-3 not-darkmode:bg-[#F5F5F5]!">
        <slot>
            <FontAwesomeIcon size="lg" :icon />
        </slot>
        <input :disabled   :value="vData[name] ?? ''" :required :name :type :placeholder @input="e => { checkValid((e.target as HTMLInputElement)?.value); vData[name] = (e.target as HTMLInputElement)?.value, $emit('input', { name: name, value: (e.target as HTMLInputElement)?.value }) }" ref='input' id="floating_input"
            class="peer w-full px-4 pt-5 pb-2 pl-3    rounded  text-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue" />
        <div v-if="type == 'password'" @click="handelToggleSeen()"
            class=" right-2 absolute cursor-pointer z-50  flex items-center justify-center theme2cont">
            <IconEyeSlash color="#7F7E83" v-if="passProps" />
            <IconEye color="#7F7E83" v-else />
        </div>
        <label for="floating_input"
            class="absolute left-11 top-0 pointer-events-none  text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-blue-500 "
            v-html="label">
        </label>
    </div>
</template>
<style scoped></style>