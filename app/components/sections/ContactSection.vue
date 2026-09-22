<script setup lang="ts">
import { personal } from '~/data/profile'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '' // honeypot
})

const turnstileToken = ref('')
const turnstile = ref()

type Status = 'idle' | 'loading' | 'success' | 'error'
const status = ref<Status>('idle')
const errorMessage = ref('')

async function submit() {
  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form, token: turnstileToken.value } })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.statusMessage || t('contact.form.genericError')
  } finally {
    turnstile.value?.reset()
  }
}

const contactInfo = computed(() => [
  { icon: 'mdi:email-outline', label: personal.email, href: `mailto:${personal.email}` },
  { icon: 'mdi:phone-outline', label: personal.phone, href: `tel:${personal.phone.replace(/[^\d+]/g, '')}` },
  { icon: 'mdi:map-marker-outline', label: personal.location, href: null },
  { icon: 'mdi:linkedin', label: 'linkedin.com/in/jonatanmonti', href: personal.linkedin }
])
</script>

<template>
  <section id="contacto" class="bg-slate-50 py-20 dark:bg-slate-900/40 sm:py-28">
    <div class="section-container">
      <SectionHeading :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" :description="t('contact.description')" />

      <div class="grid gap-10 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <div class="card h-full space-y-5 p-8">
            <a
              v-for="item in contactInfo"
              :key="item.label"
              :href="item.href ?? undefined"
              :target="item.href?.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm"
              :class="item.href ? 'transition hover:text-brand-600 dark:hover:text-brand-400' : ''"
            >
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              {{ item.label }}
            </a>
          </div>
        </div>

        <form class="lg:col-span-3" @submit.prevent="submit">
          <div class="card space-y-4 p-8">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="name" class="mb-1.5 block text-sm font-medium">{{ t('contact.form.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  maxlength="100"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
                  :placeholder="t('contact.form.namePlaceholder')"
                />
              </div>
              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium">{{ t('contact.form.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  maxlength="100"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
                  :placeholder="t('contact.form.emailPlaceholder')"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="mb-1.5 block text-sm font-medium">{{ t('contact.form.subject') }}</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                maxlength="150"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
                :placeholder="t('contact.form.subjectPlaceholder')"
              />
            </div>

            <div>
              <label for="message" class="mb-1.5 block text-sm font-medium">{{ t('contact.form.message') }}</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                maxlength="3000"
                rows="5"
                class="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900"
                :placeholder="t('contact.form.messagePlaceholder')"
              />
            </div>

            <!-- Honeypot: hidden from real users, bots tend to fill every field -->
            <input
              v-model="form.company"
              type="text"
              name="company"
              tabindex="-1"
              autocomplete="off"
              class="hidden"
              aria-hidden="true"
            />

            <NuxtTurnstile ref="turnstile" v-model="turnstileToken" class="flex justify-center" />

            <button
              type="submit"
              :disabled="status === 'loading' || !turnstileToken"
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-brand-400"
            >
              <Icon v-if="status === 'loading'" name="mdi:loading" class="h-4 w-4 animate-spin" />
              <Icon v-else name="mdi:send-outline" class="h-4 w-4" />
              {{ status === 'loading' ? t('contact.form.sending') : t('contact.form.submit') }}
            </button>

            <p v-if="status === 'success'" class="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
              <Icon name="mdi:check-circle-outline" class="h-4 w-4" />
              {{ t('contact.form.success') }}
            </p>
            <p v-if="status === 'error'" class="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
              <Icon name="mdi:alert-circle-outline" class="h-4 w-4" />
              {{ errorMessage }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
