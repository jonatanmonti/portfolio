<script setup lang="ts">
import type { ProjectMeta } from '~/data/profile'
import { iconFor } from '~/data/techIcons'

const props = defineProps<{ project: ProjectMeta | null }>()
const emit = defineEmits<{ close: [] }>()

const { t, tm, rt } = useI18n()

type TabKey = 'overview' | 'architecture' | 'gallery' | 'stack'

const tabKeys: TabKey[] = ['overview', 'architecture', 'gallery', 'stack']

const activeTab = ref<TabKey>('overview')

const title = computed(() => (props.project ? t(`projects.items.${props.project.slug}.title`) : ''))
const subtitle = computed(() => (props.project ? t(`projects.items.${props.project.slug}.subtitle`) : ''))
const period = computed(() => (props.project ? t(`projects.items.${props.project.slug}.period`) : ''))
const description = computed(() => (props.project ? t(`projects.items.${props.project.slug}.description`) : ''))
const overview = computed(() => (props.project ? t(`projects.items.${props.project.slug}.overview`) : ''))
const architecture = computed(() => {
  if (!props.project) return []
  const raw = tm(`projects.items.${props.project.slug}.architecture`) as unknown[]
  return raw.map((item) => (typeof item === 'string' ? item : rt(item as any)))
})

watch(
  () => props.project,
  (project) => {
    if (project) activeTab.value = 'overview'
  }
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900"
        >
          <!-- Header -->
          <div class="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-cyan-500 px-6 pb-6 pt-6 text-white">
            <button
              type="button"
              class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              aria-label="Close"
              @click="emit('close')"
            >
              <Icon name="mdi:close" class="h-5 w-5" />
            </button>

            <div class="flex items-center gap-2 text-xs font-medium text-white/80">
              <Icon name="mdi:calendar-outline" class="h-3.5 w-3.5" />
              {{ period }}
              <span
                class="ml-1 rounded-full px-2 py-0.5"
                :class="project.status === 'in-progress' ? 'bg-amber-400/20 text-amber-100' : 'bg-emerald-400/20 text-emerald-100'"
              >
                {{ project.status === 'in-progress' ? t('projects.inProgress') : t('projects.completed') }}
              </span>
            </div>

            <div class="mt-4 flex items-center gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Icon :name="project.icon" class="h-8 w-8" />
              </div>
              <div>
                <h3 class="font-display text-2xl font-bold">{{ title }}</h3>
                <p v-if="subtitle" class="text-sm text-white/80">{{ subtitle }}</p>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="flex shrink-0 gap-6 overflow-x-auto border-b border-slate-200 px-6 dark:border-slate-800">
            <button
              v-for="tab in tabKeys"
              :key="tab"
              type="button"
              class="shrink-0 whitespace-nowrap border-b-2 py-3 text-sm font-medium transition"
              :class="
                activeTab === tab
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              "
              @click="activeTab = tab"
            >
              {{ t(`projects.tabs.${tab}`) }}
            </button>
          </div>

          <!-- Content -->
          <div class="scrollbar-thin flex-1 overflow-y-auto p-6">
            <div v-if="activeTab === 'overview'" class="space-y-4">
              <p class="leading-relaxed text-slate-600 dark:text-slate-300">{{ overview }}</p>
              <p class="leading-relaxed text-slate-600 dark:text-slate-300">{{ description }}</p>
            </div>

            <div v-else-if="activeTab === 'architecture'">
              <ul class="space-y-3">
                <li
                  v-for="(point, i) in architecture"
                  :key="i"
                  class="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  <Icon name="mdi:puzzle-outline" class="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {{ point }}
                </li>
              </ul>
              <p v-if="!architecture.length" class="text-sm text-slate-500 dark:text-slate-400">
                {{ t('projects.emptyArchitecture') }}
              </p>
            </div>

            <div v-else-if="activeTab === 'gallery'">
              <div v-if="project.detail.gallery.length" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <img
                  v-for="(img, i) in project.detail.gallery"
                  :key="i"
                  :src="img"
                  :alt="`${title} ${i + 1}`"
                  class="aspect-video w-full rounded-lg object-cover"
                />
              </div>
              <div v-else class="flex flex-col items-center gap-2 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                <Icon name="mdi:image-multiple-outline" class="h-8 w-8" />
                {{ t('projects.emptyGallery') }}
              </div>
            </div>

            <div v-else-if="activeTab === 'stack'" class="grid gap-8 sm:grid-cols-2">
              <div>
                <p class="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {{ t('projects.techStack') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.stack"
                    :key="tech"
                    class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium dark:border-slate-700"
                  >
                    <Icon :name="iconFor(tech)" class="h-4 w-4" />
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="space-y-5">
                <div v-if="project.demoUrl">
                  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {{ t('projects.liveAccess') }}
                  </p>
                  <a
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
                  >
                    {{ t('projects.accessLive') }}
                    <Icon name="mdi:open-in-new" class="h-4 w-4" />
                  </a>
                </div>

                <div v-if="project.detail.repos.length">
                  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {{ t('projects.repositories') }}
                  </p>
                  <div class="space-y-2">
                    <a
                      v-for="repo in project.detail.repos"
                      :key="repo.url"
                      :href="repo.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm font-medium transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-500 dark:hover:text-brand-400"
                    >
                      {{ repo.label }}
                      <Icon name="mdi:github" class="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p v-if="!project.demoUrl && !project.detail.repos.length" class="text-sm text-slate-500 dark:text-slate-400">
                  {{ t('projects.emptyLinks') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
