<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { t } = useI18n()

const options = [
  { code: 'es', flag: 'circle-flags:es' },
  { code: 'en', flag: 'circle-flags:us' },
  { code: 'pt', flag: 'circle-flags:br' }
] as const
</script>

<template>
  <div class="flex items-center gap-1.5" role="group" :aria-label="t('language.label')">
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="flex h-8 w-8 items-center justify-center rounded-full transition"
      :class="
        locale === option.code
          ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950'
          : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
      "
      :aria-label="t(`language.${option.code}`)"
      :aria-pressed="locale === option.code"
      @click="setLocale(option.code)"
    >
      <Icon :name="option.flag" class="h-6 w-6 rounded-full" />
    </button>
  </div>
</template>
