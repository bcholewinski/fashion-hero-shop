import type { Metadata } from "next";
import { PanelShell } from "./_components/panel-shell";

export const metadata: Metadata = {
  title: "Panel sprzedawcy — FashionHero",
  description: "Panel sprzedawcy FashionHero do zarządzania ofertą i promocją sklepu.",
};

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PanelShell>{children}</PanelShell>;
}
