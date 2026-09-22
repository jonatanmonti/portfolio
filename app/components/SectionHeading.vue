<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="mx-auto mb-12 max-w-2xl text-center">
    <span class="font-mono text-sm font-medium uppercase tracking-widest text-brand-500 dark:text-brand-400">
      {{ eyebrow }}
    </span>
    <h2 class="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-slate-600 dark:text-slate-400">
      {{ description }}
    </p>
  </div>
</template>
