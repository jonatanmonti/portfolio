<script setup lang="ts">
import { skills } from '~/data/profile'

const items = skills.flatMap((group) => group.items)
const loopItems = [...items, ...items]
</script>

<template>
  <div
    class="relative overflow-hidden border-b border-slate-200 bg-slate-50/70 py-4 dark:border-slate-800 dark:bg-slate-900/40"
    style="mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent)"
  >
    <div class="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
      <div
        v-for="(item, index) in loopItems"
        :key="index"
        class="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400"
      >
        <Icon :name="item.icon" class="h-5 w-5" />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
