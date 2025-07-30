<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useThemeStore } from '@/stores/theme'
import type { OnClickOutsideHandler } from '@vueuse/core'

const open = ref(false)
const theme = useThemeStore()
const menuRef = ref(null as HTMLElement | null)
const positionClass = ref('top-full mt-2 right-0')

const dropdownSize = { width: 160, height: 120 }

const options = [
    { value: 'light', label: 'Light', icon: ['fas', 'sun'] },
    { value: 'dark', label: 'Dark', icon: ['fas', 'moon'] },
    { value: 'system', label: 'System', icon: ['fas', 'desktop-alt'] }
]

const currentLabel = computed(() => {
    return options.find(opt => opt.value === theme.value)?.label || 'System'
})

// const ripple = ref({
//     active: false,
//     style: {}
// })

const applyTheme = (mode: string) => {
    const root = document.querySelector('body') as HTMLElement
    if (mode === 'dark') root.classList.add('darkmode')
    else if (mode === 'light') root.classList.remove('darkmode')
    else root.classList.toggle('darkmode', window.matchMedia('(prefers-color-scheme: dark)').matches)
}

const setTheme = (mode: string) => {
    theme.value = mode
    applyTheme(mode)
}

const initTheme = () => {
    // const saved = localStorage.getItem('theme') || 'system'
    // theme.value = saved
    applyTheme(theme.value)
}

// const startRippleTransition = (mode, event) => {
//     open.value = false
//     const x = event.clientX
//     const y = event.clientY
//     const vw = window.innerWidth
//     const vh = window.innerHeight
//     const radius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))
//     ripple.value = {
//         active: true,
//         style: {
//             top: `${y - radius}px`,
//             left: `${x - radius}px`,
//             width: `${radius * 2}px`,
//             height: `${radius * 2}px`
//         }
//     }
//     setTimeout(() => setTheme(mode), 150)
//     setTimeout(() => ripple.value.active = false, 1000)
// }

const toggleMenu = async () => {
    open.value = !open.value
    if (open.value) {
        await nextTick()
        adjustDropdownDirection()
    }
}

const adjustDropdownDirection = () => {
    if (!menuRef.value) return
    const rect = menuRef.value.getBoundingClientRect()
    const { innerHeight, innerWidth } = window

    const spaceBelow = innerHeight - rect.bottom
    const spaceAbove = rect.top
    const spaceRight = innerWidth - rect.left
    const spaceLeft = rect.right

    const openUp = spaceBelow < dropdownSize.height && spaceAbove > dropdownSize.height
    const openLeft = spaceRight < dropdownSize.width && spaceLeft > dropdownSize.width

    if (openUp && openLeft) positionClass.value = 'bottom-full mb-2 left-0 '
    else if (openUp) positionClass.value = 'bottom-full mb-2 right-0 '
    else if (openLeft) positionClass.value = 'top-full mt-2 left-0 '
    else positionClass.value = 'top-full mt-2 right-0  '


}

const handleClickOutside = (e: any) => {
    if (!menuRef.value) return
    // if (e.target) return

    if (!menuRef.value.contains(e.target as Node | null)) open.value = false
}

const handleSystemThemeChange = () => {
    if (theme.value === 'system') applyTheme('system')
}

onMounted(() => {
    initTheme()
    document.addEventListener('click', handleClickOutside)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    // window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleSystemThemeChange)
})
</script>

<template>
    <div class="relative inline-block text-left" ref="menuRef">
        <div @click="toggleMenu">

            <slot name="menubutton">
                <!-- Toggle Button -->
                <button
                    class="px-4 py-2 bg-gray-200 darkmode:bg-black text-sm rounded hover:bg-gray-300 darkmode:hover:bg-neutral-700">
                    Theme: {{ currentLabel }} - {{ positionClass }}
                </button>
            </slot>
        </div>

        <!-- Dropdown Menu -->
        <div v-if="open" :class="[
            'absolute w-40 theme1cont rounded shadow-lg z-50',
            positionClass
        ]">
            <ul>
                <li v-for="option in options" :key="option.value" @click="(e) => setTheme(option.value)"
                    class="px-4 py-1 cursor-pointer ha
                      flex text-[13px]">
                    <span class=" w-6">
                        <FontAwesomeIcon :icon="option.icon" />
                    </span>
                    {{ option.label }}
                </li>
            </ul>
        </div>

        <!-- Ripple Overlay -->
        <!-- <div v-if="ripple.active" class="fixed inset-0 z-[999] pointer-events-none overflow-hidden">
            <div class="absolute rounded-full bg-white darkmode:bg-black animate-ripple" :style="ripple.style"></div>
        </div> -->
    </div>
</template>

<style scoped>
/* 
@keyframes ripple-grow {
    0% {
        transform: scale(0);
        opacity: 0.6;
    }

    50% {
        transform: scale(1);
        opacity: 0.9;
    }

    50% {
        opacity: 0.2;
    }

    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}

.animate-ripple {
    animation: ripple-grow 0.7s ease-out forwards;
}  */
</style>
