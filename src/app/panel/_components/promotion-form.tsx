"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Check, Eye, Target, TrendingUp } from "lucide-react";

const MIN_BUDGET = 5;
const PRESETS = [25, 50, 100, 200];

const infoItems = [
  {
    icon: Eye,
    label: "Szacowane wyświetlenia",
    value: "2 500 - 3 500",
    suffix: "dodatkowych wyświetleń dziennie przy wybranym budżecie",
  },
  {
    icon: Target,
    label: "Średnia konwersja z wizyt",
    value: "2,8%",
    suffix: "dla podobnych sprzedawców",
  },
  {
    icon: TrendingUp,
    label: "Widoczność w godzinach szczytu",
    value: "Premium",
    suffix: "ekspozycja w godzinach największego ruchu zakupowego",
  },
];

export function PromotionForm({ sellerName }: { sellerName: string }) {
  const [budget, setBudget] = useState("50");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const numericBudget = useMemo(() => Number(budget.replace(",", ".")), [budget]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!Number.isFinite(numericBudget) || numericBudget < MIN_BUDGET) {
      setError(`Podaj kwotę co najmniej ${MIN_BUDGET} PLN.`);
      return;
    }

    setError("");
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-charcoal">
          <Check className="h-6 w-6" strokeWidth={1.6} />
        </div>
        <p className="text-label mb-3">Potwierdzenie</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Jesteś na liście.
          <br />
          <span className="font-normal text-warm-gray">Dziękujemy.</span>
        </h1>
        <p className="mt-5 text-sm leading-7 text-warm-gray">
          Zapisaliśmy zgłoszenie sklepu {sellerName} z dziennym budżetem{" "}
          <strong className="font-medium text-charcoal">{budget} PLN</strong>.
          Powiadomimy Cię, gdy kampanie reklamowe będą dostępne. Żadne środki
          nie zostały pobrane z Twojego konta.
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setBudget("50");
            setError("");
          }}
          className="mt-8 inline-flex items-center gap-2 border-b border-charcoal pb-1 text-[12px] font-medium uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
        >
          Wróć do formularza
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </section>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <div>
          <label
            htmlFor="daily-budget"
            className="text-label mb-4 block"
          >
            Dzienny budżet
          </label>
          <div className="flex items-baseline gap-3 border-b border-charcoal pb-3">
            <input
              id="daily-budget"
              type="number"
              inputMode="decimal"
              min={MIN_BUDGET}
              step="1"
              required
              value={budget}
              onChange={(event) => {
                setBudget(event.target.value);
                setError("");
              }}
              className="w-full bg-transparent text-5xl font-semibold tracking-tight outline-none md:text-6xl"
              aria-describedby="daily-budget-help daily-budget-error"
            />
            <span className="text-2xl font-medium uppercase tracking-[0.08em] text-warm-gray">
              PLN
            </span>
          </div>
          <p id="daily-budget-help" className="mt-3 text-xs leading-6 text-warm-gray">
            Minimalny budżet to {MIN_BUDGET} PLN dziennie. Możesz go zmienić w
            dowolnym momencie.
          </p>
          {error && (
            <p id="daily-budget-error" className="mt-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {PRESETS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setBudget(String(value));
                  setError("");
                }}
                className={
                  String(value) === budget
                    ? "rounded-full bg-charcoal px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-white"
                    : "rounded-full border border-black/15 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:border-charcoal"
                }
              >
                {value} PLN
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-cta w-full gap-3 py-4">
          Uruchom kampanię
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
        </button>

        <p className="text-center text-xs leading-6 text-warm-gray">
          Klikając „Uruchom”, zapisujesz się na listę oczekujących na premierę
          kampanii reklamowych. Żadne środki nie zostaną pobrane z Twojego konta.
        </p>
      </form>

      <aside className="overflow-hidden rounded-md border border-black/10 bg-white">
        {infoItems.map((item) => (
          <div key={item.label} className="border-b border-black/10 p-6 last:border-b-0">
            <div className="mb-5 flex items-center gap-3">
              <item.icon className="h-4 w-4 text-warm-gray" strokeWidth={1.6} />
              <span className="text-label">{item.label}</span>
            </div>
            <div className="text-3xl font-semibold tracking-tight">{item.value}</div>
            <p className="mt-2 text-xs leading-6 text-warm-gray">{item.suffix}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
