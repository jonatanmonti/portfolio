<script setup lang="ts">
import { personal } from '~/data/profile'

const { t } = useI18n()
</script>

<template>
  <section id="inicio" class="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-24 left-1/4 h-72 w-72 animate-blob rounded-full bg-brand-300/40 blur-3xl dark:bg-brand-700/30"
      />
      <div
        class="absolute top-32 right-1/4 h-72 w-72 animate-blob rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-700/20"
        style="animation-delay: 2s"
      />
    </div>

    <div class="section-container">
      <div class="mx-auto max-w-3xl text-center">
        <p class="animate-fade-up font-mono text-sm font-medium text-brand-500 opacity-0 dark:text-brand-400">
          {{ t('hero.greeting') }}
        </p>
        <h1
          class="mt-3 animate-fade-up font-display text-4xl font-bold tracking-tight opacity-0 sm:text-6xl"
          style="animation-delay: 0.1s"
        >
          {{ personal.name }}
        </h1>
        <p
          class="mx-auto mt-4 max-w-xl animate-fade-up text-balance text-xl font-medium opacity-0 dark:text-slate-300 sm:text-2xl"
          style="animation-delay: 0.2s"
        >
          <span class="text-gradient font-display">{{ t('hero.tagline') }}</span>
        </p>

        <div class="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3 opacity-0" style="animation-delay: 0.4s">
          <a
            href="#proyectos"
            class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-400"
          >
            {{ t('hero.ctaProjects') }}
          </a>
          <a
            href="#contacto"
            class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-400"
          >
            {{ t('hero.ctaContact') }}
          </a>
        </div>

        <div class="mt-6 flex animate-fade-up items-center justify-center gap-2 text-sm text-slate-500 opacity-0 dark:text-slate-400" style="animation-delay: 0.5s">
          <Icon name="mdi:map-marker-outline" class="h-4 w-4" />
          {{ personal.location }}
        </div>
      </div>
    </div>
  </section>
</template>
