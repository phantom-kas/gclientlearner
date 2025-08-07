<script setup lang='ts'>
import trackRelated from '@/components/tracks/trackRelated.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { anyCurrency, getImageUrl, urlAuthUnAuth } from '@/composabels/utilities';
import blueButton from '@/components/buttons/blueButton.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import avatar1 from '@/components/avatars/avatar1.vue';
import rating from '@/components/rating.vue';
const props = defineProps({
    id: {
        type: String,
        default: '2'
    }
})

const loading = ref(true)
const track = ref({} as { [key: string]: string })
const courses = ref([] as { [key: string]: string }[])
onMounted(() => {
    let url = urlAuthUnAuth('/track-courses/' + props.id, 'learner/track/' + props.id)
    axios.get(url).finally(() => {

    }).then(res => {
        if (res.data.status != 'success') return

        track.value = res.data.data.track[0]
        courses.value = res.data.data.courses

    })



})
</script>
<template>
    <!-- <div class=" flex flex-col justify-center items-center p-13 bg-blue w-full text-3xl font-[700] text-white">
        Tracks
    </div> -->
    <section class="plr flex flex-col items-center justify-start w-full py-13 overflow-clip">
        <div
            class=" grid gap-y-4  w-max1200   tet-sm place-content-start gap-x-4 grid-cols-1 sm:grid-cols-[1fr_min(400px,100%)]">
            <div
                class=" flex flex-col items-start justify-start gap-5  text-white  relative shadow-[-2px_-400vw_0px_400vw] bg-blue shadow-blue  h-fit pb-15 darkmode:shadow-neutral-800 darkmode:bg-neutral-800">
                <div class=" flex gap-4 z-10 relative   w-max1200 text-white2 font-[400] ">
                    <span>Home</span><span>></span><span>Tracks</span> <span>></span> <span
                        class="text-white font-[600] opacity-100">{{ track.name }}</span>
                </div>
                <h1 class=" font-[700] text-lg sm:text-4xl">{{ track.name }}</h1>
                <span v-html="track.description"></span>
                <div class=" flex justify-start gap-x-10 gap-5 flex-wrap w-full">
                    <div class=" flex flex-col gap-0">
                        <span>Instructor</span>
                        <span class=" font-[500]">{{ track.Instructor }}</span>
                    </div>

                    <div class=" flex flex-col gap-0">
                        <span>Pice</span>
                        <span class=" font-[500]">{{ anyCurrency(track.price) }}</span>
                    </div>

                    <div class=" flex flex-col gap-0 grow">
                        <span>1 review</span>
                        <span class=" font-[500]"><rating :rating="4.5"/></span>
                    </div>
                </div>
            </div>

            <div
                class=" bg-white theme1cont p-6 row-span-2 z-10 ml-auto flex-col h-fit max-sm:row-start-5 max-sm:w-full ">
                <img class="w-full mb-4" :src="getImageUrl(track.image)"></img>
                <h2 class=" font-[400] text-xl">Course Details</h2>
                <div class="coursebds">
                    <div class="border-t-neutral-200 darkmode:border-t-neutral-800 border-t-1 mt-4">
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'trash-can']" />Duration
                        </span>
                        {{ track.duration }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'trash-can']" />Courses
                        </span>
                        {{ track.num_courses }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'trash-can']" />Instructor
                        </span>
                        {{ track.Instructor }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'trash-can']" />Date
                        </span>
                        {{ track.created_at && track.created_at.split(' ')[0] }}
                    </div>
                    
                </div>
                <div class=" w-full text-center  py-3 font-[600] text-2xl">
                    {{ anyCurrency(track.price) }}
                </div>
                <router-link v-if="!track.user" class=" w-full" :to="{ name: 'checkout', params: { id } }">
                    <blueButton class=" w-full">
                        <template #label>
                            Enroll
                        </template>
                    </blueButton>
                </router-link>
            </div>

            <div
                class=" flex flex-col gap-6 px-5 py-10 h-fit border-1   w-full grow border-neutral-200 darkmode:border-neutral-900!">
                <h4 class=" text-2xl font-[700]">What you'll learn</h4>
                <div class=" w-full ">
                    <div v-for="item, i in courses" class=" theme1cont p-1.5  rounded px-4 shadow-sm border-t-0! border-x-0!">
                        <avatar1 :src="getImageUrl(item.image)"><template #name>{{ item.title }}</template></avatar1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="plr flex flex-col items-center justify-start w-full py-13 overflow-clip">

        <div class=" grid gap-y-4  w-max1200   tet-sm place-content-start gap-x-4 grid-cols-1 ">
            <trackRelated />
        </div>
    </section>
</template>
<style scoped>
/* @import "tailwind.css"; */
@reference "../../assets/css/main.css";

.coursebds>div {
    @apply border-b-neutral-200 darkmode:border-b-neutral-800! border-b-1 py-4 pr-6 flex justify-between items-center text-sm
}

.bsdd {
    /* box-shadow: -2px -400vw 0px 400vw rgba(1, 88, 154, 1); */
}

.coursebds>div>span {
    @apply flex gap-4 justify-start items-center
}


.description {
    display: -webkit-box;
    line-clamp: 3;
    box-orient: vertical;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
