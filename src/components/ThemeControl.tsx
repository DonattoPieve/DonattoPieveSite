import { useEffect, useState } from "react";
import { Palette, Sun, Moon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

type Theme = "dark" | "light";

const PALETTES: { id: string; label: string; hue: number }[] = [
  { id: "purple", label: "Roxo", hue: 300 },
  { id: "cyan", label: "Cyan", hue: 200 },
  { id: "blue", label: "Azul", hue: 255 },
  { id: "matrix", label: "Matrix", hue: 155 },
  { id: "amber", label: "Âmbar", hue: 75 },
  { id: "pink", label: "Rosa", hue: 350 },
  { id: "red", label: "Vermelho", hue: 25 },
];

export function ThemeControl() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [palette, setPalette] = useState("purple");

  // sincroniza com o que o script inline já aplicou no <html>
  useEffect(() => {
    const el = document.documentElement;
    const t = (el.getAttribute("data-theme") as Theme) || "dark";
    const p = el.getAttribute("data-palette") || "purple";
    setTheme(t);
    setPalette(p);
  }, []);

  function applyTheme(t: Theme) {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("dp-theme", t);
    } catch {
      /* ignora storage indisponível */
    }
  }

  function applyPalette(p: string) {
    setPalette(p);
    document.documentElement.setAttribute("data-palette", p);
    try {
      localStorage.setItem("dp-palette", p);
    } catch {
      /* ignora storage indisponível */
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Aparência"
          title="Aparência"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Palette size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 rounded-2xl border-border bg-card p-4">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Tema
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyTheme("dark")}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  theme === "dark"
                    ? "border-primary/40 bg-secondary text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon size={15} /> Escuro
              </button>
              <button
                onClick={() => applyTheme("light")}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  theme === "light"
                    ? "border-primary/40 bg-secondary text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun size={15} /> Claro
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Cor de destaque
            </p>
            <div className="flex flex-wrap gap-2.5">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPalette(p.id)}
                  aria-label={p.label}
                  title={p.label}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    palette === p.id ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: `oklch(0.62 0.17 ${p.hue})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
