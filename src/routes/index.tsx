import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, User, Mail } from "lucide-react";
import { useLang } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — Donatto Pieve" },
      { name: "description", content: "Estudante de Engenharia de Computação no INATEL. Automação, web e 3D." },
      { property: "og:title", content: "Donatto Pieve" },
      { property: "og:description", content: "Estudante de Engenharia de Computação no INATEL. Automação, web e 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
        <section className="mb-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {t("home.eyebrow")}
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl">
            {t("home.h1.pre")}
            <span className="text-gradient">{t("home.h1.grad")}</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("home.lead")}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            to="/projetos"
            title={t("home.card.projetos.title")}
            description={t("home.card.projetos.desc")}
            explore={t("home.explore")}
            icon={<Code2 size={24} />}
            highlighted
          />
          <FeatureCard
            to="/sobre"
            title={t("home.card.sobre.title")}
            description={t("home.card.sobre.desc")}
            explore={t("home.explore")}
            icon={<User size={24} />}
          />
          <FeatureCard
            to="/contato"
            title={t("home.card.contato.title")}
            description={t("home.card.contato.desc")}
            explore={t("home.explore")}
            icon={<Mail size={24} />}
          />
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  to,
  title,
  description,
  explore,
  icon,
  highlighted = false,
}: {
  to: string;
  title: string;
  description: string;
  explore: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 ${
        highlighted ? "glow" : ""
      }`}
    >
      <div>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
          {icon}
        </div>
        <h2 className="mb-3 text-2xl font-bold text-card-foreground">{title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
        <span>{explore}</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
