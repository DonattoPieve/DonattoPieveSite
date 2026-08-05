import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, Github } from 'lucide-react'
import { useLang } from '../lib/i18n'

export const Route = createFileRoute('/projetos')({
  head: () => ({
    meta: [
      { title: 'Projetos — Donatto Pieve' },
      { name: 'description', content: 'Athena, Cronos e outros projetos em automação e web.' },
      { property: 'og:title', content: 'Projetos — Donatto Pieve' },
      {
        property: 'og:description',
        content: 'Athena, Cronos e outros projetos em automação e web.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Projetos,
})

interface Projeto {
  titulo: string
  descricao: string
  tags: string[]
  github: string | null
  demo: string | null
  soon?: boolean
}

function Projetos() {
  const { t } = useLang()

  // As descrições vêm do dicionário, mas título, tags e URLs ficam aqui: são
  // nomes próprios e endereços, iguais em PT e EN.
  const projetos: Projeto[] = [
    {
      titulo: 'Athena',
      descricao: t('proj.athena.desc'),
      tags: ['Next.js', 'Three.js'],
      github: null,
      demo: 'https://athena-yuuta.vercel.app',
    },
    {
      titulo: 'Cronos',
      descricao: t('proj.cronos.desc'),
      tags: [t('proj.tag.automacao'), 'GitHub Actions'],
      github: 'https://github.com/DonattoPieve/CRONOS',
      demo: null,
    },
    {
      titulo: t('proj.github.title'),
      descricao: t('proj.github.desc'),
      tags: [t('proj.tag.open')],
      github: 'https://github.com/DonattoPieve',
      demo: null,
    },
    {
      titulo: t('proj.financas.title'),
      descricao: t('proj.financas.desc'),
      tags: [t('proj.tag.soon')],
      github: null,
      demo: null,
      soon: true,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium text-muted-foreground tracking-widest uppercase">
          {t('proj.eyebrow')}
        </p>
        <h1 className="mb-6 text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {t('proj.h1.pre')}
          <span className="text-gradient">{t('proj.h1.grad')}</span>.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">{t('proj.lead')}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map(projeto => (
            <CardProjeto key={projeto.titulo} projeto={projeto} />
          ))}
        </div>
      </section>
    </div>
  )
}

function CardProjeto({ projeto }: { projeto: Projeto }) {
  const { t } = useLang()

  return (
    <article
      className={`group p-6 rounded-2xl border border-border bg-card flex flex-col hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ${
        projeto.soon ? 'opacity-70' : ''
      }`}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {projeto.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="mb-2 text-xl font-bold text-card-foreground">{projeto.titulo}</h2>
      {/* flex-1 na descrição: os cards da linha empatam a altura, então os
          botões alinham na base mesmo com textos de tamanhos diferentes. */}
      <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
        {projeto.descricao}
      </p>
      <div className="flex items-center gap-3">
        {projeto.github && (
          <a
            href={projeto.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-secondary inline-flex items-center gap-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
        {projeto.demo && (
          <a
            href={projeto.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg bg-primary inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={16} />
            <span>{t('proj.btn.live')}</span>
          </a>
        )}
        {!projeto.github && !projeto.demo && (
          <span className="text-sm text-muted-foreground">{t('proj.btn.dev')}</span>
        )}
      </div>
    </article>
  )
}
