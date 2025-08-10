<script setup lang='ts'>
import { onMounted, ref, type PropType } from 'vue';
import paginationList from './paginationList.vue';
import { useStyleTag } from '@vueuse/core';



// useStyleTag
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
        default: 10
    },
    listMapper: {
        type: Object as PropType<{ [key: string]: any }[]>,
        // default: () => [{ key: 'id', title: 'ID' }]
    },
    headers: {
        types: Array,
        default: () => []
    },
    bearkPoint: {
        type: String,
        default: '500px'
    },
    showSelect: {
        type: Boolean,
        default: false
    }, actionCol: {
        type: Boolean,
        default: false
    }
})

const vTitles = ref([] as string[])


onMounted(async () => {
    if (props.headers.length > 0) {
        vTitles.value = props.headers
        return
    }
    if (!props.listMapper) return
    for (let index = 0; index < props.listMapper.length; index++) {
        vTitles.value.push(props.listMapper[index]['title'])
    }
})

const { id, css, load, unload, isLoaded } = useStyleTag(`

    @container (width < ${props.bearkPoint}) {
       table#p1{
        flex-direction: column;
         display: flex;
         row-gap: 1rem
       }
    }

    

`)

const emit = defineEmits(['fullList', 'clicked','paginationList'])
</script>
<template>
    <div class="w-full flex-col flex gap-y-4 @container">

        <paginationList @paginationList="e=>emit('paginationList', e)" @fullList="e => emit('fullList', e)" id="p1" :class="$attrs" :url :params :id-param :component
            :items-per-page
            class="w-full text-sm   text-left rtl:text-right text-neutral-500 dark:text-neutral-400 table-auto">
            <template #table_header>
                <thead
                    class="text-xs text-neutral-700 uppercase w-full bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-400 @[1px]:hidden">

                    <tr>
                        <th v-if="showSelect"></th>
                        <th class="px-6 py-3" v-html="x" v-for="x, i in vTitles" :key="i"></th>
                        <th v-if="actionCol"></th>
                    </tr>


                </thead>
            </template>
            <template #items="{ item, i }">
                <tr @click="$emit('clicked', item)"
                    :class="{ 'bg-blue-500 text-black': item._selected, 'odd:bg-neutral-100 odd:dark:bg-neutral-900 @[1px]:bg-[unset]! @[1px]:odd:bg-[unset]': !item._selected }"
                    class=" border-b dark:border-neutral-700 border-neutral-200  @[1px]:flex @[1px]:flex-col  @[1px]:my-4">
                    <th v-if="showSelect" scope="col" class="p-4">
                        <div class="flex items-center">
                            <input @change="e => item._selected ? item._selected = false : item._selected = true"
                                id="checkbox-all-search" type="checkbox"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <td class="px-6 py-3 @[1px]:py-2 @[1px]:flex  @[1px]:flex-row justify-between items-center"
                        v-for="n, j in listMapper" :key="j">
                        <div v-html="n.title" class="w-full hidden @[1px]:block @[1px]:w-full">

                        </div>
                        <slot v-if="n.key != '_allItems'" :name="n.key" v-bind="{ item: item[n.key], index: i }">
                            <div v-html="item[n.key]" class="w-full @[1px]:text-end">
                            </div>
                        </slot>
                        <slot v-else :name="n.slotName ?? n.title" v-bind="{ item, i }">
                            <div v-html="item" class="w-full @[1px]:text-end">
                            </div>
                        </slot>
                    </td>

                    <td @click.stop v-if="actionCol">
                        <div class="flex justify-end px-6 py-2">
                            <slot name="action" v-bind="{ item, i }">

                            </slot>
                        </div>

                    </td>
                    <!-- {{item}} -->
                </tr>
            </template>
        </paginationList>


    </div>


</template>
<style></style>