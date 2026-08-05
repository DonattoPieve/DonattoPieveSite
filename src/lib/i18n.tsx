import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'
type Dict = Record<string, string>

// Alguns parágrafos precisam de <strong> no meio da frase e entram por
// dangerouslySetInnerHTML. Centralizar as classes aqui evita repetir o
// atributo inteiro em cada string e sair do padrão sem ninguém notar.
const STRONG = 'class="text-foreground font-medium"'

const pt: Dict = {
  'nav.inicio': 'Início',
  'nav.sobre': 'Sobre mim',
  'nav.projetos': 'Projetos',
  'nav.contato': 'Contato',

  'home.eyebrow': 'Engenharia de Computação • INATEL',
  'home.h1.pre': 'Construo ferramentas que ',
  'home.h1.grad': 'organizam conhecimento',
  'home.lead':
    'Estudante de Engenharia de Computação no INATEL. Do PDF do professor à wiki técnica no ar, por um comando — automação, web e um pouco de 3D.',
  'home.card.projetos.title': 'Projetos',
  'home.card.projetos.desc':
    'Athena, Cronos e experimentos — sistemas que se mantêm sozinhos depois de prontos.',
  'home.card.sobre.title': 'Sobre mim',
  'home.card.sobre.desc': 'Trajetória, stack e o que me move como desenvolvedor.',
  'home.card.contato.title': 'Contato',
  'home.card.contato.desc': 'Aberto a estágios e projetos. Fala comigo por email ou redes.',
  'home.explore': 'Explorar',

  'sobre.eyebrow': 'Sobre mim',
  'sobre.h1.pre': 'Quem está por trás dos ',
  'sobre.h1.grad': 'projetos',
  'sobre.p1': `Sou o <strong ${STRONG}>Donatto</strong>, estudante de Engenharia de Computação no INATEL. Gosto de resolver o problema chato <strong ${STRONG}>por trás</strong> da tarefa — de preferência com um pipeline que roda sozinho depois.`,
  'sobre.p2': `O <strong ${STRONG}>Athena</strong> e o <strong ${STRONG}>Cronos</strong> nasceram assim: eu não queria reformatar nota de aula na mão, então construí o sistema que faz isso — do PDF do professor à wiki técnica publicada, com grafo de conexões e busca.`,
  'sobre.p3':
    'Curto a interseção entre automação, web e visualização. Se dá pra transformar em ferramenta, eu transformo.',
  'sobre.kv.formacao.k': 'Formação',
  'sobre.kv.formacao.v': 'Eng. de Computação · INATEL',
  'sobre.kv.foco.k': 'Foco',
  'sobre.kv.foco.v': 'Automação · Web · 3D',
  'sobre.kv.local.k': 'Local',
  'sobre.kv.local.v': 'Santa Rita do Sapucaí, MG',
  'sobre.kv.status.k': 'Status',
  'sobre.kv.status.v': 'Buscando estágio',
  'sobre.stack.lang': 'Linguagens',
  'sobre.stack.web': 'Web & 3D',
  'sobre.stack.tools': 'Ferramentas',
  'sobre.photo': 'Sua foto aqui',
  'sobre.photo.alt': 'Donatto Pieve',

  'proj.eyebrow': 'Projetos',
  'proj.h1.pre': 'Trabalhos e ',
  'proj.h1.grad': 'experimentos',
  'proj.lead':
    'Uma seleção dos projetos que construí — a maioria nasceu de um problema meu que virou ferramenta.',
  'proj.athena.desc':
    'Segundo cérebro acadêmico: notas do INATEL viram wiki técnica publicada na web, por um comando — com grafo, busca e diamante 3D.',
  'proj.cronos.desc':
    'Irmão do Athena: ingest automático via GitHub Actions. Você marca a nota como pronta, o resto roda sozinho.',
  'proj.github.title': 'Mais no GitHub',
  'proj.github.desc': 'Estudos, protótipos e experimentos — código aberto e sempre crescendo.',
  'proj.financas.title': 'Finanças',
  'proj.financas.desc':
    'Organizador de finanças pessoais pra ajudar na rotina — próximo projeto do ecossistema.',
  'proj.tag.automacao': 'Automação',
  'proj.tag.open': 'Open source',
  'proj.tag.soon': 'Em breve',
  'proj.btn.live': 'Ver ao vivo',
  'proj.btn.dev': 'Em desenvolvimento',

  'contato.eyebrow': 'Contato',
  'contato.h1.pre': 'Vamos ',
  'contato.h1.grad': 'conversar',
  'contato.lead':
    'Aberto a estágios, projetos e uma boa ideia. Respondo rápido — manda por onde for mais fácil. Santa Rita do Sapucaí, MG.',
}

