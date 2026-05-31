import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  getMockSold,
  getMockStock,
  getPanelProductStatus,
  getProductImage,
  getProductVariantName,
  panelSeller,
  sellerProducts,
} from "../panel-data";
import { cn } from "@/lib/utils";

export default function PanelProductsPage() {
  const sellerName = panelSeller?.name ?? "Modna Szafa";
  const soldTotal = sellerProducts.reduce((total, _product, index) => total + getMockSold(index), 0);

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-8 md:px-8 md:py-12">
      <section className="flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-label mb-3">Katalog · {sellerName}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Twoje produkty
          </h1>
          <p className="mt-3 text-sm text-warm-gray">
            {sellerProducts.length} aktywnych pozycji · łącznie {soldTotal} sprzedanych sztuk
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray"
              strokeWidth={1.6}
            />
            <input
              type="text"
              placeholder="Szukaj produktu..."
              className="h-11 w-full rounded-full border border-black/15 bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-charcoal sm:w-64"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/15 bg-transparent px-4 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:border-charcoal"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.6} />
            Filtry
          </button>
        </div>
      </section>

      <div className="hidden overflow-hidden rounded-md border border-black/10 bg-white md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10">
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Produkt
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Wariant
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Cena
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Magazyn
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Sprzedano
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.08em] text-warm-gray">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sellerProducts.map((product, index) => {
              const status = getPanelProductStatus(product, index);

              return (
                <tr key={product.id} className="border-b border-black/10 last:border-b-0">
                  <td className="px-6 py-4">
                    <Link href={`/products/${product.slug}`} className="flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-cream">
                        <Image
                          src={getProductImage(product)}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{product.name}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-warm-gray">
                    {getProductVariantName(product)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">{product.price} PLN</td>
                  <td className="px-6 py-4 text-right text-sm">{getMockStock(index)}</td>
                  <td className="px-6 py-4 text-right text-sm">{getMockSold(index)}</td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
                        status === "Mało w magazynie"
                          ? "border-charcoal text-charcoal"
                          : "border-black/10 text-warm-gray"
                      )}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-3 md:hidden">
        {sellerProducts.map((product, index) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="overflow-hidden rounded-md bg-white"
          >
            <div className="relative aspect-square overflow-hidden bg-cream">
              <Image
                src={getProductImage(product)}
                alt={product.name}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-warm-gray">
                {getProductVariantName(product)}
              </p>
              <h3 className="mt-1 text-xs font-medium leading-snug">{product.name}</h3>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span>{product.price} PLN</span>
                <span className="text-warm-gray">{getMockSold(index)} szt.</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
