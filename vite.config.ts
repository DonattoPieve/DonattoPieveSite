import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// TanStack Start: o plugin já cuida do router (routeTree.gen.ts), do SSR e do
// build via nitro (que detecta o provedor no deploy — ex.: Vercel).
// Ordem importa: tsConfigPaths -> tailwindcss -> tanstackStart -> viteReact.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
