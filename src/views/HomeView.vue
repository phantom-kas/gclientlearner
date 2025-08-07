<script setup lang="ts">
import blueButton from '@/components/buttons/blueButton.vue';
import alltracks from '@/components/tracks/alltracks.vue';
import { onMounted, ref } from 'vue';
import IcongraduateFill from '@/components/icons/IcongraduateFill.vue';
import IconGradMan from '@/components/icons/IconGradMan.vue';
import iconClock from '@/components/icons/iconClock.vue';
// import buttonWhite from '@/components/buttons/buttonWhite.vue';
// import Footer from '@/components/footer.vue';
import process from '@/components/common/process.vue';
import Tracks3 from '@/components/tracks/tracks3.vue';
const courses = ref([])

onMounted(() => {

})
</script>
<template>
  <section
    class="flex flex-row justify-center items-start w-full plr relative overflow-clip py-[9vw] bg-linear-to-t  from-sky-500 to-indigo-500 md:bg-none">
    <div class=" w-max1200 flex flex-col items-start justify-center ">
      <div class=" hidden sm:block absolute inset-0 w-full h-full bg overlayhome opacity-30"></div>
      <img src="../assets/images/womanbag.jpg" class=" hidden sm:block w-full absolute  -z-1 -top-[10vw] left-0" />
      <div
        class=" max-sm:py-8 gap-y-4 sm:gap-y-6 flex flex-col items-center lg:items-start justify-center w-full lg:w-[min(700px,100%)] text-white1 z-30">
        <h1 class=" text-lg max-sm:leading-5 sm:text-5xl font-[700] text-center lg:text-start"> Unlock Your Potential
          with
          Industry-Leading Courses!</h1>
        <span class="  font-[400] w-[min(500px,100%)] text-xs sm:text-[25px] sm:leading-7 text-center lg:text-start">
          "Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are
          designed to empower you to succeed."
        </span>
        <blueButton>
          <template #label> Get started</template>
        </blueButton>
      </div>
    </div>
  </section>


  <section class="plr flex flex-col items-center justify-start w-full py-25">
    <div class=" flex flex-col gap-y-4  w-max1200 ">
      <h3 class=" text-center text-3xl font-[700]">
        Our solutions
      </h3>
      <span class=" text-center my-5">Create your account quickly with just your email or social media login, then
        explore
        a wide range </span>
     <Tracks3/>
    </div>
  </section>



  <section class="plr flex flex-col items-center justify-start w-full py-12 bg-blue darkmode:bg-neutral-950 text-white2">
    <div class=" flex flex-col items-center sm:flex-row justify-between gap-y-4 mt-6 w-max1200 relative">
      <div
        class="sm:grow-0 grow shrink self-stretch flex flex-col justify-between items-start gap-y-7 sm:w-[40%] w-full">
        <h4 class="  font-[700] text-3xl w-full ">What will be next step</h4>
        <span class="text-lg">
          Discover our diverse stack of solutions, including software development, data science, and cloud tools. Sign
          up
          today and kickstart your journey!
        </span>

        <div class="w-full grid grid-cols-3 grow">

        </div>
      </div>
      <div class=" grow sm:grow-0 flex  items-end justify-start sm:w-[40%] w-[min(300px,50%)] relative">
        <img src="../assets/images/phone.png" class=" w-[30%] absolute bottom-[-7%] -left-[20%]" alt="">
        <img src="../assets/images/pc.png" class=" w-full " alt="">
      </div>
    </div>
  </section>

  <section class="plr flex flex-col items-center justify-start w-full py-25">
    <div class=" flex flex-col gap-y-4 mt-6 w-max1000 items-center">
      <h3 class=" text-center text-3xl font-[700] w-full">
      We are proud
      </h3>
      <span class=" text-center my-5 w-full block ">We take pride in our achievements and commitment to excellence. Join us in
        celebrating innovation, growth, and success.</span>
      <div class=" flex justify-between gap-6 w-max1000 ">
        <div class=" flex flex-col gap-1 items-center  grow">
          <IcongraduateFill class="text-blue " />
          <h1 class=" text-blue text-3xl font-[700]">4+</h1>
          <span class="text-lg">Courses</span>
        </div>

        <div class=" flex flex-col gap-1 items-center  border-x grow not-darkmode:border-neutral-300 darkmode:border-neutral-900">
          <IconGradMan class="text-blue" />
          <h1 class=" text-blue text-3xl font-[700]">4+</h1>
          <span class="text-lg">Courses</span>
        </div>


        <div class=" flex flex-col gap-1 items-center grow ">
          <iconClock class="text-blue" />
          <h1 class="text-blue  text-3xl font-[700]">4+</h1>
          <span class="text-lg">Courses</span>
        </div>
      </div>
    </div>
  </section>


  <section class="plr flex flex-col items-center justify-start w-full py-10 bg-blue darkmode:bg-neutral-950 text-white2">
    <div
      class=" flex flex-col sm:flex-row items-center  sm:justify-between sm:items-end gap-y-4 mt-6 w-max1000 relative">
      <div class="flex flex-col static text-center sm:text-start">
        <h4 class=" font-[700] text-3xl">It’s time to start investing in yourself</h4>
        <span class=" w-[min(700px,100%)]">Online courses open the opportunity for learning to almost anyone, regardless
          of their scheduling commitments.</span>
      </div>

      <div class=" max-sm:w-full">
        <blueButton class=" ring-white ring-2 max-sm:w-full">
          <template #label>
            started
          </template>
        </blueButton>
      </div>
    </div>
  </section>
  <process/>

  <!-- <Footer /> -->
</template>
<style lang="css" scoped>
.overlayhome {
  background: linear-gradient(0deg, var(--surface-action, #01589A), var(--surface-action, #01589A)),
    linear-gradient(268.29deg, rgba(1, 88, 154, 0) 0.85%, rgba(1, 88, 154, 0.4) 61%);
}
</style>
