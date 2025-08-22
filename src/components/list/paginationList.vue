<script setup lang='ts'>
import axios from 'axios';
import { computed, onMounted, ref, type PropType } from 'vue';
import painationElement from './painationElement.vue';
import place_holder_plan from '../place_holder_plan.vue';
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
const emit = defineEmits(['fullList', 'paginationList'])
const lastId = ref<string | undefined>(undefined)
const loading =  ref(false)
let loadedPages = [] as any[]
const fetchContent = async (order = 1) => {
    if (loading.value) {
        return
    }
    if (loadedPages[data.value['currentPage'] * props.itemsPerPage] != undefined) {
        // console.log(data.value['currentPage'] * props.itemsPerPage)/
        console.log('***************Load page ' + data.value['currentPage'] + ' From Memory*************')
        let start = (data.value['currentPage'] - 1) * props.itemsPerPage
        listItems.value = loadedPages.slice(start, props.itemsPerPage + start)
        // console.log(listItems.value)
        // lastId.value = loadedPages[data.value['currentPage']][props.itemsPerPage - 2][props.idParam]
    }
    else {
        loading.value = true
        await axios.get(props.url as string, { params: { ...props.params, limit: props.itemsPerPage, lastId: lastId.value } }).then(res => {
            if (res.data.status != 'success') { loading.value = false; return }

            if (data.value['currentPage'] > 1) {
                loadedPages = loadedPages.concat(res.data.data.slice(1))
            } else {
                loadedPages = loadedPages.concat(res.data.data)
            }
            listItems.value = res.data.data

        }).then(() => {
            loading.value = false
        })
    }

    // console.log((data.value['currentPage'] * props.itemsPerPage))
    console.log(loadedPages)
    // console.log((data.value['currentPage'] * props.itemsPerPage))
    if (loadedPages[(data.value['currentPage'] * props.itemsPerPage)] == undefined) {
        lastId.value = undefined
        data.value.showNext = false
        return
    } else {
        data.value.showNext = true
    }
    lastId.value = loadedPages[(data.value['currentPage'] * props.itemsPerPage) - 1][props.idParam]

}
const data = ref({ currentPage: 1, showNext: true })
const paginatedItems = computed(() => {
    // const start = (data.value.currentPage - 1) * props.itemsPerPage
    return listItems.value.slice(0, props.itemsPerPage)
})

onMounted(async () => {
    await fetchContent()
    emit('fullList', listItems)
    emit('paginationList', loadedPages)

})
</script>
<template>
    <!-- {{ data }} -->
    <painationElement :disabled="loading" @prev="fetchContent(-1)" @changePage="fetchContent()" v-if="showPaginationControls" :data
        :itemsPerPage />
    <component v-bind="$attrs" :is="component" class="w-full @container overflow-x-clip">
        <slot name="table_header">
        </slot>
        <transition-group name="list">
            <template v-for="item, i in paginatedItems" :key="item[idParam]">
                <slot name="items" v-bind="{ item, i }">
                    {{ item }}
                </slot>
            </template>
        </transition-group>
    </component>
    <painationElement @changePage="fetchContent()" v-if="showPaginationControls" :data :itemsPerPage />
</template>
<style scoped></style>