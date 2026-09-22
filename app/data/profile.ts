// Non-translatable, structural data. All display text (bullets, descriptions,
// titles, etc.) lives in the i18n locale files under matching ids/slugs —
// see i18n/locales/{es,en,pt}.json.

export interface SkillGroup {
  key: 'languages' | 'frameworks' | 'databases' | 'tools' | 'other'
  items: { name: string; icon: string }[]
}

export interface ProjectRepo {
  label: string
  url: string
}

export interface ProjectMeta {
  slug: string
  icon: string
  status: 'in-progress' | 'completed'
  stack: string[]
  video: { type: 'youtube' | 'vimeo' | 'mp4'; src: string } | null
  image: string | null
  demoUrl: string | null
  detail: {
    gallery: string[]
    repos: ProjectRepo[]
  }
}

export const personal = {
  name: 'Jonatan Monti',
  location: 'CABA, Argentina',
  email: 'jonatan.monti@hotmail.com',
  phone: '11 6944-9679',
  linkedin: 'https://www.linkedin.com/in/jonatanmonti/',
  github: ''
}

export const experienceMeta = [
  { id: 'cnv', company: 'Comisión Nacional de Valores' },
  { id: 'mecon', company: 'Ministerio de Economía' }
]

export const educationMeta = [
  { id: 'ifts', institution: 'IFTS 24' },
  { id: 'uai', institution: 'Universidad Abierta Interamericana' },
  { id: 'coderhouse', institution: 'CoderHouse' },
  { id: 'msft', institution: 'Microsoft / LinkedIn' }
]

export const skills: SkillGroup[] = [
  {
    key: 'languages',
    items: [
      { name: 'C#', icon: 'devicon:csharp' },
      { name: 'JavaScript', icon: 'devicon:javascript' },
      { name: 'TypeScript', icon: 'devicon:typescript' },
      { name: 'HTML5', icon: 'devicon:html5' },
      { name: 'CSS3', icon: 'devicon:css3' }
    ]
  },
  {
    key: 'frameworks',
    items: [
      { name: 'Angular', icon: 'devicon:angular' },
      { name: 'Vue.js', icon: 'devicon:vuejs' },
      { name: 'ASP.NET Core', icon: 'devicon:dotnetcore' },
      { name: 'Bootstrap', icon: 'devicon:bootstrap' },
      { name: 'Ionic', icon: 'devicon:ionic' }
    ]
  },
  {
    key: 'databases',
    items: [{ name: 'SQL', icon: 'mdi:database' }]
  },
  {
    key: 'tools',
    items: [
      { name: 'Git', icon: 'devicon:git' },
      { name: 'Azure DevOps', icon: 'devicon:azure' },
      { name: 'Linux', icon: 'devicon:linux' }
    ]
  },
  {
    key: 'other',
    items: [
      { name: 'API REST', icon: 'mdi:api' },
      { name: 'ADO.NET', icon: 'mdi:database-sync' },
      { name: 'Windows Forms', icon: 'mdi:microsoft-windows' }
    ]
  }
]

export const languagesMeta = [
  { id: 'es', percent: 100 },
  { id: 'en', percent: 60 }
]

export const projectsMeta: ProjectMeta[] = [
  {
    slug: 'app-medica',
    icon: 'mdi:hospital-box-outline',
    status: 'in-progress',
    stack: ['Angular', 'Ionic', 'TypeScript', 'Capacitor'],
    video: null,
    image: null,
    demoUrl: null,
    detail: { gallery: [], repos: [] }
  },
  {
    slug: 'web-agro',
    icon: 'mdi:sprout-outline',
    status: 'in-progress',
    stack: ['ASP.NET Core', 'Angular', 'SQL', 'TypeScript'],
    video: null,
    image: null,
    demoUrl: null,
    detail: { gallery: [], repos: [] }
  },
  {
    slug: 'form-engine',
    icon: 'mdi:file-cog-outline',
    status: 'in-progress',
    stack: ['ASP.NET Core', 'Angular', 'SQL'],
    video: null,
    image: null,
    demoUrl: null,
    detail: { gallery: [], repos: [] }
  }
]
