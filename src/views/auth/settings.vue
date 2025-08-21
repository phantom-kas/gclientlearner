<script setup lang='ts'>
import input2 from '@/components/form_components/input2.vue';
import blueButton from '@/components/buttons/blueButton.vue';
import buttonWhite from '@/components/buttons/buttonWhite.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onBeforeMount, ref } from 'vue';
import select2 from '@/components/form_components/select2.vue';
import quill_input from '@/components/form_components/quill_input.vue';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import screen2 from '@/components/container/screen2.vue';
import image_picker from '@/components/form_components/image_picker.vue';
import { getImageUrl } from '@/composabels/utilities';
const data = ref({} as { [key: string]: string })

const user = useUserStore()
const form1Key = ref(0)
const resetForm = () => {
    data.value.email = user.userInfo.email
    data.value.firstName = user.userInfo.firstName
    data.value.lastName = user.userInfo.lastName
    data.value.description = user.userInfo.description
    data.value.description = user.userInfo.description
    data.value.location = user.userInfo.location
    data.value.disability = user.userInfo.disability
    data.value.gender = user.userInfo.gender
    data.value.phone = user.userInfo.phone
    form1Key.value = form1Key.value + 1
}
onBeforeMount(() => {
    resetForm()
})


const route = useRoute()
const router = useRouter()
const showImagePicker = ref(false)
const handelImageUpdate = (file: any) => {
    return axios.put('/user/image/' + user.userInfo.id, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, _showAllMessages: true, _load: true
    }).then(res => {
        if (res.data.status != 'success') return


        return res.data.data.url
    })
}
const handelImageChange = async (e: any) => {
    let blob = e.img;
    showImagePicker.value = false;
    let Url = await handelImageUpdate(blob)
    if (Url) {
        router.go(-1)
        // console.log(track.value.i);

        user.userInfo.image = Url
        imageError.value = false
        showImagePicker.value = false
    }
}
const imageError = ref(false)
const handelUpdate = () => {
    return axios.put('user/' + user.userInfo.id, {
        ...data.value, email: undefined,
        amount: undefined
    }, { _showAllMessages: true }).then(res => {
        if (!res) return
        if (res.data.status != 'success') {
            resetForm()
            return
        }
        user.userInfo.email = data.value.email
        user.userInfo.firstName = data.value.firstName
        user.userInfo.lastName = data.value.lastName
        user.userInfo.description = data.value.description
        user.userInfo.description = data.value.description
        user.userInfo.location = data.value.location
        user.userInfo.disability = data.value.disability
        user.userInfo.gender = data.value.gender
        // data.value = {}
    })
}


const passwordData = ref({oldPassword:'',newPassword:''} as { [key: string]: string })

const handelPasswordUpdate = () => {
    // axios.request({ url:, method: 'PUT',, })

    axios.put('/change_password', passwordData.value, { _showAllMessages: true }).then(res => {
        if (res.data.status != 'success') return

    })
}
const imageLoading = ref(true);

</script>
<template>
    <section class=" flex flex-col items-center justify-end w-full  sm:pt-15 ">
        <div
            class=" flex  sm:flex-row flex-col justify-between sm:justify-start items-center sm:items-start w-max1200 plr py-30 gap-10">
            <div class=" flex flex-col items-center justify-start w-max300 sm:sticky top-0">
                <div class="w-[300px] h-[300px] relative">
                    <!-- {{ imageLoading ?'loading image':'Done' }}
                    {{ imageError }} -->
                    <img  @load="imageLoading = false" v-if="!imageError" @error="()=> imageError = true" :src="getImageUrl(user.userInfo.image)" alt=""
                        class=" w-full h-full rounded-[50%]" />
                    <div v-else
                        class=" w-full h-full flex justify-center items-center rounded-[50%] border border-gray-500">
                        <FontAwesomeIcon size="9x" :icon="['far', 'user']" />
                    </div>
                    <!-- <img :src="getImageUrl(user.userInfo.image)" alt=""
                        class=" w-full h-full rounded-[50%]" /> -->
                        <!-- dsadasdasdas -->
                    <button @click="router.push({ name: 'change_image' })"

                        class=" absolute w-13 h-13 rounded-4xl right-0 bottom-0 flex flex-col justify-center items-center text-white3 theme1cont cursor-pointer">
                        <FontAwesomeIcon size="2x" :icon="['fas', 'pencil']" />
                    </button>
                </div>
                <span class=" mt-2">{{ user.userInfo.firstName }} {{ user.userInfo.lastName }}</span>
                <span>{{ user.userInfo.role }}</span>
            </div>

            <div class=" grow flex flex-col gap-8 items-center justify-start theme1cont px-4 py-8">
                <form :key="form1Key" @submit.prevent="handelUpdate"
                    class="grow flex flex-col gap-8 items-center justify-start">
                    <h1 class=" font-[600] text-3xl text-start w-full">
                        Profile
                    </h1>
                    <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                        <input2 required :icon="['far', 'user']" class=" w-max200 grow" :data label="First Name"
                            name="firstName" />
                        <input2 required :icon="['far', 'user']" label="Last Name" :data name="lastName"
                            class=" w-max200 grow" />
                    </div>
                    <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                        <select2 required :icon="['far', 'user']" :data label="Gender" class=" w-max200 grow"
                            name="gender"
                            :options="[{ value: 'male', label: 'Male' }, { value: 'femal', label: 'Female' }]" />

                        <input2 required class=" w-max200 grow" :icon="['fas', 'location-dot']" :data label="Location"
                            name="location" />
                    </div>
                    <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                        <select2 required class=" w-max200 grow" :icon="['fas', 'person']" :data label="PWA"
                            name="disability" :options="[
                                { value: 'none', label: 'none' },
                                { value: 'hearing', label: 'hearing' },
                                { value: 'vision', label: 'vision' },
                            ]" />
                        <input2 required :icon="['fas', 'phone']" class=" w-max200 grow" :data label="Phone"
                            name="phone" type="tel" />



                        <quill_input :value="data.description" @inputed="e => data.description = e" label="Bio"
                            placeholder="Bio" />
                        <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                            <blueButton>
                                <template #label>
                                    Save changes

                                </template>
                            </blueButton>
                            <buttonWhite type="button" @click="resetForm">
                                Cancel
                            </buttonWhite>
                        </div>

                    </div>
                </form>



                <form @submit.prevent="handelPasswordUpdate"
                    class="grow flex flex-col gap-8 items-center justify-start w-full">
                    <h1 class=" font-[600] text-3xl text-start w-full mt-9">
                        Change Password
                        <!-- {{ passwordData }} -->
                    </h1>
                    <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                        <input2 :data="passwordData"  class=" w-max200 grow" name="oldPassword" :icon="['fas', 'lock']"
                            label="Old Password" type="password" />
                        <input2 key="sadas" :data="passwordData" class=" w-max200 grow" name="newPassword"
                            :icon="['fas', 'lock']" label="New Password" type="password" />
                    </div>
                    <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                        <blueButton>
                            <template #label>
                                Save changes
                            </template>
                        </blueButton>
                    </div>
                </form>
            </div>


        </div>

        <screen2 @close="router.go(-1)" v-if="route.name == 'change_image'" to="#modal2" defer>

            <image_picker :aspectRatio="1" @crop="(e: any) => handelImageChange(e)" class="z-[1000] my-auto" />

        </screen2>
    </section>
</template>
<style scoped></style>