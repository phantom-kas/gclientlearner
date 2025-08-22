<script setup lang='ts'>
import { useThemeStore } from '@/stores/theme';
import IconCi from './icons/IconCi.vue';
import themeSelect from './menus/themeSelect.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import buttonWhite from './buttons/buttonWhite.vue';
import blueButton from './buttons/blueButton.vue';
import overlayfixed from './overlayfixed.vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import Dropdown from './menus/dropdown.vue';
import AvatarImage from './avatars/avatarImage.vue';
import { useauthStore } from '@/stores/auth';
import { getImageUrl } from '@/composabels/utilities';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';
import { onBeforeRouteUpdate } from 'vue-router';

const theme = useThemeStore()
const darkModelOpen = ref(false)
const isOpen = ref(false)
const handelToggle = () => {
    isOpen.value = !isOpen.value
}

const user = useUserStore()
const auth = useauthStore()

onBeforeRouteUpdate(() => {
    isOpen.value = false
})


</script>
<template>
    <header
        class="sm:w-full flex justify-center px-4 theme1cont  w-sidebar300 z-[99999]  fixed  inset-0  sm:h-15 border-y-0! border-l-0! shadow-md"
        :class="{ 'h-screen ': isOpen, 'h-15 border-none': !isOpen }">
        <div class="flex flex-col sm:flex-row justify-start items-start sm:items-center sm:w-max1200 w-full ">
            <div class=" flex justify-start gap-x-0 items-center h-15 sm:h-[unset]">
                <button @click="handelToggle"
                    class=" sm:hidden size-12 rounded-[50%] ha flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon size="xl" :icon="['fas', 'bars']" />
                </button>
                <IconCi :size="30" />
            </div>
            <Teleport to="#modal" defer>
                <overlayfixed :class="[{ ' hidden': !isOpen }, { 'block': isOpen }]" @click="handelToggle()"
                    class="z-20 sm:hidden " />
            </Teleport>
            <div :class="{ 'flex': isOpen, 'hidden sm:flex': !isOpen }"
                class=" grow gap-x-6 sm:pl-6 items-start flex-col sm:flex-row sm:items-center sm:gap-y-6  z-50 sm:relative top-20 sm:top-[unset] w-full sm:w-[unset]">
                <router-link class=" font-[400] link_sidebar " to="/">Home</router-link>
                <router-link class=" font-[400] link_sidebar " :to="{ name: 'tracks' }">Tracks</router-link>
                <themeSelect class=" sm:ml-auto link_sidebar mt-auto sm:mt-[unset] mb-5 sm:mb-0" v-model="darkModelOpen"
                    @click="darkModelOpen = !darkModelOpen">
                    <template #menubutton>
                        <!-- <FontAwesomeIcon v-if="theme.value == 'light'" size="xl" :icon="['far', 'sun']" /> -->
                        <div class=" pointer-events-none">
                            <IconSun v-if="theme.value == 'light'" />
                            <IconMoon v-else-if="theme.value == 'dark'" />
                            <!-- <FontAwesomeIcon v-else-if="theme.value == 'dark'" size="xl" :icon="['fas', 'moon']" /> -->
                            <FontAwesomeIcon v-else="theme.value == 'dark'" size="lg" :icon="['fas', 'desktop-alt']" />
                        </div>
                    </template>
                </themeSelect>
                <template v-if="!user.isLoggedIn()">
                    <router-link class="flex flex-col justify-start items-start" :to="{ name: 'login' }">
                        <blueButton class="sm:w-[unset] w-full ">
                            <template #label>
                                <div class=" flex gap-4 items-center">
                                    <span>Login</span>
                                    <FontAwesomeIcon size="lg" :icon="['fas', 'right-to-bracket']" />
                                </div>
                            </template>
                        </blueButton>
                    </router-link>
                    <router-link class="flex flex-col justify-start items-start" :to="{ name: 'signup' }">
                        <buttonWhite class="sm:w-[unset] w-full mt-5 mb-5 sm:mb-0 sm:mt-[unset]">
                            <div class=" flex gap-4 items-center">
                                <span>Sign Up</span>
                                <FontAwesomeIcon size="lg" :icon="['fas', 'right-to-bracket']" />
                            </div>
                        </buttonWhite>
                    </router-link>
                </template>
                <Dropdown @logout="auth.logout()" v-else class="rounded-3xl!" :options="[
                    { label: 'Portal', icon: ['fas', 'graduation-cap'], isLink: true, to: { name: 'dashboard' }, emit: 'nein' },
                    { label: 'Settings', icon: ['fas', 'gear'], isLink: true, to: { name: 'settings' }, emit: 'nein' },
                    { label: 'Logout', icon: ['fas', 'arrow-right-from-bracket'], isLink: false, to: { name: 'dashboard' }, emit: 'logout' }
                ]">
                    <template #btn>
                        <div class=" pointer-events-none flex gap-4 items-center text-neutral-400 pr-0.5">
                            <AvatarImage :url="getImageUrl(user.userInfo.image)" />
                            <FontAwesomeIcon :icon="['fas', 'angle-down']" />
                        </div>
                    </template>
                </Dropdown>
            </div>
        </div>
    </header>
</template>
<style></style>