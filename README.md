# donattopieve.com.br — Landing

Landing pessoal do Donatto Pieve (Início · Sobre mim · Projetos · Contato), hub que aponta
pros projetos — Athena, Cronos e o que vier depois (Finanças).

## Stack

- TanStack Start (SSR) + React 19
- TypeScript
- Tailwind CSS v4
- Vite
- Node.js + npm

## Rodar localmente

Precisa de Node.js 20+ e npm.

```sh
npm install
npm run dev      # http://localhost:3000
```

## Scripts

```sh
npm run dev      # servidor de desenvolvimento (hot reload)
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run lint     # eslint
```

## Estrutura

```
src/
  routes/
    __root.tsx     ← layout: nav em pílula + redes + footer
    index.tsx      ← Início (hero + cards)
    sobre.tsx      ← Sobre mim (bio + stack)
    projetos.tsx   ← Projetos (Athena, Cronos, GitHub, Finanças)
    contato.tsx    ← Contato (email, LinkedIn, Instagram, GitHub)
  components/ui/   ← componentes shadcn/ui
  styles.css       ← tokens de cor (roxo) + JetBrains Mono
```

## Aparência

- Botão de paleta no header (ícone de paleta): 7 cores de destaque
  (Roxo, Cyan, Azul, Matrix, Âmbar, Rosa, Vermelho) + tema claro/escuro.
- Preferência salva em `localStorage` (`dp-theme`, `dp-palette`) e aplicada
  antes de pintar (sem flash). Tudo deriva de um único matiz `--hue` em `styles.css`.

## Idiomas (PT/EN)

- Botão EN/PT no header troca o site inteiro de uma vez.
- Camada de i18n em `src/lib/i18n.tsx` (contexto + dicionário PT/EN + hook `useLang`).
- Escolha salva em `localStorage` (`dp-lang`). Padrão: PT.

## Pendências

- Adicionar a foto no Sobre (há um espaço reservado).
- Deploy na Vercel + domínio `donattopieve.com.br`.
