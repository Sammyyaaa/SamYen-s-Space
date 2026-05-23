import { ref } from 'vue'

const isDark = ref(true)
let initialized = false

export function useTheme() {
  function applyTheme(dark: boolean) {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('light-mode', !dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* ignore */ }
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme(isDark.value)
  }

  function initTheme() {
    if (initialized || !import.meta.client) return
    initialized = true
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light') {
        isDark.value = false
        applyTheme(false)
        return
      }
    } catch { /* ignore */ }
    isDark.value = true
  }

  return { isDark, toggleTheme, initTheme }
}
