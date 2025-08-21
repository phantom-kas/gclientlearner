<script setup lang='ts'>
import tracks3 from '@/components/tracks/tracks3.vue';
import search_input from '@/components/form_components/search_input.vue';
import input2 from '@/components/form_components/input2.vue';
import select2 from '@/components/form_components/select2.vue';
import { onMounted, ref } from 'vue';
import quill_input from '@/components/form_components/quill_input.vue';
import range from '@/components/form_components/range.vue';
import { anyCurrency } from '@/composabels/utilities';
import blueButton from '@/components/buttons/blueButton.vue';
import { useauthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useRouter } from 'vue-router';
const props = defineProps({
    id: {
        type: String,
        default: null
    }
})
const data = ref({} as any)
const auth = useauthStore()
const user = useUserStore()
const createInvoice = () => {
    return axios.post('/invoice/track', {
        trackId: props.id,
        price: userPrice.value,
    }).then(res => {
        if (res.data.status != 'success') return
        data.value = {}
        return res
    })
}

const router = useRouter()
const handelSubmit = () => {
    auth.data = data.value
    if (!user.isLoggedIn()) {
        auth.signUp().then(res => {
            if (!res) return
            if (res.data.status != 'success') return
            data.value = {}
            user.setUserInfo({ ...res.data.data, refreshToken: undefined, accessToken: undefined });
            user.SetTokens(res.data.data.refreshToken, res.data.data.accessToken);
            auth.loading = true
            createInvoice().then(res => {
                if (!res) return
                if (res.data.status != 'success') return
                data.value = {}
                auth.loading = false
                router.push({ name: 'payment', params: { id: res.data.data.invoiceId } })
            })
            return res
        })
    } else {
        axios.put('user/' + user.userInfo.id, {
            ...data.value, email: undefined,
            amount: undefined
        }).then(res => {
            if (!res) return
            if (res.data.status != 'success') return
            user.userInfo.email = data.value.email
            user.userInfo.firstName = data.value.firstName
            user.userInfo.lastName = data.value.lastName
            user.userInfo.description = data.value.description
            user.userInfo.description = data.value.description
            user.userInfo.location = data.value.location
            user.userInfo.disability = data.value.disability
            user.userInfo.gender = data.value.gender
            data.value = {}
            auth.loading = true
            createInvoice().then(res => {
                if (!res) return
                if (res.data.status != 'success') return
                data.value = {}
                auth.loading = false
                router.push({ name: 'payment', params: { id: res.data.data.invoiceId } })
            })
            return res
        })
    }
    auth.loading = false

}

const track = ref({} as { [key: string]: string })
const loaded = ref(false)
const userPrice  = ref(0)
onMounted(async () => {

    await axios.get('/track/' + props.id, { _loadSplash: true }).then((res) => {
        if (res.data.status != 'success') return
        track.value = res.data.data[0]
        data.value['amount'] = Number(track.value.price)
    })
    if (!user.isLoggedIn()) {
        loaded.value = true
        return
    }

    userPrice.value = parseInt(track.value.price)
    data.value.email = user.userInfo.email
    data.value.firstName = user.userInfo.firstName
    data.value.lastName = user.userInfo.lastName
    data.value.description = user.userInfo.description
    data.value.description = user.userInfo.description
    data.value.location = user.userInfo.location
    data.value.disability = user.userInfo.disability
    data.value.gender = user.userInfo.gender
    data.value.phone = user.userInfo.phone
    loaded.value = true
})
</script>
<template>
    <div
        class=" flex flex-col justify-center items-center p-13 bg-blue darkmode:bg-neutral-900 w-full text-3xl font-[700] text-white">
        Checkout
    </div>
    <!-- {{ user.userInfo }} -->
    <!-- {{ track }} -->
    <section v-if="loaded" class="plr flex flex-col items-center justify-start w-full py-25">
        <h1 class="w-max1000 font-[500] text-3xl mb-6">
            Complete payment
        </h1>
        <form @submit.prevent="handelSubmit"
            class=" flex sm:flex-row gap-y-4 gap-x-4  w-max1000 items-start justify-between flex-col">
            <!-- {{ data }} -->
            <div class=" p-5 w-min495 theme1cont gap-y-4 flex flex-col relative grow">
                <input2 :disabled="user.isLoggedIn()" :icon="['far', 'user']" class="w-full" :data label="First Name"
                    name="firstName" />
                <input2 :disabled="user.isLoggedIn()" :icon="['far', 'user']" class="w-full" :data label="Last Name"
                    name="lastName" />
                <input2 :disabled="user.isLoggedIn()" :icon="['far', 'envelope']" class="w-full" :data label="Email"
                    name="email" />
                <select2 :icon="['far', 'user']" :data label="Gender" class="w-full" name="gender"
                    :options="[{ value: 'male', label: 'Male' }, { value: 'femal', label: 'Female' }]" />
                <input2 :icon="['fas', 'location-dot']" class="w-full" :data label="Location" name="location" />

                <select2 class="w-full" :icon="['fas', 'person']" :data label="PWA" name="disability" :options="[
                    { value: 'none', label: 'none' },
                    { value: 'hearing', label: 'hearing' },
                    { value: 'vision', label: 'vision' },
                ]" />
                <!-- <input2 :icon="['fas', 'person']" class="w-full" :data label="First Name" name="fname" /> -->

                <input2 :icon="['fas', 'phone']" class="w-full" :data label="Phone" name="phone" type="tel" />
                <template v-if="!user.isLoggedIn()">
                    <input2 :icon="['fas', 'lock']" class="w-full" :data label="Password" name="password"
                        type="password" />
                    <input2 :icon="['fas', 'lock']" class="w-full" :data label="Confirm Password" name="confpassword"
                        type="password" />
                </template>

                <!-- {{ data.description }}------------ -->
                <quill_input :value="data.description" @inputed="e => data.description = e" label="Bio"
                    placeholder="Bio" />
            </div>

            <!-- {{ userPrice }} -->
            <div class="p-5  flex flex-col gap-y-5 theme1cont w-[min(350px,100%)]">
                <span class=" font-[600] text-2xl">
                    {{ anyCurrency(track.price) }}
                </span>
                <range @inputed="(e: any)=>userPrice = e.value" :min="0" :max="Number(track.price)" :data name="amount" label="Select amount"
                    class=" w-full py-2">
                    <template #value="{ value }">
                        {{ anyCurrency(value) }}
                    </template>
                </range>
                <blueButton :is-load="auth.loading" class=" w-full">
                    <template #label>
                        Complete my purchase
                    </template>
                </blueButton>
            </div>
        </form>
    </section>
</template>
