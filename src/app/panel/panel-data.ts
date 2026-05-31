import { products } from "@/data/products";
import { getSellerById } from "@/data/sellers";
import type { Product } from "@/types";

export const PANEL_SELLER_ID = "s4";

export const panelSeller = getSellerById(PANEL_SELLER_ID);

export const sellerProducts = products.filter(
  (product) => product.sellerId === PANEL_SELLER_ID
);

export const dashboardStats = [
  { label: "Wyświetlenia oferty", value: "128 540", delta: "+12,4%" },
  { label: "Sprzedaż (30 dni)", value: "37 920 PLN", delta: "+8,1%" },
  { label: "Konwersja z wizyt", value: "2,8%", delta: "+0,42 pp" },
  { label: "Nowi obserwujący", value: "1 247", delta: "+19,6%" },
];

export function getProductImage(product: Product): string {
  return product.colors[0]?.image ?? product.images[0] ?? "/images/products/product-1.jpg";
}

export function getProductVariantName(product: Product): string {
  return product.colors[0]?.name ?? "Default";
}

export function getPanelProductStatus(product: Product, index: number): string {
  if (product.badge === "sale") return "Promocja";
  if (index % 7 === 0) return "Mało w magazynie";
  return "Aktywny";
}

export function getMockStock(index: number): number {
  return [24, 56, 12, 38, 18, 9, 31, 22, 16, 44, 27, 14][index] ?? 20;
}

export function getMockSold(index: number): number {
  return [142, 98, 76, 64, 51, 47, 39, 34, 28, 24, 19, 14][index] ?? 12;
}
