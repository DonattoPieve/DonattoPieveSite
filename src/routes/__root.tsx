import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Linkedin, Instagram, Mail, Github } from "lucide-react";

import appCss from "../styles.css?url";
import { ThemeControl } from "../components/ThemeControl";
import { LangProvider, useLang, LangToggle } from "../lib/i18n";

const themeInitScript = `(function(){var e=document.documentElement;var t='dark',p='purple';try{t=localStorage.getItem('dp-theme')||t;p=localStorage.getItem('dp-palette')||p;}catch(_){}e.setAttribute('data-theme',t);e.setAttribute('data-palette',p);})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Donatto Pieve — Portfólio" },
      { name: "description", content: "Portfólio de Donatto Pieve — automação, web e 3D. Do PDF do professor à wiki técnica no ar." },
      { name: "author", content: "Donatto Pieve" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

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
  );
}

function Header() {
  const { t } = useLang();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-4 py-6">
      <nav className="flex items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-2 backdrop-blur-xl">
        <NavLink to="/">{t("nav.inicio")}</NavLink>
        <NavLink to="/sobre">{t("nav.sobre")}</NavLink>
        <NavLink to="/projetos">{t("nav.projetos")}</NavLink>
        <NavLink to="/contato">{t("nav.contato")}</NavLink>
        <span className="mx-2 h-4 w-px bg-border" />
        <SocialLink href="https://www.linkedin.com/in/donatto-pieve/" label="LinkedIn" icon={<Linkedin size={16} />} />
        <SocialLink href="https://instagram.com/donatto0608" label="Instagram" icon={<Instagram size={16} />} />
        <SocialLink href="mailto:donattocampos@outlook.com" label="Email" icon={<Mail size={16} />} />
        <span className="mx-1 h-4 w-px bg-border" />
        <LangToggle />
        <ThemeControl />
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "text-foreground" }}
      inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
      className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {icon}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Donatto Pieve · donattopieve.com.br</p>
        <div className="flex items-center gap-4">
          <a href="mailto:donattocampos@outlook.com" className="hover:text-foreground">donattocampos@outlook.com</a>
          <span className="hidden text-border md:inline">•</span>
          <div className="flex gap-2">
            <SocialLink href="https://www.linkedin.com/in/donatto-pieve/" label="LinkedIn" icon={<Linkedin size={16} />} />
            <SocialLink href="https://instagram.com/donatto0608" label="Instagram" icon={<Instagram size={16} />} />
            <SocialLink href="https://github.com/DonattoPieve" label="GitHub" icon={<Github size={16} />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </LangProvider>
    </QueryClientProvider>
  );
}
