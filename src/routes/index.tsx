import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Code2, User, Mail } from 'lucide-react'
import { useLang } from '../lib/i18n'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Início — Donatto Pieve' },
      {
        name: 'description',
        content: 'Estudante de Engenharia de Computação no INATEL. Automação, web e 3D.',
      },
      { property: 'og:title', content: 'Donatto Pieve' },
      {
        property: 'og:description',
        content: 'Estudante de Engenharia de Computação no INATEL. Automação, web e 3D.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
})

function Index() {
  const { t } = useLang()

  return (
    <div className="relative overflow-hidden">
      {/* Manchas de luz do fundo. pointer-events-none porque elas cobrem os
          cards e engoliriam o clique; overflow-hidden no pai apara o excesso. */}
      <div className="absolute -left-40 top-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-40 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-40 pb-24">
        <section className="mb-24">
          <p className="mb-4 text-sm font-medium text-muted-foreground tracking-widest uppercase">
            {t('home.eyebrow')}
          </p>
          <h1 className="max-w-4xl text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
            {t('home.h1.pre')}
            <span className="text-gradient">{t('home.h1.grad')}</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {t('home.lead')}
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {/* Projetos vem com glow: é a página que interessa a quem chegou aqui
              por um link de vaga ou currículo. */}
          <FeatureCard
            to="/projetos"
            title={t('home.card.projetos.title')}
            description={t('home.card.projetos.desc')}
            explore={t('home.explore')}
            icon={<Code2 size={24} />}
            destaque
          />
          <FeatureCard
            to="/sobre"
            title={t('home.card.sobre.title')}
            description={t('home.card.sobre.desc')}
            explore={t('home.explore')}
            icon={<User size={24} />}
          />
          <FeatureCard
            to="/contato"
            title={t('home.card.contato.title')}
            description={t('home.card.contato.desc')}
            explore={t('home.explore')}
            icon={<Mail size={24} />}
          />
        </section>
      </div>
    </div>
  )
}

function FeatureCard({
  to,
  title,
  description,
  explore,
  icon,
  destaque = false,
}: {
  to: string
  title: string
  description: string
  explore: string
  icon: React.ReactNode
  destaque?: boolean
}) {
  return (
    <Link
      to={to}
      className={`group relative p-8 rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ${
        destaque ? 'glow' : ''
      }`}
    >
      <div>
        <div className="mb-6 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="mb-3 text-2xl font-bold text-card-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
        <span>{explore}</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
