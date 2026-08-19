import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulseboard — Project Management",
  description: "A polished, interactive project management dashboard built with React and TypeScript.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
