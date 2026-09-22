<script setup lang="ts">
import { skills } from '~/data/profile'

const { t } = useI18n()
</script>

<template>
  <section id="skills" class="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-28">
    <div class="section-container">
      <SectionHeading :eyebrow="t('skills.eyebrow')" :title="t('skills.title')" :description="t('skills.description')" />

      <div class="space-y-10">
        <div v-for="group in skills" :key="group.key">
          <h3 class="mb-4 font-mono text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {{ t(`skills.groups.${group.key}`) }}
          </h3>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <div
              v-for="item in group.items"
              :key="item.name"
              class="card flex flex-col items-center gap-3 p-5 transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg dark:hover:border-brand-500"
            >
              <Icon :name="item.icon" class="h-9 w-9" />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
