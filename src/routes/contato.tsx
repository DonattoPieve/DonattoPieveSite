import { createFileRoute } from '@tanstack/react-router'
import { Linkedin, Instagram, Mail, Github } from 'lucide-react'
import { useLang } from '../lib/i18n'

export const Route = createFileRoute('/contato')({
  head: () => ({
    meta: [
      { title: 'Contato — Donatto Pieve' },
      {
        name: 'description',
        content: 'Fale comigo por email ou redes. Aberto a estágios e projetos.',
      },
      { property: 'og:title', content: 'Contato — Donatto Pieve' },
      {
        property: 'og:description',
        content: 'Fale comigo por email ou redes. Aberto a estágios e projetos.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Contato,
})

interface Canal {
  icon: React.ReactNode
  title: string
  sub: string
  href: string
}

const CANAIS: Canal[] = [
  {
    icon: <Mail size={24} />,
    title: 'Email',
    sub: 'donattocampos@outlook.com',
    href: 'mailto:donattocampos@outlook.com',
  },
  {
    icon: <Linkedin size={24} />,
    title: 'LinkedIn',
    sub: '/in/donatto-pieve',
    href: 'https://www.linkedin.com/in/donatto-pieve/',
  },
  {
    icon: <Instagram size={24} />,
    title: 'Instagram',
    sub: '@donatto0608',
    href: 'https://instagram.com/donatto0608',
  },
  {
    icon: <Github size={24} />,
    title: 'GitHub',
    sub: '/DonattoPieve',
    href: 'https://github.com/DonattoPieve',
  },
]

function Contato() {
  const { t } = useLang()

  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium text-muted-foreground tracking-widest uppercase">
          {t('contato.eyebrow')}
        </p>
        <h1 className="mb-6 text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {t('contato.h1.pre')}
          <span className="text-gradient">{t('contato.h1.grad')}</span>.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">{t('contato.lead')}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {CANAIS.map(canal => (
            <CardCanal key={canal.title} canal={canal} />
          ))}
        </div>
      </section>
    </div>
  )
}

function CardCanal({ canal }: { canal: Canal }) {
  // mailto: abre o cliente de email na própria aba — target="_blank" nele
  // deixaria uma aba branca aberta pra trás.
  const externo = !canal.href.startsWith('mailto:')

  return (
    <a
      href={canal.href}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noopener noreferrer' : undefined}
      className="group p-6 rounded-2xl border border-border bg-card flex items-center gap-4 hover:-translate-y-1 hover:border-primary/30 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
        {canal.icon}
      </div>
      <div>
        <h2 className="font-bold text-card-foreground">{canal.title}</h2>
        <p className="text-sm text-muted-foreground group-hover:text-foreground">{canal.sub}</p>
      </div>
    </a>
  )
}
