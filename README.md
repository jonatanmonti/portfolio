# Portfolio · Jonatan Monti

Portfolio/CV construido con [Nuxt 4](https://nuxt.com), Tailwind CSS y envío de mails vía [Resend](https://resend.com). Pensado para desplegarse en Vercel.

## Stack

- **Nuxt 4** (Vue 3 + Nitro) — SSR/SSG para buen SEO, y las API routes de Nitro actúan como funciones serverless en Vercel, sin backend aparte.
- **Tailwind CSS** para el diseño, con dark mode (`@nuxtjs/color-mode`).
- **Nuxt Icon** (`devicon`, `simple-icons`, `mdi`, `circle-flags`) para los íconos de tecnologías y las banderas del selector de idioma.
- **Resend** para el envío de mails del formulario de contacto.
- **Cloudflare Turnstile** (`@nuxtjs/turnstile`) como protección anti-bot del formulario, además de un honeypot y un rate limit por IP en el servidor.
- **@nuxtjs/i18n** para el sitio en 3 idiomas (Español / Inglés / Portugués), con selector de banderas en el header.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Configurar el envío de mails (obligatorio para que funcione el formulario)

1. Creá una cuenta gratis en [resend.com](https://resend.com).
2. Generá una API key en el dashboard.
3. Copiá `.env.example` a `.env` y completá:

   ```
   NUXT_RESEND_API_KEY=re_xxxxxxxxxxxx
   NUXT_CONTACT_TO_EMAIL=jonatan.monti@hotmail.com
   ```

4. Por defecto el mail se envía desde `onboarding@resend.dev` (el remitente de prueba de Resend, funciona sin verificar dominio). Cuando quieras usar tu propio dominio (ej. `contacto@tudominio.com`), verificalo en Resend y cambiá el `from` en [server/api/contact.post.ts](server/api/contact.post.ts).

Sin la API key configurada, el formulario muestra un error controlado en vez de romperse.

## Configurar la protección anti-bot (obligatorio en producción)

El formulario usa [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (un captcha invisible, sin los rompecabezas de reCAPTCHA) más un honeypot y un rate limit por IP en el servidor. En **desarrollo local no tenés que hacer nada**: el módulo usa automáticamente las site/secret keys de prueba de Cloudflare, que siempre validan como "humano".

Para producción:

1. Andá a [dash.cloudflare.com → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) (necesitás una cuenta gratis de Cloudflare, no hace falta tener el dominio en Cloudflare).
2. Creá un site nuevo, modo **Managed**, con tu dominio (y `localhost` si querés probar con las keys reales en local).
3. Copiá el **Site Key** y el **Secret Key** a tu `.env` / variables de entorno de Vercel:

   ```
   NUXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
   NUXT_TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
   ```

Sin estas variables en producción, Turnstile queda sin site key configurada (el widget no se muestra) y el servidor va a rechazar los envíos con "Verificación anti-bot faltante" — así que son obligatorias para que el formulario funcione en el sitio publicado.

## Desplegar en Vercel

1. Subí este proyecto a un repo de GitHub.
2. Importalo en [vercel.com/new](https://vercel.com/new). Vercel detecta Nuxt automáticamente (el proyecto ya tiene `nitro.preset: 'vercel'` en [nuxt.config.ts](nuxt.config.ts)).
3. En **Settings → Environment Variables** del proyecto en Vercel, agregá:
   - `NUXT_RESEND_API_KEY`
   - `NUXT_CONTACT_TO_EMAIL`
   - `NUXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `NUXT_TURNSTILE_SECRET_KEY`
4. Deploy. No hace falta ningún `vercel.json` adicional.

## Editar tu contenido

El contenido está separado en dos partes:

- [app/data/profile.ts](app/data/profile.ts) — datos **estructurales**, que no cambian según el idioma: email, teléfono, íconos, stack tecnológico de cada proyecto, estado (`in-progress`/`completed`), fechas de nacimiento de datos, urls, etc.
- [i18n/locales/es.json](i18n/locales/es.json), [en.json](i18n/locales/en.json) y [pt.json](i18n/locales/pt.json) — **todo el texto** que se ve en pantalla (bullets de experiencia, descripciones de proyectos, textos de botones, placeholders, etc.), uno por idioma.
- [app/data/techIcons.ts](app/data/techIcons.ts) — mapa de nombre de tecnología → ícono (Iconify). Agregá una entrada acá si usás una tecnología nueva en un proyecto.

Si agregás o editás texto, tenés que tocar **los 3 archivos de idioma** (es/en/pt) para que quede consistente en los tres. Los datos de `profile.ts` (fechas, stack, ids) se comparten entre los tres idiomas.

### Agregar un proyecto nuevo

1. En `app/data/profile.ts`, agregá un objeto al array `projectsMeta` con un `slug` nuevo (ej. `'mi-proyecto'`), su ícono, stack, estado, etc.
2. En cada uno de los 3 archivos de idioma, agregá una entrada con ese mismo slug dentro de `projects.items`, con `title`, `subtitle`, `period`, `description`, `overview` y `architecture` traducidos.

### Agregar un video a un proyecto

En `app/data/profile.ts`, cada proyecto (`projectsMeta`) tiene un campo `video`. Soporta 3 formatos:

```ts
// YouTube — src es el ID del video (lo que va después de v= en la URL)
video: { type: 'youtube', src: 'dQw4w9WgXcQ' }

// Vimeo — src es el ID numérico del video
video: { type: 'vimeo', src: '123456789' }

// Video propio — subilo a /public/videos/ y referencialo así
video: { type: 'mp4', src: '/videos/mi-proyecto.mp4' }

// Sin video
video: null
```

Al hacer clic en el ícono de play de la tarjeta del proyecto, se abre un modal con el video.

### Estado de un proyecto (En curso / Finalizado)

Cada proyecto tiene `status: 'in-progress' | 'completed'` en `profile.ts`. La sección de Proyectos se divide automáticamente en dos grupos según este campo; un grupo sin proyectos simplemente no se muestra.

### El detalle de "Ver más"

El botón "Ver más" de cada tarjeta abre un modal con 4 pestañas. La galería y los repos son estructurales (`profile.ts`, campo `detail`):

```ts
// app/data/profile.ts
detail: {
  gallery: ['/projects/app-medica/1.png', '/projects/app-medica/2.png'], // subí las imágenes a /public/projects/...
  repos: [
    { label: 'Back-End', url: 'https://github.com/...' },
    { label: 'Front-End', url: 'https://github.com/...' }
  ]
}
```

El texto de "Visión general" y "Arquitectura y retos" es traducible y vive en los 3 archivos de idioma, dentro de `projects.items.<slug>`:

```json
// i18n/locales/es.json (repetir en en.json y pt.json, traducido)
"overview": "Descripción larga: qué problema resuelve, para quién, tu rol.",
"architecture": ["Punto de arquitectura o desafío técnico 1", "Punto 2"]
```

Los campos vacíos (`architecture: []`, `gallery: []`, `repos: []`) muestran un estado vacío prolijo en vez de romper. El link de "Acceso al Servicio" sale del campo `demoUrl` del proyecto en `profile.ts` (no de `detail`).

### Los 3 proyectos ya cargados

Se precargaron los proyectos que ya tenés en tu carpeta `PERSONAL` (App Médica, Web Agro, Form Engine) con su stack tecnológico inferido de cada `package.json`/`.csproj`, todos marcados como `status: 'in-progress'`. Las descripciones son genéricas — reemplazalas en los 3 archivos de idioma (`i18n/locales/*.json`, dentro de `projects.items.<slug>`) por una descripción real de cada uno, y completá `gallery` y `repos` en `profile.ts` a medida que avances. Cuando termines uno, cambiá su `status` a `'completed'` en `profile.ts`.

## CV descargable

El botón "Descargar CV" del header apunta a uno de 3 PDFs según el idioma activo en la web:

- `public/cv-jonatan-monti.pdf` (Español)
- `public/cv-jonatan-monti-en.pdf` (Inglés)
- `public/cv-jonatan-monti-pt.pdf` (Portugués)

Si actualizás tu experiencia en el sitio, actualizá también los 3 PDFs (podés pedirle a Claude que los regenere, o editarlos con cualquier herramienta de PDF).

## Idiomas

El sitio está en Español (por defecto), Inglés y Portugués, con un selector de banderas en el header que guarda la preferencia en una cookie (`i18n_redirected`) para futuras visitas. Para agregar un cuarto idioma: creá `i18n/locales/<código>.json` con la misma estructura que los otros tres, agregalo a la lista `locales` en [nuxt.config.ts](nuxt.config.ts), y sumá su bandera en [app/components/LanguageSwitcher.vue](app/components/LanguageSwitcher.vue) (usa el set de íconos `circle-flags`, buscá el código de país en [icones.js.org](https://icon-sets.iconify.design/circle-flags/)).
