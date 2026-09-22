<script setup lang="ts">
import { personal } from '~/data/profile'

const { t, locale } = useI18n()

const cvUrl = computed(() => (locale.value === 'es' ? '/cv-jonatan-monti.pdf' : `/cv-jonatan-monti-${locale.value}.pdf`))

const links = computed(() => [
  { href: '#sobre-mi', label: t('nav.about') },
  { href: '#experiencia', label: t('nav.experience') },
  { href: '#skills', label: t('nav.skills') },
  { href: '#proyectos', label: t('nav.projects') },
  { href: '#contacto', label: t('nav.contact') }
])

const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80"
  >
    <div class="section-container flex h-20 items-center justify-between">
      <a href="#inicio" class="flex items-center gap-2.5">
        <span
          class="flex h-10 w-10 rotate-[-6deg] items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 font-mono text-xl font-bold text-white shadow-md shadow-brand-500/20 sm:h-12 sm:w-12 sm:text-2xl"
        >
          #
        </span>
        <span class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {{ personal.name.split(' ')[0] }}<span class="text-gradient">.dev</span>
        </span>
      </a>

      <nav class="hidden items-center gap-6 lg:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-brand-500 dark:text-slate-300 dark:hover:text-brand-400"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="cvUrl"
          download
          class="hidden whitespace-nowrap rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-400 lg:inline-flex lg:items-center lg:gap-2"
        >
          <Icon name="mdi:download" class="h-4 w-4" />
          {{ t('nav.downloadCv') }}
        </a>
        <LanguageSwitcher class="hidden sm:flex" />
        <DarkModeToggle />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 lg:hidden"
          :aria-label="mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        class="flex flex-col gap-1 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="closeMobile"
        >
          {{ link.label }}
        </a>
        <div class="mt-2 flex items-center justify-between px-3 py-1 sm:hidden">
          <span class="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">{{ t('language.label') }}</span>
          <LanguageSwitcher />
        </div>
        <a
          :href="cvUrl"
          download
          class="mt-2 flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          @click="closeMobile"
        >
          <Icon name="mdi:download" class="h-4 w-4" />
          {{ t('nav.downloadCv') }}
        </a>
      </nav>
    </Transition>
  </header>
</template>
