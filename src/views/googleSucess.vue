<script setup lang='ts'>
// import { useauthStore } from '@/stores/auth';
// import { useUserStore } from '@/stores/user';
import IconCi from '@/components/icons/IconCi.vue';
import SpinLinePules from '@/components/spinners/spinLinePules.vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const user =useUserStore()
const router = useRouter()
const route = useRoute()
onMounted(() => {

    axios.get('user/' + route.query.user).then(res => {
        if (res.data.status != 'success') return

        user.userInfo = res.data.data[0]
        router.push({ name: 'dashboard' })
    })
})
</script>
<template>
    <div class=" w-screen h-screen bg-blue flex flex-col items-center justify-center fixed top-0 left-0 z-50 darkmode">
        <!-- <h1>sadasd</h1> -->
        <IconCi :size="100" />
        <SpinLinePules />
    </div>
</template>
<style scoped></style>