export const techIcons: Record<string, string> = {
  'C#': 'devicon:csharp',
  JavaScript: 'devicon:javascript',
  TypeScript: 'devicon:typescript',
  HTML5: 'devicon:html5',
  CSS3: 'devicon:css3',
  Angular: 'devicon:angular',
  'Vue.js': 'devicon:vuejs',
  'ASP.NET Core': 'devicon:dotnetcore',
  Bootstrap: 'devicon:bootstrap',
  SQL: 'mdi:database',
  Git: 'devicon:git',
  'Azure DevOps': 'devicon:azure',
  Linux: 'devicon:linux',
  'API REST': 'mdi:api',
  'ADO.NET': 'mdi:database-sync',
  'Windows Forms': 'mdi:microsoft-windows',
  Ionic: 'devicon:ionic',
  Capacitor: 'devicon:capacitor'
}

export function iconFor(tech: string) {
  return techIcons[tech] ?? 'mdi:code-tags'
}
