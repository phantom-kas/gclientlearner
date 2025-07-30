<script setup lang='ts'>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import trackCOmponent2 from '../containers/trackCOmponent2.vue';

const props = defineProps({
    limit: {
        type: Number,
        default:2,
        
    }
})

const tracks = ref([] as any[])
const hasLoaded = ref(false)
onMounted(() => [
    axios.get('/tracks', { params: { limit:props.limit } }).then((res) => {
        if (res.data.status != 'success') return
        tracks.value = res.data.data
        hasLoaded.value = true
    })
])
</script>
<template>
    <div v-if="hasLoaded" class="w-full grid grid-cols-3 gap-x-4">

        <template v-for="t, i in tracks" :key="t.id">
            <slot name="item" v-bind="{ item: t, i: i }">
                <trackCOmponent2 :track="t" />
            </slot>
        </template>
    </div>
</template>
<style scoped></style>