<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import IconWonamPose from '../icons/IconWonamPose.vue';
import iconWomanStand from '../icons/iconWomanStand.vue';
import iconRound from '../icons/iconRound.vue';
import icongradgap from '../icons/icongradgap.vue';
import Alltracks from '../tracks/alltracks.vue';
import trackCOmponent2 from '../containers/trackCOmponent2.vue';
import tracks3 from '../tracks/tracks3.vue';
</script>
<template>
    <section class="plr flex flex-col items-center justify-start w-full py-25">
        <div class=" flex flex-col-reverse lg:flex-row gap-y-20  w-max1200 justify-between gap-x-15">

            <div class=" flex flex-col gap-y-2 items-center w-full lg:w-[47%]">
                <div
                    class=" border-l-4 border-l-blue flex flex-row justify-start rounded-md p-3 gap-x-4 theme1cont shadow-xl w-full">
                    <div class=" text-blue p-2">
                        <FontAwesomeIcon size="3x" :icon="['fas', 'right-to-bracket']" />
                    </div>

                    <div class=" grow flex flex-col gap-y-3 text-sm gap-x-4">
                        <h3 class=" font-[700] text-xl">Sign Up and Choose Your Course</h3>
                        <span>Create your account quickly with just your email or social media login, then explore a
                            wide range </span>
                    </div>
                </div>
                <span class=" text-blue">
                    <FontAwesomeIcon class="" size="3x" :icon="['fas', 'arrow-down']" />
                </span>
                <div
                    class=" border-l-4 border-l-blue flex flex-row justify-start rounded-md p-3 gap-x-4 theme1cont shadow-xl w-full">
                    <div class=" text-blue p-2">
                        <iconRound />
                    </div>
                    <div class=" grow flex flex-col gap-y-3 text-sm gap-x-4">
                        <h3 class=" font-[700] text-xl">Sign Up and Choose Your Course</h3>
                        <span>Create your account quickly with just your email or social media login, then explore a
                            wide range </span>
                    </div>
                </div>
                <span class=" text-blue">
                    <FontAwesomeIcon class="" size="3x" :icon="['fas', 'arrow-down']" />
                </span>

                <div
                    class=" border-l-4 border-l-blue flex flex-row justify-start rounded-md p-3 gap-x-4 theme1cont shadow-xl w-full">
                    <div class=" text-blue p-2">
                        <icongradgap />
                    </div>
                    <div class=" grow flex flex-col gap-y-3 text-sm gap-x-4">
                        <h3 class=" font-[700] text-xl">Sign Up and Choose Your Course</h3>
                        <span>Create your account quickly with just your email or social media login, then explore a
                            wide range </span>
                    </div>
                </div>
            </div>

            <div class=" flex flex-col gap-y-10 w-full lg:w-[47%] font-[600] shadow-xl px-8 py-8 grow rounded-2xl ">
                <div class=" flex flex-col  sm:flex-row justify-between gap-x-4 gap-y-10">
                    <div class=" max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
                        <span class=" text-center flex flex-col justify-center items-center text-xl">
                            <span >1</span>
                            Secure Login
                        </span>
                        <IconWonamPose />
                    </div>
                    <div class=" max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
                        <span class=" text-center flex flex-col justify-center items-center text-xl">
                            <span >2</span>
                            <span>Secure Login</span>
                        </span>
                        <iconWomanStand />
                    </div>
                </div>

                <div class=" flex flex-col justify-start items-start w-full gap-y-5">
                    <span class=" flex flex-col items-center sm:items-center justify-center w-full sm:w-[unset] text-xl">
                        <span >3</span>
                        <span>Choose a course</span>
                    </span>

                    <!-- <div class=" w-full bg-amber-300"> -->
                    <tracks3 />
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>