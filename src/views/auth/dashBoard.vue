<script setup lang='ts'>
import { getImageUrl } from '@/composabels/utilities';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import trackReviews from '../tracks/track-reviews.vue';

const tracks = ref([] as any[])
const ratingDetailes = ref({} as { [key: string]: string | number })

const track = ref({ id: null } as { [key: string]: any })
const courses = ref([] as any[])
const dispalyRatingData = ref(null as number | null)

const getTrack =async (id: string) => {
    let url = "learner/track/" + id
  return  axios.get(url).finally(() => {
    }).then(res => {
        if (res.data.status != 'success') return

        track.value = res.data.data.track[0]
        courses.value = res.data.data.courses
        dispalyRatingData.value = parseInt(track.value.total_ratings + '') / parseInt(track.value.num_rating + '')
        if (track.value.ratings_deatails)
            ratingDetailes.value = JSON.parse(track.value.ratings_deatails)
    })
}

const hasLoaded = ref(false)
onMounted(async () => {

    await axios.get("learner/tracks").then(async res => {
        if (res.data.status != 'success') return
        tracks.value = res.data.data
        // track.value = res.data.data[0]
        await getTrack(res.data.data[0].id)
    })
    hasLoaded.value = true
})
</script>
<template>
    <section class=" flex flex-col items-center justify-end w-full  sm:pt-15 ">
        <div class=" flex   flex-col justify-between  items-center sm:items-start w-max1200 plr py-10 ">

            <h1 class=" font-[600] text-3xl text-start w-full mb-4">Enrolled Tracks</h1>
            <div class=" w-full  gap-4 grid grid-cols-[repeat(auto-fit,minmax(100px,auto))] ">
                <button @click="getTrack(t.id)" :class="{ ' ring-6 not-darkmode:ring-black': track?.id == t.id }"
                    class="p-3  text-white not-darkmode:bg-blue darkmode:bg-gray-950 rounded-sm cursor-pointer font-[400] n  darkmode:hover:bg-blue-950 not-darkmode:hover:bg-blue-500"
                    v-for="t in tracks">
                    {{ t.name }}
                </button>
            </div>

            <template v-if="track.id">
                <div :key="track?.id" class=" w-full mt-20">
                    <h1 class=" font-[600] text-3xl text-start w-full mb-4">Courses </h1>
                    <template v-if="courses.length > 0">
                        <div class="grid gap-10  grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,300px))]">
                            <!-- {{ courses }} -->

                            <div v-for="c in courses" class="flex flex-col  relative shadow-xl">
                                <img class=" w-full" :src="getImageUrl(c.image)" />
                                <div class=" p-4 theme1cont rounded-2xl">
                                    <h1 class=" font-[400] text-sm text-start w-full mb-4"> {{ c.title }}</h1>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-else
                        class="py-8 w-full text-center border theme1cont rounded-xl justify-center  items-center flex">

                        <h1 class="  font-[600] text-2xl text-center w-full mb-4">
                            This track has no courses
                        </h1>
                    </div>
                </div>

                <trackReviews v-if="track.id" class=" w-full mt-12" :key="track.id" :track :id="track.id" />
            </template>
        </div>
    </section>


</template>
<style scoped></style>