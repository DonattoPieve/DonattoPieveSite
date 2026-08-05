import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Donatto Pieve" },
      { name: "description", content: "Athena, Cronos e outros projetos em automação e web." },
      { property: "og:title", content: "Projetos — Donatto Pieve" },
      { property: "og:description", content: "Athena, Cronos e outros projetos em automação e web." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projetos,
});

type Projeto = {
  titulo: string;
  descricao: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  soon?: boolean;
};

const projetos: Projeto[] = [
  {
    titulo: "Athena",
    descricao:
      "Segundo cérebro acadêmico: notas do INATEL viram wiki técnica publicada na web, por um comando — com grafo, busca e diamante 3D.",
    tags: ["Next.js", "Three.js", "Claude Code"],
    github: null,
    demo: "https://athena-yuuta.vercel.app",
  },
  {
    titulo: "Cronos",
    descricao:
      "Irmão do Athena: ingest automático via GitHub Actions. Você marca a nota como pronta, o resto roda sozinho.",
    tags: ["GitHub Actions", "Automação"],
    github: "https://github.com/DonattoPieve/CRONOS",
    demo: null,
  },
  {
    titulo: "Mais no GitHub",
    descricao:
      "Estudos, protótipos e experimentos — código aberto e sempre crescendo.",
    tags: ["Open source"],
    github: "https://github.com/DonattoPieve",
    demo: null,
  },
  {
    titulo: "Finanças",
    descricao:
      "Organizador de finanças pessoais pra ajudar na rotina — próximo projeto do ecossistema.",
    tags: ["Em breve"],
    github: null,
    demo: null,
    soon: true,
  },
];

function Projetos() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projetos
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Trabalhos e <span className="text-gradient">experimentos</span>.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Uma seleção dos projetos que construí — a maioria nasceu de um problema meu que virou
          ferramenta.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto) => (
            <article
              key={projeto.titulo}
              className={`group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 ${
                projeto.soon ? "opacity-70" : ""
              }`}
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {projeto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-xl font-bold text-card-foreground">{projeto.titulo}</h2>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {projeto.descricao}
              </p>
              <div className="flex items-center gap-3">
                {projeto.github && (
                  <a
                    href={projeto.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <ExternalLink size={16} />
                    <span>Ver ao vivo</span>
                  </a>
                )}
                {!projeto.github && !projeto.demo && (
                  <span className="text-sm text-muted-foreground">Em desenvolvimento</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
