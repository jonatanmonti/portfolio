<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-400 hover:text-brand-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-400"
    :aria-label="colorMode.value === 'dark' ? t('darkMode.activateLight') : t('darkMode.activateDark')"
    @click="toggle"
  >
    <ClientOnly>
      <Icon :name="colorMode.value === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="h-5 w-5" />
      <template #fallback>
        <span class="h-5 w-5" />
      </template>
    </ClientOnly>
  </button>
</template>