const en: Dict = {
  'nav.inicio': 'Home',
  'nav.sobre': 'About',
  'nav.projetos': 'Projects',
  'nav.contato': 'Contact',

  'home.eyebrow': 'Computer Engineering • INATEL',
  'home.h1.pre': 'I build tools that ',
  'home.h1.grad': 'organize knowledge',
  'home.lead':
    "Computer Engineering student at INATEL. From the professor's PDF to a live technical wiki in one command — automation, web and a bit of 3D.",
  'home.card.projetos.title': 'Projects',
  'home.card.projetos.desc':
    'Athena, Cronos and experiments — systems that keep themselves current once built.',
  'home.card.sobre.title': 'About',
  'home.card.sobre.desc': 'Background, stack and what drives me as a developer.',
  'home.card.contato.title': 'Contact',
  'home.card.contato.desc': 'Open to internships and projects. Reach me by email or socials.',
  'home.explore': 'Explore',

  'sobre.eyebrow': 'About me',
  'sobre.h1.pre': "Who's behind the ",
  'sobre.h1.grad': 'projects',
  'sobre.p1': `I'm <strong ${STRONG}>Donatto</strong>, a Computer Engineering student at INATEL. I like solving the boring problem <strong ${STRONG}>behind</strong> the task — ideally with a pipeline that runs on its own afterward.`,
  'sobre.p2': `<strong ${STRONG}>Athena</strong> and <strong ${STRONG}>Cronos</strong> started that way: I didn't want to reformat class notes by hand, so I built the system that does it — from the professor's PDF to a published technical wiki, with a connection graph and search.`,
  'sobre.p3':
    'I enjoy the intersection of automation, web and visualization. If it can become a tool, I turn it into one.',
  'sobre.kv.formacao.k': 'Education',
  'sobre.kv.formacao.v': 'Computer Eng. · INATEL',
  'sobre.kv.foco.k': 'Focus',
  'sobre.kv.foco.v': 'Automation · Web · 3D',
  'sobre.kv.local.k': 'Location',
  'sobre.kv.local.v': 'Santa Rita do Sapucaí, BR',
  'sobre.kv.status.k': 'Status',
  'sobre.kv.status.v': 'Looking for an internship',
  'sobre.stack.lang': 'Languages',
  'sobre.stack.web': 'Web & 3D',
  'sobre.stack.tools': 'Tools',
  'sobre.photo': 'Your photo here',
  'sobre.photo.alt': 'Donatto Pieve',

  'proj.eyebrow': 'Projects',
  'proj.h1.pre': 'Work and ',
  'proj.h1.grad': 'experiments',
  'proj.lead':
    "A selection of the projects I've built — most started from a problem of mine that became a tool.",
  'proj.athena.desc':
    'Academic second brain: INATEL class notes become a technical wiki published on the web in one command — with graph, search and a 3D diamond.',
  'proj.cronos.desc':
    "Athena's sibling: automatic ingest via GitHub Actions. You mark a note as ready, the rest runs on its own.",
  'proj.github.title': 'More on GitHub',
  'proj.github.desc': 'Studies, prototypes and experiments — open source and always growing.',
  'proj.financas.title': 'Finances',
  'proj.financas.desc':
    "A personal finance organizer to help day-to-day — the ecosystem's next project.",
  'proj.tag.automacao': 'Automation',
  'proj.tag.open': 'Open source',
  'proj.tag.soon': 'Soon',
  'proj.btn.live': 'Live',
  'proj.btn.dev': 'In progress',

  'contato.eyebrow': 'Contact',
  'contato.h1.pre': "Let's ",
  'contato.h1.grad': 'talk',
  'contato.lead':
    'Open to internships, projects and a good idea. I reply fast — reach out however is easiest. Santa Rita do Sapucaí, BR.',
}

const DICTS: Record<Lang, Dict> = { pt, en }

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  // Começa em PT nos dois lados: o servidor não conhece o localStorage, e
  // qualquer outro palpite inicial daria mismatch de hidratação.
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    try {
      const salvo = localStorage.getItem('dp-lang')
      if (salvo === 'pt' || salvo === 'en') {
        setLangState(salvo)
        document.documentElement.lang = salvo === 'pt' ? 'pt-BR' : 'en'
      }
    } catch {
      /* storage indisponível — segue em PT */
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('dp-lang', l)
    } catch {
      /* storage indisponível — a escolha vale só nesta sessão */
    }
    // O <html lang> acompanha: é o que leitor de tela e tradutor consultam.
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'
  }

  // Chave crua como fallback: uma tradução faltando aparece como
  // "sobre.photo" na tela, o que é feio o suficiente pra ser corrigido.
  const t = (key: string) => DICTS[lang][key] ?? key

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LangProvider>')
  return ctx
}

// Mostra o idioma de DESTINO, não o atual: o botão é a ação ("ir pra EN"),
// e rotular com o estado atual faz metade das pessoas clicar errado.
export function LangToggle() {
  const { lang, setLang } = useLang()
  const proximo: Lang = lang === 'pt' ? 'en' : 'pt'

  return (
    <button
      onClick={() => setLang(proximo)}
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      title={lang === 'pt' ? 'English' : 'Português'}
      className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
    >
      {proximo.toUpperCase()}
    </button>
  )
}
