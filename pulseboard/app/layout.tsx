import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulseboard — Gestão de Projetos",
  description: "Painel interativo de gestão de projetos desenvolvido com React e TypeScript.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
