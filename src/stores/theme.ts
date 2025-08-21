import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
       const applyTheme = (mode: string) => {
    const root = document.documentElement
    if (mode === 'dark') root.classList.add('dark')
    else if (mode === 'light') root.classList.remove('dark')
    else root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
}
    const value = useLocalStorage('theme', 'system')
    return { value,applyTheme }
})
