import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, User, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — Donatto Pieve" },
      { name: "description", content: "Estudante de Engenharia de Computação no INATEL. Automação, web e 3D." },
      { property: "og:title", content: "Início — Donatto Pieve" },
      { property: "og:description", content: "Estudante de Engenharia de Computação no INATEL. Automação, web e 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
        {/* Hero */}
        <section className="mb-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Engenharia de Computação • INATEL
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl">
            Construo ferramentas que <span className="text-gradient">organizam conhecimento</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Estudante de Engenharia de Computação no INATEL. Do PDF do professor à wiki técnica no ar,
            por um comando — automação, web e um pouco de 3D.
          </p>
        </section>

        {/* Cards de destaque */}
        <section className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            to="/projetos"
            title="Projetos"
            description="Athena, Cronos e experimentos — sistemas que se mantêm sozinhos depois de prontos."
            icon={<Code2 size={24} />}
            highlighted
          />
          <FeatureCard
            to="/sobre"
            title="Sobre mim"
            description="Trajetória, stack e o que me move como desenvolvedor."
            icon={<User size={24} />}
          />
          <FeatureCard
            to="/contato"
            title="Contato"
            description="Aberto a estágios e projetos. Fala comigo por email ou redes."
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
  icon,
  highlighted = false,
}: {
  to: string;
  title: string;
  description: string;
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
        <span>Explorar</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
