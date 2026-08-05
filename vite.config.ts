import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

// tanstackStart cuida do router (routeTree.gen.ts) e do SSR; nitro empacota o
// servidor pro provedor de hospedagem. Sem nitro() aqui o build sai num dist/
// comum e a Vercel devolve 404 — ela não descobre onde está o servidor.
// O preset não é fixado de propósito: o nitro detecta a Vercel pelo ambiente
// de CI e emite .vercel/output; localmente emite .output.
// Ordem importa: tsConfigPaths -> tailwindcss -> tanstackStart -> nitro -> viteReact.
export default defineConfig({
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
})
