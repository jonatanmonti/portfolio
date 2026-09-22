<script setup lang="ts">
import { languagesMeta, personal } from '~/data/profile'

const { t, tm, rt } = useI18n()

const softSkills = computed(() => {
  const raw = tm('about.softSkills') as unknown[]
  return raw.map((item) => (typeof item === 'string' ? item : rt(item as any)))
})
</script>

<template>
  <section id="sobre-mi" class="py-20 sm:py-28">
    <div class="section-container">
      <SectionHeading :eyebrow="t('about.eyebrow')" :title="t('about.title')" :description="t('about.description')" />

      <div class="grid gap-10 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <div class="card p-8">
            <div class="flex items-center gap-4">
              <div
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 font-display text-2xl font-bold text-white"
              >
                {{ personal.name.split(' ').map((n) => n[0]).join('') }}
              </div>
              <div>
                <p class="font-display text-lg font-semibold">{{ personal.name }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('about.role') }} · {{ personal.location }}</p>
              </div>
            </div>

            <p class="mt-6 leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t('about.summary') }}
            </p>

            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="skill in softSkills"
                :key="skill"
                class="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="card h-full p-8">
            <p class="font-display text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t('about.languagesTitle') }}
            </p>
            <div class="mt-5 space-y-5">
              <div v-for="lang in languagesMeta" :key="lang.id">
                <div class="mb-1.5 flex items-center justify-between text-sm">
                  <span class="font-medium">{{ t(`about.languages.${lang.id}.name`) }}</span>
                  <span class="text-slate-500 dark:text-slate-400">{{ t(`about.languages.${lang.id}.level`) }}</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400"
                    :style="{ width: `${lang.percent}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
