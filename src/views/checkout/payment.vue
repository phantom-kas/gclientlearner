<script setup lang='ts'>
import PaystackPop from '@paystack/inline-js'
import axios from 'axios'

const props = defineProps({
    id: {
        type: String,
        default: null
    }
})

const handelInitPs = () => {
    axios.get('init-paystack/'+props.id as string,  { _showAllMessages:true, _load2: true })
        .then(res => {
            const popup = new PaystackPop()
            popup.resumeTransaction(res.data.data.access_code).callbacks.onSuccess = () => {
                axios.get('process-paystack/' +res.data.data.reference, { _showAllMessages:true, _load2: true })
                    .then(res => {
                        if (res.data.status == 'success') {
                        }
                    })
            }
        })
}
</script>
<template>
    <div
        class=" flex flex-col justify-center items-center p-13 bg-blue darkmode:bg-neutral-900 w-full text-3xl font-[700] text-white">
        Select Payment Method
    </div>
    <section class="plr flex flex-col items-center justify-start w-full py-25">
        <h1 class="w-max1000 font-[500] text-3xl mb-6">
            Complete payment
        </h1>

        <div  class=" flex flex-row gap-y-4 gap-x-4  w-max1000 items-start justify-between  flex-wrap">
            <div class=" flex justify-center items-center p-10 rounded-2xl theme1cont shadow-md grow w-max100">
                Stripe
            </div>
            <div @click="handelInitPs" class=" flex justify-center items-center p-10 rounded-2xl theme1cont shadow-md grow w-max100">
                Paystack
            </div>
        </div>
    </section>

</template>
<style scoped></style>