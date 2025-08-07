<script setup lang='ts'>
import blueButton from '@/components/buttons/blueButton.vue';
import input2 from '@/components/form_components/input2.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import icongoogle from '@/components/icons/icongoogle.vue';
import { onMounted, ref, type PropType } from 'vue';
import Input from '@/components/form_components/Input.vue';
import { useauthStore } from '@/stores/auth';
const props = defineProps({
    data: {
        type: Object as PropType<{ [key: string]: string }>,
        required: true
    }
})

// const data = ref({email:''})
const emit = defineEmits(['changeTitle'])
onMounted(() => {
    emit('changeTitle', ['OTP Verification', 'Verify your accounts using the six digit sent to '+props.data.email])
})
const auth = useauthStore()
</script>
<template>


    <input2 :data :icon="['fas', 'lock']" class=" w-full" name="otp" type="text" label="OTP" placeholder="XXXXXX" />
   
    <blueButton :is-load="auth.loading" class=" w-full">
        <template #label>
            <div class="flex gap-4  justify-center items-center">
                Submit
                <FontAwesomeIcon size="lg" :icon="['fas', 'angle-right']" />
            </div>
        </template>
    </blueButton>
</template>
<style scoped></style>