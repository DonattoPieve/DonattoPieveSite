import { useEffect, useState } from 'react'
import { Palette, Sun, Moon } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'

type Tema = 'dark' | 'light'

interface Paleta {
  id: string
  label: string
  hue: number
}

// O `hue` repete de propósito o valor que styles.css declara em
// [data-palette]: o CSS ainda não trocou enquanto o usuário só olha as
// opções, então a bolinha precisa da cor à mão pra mostrar o que vem.
const PALETAS: Paleta[] = [
  { id: 'purple', label: 'Roxo', hue: 300 },
  { id: 'cyan', label: 'Cyan', hue: 200 },
  { id: 'blue', label: 'Azul', hue: 255 },
  { id: 'matrix', label: 'Matrix', hue: 155 },
  { id: 'amber', label: 'Âmbar', hue: 75 },
  { id: 'pink', label: 'Rosa', hue: 350 },
  { id: 'red', label: 'Vermelho', hue: 25 },
]

export default function ThemeControl() {
  const [tema, setTema] = useState<Tema>('dark')
  const [paleta, setPaleta] = useState('purple')

  // Lê do <html>, não do localStorage: o script inline do __root já resolveu
  // a escolha antes da hidratação, e ler da mesma fonte garante que o botão
  // concorda com o que a página está mostrando.
  useEffect(() => {
    const el = document.documentElement
    setTema((el.getAttribute('data-theme') as Tema) || 'dark')
    setPaleta(el.getAttribute('data-palette') || 'purple')
  }, [])

  const aplicarTema = (t: Tema) => {
    setTema(t)
    document.documentElement.setAttribute('data-theme', t)
    try {
      localStorage.setItem('dp-theme', t)
    } catch {
      /* storage indisponível — a escolha vale só nesta sessão */
    }
  }

  const aplicarPaleta = (p: string) => {
    setPaleta(p)
    document.documentElement.setAttribute('data-palette', p)
    try {
      localStorage.setItem('dp-palette', p)
    } catch {
      /* storage indisponível — a escolha vale só nesta sessão */
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Aparência"
          title="Aparência"
          className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Palette size={16} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 p-4 rounded-2xl border-border bg-card">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Tema
            </p>
            <div className="grid grid-cols-2 gap-2">
              <BotaoTema
                ativo={tema === 'dark'}
                onClick={() => aplicarTema('dark')}
                icon={<Moon size={15} />}
                label="Escuro"
              />
              <BotaoTema
                ativo={tema === 'light'}
                onClick={() => aplicarTema('light')}
                icon={<Sun size={15} />}
                label="Claro"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              Cor de destaque
            </p>
            <div className="flex flex-wrap gap-2.5">
              {PALETAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => aplicarPaleta(p.id)}
                  aria-label={p.label}
                  title={p.label}
                  className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                    paleta === p.id ? 'border-foreground' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: `oklch(0.62 0.17 ${p.hue})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function BotaoTema({
  ativo,
  onClick,
  icon,
  label,
}: {
  ativo: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-2 text-sm transition-colors ${
        ativo
          ? 'border-primary/40 bg-secondary text-foreground'
          : 'border-border text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon} {label}
    </button>
  )
}
