<script setup lang='ts'>
import { useauthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const auth = useauthStore()
const title = ref('')
const title2 = ref('')
const data = ref({ email: '', password: '' } as any)


const route = useRoute()
const routeName = route.name
const handelSubmit = () => {
    if (route.name == 'login') {
        auth.data = data.value
        auth.sigin()
    }
    else if (route.name == 'signup') {
        auth.data = data.value
        auth.signUp()
    }
}

onMounted(() => { })
</script>
<template>
    <div class="flex lg:flex-row  lg:justify-between justify-center lg:items-center w-max1200 px-6">
        <img class="hidden lg:block" src="../../assets/images/authbg.png" alt="">
        <form @submit.prevent="handelSubmit" class=" flex flex-col gap-y-6 justify-start items-start  w-max500 py-30">
            <h1 class='text-center font-[600] text-4xl w-full' v-html="title">
            </h1>
            <span class="mb-6 w-full text-center" v-html="title2"></span>
            <!-- {{ data }} -->
            <router-view @changeTitle="(e: string[]) => { title = e[0], title2 = e[1] }" :data />
        </form>
    </div>
</template>
<style scoped></style>