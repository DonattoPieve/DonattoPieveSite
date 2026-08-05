import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre mim — Donatto Pieve" },
      { name: "description", content: "Estudante de Engenharia de Computação no INATEL, focado em automação, web e 3D." },
      { property: "og:title", content: "Sobre mim — Donatto Pieve" },
      { property: "og:description", content: "Estudante de Engenharia de Computação no INATEL, focado em automação, web e 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sobre,
});

const stack = {
  Linguagens: ["Python", "TypeScript", "JavaScript", "C", "Java"],
  "Web & 3D": ["Next.js", "React", "Node", "Three.js"],
  Ferramentas: ["Git", "Vercel", "Supabase", "Claude Code"],
};

function Sobre() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Sobre mim
        </p>
        <h1 className="mb-8 text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Quem está por trás dos <span className="text-gradient">projetos</span>.
        </h1>

        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <div className="aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-sm">Sua foto aqui</span>
            </div>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Sou o <span className="text-foreground font-medium">Donatto</span>, estudante de
              Engenharia de Computação no INATEL. Gosto de resolver o problema chato{" "}
              <span className="text-foreground font-medium">por trás</span> da tarefa — de
              preferência com um pipeline que roda sozinho depois.
            </p>
            <p className="leading-relaxed">
              O <span className="text-foreground font-medium">Athena</span> e o{" "}
              <span className="text-foreground font-medium">Cronos</span> nasceram assim: eu não
              queria reformatar nota de aula na mão, então construí o sistema que faz isso — do PDF do
              professor à wiki técnica publicada, com grafo de conexões e busca.
            </p>
            <p className="leading-relaxed">
              Curto a interseção entre automação, web e visualização. Se dá pra transformar em
              ferramenta, eu transformo.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">sistemas no ar</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">matérias no Athena</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-16 space-y-6">
          {Object.entries(stack).map(([grupo, itens]) => (
            <div key={grupo}>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {grupo}
              </p>
              <div className="flex flex-wrap gap-2">
                {itens.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
