<script setup lang="ts">
import { educationMeta, experienceMeta } from '~/data/profile'

const { t, tm, rt } = useI18n()

function bulletsFor(id: string) {
  const raw = tm(`experience.jobs.${id}.bullets`) as unknown[]
  return raw.map((item) => (typeof item === 'string' ? item : rt(item as any)))
}
</script>

<template>
  <section id="experiencia" class="py-20 sm:py-28">
    <div class="section-container">
      <SectionHeading :eyebrow="t('experience.eyebrow')" :title="t('experience.title')" />

      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 class="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
            <Icon name="mdi:briefcase-outline" class="h-5 w-5 text-brand-500" />
            {{ t('experience.professionalTitle') }}
          </h3>
          <ol class="relative border-s border-slate-200 dark:border-slate-800">
            <li v-for="job in experienceMeta" :key="job.id" class="mb-10 ms-6 last:mb-0">
              <span
                class="absolute -start-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-950"
              />
              <div class="card p-6">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <h4 class="font-display font-semibold">{{ t(`experience.jobs.${job.id}.role`) }}</h4>
                  <span class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ t(`experience.jobs.${job.id}.period`) }}</span>
                </div>
                <p class="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">{{ job.company }}</p>
                <ul class="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                  <li v-for="bullet in bulletsFor(job.id)" :key="bullet" class="flex gap-2">
                    <Icon name="mdi:chevron-right" class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    {{ bullet }}
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>

        <div>
          <h3 class="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
            <Icon name="mdi:school-outline" class="h-5 w-5 text-brand-500" />
            {{ t('experience.educationTitle') }}
          </h3>
          <ol class="relative border-s border-slate-200 dark:border-slate-800">
            <li v-for="study in educationMeta" :key="study.id" class="mb-10 ms-6 last:mb-0">
              <span
                class="absolute -start-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 ring-4 ring-white dark:ring-slate-950"
              />
              <div class="card p-6">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <h4 class="font-display font-semibold">{{ t(`experience.education.${study.id}.title`) }}</h4>
                  <span class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ t(`experience.education.${study.id}.period`) }}</span>
                </div>
                <p class="mt-1 text-sm font-medium text-cyan-600 dark:text-cyan-400">{{ study.institution }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
