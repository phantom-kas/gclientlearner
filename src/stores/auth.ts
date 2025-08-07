import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useToastStore } from './toast';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from './user';
export const useauthStore = defineStore('auth', () => {
  const data = useLocalStorage('authenticationdata', ref({} as { [key: string]: string }))
  const loading = ref(false)
  const toast = useToastStore()
  const route = useRoute()
  const router = useRouter()
  const user = useUserStore()
  const sigin = () => {
    loading.value = true
    axios.post('/login', {
      email: data.value.email,
      password: data.value.password
    }, { _showAllMessages: true })
      .finally(() => loading.value = false)
      .then((res) => {
        if (res.data.status != 'success') return
        router.push({ name: 'dashboard' })
        user.setUserInfo({ ...res.data.data, refreshToken: undefined, accessToken: undefined });
        user.SetTokens(res.data.data.refreshToken, res.data.data.accessToken);
        data.value = {}
      })
  }

  const signUp = () => {
    loading.value = true
    return axios.post('/learner', {
      email: data.value.email,
      lastName: data.value.lastName,
      firstName: data.value.firstName,
      password: data.value.password,
      phone: data.value.phone ?? "",
      gender: data.value.gender ?? "",
      location: data.value.location ?? "",
      description: data.value.description ?? "",
    }, { _showAllMessages: true })
      .finally(() => loading.value = false)
      .then((res) => {
        if (res.data.status != 'success') return
        data.value = {}

        return res
      })
  }

  const resetPassword = () => {
    if (data.value.password != data.value.confPassword) {
      toast.addToast("Passwords don't match ", 'error')
      return
    }
    loading.value = true
    axios.put('reset_password', { token: route.query.token, newPassword: data.value.password }, { _showAllMessages: true }).finally(() => {
      loading.value = false
    })
      .then(res => {
        if (res.data.status != 'success') return
        router.push({ name: 'login' })
      })
  }


  const getOtpCode = () => {
    loading.value = !loading.value
    axios.post('verify_email', { email: data.value.email, validate: undefined }, { _load: true, _showAllMessages: true })
      .finally(() => loading.value = false).then(res => {
        if (res.data.status != 'success') return false
        router.push({ name: 'dashboard' })
      })
  }


  const resendCode = () => {
    axios.get('send_verify_email', { _load: true, _showAllMessages: true })
  }

  return {
    signUp,
    data,
    loading,
    resetPassword,
    sigin,
    getOtpCode,
    resendCode
  }
});
