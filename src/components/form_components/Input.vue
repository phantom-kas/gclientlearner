<script setup lang="ts">
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
    <label class="  flex flex-col items-start justify-start relative ">
        <span :class="{ 'text-red-500': isInvalid }" class=""> {{ label }}</span>
        <span  class="  text-xs leading-3 text-red-500 text-right w-full mb-1" v-html="msg"></span>
        <div :class="{'border-3 rounded-lg border-red-600 ring-red-500':isInvalid}" class="w-full h-10 inputel rounded-lg flex flex-row items-center justify-start relative">
            <input :value="vData[name] ?? ''"
                @input="e => { checkValid((e.target as HTMLInputElement)?.value); vData[name] = (e.target as HTMLInputElement)?.value, $emit('input', { name: name, value: (e.target as HTMLInputElement)?.value }) }"
                :required :name :type :placeholder ref="input" class="theme1cont grow h-full px-2 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            <div v-if="type == 'password'" @click="handelToggleSeen()"
                class=" right-2 absolute cursor-pointer z-50  flex items-center justify-center theme2cont">
                <IconEyeSlash color="#7F7E83" v-if="passProps" />
                <IconEye color="#7F7E83" v-else />
            </div>
        </div>
    </label>
</template>
<style scoped>
.inputel {
    box-shadow: 0px 1px 5px 2px rgba(57, 57, 57, 0.15);
}
</style>