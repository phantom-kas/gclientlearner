<script setup lang='ts'>
import { anyCurrency } from '@/composabels/utilities'
import PaystackPop from '@paystack/inline-js'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import stripe from '../../components/payment/stripe.vue'
import { useRouter } from 'vue-router'
const props = defineProps({
    id: {
        type: String,
        default: null
    }
})

const router = useRouter()
const handelInitPs = () => {
    axios.get('init-paystack/' + props.id as string, { _showAllMessages: true, _load2: true })
        .then(res => {
            const popup = new PaystackPop()
            popup.resumeTransaction(res.data.data.access_code).callbacks.onSuccess = () => {
                axios.get('process-paystack/' + res.data.data.reference, { _showAllMessages: true, _load2: true })
                    .then(res => {
                        if (res.data.status == 'success') {
                        }
                    })
            }
        })
}

const amount = ref(null as null | number)
const rate = ref(null as null | number)

onMounted(async () => {
    await axios.get('invoice/' + props.id).then(res => {
        if (res.data.status != 'success') return
        amount.value = parseFloat(res.data.data.amount + '')
    })

    await axios.get('ghs_rate').then(res => {
        if (res.data.status != 'success') return
        rate.value = parseFloat(res.data.data + '')
    })
})

const showStripe = ref(false)
</script>
<template>
    <stripe @close="router.push({name:'invoices'})" @success="showStripe = false ,router.push({name:'invoices'})" successUrl="process-paystack" :url="'/init-stripe/'+props.id" v-if="showStripe"/>
    <div 
        class=" flex flex-col justify-center items-center p-13 bg-blue darkmode:bg-neutral-900 w-full text-3xl font-[700] text-white">
        Select Payment Method
    </div>
    <section class="plr flex flex-col items-center justify-start w-full py-25">
        
        <h1 class="w-max1000 font-[500] text-3xl mb-6">
            Complete payment
        </h1>

        <div 
            class=" grid gap-y-4 gap-x-4  w-max1000 flex-wrap sm:grid-cols-2 grid-cols-1">
            <div @click="showStripe = true"  v-if="amount " class="  text-center flex justify-center items-center p-10 rounded-2xl theme1cont shadow-md grow hover:ring-blue hover:ring-2 cursor-pointer">
                PAY {{ anyCurrency(amount as number) }}
            </div>
            <div v-if="amount && rate" @click="handelInitPs"
                class=" flex justify-center items-center p-10 rounded-2xl text-center  theme1cont shadow-md grow hover:ring-blue hover:ring-2 cursor-pointer">
                PAY {{ anyCurrency(amount + '', rate as number, 'GHS') }}
            </div>
        </div>
    </section>


</template>
<style scoped></style>