<script setup lang='ts'>
import tabelList from '@/components/list/tabelList.vue';
import search_input from '@/components/form_components/search_input.vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { anyCurrency } from '@/composabels/utilities';

const router = useRouter()

</script>
<template>
    <div class="w-max1200 flex flex-col gap-y-4 pt-10 px-6">
        <form @submit.prevent="" class=" w-full flex flex-row justify-between flex-wrap gap-7">
            <search_input />
        </form>
        <tabelList url="invoices" beark-point="710px" class=" mt-2"
            @clicked="e => e.status != 'paid' && router.push({ name: 'payment', params: { id: e.id } })" action-col
            :listMapper="[
                { key: 'created_at', title: 'Date' },
                { key: 'amount', title: 'Amount', slotName: 'amt' },
                { key: 'paid', title: 'Paid' },
                { key: 'status', title: 'Status' },
            ]">
            <template #amount="{ item, i }">
                <span class=" w-full text-right"> {{ anyCurrency(item) }}</span>
            </template>
            <template #paid="{ item, i }">
                <span class=" w-full text-right"> {{ anyCurrency(item) }}</span>
            </template>
            <template #status="{ item, i }">
                <span
                    class="w-fit text-right capitalize py-1 px-2 font-[500] text-xs rounded-2xl flex items-center justify-center"
                    :class="{ ' bg-amber-400 text-amber-950': item == 'pending', ' bg-green-500 text-green-950': item == 'paid' }">
                    {{ item }}</span>
            </template>
        </tabelList>
    </div>
</template>
<style scoped></style>