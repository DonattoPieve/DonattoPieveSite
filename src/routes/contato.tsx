import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail, Github } from "lucide-react";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Donatto Pieve" },
      { name: "description", content: "Fale comigo por email ou redes. Aberto a estágios e projetos." },
      { property: "og:title", content: "Contato — Donatto Pieve" },
      { property: "og:description", content: "Fale comigo por email ou redes. Aberto a estágios e projetos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

function Contato() {
  const { t } = useLang();

  const canais = [
    { icon: <Mail size={24} />, title: "Email", sub: "donattocampos@outlook.com", href: "mailto:donattocampos@outlook.com" },
    { icon: <Linkedin size={24} />, title: "LinkedIn", sub: "/in/donatto-pieve", href: "https://www.linkedin.com/in/donatto-pieve/" },
    { icon: <Instagram size={24} />, title: "Instagram", sub: "@donatto0608", href: "https://instagram.com/donatto0608" },
    { icon: <Github size={24} />, title: "GitHub", sub: "/DonattoPieve", href: "https://github.com/DonattoPieve" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {t("contato.eyebrow")}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {t("contato.h1.pre")}
          <span className="text-gradient">{t("contato.h1.grad")}</span>.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">{t("contato.lead")}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {canais.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                {c.icon}
              </div>
              <div>
                <h2 className="font-bold text-card-foreground">{c.title}</h2>
                <p className="text-sm text-muted-foreground group-hover:text-foreground">{c.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
