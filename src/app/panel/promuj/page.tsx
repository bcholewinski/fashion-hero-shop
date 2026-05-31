import { PromotionForm } from "../_components/promotion-form";
import { panelSeller } from "../panel-data";

export default function PanelPromotePage() {
  const sellerName = panelSeller?.name ?? "Modna Szafa";

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <section className="mb-10 border-b border-black/10 pb-8">
        <p className="text-label mb-3">Marketing · Kampanie</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
          Promuj swoją ofertę.
          <br />
          <span className="font-normal text-warm-gray">
            Wybij sklep {sellerName} ponad 4 000 sprzedawców.
          </span>
        </h1>
      </section>

      <PromotionForm sellerName={sellerName} />
    </div>
  );
}
