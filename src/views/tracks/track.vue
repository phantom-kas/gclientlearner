<script setup lang='ts'>
import trackRelated from '@/components/tracks/trackRelated.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { anyCurrency, getImageUrl, urlAuthUnAuth } from '@/composabels/utilities';
import blueButton from '@/components/buttons/blueButton.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import avatar1 from '@/components/avatars/avatar1.vue';
import rating from '@/components/rating.vue';
import editRating from '@/components/form_components/editRating.vue';
import screen2 from '@/components/container/screen2.vue';
import closeRow from '@/components/container/closeRow.vue';
import quill_input from '@/components/form_components/quill_input.vue';
import { useRoute, useRouter } from 'vue-router';
import avatarImage from '@/components/avatars/avatarImage.vue';
import paginationList from '@/components/list/paginationList.vue';
const props = defineProps({
    id: {
        type: String,
        default: '2'
    }
})

const loading = ref(true)
const track = ref({} as { [key: string]: string | number })
const courses = ref([] as { [key: string]: string }[])
onMounted(() => {
    window.scrollTo(0, 0);
    let url = urlAuthUnAuth('/track-courses/' + props.id, 'learner/track/' + props.id)
    axios.get(url).finally(() => {
    }).then(res => {
        if (res.data.status != 'success') return

        track.value = res.data.data.track[0]
        courses.value = res.data.data.courses
        dispalyRatingData.value = parseInt(track.value.total_ratings + '') / parseInt(track.value.num_rating + '')
        if (track.value.ratings_deatails)
            ratingDetailes.value = JSON.parse(track.value.ratings_deatails as string)
    })



})
const showRatingEdit = ref(false)

const updateDisplayRating = (rate: number) => {
    track.value.num_rating = (parseInt(track.value.num_rating + '') + 1)
    track.value.total_ratings = parseInt(track.value.total_ratings + '') + rate
    ratingDetailes.value[rate] = parseInt(ratingDetailes.value[rate] + '') + 1
    dispalyRatingData.value = track.value.total_ratings / track.value.num_rating
}

const ratingData = ref({ rating: 0, review: '', loading: false })


const handelSubmitReview = () => {
    ratingData.value.loading = true
    axios.post('/create_review', {
        review: ratingData.value.review,
        rating: ratingData.value.rating,
        track: props.id
    }, { _showAllMessages: true })
        .finally(() => ratingData.value.loading = false
        )
        .then(res => {
            ratingData.value.loading = false
            if (res.data.status != 'success') return

            updateDisplayRating(ratingData.value.rating)
            showRatingEdit.value = false

        })
}

