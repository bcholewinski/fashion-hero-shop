"use client";

import { useState } from "react";
import { HeartFilledIcon, HeartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/wishlist-provider";

interface FavoriteSellerButtonProps {
  sellerId: string;
  className?: string;
}

export function FavoriteSellerButton({ sellerId, className }: FavoriteSellerButtonProps) {
  const { toggleFavoriteSeller, isFavoriteSeller } = useWishlist();
  const favorite = isFavoriteSeller(sellerId);
  const [animating, setAnimating] = useState(false);

  function handleClick() {
    setAnimating(true);
    toggleFavoriteSeller(sellerId);
    setTimeout(() => setAnimating(false), 300);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorite}
      aria-label={favorite ? "Remove seller from favorites" : "Save seller to favorites"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.5px] text-charcoal transition-colors hover:border-charcoal",
        favorite && "border-charcoal bg-charcoal text-white hover:bg-charcoal-light",
        animating && "scale-[1.03]",
        className
      )}
    >
      {favorite ? (
        <HeartFilledIcon className="h-4 w-4 text-current" />
      ) : (
        <HeartIcon className="h-4 w-4" />
      )}
      {favorite ? "Saved" : "Save seller"}
    </button>
  );
}
