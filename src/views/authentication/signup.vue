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
  emit('changeTitle', ['Sign up to get started', null])
})


const auth = useauthStore()
</script>
<template>
  <div
    class=" p-2 w-full border-blue border-2 flex gap-4 justify-center rounded hover:bg-neutral-100 cursor-pointer text-blue font-[500]">
    <icongoogle /> <span class="">Sign up using Google</span>
  </div>
  <span class=" w-full text-center"> Or</span>
  <input2 required :data :icon="['far', 'user']" class=" w-full" name="firstName" label="First Name" />
  <input2 :data :icon="['far', 'user']" class=" w-full" name="lastName" label="Last Name" />
  <input2 :data :icon="['far', 'envelope']" class=" w-full" name="email" label="Email" />
  <input2 :data :icon="['fas', 'lock']" class=" w-full" name="password" type="password" label="Password" />
  <input2 :data :icon="['fas', 'lock']" class=" w-full" name="confpassword" type="password" label="Confirm Password" />
  <!-- <router-link to="" class=" link1">Forgot password ?</router-link> -->
  <blueButton :is-load="auth.loading" class=" w-full">
    <template #label>
      <div class="flex gap-4  justify-center items-center">
        Sign Up
        <FontAwesomeIcon size="lg" :icon="['fas', 'angle-right']" />
      </div>
    </template>
  </blueButton>
  <span class=" w-full text-center">Already have an account ? <router-link :to="{name:'login'}"
      class=" link1">login</router-link></span>
</template>
<style scoped></style>