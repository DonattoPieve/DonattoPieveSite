import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Linkedin, Instagram, Mail, Github } from 'lucide-react'

import appCss from '../styles.css?url'
import ThemeControl from '../components/ThemeControl'
import { LangProvider, useLang, LangToggle } from '../lib/i18n'

// Roda antes de qualquer pintura, então o tema salvo já está no <html> quando
// o HTML do SSR aparece. Sem isso a página abre no escuro padrão e pisca pro
// claro na hidratação. Minificado à mão: é uma tag inline no <head>.
const themeInitScript = `(function(){var e=document.documentElement;var t='dark',p='purple';try{t=localStorage.getItem('dp-theme')||t;p=localStorage.getItem('dp-palette')||p;}catch(_){}e.setAttribute('data-theme',t);e.setAttribute('data-palette',p);})();`

const REDES = {
  linkedin: 'https://www.linkedin.com/in/donatto-pieve/',
  instagram: 'https://instagram.com/donatto0608',
  github: 'https://github.com/DonattoPieve',
  email: 'donattocampos@outlook.com',
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Donatto Pieve — Portfólio' },
      {
        name: 'description',
        content:
          'Portfólio de Donatto Pieve — automação, web e 3D. Do PDF do professor à wiki técnica no ar.',
      },
      { name: 'author', content: 'Donatto Pieve' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
      },
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})

/**
 * Casca do documento — só o <html> que o SSR precisa.
 * O layout visível (nav, footer) vive em RootComponent, que roda dentro dos
 * providers; aqui não há contexto de idioma, por isso nada de t() nesta parte.
 */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

// 404 e erro ficam fora do LangProvider (o router os monta acima dele), então
// o texto é PT fixo — traduzir aqui exigiria duplicar o provider.
function NotFoundComponent() {
  return (
    <div className="min-h-screen px-4 bg-background flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-md bg-primary inline-flex items-center justify-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)
  const router = useRouter()

  // invalidate + reset na mesma ação: só resetar o boundary remonta a rota
  // com o loader já falhado em cache, e o erro volta na hora.
  const tentarDeNovo = () => {
    router.invalidate()
    reset()
  }

  return (
    <div className="min-h-screen px-4 bg-background flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={tentarDeNovo}
            className="px-4 py-2 rounded-md bg-primary inline-flex items-center justify-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Tentar de novo
          </button>
          {/* <a> e não <Link>: se o router é o que quebrou, navegar por ele
              pode cair no mesmo erro — recarregar a página é a saída segura. */}
          <a
            href="/"
            className="px-4 py-2 rounded-md border border-input bg-background inline-flex items-center justify-center text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  )
}

function Header() {
  const { t } = useLang()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 flex items-center justify-center">
      <nav className="px-3 py-2 rounded-full border border-border bg-background/80 backdrop-blur-xl flex items-center gap-1">
        <NavLink to="/">{t('nav.inicio')}</NavLink>
        <NavLink to="/sobre">{t('nav.sobre')}</NavLink>
        <NavLink to="/projetos">{t('nav.projetos')}</NavLink>
        <NavLink to="/contato">{t('nav.contato')}</NavLink>
        <span className="mx-2 w-px h-4 bg-border" />
        <SocialLink href={REDES.linkedin} label="LinkedIn" icon={<Linkedin size={16} />} />
        <SocialLink href={REDES.instagram} label="Instagram" icon={<Instagram size={16} />} />
        <SocialLink href={`mailto:${REDES.email}`} label="Email" icon={<Mail size={16} />} />
        <span className="mx-1 w-px h-4 bg-border" />
        <LangToggle />
        <ThemeControl />
      </nav>
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{ className: 'text-foreground' }}
      inactiveProps={{ className: 'text-muted-foreground hover:text-foreground' }}
      className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
    >
      {icon}
    </a>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Donatto Pieve · donattopieve.com.br</p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${REDES.email}`} className="hover:text-foreground">
            {REDES.email}
          </a>
          <span className="hidden md:inline text-border">•</span>
          <div className="flex gap-2">
            <SocialLink href={REDES.linkedin} label="LinkedIn" icon={<Linkedin size={16} />} />
            <SocialLink href={REDES.instagram} label="Instagram" icon={<Instagram size={16} />} />
            <SocialLink href={REDES.github} label="GitHub" icon={<Github size={16} />} />
          </div>
        </div>
      </div>
    </footer>
  )
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </LangProvider>
    </QueryClientProvider>
  )
}
