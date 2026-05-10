import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatTech AI — India's AI Technology Companion",
  description:
    "ARIA — India's most intelligent AI-powered technology ecosystem. Get personalized PC builds, laptop recommendations, gaming setups, AI/ML workstations, and career-aligned tech guidance. Built for every Indian student, gamer, creator, engineer, and startup founder.",
  keywords: "India AI PC builder, best laptop India 2024, gaming PC India, AI ML workstation India, ARIA AI assistant",
  openGraph: {
    title: "BharatTech AI — India's AI Technology Companion",
    description: "Powered by ARIA — the AI that truly understands India's technology needs, budgets, and dreams.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#050510" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-[#050510] text-white antialiased">{children}</body>
    </html>
  );
}
