<script setup lang="ts">
import type { ProjectMeta } from '~/data/profile'
import { iconFor } from '~/data/techIcons'

const props = defineProps<{ project: ProjectMeta }>()
const emit = defineEmits<{ play: [project: ProjectMeta]; details: [project: ProjectMeta] }>()

const { t } = useI18n()

const title = computed(() => t(`projects.items.${props.project.slug}.title`))
const description = computed(() => t(`projects.items.${props.project.slug}.description`))
</script>

<template>
  <article class="card group flex flex-col overflow-hidden">
    <div
      class="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-brand-500/90 via-brand-600/90 to-cyan-500/90"
    >
      <img
        v-if="project.image"
        :src="project.image"
        :alt="title"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <Icon v-else :name="project.icon" class="h-12 w-12 text-white/90" />

      <button
        v-if="project.video"
        type="button"
        class="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition hover:bg-slate-950/40"
        :aria-label="title"
        @click="emit('play', project)"
      >
        <span
          class="flex h-14 w-14 scale-90 items-center justify-center rounded-full bg-white/90 text-brand-600 opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100"
        >
          <Icon name="mdi:play" class="h-7 w-7" />
        </span>
      </button>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-display text-lg font-semibold">{{ title }}</h3>
        <span
          class="shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="
            project.status === 'in-progress'
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
          "
        >
          {{ project.status === 'in-progress' ? t('projects.inProgress') : t('projects.completed') }}
        </span>
      </div>

      <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {{ description }}
      </p>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <Icon :name="iconFor(tech)" class="h-3.5 w-3.5" />
          {{ tech }}
        </span>
      </div>

      <div class="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm font-medium dark:border-slate-800">
        <button
          type="button"
          class="flex items-center gap-1.5 text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          @click="emit('details', project)"
        >
          <Icon name="mdi:arrow-expand" class="h-4 w-4" />
          {{ t('projects.viewMore') }}
        </button>
        <button
          v-if="project.video"
          type="button"
          class="flex items-center gap-1.5 text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          @click="emit('play', project)"
        >
          <Icon name="mdi:play-circle-outline" class="h-4 w-4" />
          {{ t('projects.video') }}
        </button>
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
        >
          <Icon name="mdi:open-in-new" class="h-4 w-4" />
          {{ t('projects.site') }}
        </a>
      </div>
    </div>
  </article>
</template>
