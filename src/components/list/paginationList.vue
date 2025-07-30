<script setup lang='ts'>
import axios from 'axios';
import { computed, onMounted, ref, type PropType } from 'vue';
import painationElement from './painationElement.vue';
const props = defineProps({
    url: {
        type: String,
    },
    params: {
        type: Object as PropType<{ [key: string]: any } | undefined>,
        default: undefined
    },
    idParam: {
        type: String,
        default: 'id'
    },
    component: {
        type: String,
        default: 'table'
    },
    itemsPerPage: {
        type: Number,
        default: 50
    },
    showPaginationControls: {
        type: Boolean,
        default: true
    }
})




const listItems = ref<any[]>([])
const emit = defineEmits(['fullList'])
// const thisPageItems = ref<any[]>([])
const lastId = ref<string | undefined>(undefined)
const loaded = ref(false)
const fetchContent = async () => {
    return await axios.get(props.url as string, { params: { ...props.params, limit: props.itemsPerPage, lastId: lastId.value } }).then(res => {
        if (res.data.status != 'success') return

        listItems.value = res.data.data
        if (res.data.data.length < props.itemsPerPage + 1) {
            lastId.value = undefined
            data.value.showNext = false
            return
        } else {
            data.value.showNext = true
        }
        lastId.value = res.data.data[props.itemsPerPage - 2][props.idParam]
    })
}
const data = ref({ currentPage: 1, showNext: true  })
const paginatedItems = computed(() => {
    // const start = (data.value.currentPage - 1) * props.itemsPerPage
    return listItems.value.slice(0, props.itemsPerPage)
})

onMounted(async () => {
    await fetchContent()
    emit('fullList', listItems)

})
</script>
<template>
    <!-- <div class="w-full flex flex-col gap-y-4"> -->
    <painationElement @changePage="fetchContent()" v-if="showPaginationControls" :data :itemsPerPage />
    <component v-bind="$attrs" :is="component" class="w-full @container">
        <slot name="table_header">

        </slot>
        <!-- <tbody> -->
            <!-- {{ lastId}} -->
        <transition-group name="list">

            <template v-for="item, i in paginatedItems" :key="item[idParam]">
                <slot name="items" v-bind="{ item, i }">
                    {{ item }}
                </slot>
            </template>
        </transition-group>
        <!-- {{ data }}
        {{ lastId }}
        {{ idParam }} -->
        <!-- </tbody> -->
    </component>
    <painationElement @changePage="fetchContent()" v-if="showPaginationControls" :data :itemsPerPage />
    <!-- </div> -->
</template>
<style scoped></style>