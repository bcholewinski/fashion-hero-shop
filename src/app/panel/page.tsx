import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, Megaphone, ShoppingBag, TrendingUp, Users } from "lucide-react";
import {
  dashboardStats,
  getMockSold,
  getProductImage,
  getProductVariantName,
  panelSeller,
  sellerProducts,
} from "./panel-data";

const statIcons = [Eye, ShoppingBag, TrendingUp, Users];

export default function PanelDashboardPage() {
  const topProducts = sellerProducts.slice(0, 4);
  const sellerName = panelSeller?.name ?? "Modna Szafa";

  return (
    <div className="mx-auto max-w-[1440px] space-y-12 px-4 py-8 md:px-8 md:py-12">
      <section className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-label mb-3">Panel sprzedawcy · {sellerName}</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Witaj z powrotem.
            <br />
            <span className="font-normal text-warm-gray">
              Twoja oferta zyskuje na popularności.
            </span>
          </h1>
        </div>
        <Link href="/panel/promuj" className="btn-cta self-start gap-3 md:self-end">
          <Megaphone className="h-4 w-4" strokeWidth={1.6} />
          Promuj produkty
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </Link>
      </section>

      <section>
        <h2 className="text-label mb-6">Statystyki globalne · ostatnie 30 dni</h2>
        <div className="grid grid-cols-1 overflow-hidden rounded-md border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => {
            const Icon = statIcons[index] ?? Eye;

            return (
              <div key={stat.label} className="border-b border-black/10 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
                <div className="mb-8 flex items-start justify-between">
                  <Icon className="h-5 w-5 text-warm-gray" strokeWidth={1.6} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-charcoal">
                    {stat.delta}
                  </span>
                </div>
                <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
                <p className="mt-2 text-[12px] uppercase tracking-[0.08em] text-warm-gray">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-black/10 bg-white p-6">
            <p className="text-label">Zamówienia (30 dni)</p>
            <div className="mt-3 text-3xl font-semibold tracking-tight">108</div>
          </div>
          <div className="rounded-md border border-black/10 bg-white p-6">
            <p className="text-label">Średnia wartość zamówienia</p>
            <div className="mt-3 text-3xl font-semibold tracking-tight">351 PLN</div>
          </div>
        </div>
        <p className="mt-4 text-[12px] uppercase tracking-[0.08em] text-warm-gray">
          Lejek · 128 540 wyświetleń → wizyty → 108 zamówień × 351 PLN = 37 920 PLN
        </p>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-label">Bestsellery · Twoja oferta</h2>
          <Link
            href="/panel/produkty"
            className="border-b border-charcoal text-[12px] font-medium uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
          >
            Wszystkie produkty
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {topProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-md bg-white"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                <Image
                  src={getProductImage(product)}
                  alt={`${product.name} - ${getProductVariantName(product)}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-warm-gray">
                  {getProductVariantName(product)}
                </p>
                <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span>{product.price} PLN</span>
                  <span className="text-warm-gray">{getMockSold(index)} szt.</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 rounded-md bg-charcoal p-8 text-white md:flex-row md:items-center md:p-10">
        <div className="max-w-2xl">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.12em] text-white/60">
            Nowość
          </p>
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Wybij się ponad 4 000 sprzedawców.
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Ustaw dzienny budżet i zwiększ widoczność swojej oferty na stronie
            głównej oraz stronach kategorii FashionHero.
          </p>
        </div>
        <Link
          href="/panel/promuj"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-charcoal transition-opacity hover:opacity-85"
        >
          Uruchom kampanię
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </Link>
      </section>
    </div>
  );
}
