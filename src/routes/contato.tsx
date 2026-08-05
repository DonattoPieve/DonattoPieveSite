import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail, Github } from "lucide-react";

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
  return (
    <div className="mx-auto max-w-4xl px-6 pt-40 pb-24">
      <section>
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Contato
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
          Vamos <span className="text-gradient">conversar</span>.
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
          Aberto a estágios, projetos e uma boa ideia. Respondo rápido — manda por onde for mais
          fácil. Santa Rita do Sapucaí, MG.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="mailto:seu-email@exemplo.com"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h2 className="font-bold text-card-foreground">Email</h2>
              <p className="text-sm text-muted-foreground group-hover:text-foreground">seu-email@exemplo.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/SEU-PERFIL"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Linkedin size={24} />
            </div>
            <div>
              <h2 className="font-bold text-card-foreground">LinkedIn</h2>
              <p className="text-sm text-muted-foreground group-hover:text-foreground">/in/seu-perfil</p>
            </div>
          </a>

          <a
            href="https://instagram.com/SEU-PERFIL"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Instagram size={24} />
            </div>
            <div>
              <h2 className="font-bold text-card-foreground">Instagram</h2>
              <p className="text-sm text-muted-foreground group-hover:text-foreground">@seu-perfil</p>
            </div>
          </a>

          <a
            href="https://github.com/DonattoPieve"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Github size={24} />
            </div>
            <div>
              <h2 className="font-bold text-card-foreground">GitHub</h2>
              <p className="text-sm text-muted-foreground group-hover:text-foreground">/DonattoPieve</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
