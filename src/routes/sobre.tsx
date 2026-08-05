import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useLang } from '../lib/i18n'

export const Route = createFileRoute('/sobre')({
  head: () => ({
    meta: [
      { title: 'Sobre mim — Donatto Pieve' },
      {
        name: 'description',
        content: 'Estudante de Engenharia de Computação no INATEL, focado em automação, web e 3D.',
      },
      { property: 'og:title', content: 'Sobre mim — Donatto Pieve' },
      {
        property: 'og:description',
        content: 'Estudante de Engenharia de Computação no INATEL, focado em automação, web e 3D.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Sobre,
})

// Basta soltar `foto.jpg` em public/ pra foto aparecer. Enquanto o arquivo
// não existe, o onError devolve o placeholder — assim a página nunca mostra
// o ícone de imagem quebrada, que é pior que um quadro vazio.
const FOTO_SRC = '/foto.jpg'

function Foto() {
  const { t } = useLang()
  const [falhou, setFalhou] = useState(false)

  return (
    <div className="w-full max-w-sm aspect-square rounded-2xl border border-border bg-card overflow-hidden">
      {falhou ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          <span className="text-sm">{t('sobre.photo')}</span>
        </div>
      ) : (
        <img
          src={FOTO_SRC}
          alt={t('sobre.photo.alt')}
          onError={() => setFalhou(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

function Sobre() {
  const { t } = useLang()

  const stack: { label: string; itens: string[] }[] = [
    { label: t('sobre.stack.lang'), itens: ['Python', 'TypeScript', 'JavaScript', 'C', 'Java'] },
    { label: t('sobre.stack.web'), itens: ['Next.js', 'React', 'Node', 'Three.js'] },
    { label: t('sobre.stack.tools'), itens: ['Git', 'Vercel', 'Supabase'] },
  ]

  const kv: { k: string; v: string; destaque?: boolean }[] = [
    { k: t('sobre.kv.formacao.k'), v: t('sobre.kv.formacao.v') },
    { k: t('sobre.kv.foco.k'), v: t('sobre.kv.foco.v') },
    { k: t('sobre.kv.local.k'), v: t('sobre.kv.local.v') },
    // "Buscando estágio" na cor de destaque: é a linha que precisa ser lida
    // por quem abriu esta página vindo de uma vaga.
    { k: t('sobre.kv.status.k'), v: t('sobre.kv.status.v'), destaque: true },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium text-muted-foreground tracking-widest uppercase">
          {t('sobre.eyebrow')}
        </p>
        <h1 className="mb-8 text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {t('sobre.h1.pre')}
          <span className="text-gradient">{t('sobre.h1.grad')}</span>.
        </h1>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
          <Foto />

          {/* p1 e p2 têm <strong> no meio da frase; o HTML vem do dicionário,
              onde o texto é escrito por mim — não há entrada de usuário aqui. */}
          <div className="space-y-6 text-muted-foreground">
            <p
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('sobre.p1') }}
            />
            <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t('sobre.p2') }} />
            <p className="leading-relaxed">{t('sobre.p3')}</p>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="space-y-1">
            {kv.map(linha => (
              <div
                key={linha.k}
                className="py-3 border-t border-border first:border-t-0 flex gap-3 text-sm"
              >
                <span className="w-28 shrink-0 text-muted-foreground">{linha.k}</span>
                <span className={linha.destaque ? 'text-primary' : 'text-foreground'}>
                  {linha.v}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {stack.map(grupo => (
              <div key={grupo.label}>
                <p className="mb-3 text-xs font-medium text-muted-foreground tracking-widest uppercase">
                  {grupo.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {grupo.itens.map(item => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
