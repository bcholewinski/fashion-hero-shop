"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/panel", label: "Pulpit", exact: true },
  { href: "/panel/produkty", label: "Produkty" },
  { href: "/panel/promuj", label: "Promuj" },
];

export function PanelShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-cream-light text-charcoal flex flex-col">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-cream-light/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="text-xl font-semibold italic tracking-tight">
              FashionHero
            </span>
            <span className="hidden border-l border-black/15 pl-3 text-[11px] font-medium uppercase tracking-[0.16em] text-warm-gray sm:inline">
              Sellers
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal/65 transition-opacity hover:opacity-60",
                    active && "text-charcoal"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Szukaj"
              className="p-1 text-charcoal transition-opacity hover:opacity-60"
            >
              <Search className="h-5 w-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              aria-label="Powiadomienia"
              className="relative p-1 text-charcoal transition-opacity hover:opacity-60"
            >
              <Bell className="h-5 w-5" strokeWidth={1.6} />
              <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-charcoal" />
            </button>
            <button
              type="button"
              aria-label="Konto"
              className="p-1 text-charcoal transition-opacity hover:opacity-60"
            >
              <User className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <nav className="flex gap-6 overflow-x-auto border-t border-black/10 px-4 py-3 md:hidden">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal/65",
                  active && "text-charcoal"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t border-black/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-8 text-[11px] font-medium uppercase tracking-[0.12em] text-warm-gray md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} FashionHero</span>
          <span>Marketplace dla sprzedawców premium</span>
        </div>
      </footer>
    </div>
  );
}
