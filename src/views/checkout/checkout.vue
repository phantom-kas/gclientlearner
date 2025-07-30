<script setup lang='ts'>
import tracks3 from '@/components/tracks/tracks3.vue';
import search_input from '@/components/form_components/search_input.vue';
import input2 from '@/components/form_components/input2.vue';
import select2 from '@/components/form_components/select2.vue';
import { ref } from 'vue';
import quill_input from '@/components/form_components/quill_input.vue';
import range from '@/components/form_components/range.vue';
import { anyCurrency } from '@/composabels/utilities';
import blueButton from '@/components/buttons/blueButton.vue';
const data = ref({} as any)
</script>
<template>
    <div
        class=" flex flex-col justify-center items-center p-13 bg-blue darkmode:bg-neutral-900 w-full text-3xl font-[700] text-white">
        Checkout
    </div>
    <section class="plr flex flex-col items-center justify-start w-full py-25">
        <h1 class="w-max1000 font-[500] text-3xl mb-6">
            Complete payment
        </h1>
        <div class=" flex sm:flex-row gap-y-4 gap-x-4  w-max1000 items-start justify-between flex-col">

            <div class=" p-5 w-min495 theme1cont gap-y-4 flex flex-col relative grow">
                <input2 :icon="['far', 'user']" class="w-full" :data label="First Name" name="firstName" />
                <input2 :icon="['far', 'user']" class="w-full" :data label="Last Name" name="lastName" />
                <input2 :icon="['far', 'envelope']" class="w-full" :data label="Email" name="email" />
                <!-- <input2 :icon="['fas', 'graduation-cap']" class="w-full" :data label="First Name" name="fname"/> -->
                <select2 :icon="['far', 'user']" :data label="Gender" class="w-full" name="gender"
                    :options="[{ value: 'male', label: 'Male' }, { value: 'femal', label: 'Female' }]" />
                <input2 :icon="['fas', 'person']" class="w-full" :data label="First Name" name="fname" />
                <input2 :icon="['fas', 'phone']" class="w-full" :data label="Phone" name="phone" type="tel" />

                <select2 class="w-full" :icon="['fas', 'location-dot']" :data label="Location" name="location"
                    :options="[{ value: 'Ioi', label: 'asdsa' }]" />
                <quill_input label="Bio" placeholder="Bio" />
            </div>

            <div class="p-5  flex flex-col gap-y-5 theme1cont w-[min(350px,100%)]">
                <span class=" font-[600] text-2xl">
                    {{ anyCurrency(350 * 100) }}
                </span>
                <range label="Select amount" class=" w-full py-2">
                    <template #value="{ value }">
                        {{ anyCurrency(value * 100) }}
                    </template>
                </range>
                <blueButton class=" w-full">
                    <template #label>
                        Complete my purchase
                    </template>
                </blueButton>
            </div>
        </div>
    </section>
</template>
