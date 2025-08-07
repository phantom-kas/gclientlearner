<script setup lang='ts'>
import input2 from '@/components/form_components/input2.vue';
import blueButton from '@/components/buttons/blueButton.vue';
import buttonWhite from '@/components/buttons/buttonWhite.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
<template>
    <section class=" flex flex-col items-center justify-end w-full  sm:pt-15 ">
        <div
            class=" flex  sm:flex-row flex-col justify-between sm:justify-start items-center sm:items-start w-max1200 plr py-30 gap-10">
            <div class=" flex flex-col items-center justify-start w-max300">
                <div class="w-[300px] h-[300px] relative">
                    <img src="../../assets/images/womanbag.jpg" alt="" class=" w-full h-full rounded-[50%]" />

                    <div class=" absolute w-13 h-13 rounded-4xl right-0 bottom-0 flex flex-col justify-center items-center text-white3 theme1cont cursor-pointer">
                        <FontAwesomeIcon size="2x" :icon="['fas','pencil']"/>
                    </div>
                </div>
                <span class=" mt-2">John Doe</span>
                <span>Learner</span>
            </div>

            <div class=" grow flex flex-col gap-8 items-center justify-start theme1cont px-4 py-8">
                <h1 class=" font-[600] text-3xl text-start w-full">
                    Profile
                </h1>
                <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                    <input2 class=" w-max200 grow" name="firstName" />
                    <input2 class=" w-max200 grow" name="firstName" />
                </div>
                <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                    <input2 class=" w-max200 grow" name="firstName" />
                    <input2 class=" w-max200 grow" name="firstName" />
                </div>



                <h1 class=" font-[600] text-3xl text-start w-full mt-9">
                    Change Password
                </h1>
                <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                    <input2 class=" w-max200 grow" name="firstName" />
                    <input2 class=" w-max200 grow" name="firstName" />
                </div>
                <div class=" w-full flex flex-row gap-4 justify-between flex-wrap">
                    <blueButton>
                        <template #label>
                            Save changes
                            <FontAwesomeIcon :icon="['fas', 'plus']" />

                        </template>
                    </blueButton>
                    <buttonWhite>
                        Cancel
                    </buttonWhite>
                </div>

            </div>


        </div>
    </section>
</template>
<style scoped></style>