import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Finora — Personal Finance", description: "An interactive personal finance dashboard built with React and TypeScript.", other: { "codex-preview": "development" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
