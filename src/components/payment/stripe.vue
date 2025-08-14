<script setup lang='ts'>
import axios from 'axios';
import { onMounted, onUnmounted, toRaw } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadStripe } from '@stripe/stripe-js';
import overlayfixed from '../overlayfixed.vue';
import screen2 from '../container/screen2.vue';
// import { StripeEmbeddedCheckout } from '@stripe/stripe-js';
import spinLinePules from '../spinners/spinLinePules.vue';
// "https://js.stripe.com/v3";
function loadStripeScript() {
    return new Promise<void>((resolve, reject) => {
        if (document.getElementById("stripe-script")) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.id = "stripe-script";
        script.src = "https://js.stripe.com/v3";
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
    });
}
let sid = '';
let cid = ''
let pubk: string
const emit = defineEmits(['success', 'error', 'close'])
const props = defineProps({
    url: { type: String },
    successUrl: { type: String },
    data: Object,
    pk: { type: String, default: '' }
})
let stripe: any;
let checkoutObj: any = null;
const stripeSuccess = async () => {
    return axios.get(props.successUrl + '/' + sid as string, { _load2: true, _showAllMessages: true }).then((res) => {
        if (res.data.status == 'success') {
            emit('success')
        } else { emit('error') }
    })
}
onMounted(async () => {
    await fetchClientSecret()
    initCheckout()
    return
})

// let stripe 
async function fetchClientSecret() {
    let l = await axios.get(props.url as string, props.data)
        .then(res => {
            if (res.data.status == 'success') {
                sid = res.data.data.sessionid
                pubk = res.data.data.pk
                cid = res.data.data.client_secret
                return res.data.data.client_secret
            }
            return ['', '']
        })

    return l
}

function setiiocClientSecretFn() {
    return new Promise<string>(function (resolve, reject) {
        resolve(cid);
    });
}


const initCheckout = async () => {
    const stripe = await loadStripe(pubk as string);
    if (!stripe) return;

    stripe.initEmbeddedCheckout({
        fetchClientSecret: setiiocClientSecretFn
        , onComplete: () => {
            stripeSuccess()
        }

    }).then(function (checkout) {
        checkoutObj = checkout
        // checkoutObj.
        checkoutObj.mount('#checkout');
    });
}

const handelClick = () => {
    if (!checkoutObj) {
        emit('close')
        return
    }
    checkoutObj.unmount();
    checkoutObj.destroy();
    emit('close')
}


onUnmounted(() => {
    handelClick()
})


const unmount = () => {
    checkoutObj.unmount();
    checkoutObj.destroy();
}

</script>
<template>
    <div @close="unmount(), emit('close')"
        class="absolute l-9 flex flex-col left-0 top-0 z-[910] w-screen h-screen  items-center overflow-scroll py-6 mt-13">
        <overlayfixed @click="emit('close')" class=" z-50" />

        <div id='' class="w-max1000 flex flex-col payc justify-start items-center relative z-50">
            <!-- <div class="flex w-full justify-end items-center">
                <div @click="handelClick()">
                    <FontAwesomeIcon class='col_black' size="xl" :icon="['fas', 'xmark']" />
                </div>
            </div> -->
            <div id="checkout" class="w-full z-50 relative">

            </div>
            <!-- <spinLinePules/> -->
        </div>
    </div>


</template>
<style scoped>
.payc {}

.dsdsds {

    max-height: 100%;
    overflow: scroll;

}

@media screen and (min-width:900px) {
    .dsdsds {
        padding-block: 5rem;
    }
}
</style>