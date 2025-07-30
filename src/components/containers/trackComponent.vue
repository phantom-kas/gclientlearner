<script setup lang="ts">
import { anyCurrency } from '@/composabels/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import dropdown from '../menus/dropdown.vue';
// import { ref } from 'vue';
import { onBeforeMount, ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    track: {
        type: Object as PropType<{
            duration: string,
            title: string,
            courses: string,
            url: string,
            price: string | number,
            num_courses?: number,
            id: string | number,
            Instructor: string
        }>,
        default: {
            title: 'Data Science',
            duration: '12 weeks',
            courses: ['NodeJs', 'ReactJs'],
            url: '../../assets/images/t1.png',
            price: '1000000',
            num_courses: 0,
            id: 1,
            Instructor: ''
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
const courses = ref<string[]>([])
onBeforeMount(() => {

    courses.value = props.track.courses ? props.track.courses.split(',', 2) : []
})

const emit = defineEmits(['edit', 'delete', 'editImage'])

const cc = () => {
    window.alert('12')
}
</script><template>
    <!-- {{ props.track.courses }} -->
    <router-link :to="{name:'track',params:{id:track.id}}" class="flex flex-col items-start justify-center  rounded-t-2xl theme1cont relative">
        <img :src="track.url" alt="" class="rounded-t-2xl">
        <span class=" absolute right-4 text-sm  theme1cont top-4 px-2.5 rounded-2xl py-1">{{ anyCurrency(track.price)
        }}</span>
        <div class="p-5 flex flex-col gap-y-3 w-full">
            <h2 class=" text-[18px] font-[600]">{{ track.title }}</h2>
            <span class=""> <font-awesome-icon :icon="['far', 'calendar']" />
                {{ track.duration }}</span>
            <span v-if="showInstructor" class=" mt-1"> <font-awesome-icon :icon="['far', 'user']" />
                {{ track.Instructor }}</span>
            <div class="w-full flex flex-row justify-start items-center gap-x-4 mt-2">
                <span v-for="course in courses" :key="course" :class="courseStlye(course)"
                    class="  rounded-xl flex items-center justify-center bg-BlueLightest text-green-deep font-[500] text-xs py-1 px-5">
                    {{ course }}
                </span>
                {{ track.num_courses ? track.num_courses > 2 ? '+' + (track.num_courses - 2) + ' more' : '' : '' }}
            </div>

            <slot name="action">
                <div @click.stop.prevent v-if="showDropDown" class="w-full flex justify-end text-[14px]">
                    <dropdown @editImage="emit('editImage', { ...track })" @edit="emit('delete', { ...track })"
                        @delete="emit('edit', { ...track })" :options="[
                            { icon: ['fas', 'pencil-alt'], label: 'Edit', emit: 'edit' },
                            { icon: ['fas', 'file-pen'], label: 'Edit Image', emit: 'editImage' },
                            { icon: ['far', 'trash-can'], label: 'Delete', emit: 'delete' }
                        ]" />
                </div>
            </slot>
        </div>


    </router-link>
</template>


<style scoped>
@import "tailwindcss";

.nodejs {
    background: #ECFDF3;
    background: rgba(114, 117, 116, 0.445);
    color: #027A48;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.reactjs {
    color: #6941C6;
    background: #F3F0FB;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.azure {
    color: #026AA2;
    background: #F0F9FF;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.aws {
    color: #363F72;
    background: #F8F9FC;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.powerb1 {
    color: #C11574;
    background: #F7EDF6;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }
}

.python {
    color: #175CD3;
    background: #E9F3FB;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}

.figma {
    background: #FFF4ED;
    color: #B93815;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}

.sketch {
    background: #FFF1F3;
    color: #C01048;

    @variant dark {
        background: rgba(114, 117, 116, 0.3);
    }

}
</style>