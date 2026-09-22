<script setup lang="ts">
import type { ProjectMeta } from '~/data/profile'

const props = defineProps<{ project: ProjectMeta | null }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()

const title = computed(() => (props.project ? t(`projects.items.${props.project.slug}.title`) : ''))

const embedUrl = computed(() => {
  const video = props.project?.video
  if (!video) return ''
  if (video.type === 'youtube') return `https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&rel=0`
  if (video.type === 'vimeo') return `https://player.vimeo.com/video/${video.src}?autoplay=1`
  return ''
})

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
        v-if="project?.video"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
          <div class="flex items-center justify-between bg-slate-900 px-4 py-2.5">
            <p class="truncate text-sm font-medium text-white">{{ title }}</p>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close video"
              @click="emit('close')"
            >
              <Icon name="mdi:close" class="h-5 w-5" />
            </button>
          </div>

          <div class="aspect-video w-full">
            <video
              v-if="project.video.type === 'mp4'"
              :src="useAssetUrl(project.video.src)"
              class="h-full w-full"
              controls
              autoplay
            />
            <iframe
              v-else
              :src="embedUrl"
              class="h-full w-full"
              :title="title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
