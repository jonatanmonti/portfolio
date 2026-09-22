import { Resend } from 'resend'

interface ContactBody {
  name?: string
  email?: string
  subject?: string
  message?: string
  company?: string // honeypot field, must stay empty
  token?: string // Cloudflare Turnstile token
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple in-memory rate limit per server instance: 5 requests / 10 min per IP.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function isRateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > MAX_REQUESTS
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event).catch(() => null)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Solicitud inválida.' })
  }

  // Honeypot: real users leave it empty (or omit it); anything non-empty is a bot.
  const honeypot = body.company
  if (honeypot && (typeof honeypot !== 'string' || honeypot.trim().length > 0)) {
    return { ok: true }
  }

  const name = asString(body.name)?.trim()
  const email = asString(body.email)?.trim()
  const message = asString(body.message)?.trim()
  const subject = asString(body.subject)?.trim() || 'Nuevo mensaje desde el portfolio'

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Faltan campos obligatorios.' })
  }
  if (name.length > 100 || email.length > 100 || subject.length > 150 || message.length > 3000) {
    throw createError({ statusCode: 400, statusMessage: 'Alguno de los campos es demasiado largo.' })
  }
  if (!EMAIL_REGEX.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'El email no es válido.' })
  }

  const turnstileToken = asString(body.token)
  if (!turnstileToken) {
    throw createError({ statusCode: 400, statusMessage: 'Verificación anti-bot faltante. Recargá la página e intentá de nuevo.' })
  }
  const turnstileResult = await verifyTurnstileToken(turnstileToken, event)
  if (!turnstileResult.success) {
    throw createError({ statusCode: 400, statusMessage: 'No pudimos verificar que sos humano. Recargá la página e intentá de nuevo.' })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Demasiados mensajes. Probá de nuevo más tarde.' })
  }

  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'El envío de mails no está configurado todavía.' })
  }

  const resend = new Resend(config.resendApiKey)
  const to = config.contactToEmail || 'jonatan.monti@hotmail.com'

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Nuevo mensaje desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `
  })

  if (error) {
    throw createError({ statusCode: 502, statusMessage: 'No se pudo enviar el mensaje. Probá de nuevo.' })
  }

  return { ok: true }
})

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
