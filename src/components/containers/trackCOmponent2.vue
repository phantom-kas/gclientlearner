<script setup lang="ts">
import { anyCurrency, getImageUrl } from '@/composabels/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import dropdown from '../menus/dropdown.vue';
// import { ref } from 'vue';
import { onBeforeMount, ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    track: {
        type: Object as PropType<{
            duration: string,
            name: string,
            // courses: string,
            image: string,
            price: string | number,
            num_courses?: number,
            id: string | number,
            Instructor: string,
            description: string
        }>,
        default: {
            name: 'Data Science',
            duration: '12 weeks',
            // courses: ['NodeJs', 'ReactJs'],
            image: '../../assets/images/t1.png',
            price: '1000000',
            num_courses: 0,
            id: 1,
            Instructor: '',
            description: ''
        },

    }
    , showInstructor: {
        type: Boolean,
        default: true
    }
    , showDropDown: {
        type: Boolean,
        default: true
    }
})

const courseStlye = (c: string) => c.toLocaleLowerCase()
const router = useRouter()
// const courses = ref<string[]>([])
onBeforeMount(() => {

    // courses.value = props.track.courses ? props.track.courses.split(',', 2) : []
})

const emit = defineEmits(['edit', 'delete', 'editImage'])

const cc = () => {
    window.alert('12')
}
</script><template>
    <!-- {{ props.track.courses }} -->
    <!-- {{ track }} -->
    <router-link :to="{ name: 'track', params: { id: track.id } }"
        class="trackEl flex flex-col items-start justify-start  rounded-sm theme1cont relative overflow-clip">
        <img :src="getImageUrl(track.image)" alt="" class=" w-full">

        <div class="p-2 flex flex-col gap-y-3 w-full">
            <h2 class=" text-sm font-[600] leading-4">{{ track.name }}</h2>
            <div class=" w-full break-words description text-xs" v-html="track.description"></div>

        </div>
        <div class=" mt-auto p-2">
            {{ anyCurrency(track.price) }}
        </div>

    </router-link>
</template>


<style scoped>
.trackEl {
    box-shadow: 0px 6.3px 12.59px 0px rgba(0, 0, 0, 0.15);
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