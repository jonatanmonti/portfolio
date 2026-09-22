<script setup lang="ts">
import { personal } from '~/data/profile'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 py-8 dark:border-slate-800">
    <div class="section-container flex flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
      <p>© {{ year }} {{ personal.name }}. {{ t('footer.rights') }}</p>
      <div class="flex items-center gap-4">
        <a
          :href="personal.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 transition hover:text-brand-500 dark:hover:text-brand-400"
        >
          <Icon name="mdi:linkedin" class="h-4 w-4" />
          {{ t('footer.linkedin') }}
        </a>
        <a
          :href="`mailto:${personal.email}`"
          class="flex items-center gap-1.5 transition hover:text-brand-500 dark:hover:text-brand-400"
        >
          <Icon name="mdi:email-outline" class="h-4 w-4" />
          {{ t('footer.email') }}
        </a>
      </div>
    </div>
  </footer>
</template>
