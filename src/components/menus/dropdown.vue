<script setup lang="ts">
import { ref, onMounted, watch, nextTick, type PropType } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const isOpen = ref(false)
const trigger = ref<HTMLElement | null>(null)
const dropdown = ref<HTMLElement | null>(null)
const dropdownPositionClass = ref('top-full') // default below


const props = defineProps({
    options: {
        type: Object as PropType<{ icon: [string, string], emit: string, isLink?: boolean, to?: object, label: string, hide?: boolean }[]>,
        default: [{ icon: ['fas', 'trash-can'], label: 'Delete', emit: 'del' }]
    }
})


const toggleDropdown = async () => {
    handelCloseAllOpen()
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        dropdownPositionClass.value = ''
        await nextTick()

        adjustDropdownPosition()
    }
}

const adjustDropdownPosition = () => {
    // dropdownPositionClass.value = ''
    const triggerEl = trigger.value
    const dropdownEl = dropdown.value

    if (!triggerEl || !dropdownEl) return

    const triggerRect = triggerEl.getBoundingClientRect()
    const dropdownRect = dropdownEl.getBoundingClientRect()
    const { innerHeight, innerWidth } = window


    const spaceRight = innerWidth - dropdownRect.left
    const spaceLeft = dropdownRect.right


    const spaceBelow = innerHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top

    const openLeft = spaceRight < dropdownRect.width && spaceLeft > dropdownRect.width

    // Check if dropdown fits below; if not and there's more space above, show above
    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        dropdownPositionClass.value = 'bottom-full mb-2'
    } else {
        dropdownPositionClass.value = 'top-full mt-2'
    }

    if (openLeft) {
        dropdownPositionClass.value += ' right-0'
    } else {
        dropdownPositionClass.value += ' left-0'
    }

    console.log(spaceRight)
}

// Optional: close on outside click
const handleClickOutside = (e: any) => {
    if (!trigger.value) return
    if (
        !trigger.value.contains(e.target) &&
        !dropdown.value?.contains(e.target)
    ) {
        isOpen.value = false
    }
}

const handelCloseAllOpen = () => {
    document.querySelectorAll('.drop-cont').forEach((e) => e.classList.add('hidden'))
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

// watch(isOpen, (val) => {
//     if (val) {
//         window.addEventListener('resize', adjustDropdownPosition)
//         window.addEventListener('scroll', adjustDropdownPosition, true)
//     } else {
//         window.removeEventListener('resize', adjustDropdownPosition)
//         window.removeEventListener('scroll', adjustDropdownPosition, true)
//     }
// })



</script>

<template>
    <div ref="trigger" class="relative inline-block" @click="toggleDropdown">

        <button class="px-2 py-1  rounded-sm dark:hover:bg-neutral-800 hover:bg-gray-200 cursor-pointer">
            <slot name="btn">
                <FontAwesomeIcon size="lg" :icon="['fas', 'ellipsis']" />
            </slot>
        </button>

        <transition name="fade">
            <div v-show="isOpen" ref="dropdown" :class="dropdownPositionClass"
                class="absolute z-50 mt-2 w-40 text-xs  shadow-lg dark:border-bg-white3   rounded dark:bg-neutral-950 bg-white1 cursor-pointer drop-cont">
                <ul class=" w-full flex flex-col  items-center py-1 gap-y-0">
                    <template v-for="op, i in options" :key="i">
                        <component :is="op.isLink ? 'router-link' : 'button'" v-if="!op.hide" @click="$emit(op.emit)"
                            class="py-2 px-2 rounded-sm hover:bg-gray-200 dark:hover:bg-neutral-800 cursor-pointer w-[90%] gap-x-2 flex items-center">
                            <FontAwesomeIcon size="lg" :icon="op.icon" />
                            <span class="text-xs" v-html="op.label"></span>
                        </component>
                    </template>


                </ul>
            </div>
        </transition>
    </div>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.hide {
    display: none;
}
</style>
