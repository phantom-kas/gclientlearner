<script setup lang='ts'>
import authnavLink from '@/components/authnavLink.vue';
import IconDashboard from '@/components/icons/IconDashboard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>
<template>

    <section class=" flex flex-col items-center justify-end w-full bg-blue darkmode:bg-neutral-900 sm:pt-15 max-sm:sticky inset-0 z-50 shadow-sm">
        <div
            class=" flex flex-row justify-between sm:justify-start items-end  text-3xl font-[700] theme1cont w-max1200">
            <authnavLink :to="{name:'dashboard'}" text="Dashboard">
                <template #icon>
                    <IconDashboard />
                </template>
            </authnavLink>
            <authnavLink :to="{ name: 'settings' }" text="Settings">
                <template #icon>
                    <FontAwesomeIcon size="lg" :icon="['fas', 'gear']" />
                </template>
            </authnavLink>
            <authnavLink text="Messages">
                <template #icon>
                    <FontAwesomeIcon size="lg" :icon="['far', 'envelope']" />
                </template>
            </authnavLink>
            <authnavLink text="Invoice">
                <template #icon>
                    <FontAwesomeIcon size="lg" :icon="['fas', 'file-invoice']" />
                </template>
            </authnavLink>

        </div>
    </section>

    <router-view />
</template>
<style scoped></style>