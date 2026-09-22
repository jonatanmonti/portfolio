<script setup lang="ts">
import type { ProjectMeta } from '~/data/profile'
import { projectsMeta } from '~/data/profile'

const { t } = useI18n()

const activeVideo = ref<ProjectMeta | null>(null)
const activeDetail = ref<ProjectMeta | null>(null)

const inProgress = computed(() => projectsMeta.filter((p) => p.status === 'in-progress'))
const completed = computed(() => projectsMeta.filter((p) => p.status === 'completed'))

function openVideo(project: ProjectMeta) {
  activeVideo.value = project
}
function closeVideo() {
  activeVideo.value = null
}

function openDetail(project: ProjectMeta) {
  activeDetail.value = project
}
function closeDetail() {
  activeDetail.value = null
}
</script>

<template>
  <section id="proyectos" class="py-20 sm:py-28">
    <div class="section-container">
      <SectionHeading :eyebrow="t('projects.eyebrow')" :title="t('projects.title')" :description="t('projects.description')" />

      <div v-if="inProgress.length" class="mb-14">
        <h3 class="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
          <span class="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          {{ t('projects.inProgressGroup') }}
        </h3>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in inProgress"
            :key="project.slug"
            :project="project"
            @play="openVideo"
            @details="openDetail"
          />
        </div>
      </div>

      <div v-if="completed.length">
        <h3 class="mb-6 flex items-center gap-2 font-display text-lg font-semibold">
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          {{ t('projects.completedGroup') }}
        </h3>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in completed"
            :key="project.slug"
            :project="project"
            @play="openVideo"
            @details="openDetail"
          />
        </div>
      </div>
    </div>

    <ProjectVideoModal :project="activeVideo" @close="closeVideo" />
    <ProjectDetailModal :project="activeDetail" @close="closeDetail" />
  </section>
</template>