const route = useRoute()
const router = useRouter()
const ratingDetailes = ref({} as { [key: string]: string | number })
const dispalyRatingData = ref(null as number | null)
</script>
<template>
    <!-- <div class=" flex flex-col justify-center items-center p-13 bg-blue w-full text-3xl font-[700] text-white">
        Tracks
    </div> -->

    <!-- {{ ratingDetailes }} -->
    <!-- {{ track }} -->
    <section class="plr flex flex-col items-center justify-start w-full py-13 overflow-clip">
        <div
            class=" grid gap-y-4  w-max1200   tet-sm place-content-start gap-x-4 grid-cols-1 sm:grid-cols-[1fr_min(400px,100%)]">
            <div
                class=" flex flex-col items-start justify-start gap-5  text-white  relative shadow-[-2px_-400vw_0px_400vw] bg-blue shadow-blue  h-fit pb-15 darkmode:shadow-neutral-800 darkmode:bg-neutral-800">
                <div class=" flex gap-4 z-10 relative   w-max1200 text-white2 font-[400] ">
                    <router-link class=" hover:underline" to="/">Home</router-link> > <router-link class=" hover:underline" to="/tracks">Tracks</router-link> ><span
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

                    <div @click="router.push({ name: 'reviews' })" v-if="dispalyRatingData !== null"
                        class=" flex flex-col gap-0 grow cursor-pointer">
                        <span class=" flex gap-4 items-end">{{ track.num_rating }} review{{ parseInt(track.num_rating +
                            '') != 1 ? 's' : '' }}
                            <button @click.stop="showRatingEdit = true"
                                class=" rounded-2xl border-white3  border  flex items-center justify-start gap-1 hover:bg-blue-600  text-white px-2 py-0.5 text-xs cursor-pointer">
                                <FontAwesomeIcon :icon="['fas', 'plus']" />
                                Add Review
                            </button></span>

                        <span class=" font-[500] flex items-end justify-start gap-3">
                            <rating :rating="dispalyRatingData" />
                            <span> {{ (dispalyRatingData as number).toFixed(1) }}/5.0</span>
                        </span>
                        <!-- <editRating /> -->
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
                            <FontAwesomeIcon :icon="['far', 'clock-four']" />Duration
                        </span>
                        {{ track.duration }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['fas', 'graduation-cap']" />Courses
                        </span>
                        {{ track.num_courses }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['far', 'user']" />Instructor
                        </span>
                        {{ track.Instructor }}
                    </div>
                    <div>
                        <span>
                            <FontAwesomeIcon :icon="['far', 'calendar']" />Date
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
                    <div v-for="item, i in courses"
                        class=" theme1cont p-1.5  rounded px-4 shadow-sm border-t-0! border-x-0!">
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

    <screen2 @close="showRatingEdit = false, route.name == 'reviews' && router.go(-1)"
        v-if="showRatingEdit || route.name == 'reviews'">
        <form v-if="showRatingEdit" @submit.prevent="handelSubmitReview"
            class="z-20 flex flex-col gap-8 items-start justify-center w-max500 overflow-clip theme1cont mt-20 px-8 py-8 rounded">
            <closeRow @close="showRatingEdit = false" />
            <h1 class=" text-3xl">Rate This Track</h1>
            <editRating @star="e => { ratingData.rating = e }" :num_stars="ratingData.rating"
                :key="ratingData.rating" />
            <quill_input @inputed="e => ratingData.review = e" placeholder="Review (Optional)" />
            <blueButton :is-load="ratingData.loading" class=" w-full">
                <template #label>
                    Submit
                </template>
            </blueButton>
        </form>
        <div v-else class=" w-max500   z-30 theme1cont p-8 mt-12 ">
            <h1 class=" text-4xl font-[500] mb-6">
                {{ track.num_rating }} Review{{ parseInt(track.num_rating + '') != 1 ? 's' : '' }}
            </h1>
            <div class=" w-full flex flex-col gap-3 mb-8">
                <div v-for="i in 5" class=" w-full flex gap-2">
                    {{ i }}
                    <div class=" w-full relative flex  shadow-sm bg-neutral-200 darkmode:bg-neutral-600 rounded-sm">
                        <span
                            :style="{ width: ((parseInt(ratingDetailes[i] + '') / parseInt(track.num_rating) * 100) + '') + '%' }"
                            class="w-[0] py-0.5 h-full bg-amber-400 rounded-sm"></span>
                    </div>
                </div>
            </div>
            <paginationList :params="{ track: id }" class="  w-full" component="div" url="reviews">
                <template #items="{ item, i }">
                    <!-- {{ item }} -->
                    <div
                        class="theme1cont darkmode:text-white1 text-black flex flex-col items-start justify-start theme1cont shadow-sm my-2 p-4 w-full">
                        <div class="flex gap-2">
                            <avatarImage :url="getImageUrl(item.image)" />
                            <span>{{ item.firstName }} {{ item.lastName }}</span>
                        </div>
                        <div>
                            <rating :rating="item.rating" />
                        </div>
                        <div v-html="item.review"></div>
                        <div class=" flex justify-end">
                            <span>{{ item.created_at }}</span>
                        </div>
                    </div>
                </template>
            </paginationList>
        </div>
    </screen2>
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
