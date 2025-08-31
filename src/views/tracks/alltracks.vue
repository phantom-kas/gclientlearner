<script setup lang="ts">
import alltracks_el from './alltracks_el.vue';
import buttonLoads from '@/components/buttons/buttonLoads.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import search_input from '@/components/form_components/search_input.vue';
import { useRoute, useRouter } from 'vue-router';
// import createTrack from './createTrack.vue';
// import screen2 from '@/components/container/screen2.vue';
import { onMounted, ref } from 'vue';
// import confrimComponent from '@/components/confrimComponent.vue';
import axios from 'axios';
// import image_picker from '@/components/form_components/image_picker.vue';
import { debounce } from '@/composabels/utilities';
const route = useRoute()
const router = useRouter()
const showConfirm = ref(false)
let tracks = ref([] as any[])
const track = ref()
const handelDelete = () => {
    axios.delete('/track/' + track.value.id, { _showAllMessages: true }).finally(() => { }).then(res => {
        if (res.data.status != 'success') return

        showConfirm.value = false
        console.log(track.value)
        console.log(tracks.value)
        console.log(tracks)
        tracks.value.splice(track.value.i, 1)
    })
}

// const image = ref(null as { img: any } | null)
const showImagePicker = ref(false)

const handelImageChange = async (e: any) => {
    let blob = e.img;
    showImagePicker.value = false;
    let Url = URL.createObjectURL(e.img);
    if (await handelImageUpdate(blob)) {
        router.go(-1)
        console.log(track.value.i);
        tracks.value[track.value.i]['image'] = Url
        showImagePicker.value = false
    }
}
const handelImageUpdate = (file: any) => {
    return axios.put('/track/image/' + route.params.id, { file }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }, _showAllMessages: true, _load: true
    }).then(res => {
        if (res.data.status != 'success') return

        return true
    })
}

const cc = () => {
    window.alert('dasdas')
}

const handelEdit = (e: any) => {
    console.log(track.value)
    tracks.value[track.value.i] = {
        id: track.value.id,
        price: e.price,
        name: e.name,
        image: track.value.url,
        duration: e.duration,
        courses: track.value.courses,
        num_courses: track.value.num_courses,
        Instructor: e.Instructor,
        created_at: 'Just Now',
    }
    console.log(tracks.value[track.value.i])
    router.go(-1)
}


const listKey = ref(0)
let listParams = { search: undefined as undefined | string }
const searchFn = debounce((e: string) => {
    console.log(e[0])
    listParams = { search: e[0] }
    listKey.value += 1
}, 500);


onMounted(() => {
    window.scrollTo(0, 0);
})
</script>
<template>
    <section class="plr flex flex-col items-center justify-start w-full py-25">
        <div class=" flex flex-col gap-y-4  w-max1200 items-center ">
            <form @submit.prevent="" class=" w-full flex flex-row justify-center flex-wrap gap-7">
                <!-- <search_input @input="e => searchFn(e.value)" /> -->
                <search_input class=" w-max700" @input="(e: any) => searchFn(e)" />
                <!-- <search_input @input="e => searchFn(e)" /> -->


            </form>
            <!-- {{tracks}} -->
            <!-- {{ track }} -->
            <!-- {{ listParams }} -->
            <alltracks_el :params="listParams" :key="listKey"
                @edit="e => { track = e; router.push({ name: 'edit-track', params: { id: e.id } }) }"
                @editImage="e => { track = e; router.push({ name: 'edit-track-image', params: { id: e.id } }) }"
                @delete="e => { track = e; showConfirm = true }" @fullList="e => tracks = e" class=" w-full" />
        </div>
    </section>

</template>
<style scoped></style>