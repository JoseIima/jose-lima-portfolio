import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Finora — Finanças Pessoais", description: "Painel interativo de finanças pessoais desenvolvido com React e TypeScript.", other: { "codex-preview": "development" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
