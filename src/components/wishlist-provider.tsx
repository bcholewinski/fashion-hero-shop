"use client";

import { createContext, useContext, useCallback, useSyncExternalStore } from "react";

interface WishlistContextType {
  wishlistItems: string[];
  favoriteSellerIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleFavoriteSeller: (sellerId: string) => void;
  isFavoriteSeller: (sellerId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "stepforward-wishlist";
const SELLERS_STORAGE_KEY = "stepforward-favorite-sellers";
const WISHLIST_CHANGE_EVENT = "stepforward-wishlist-change";
const EMPTY_ITEMS: string[] = [];

let wishlistCacheKey: string | null = null;
let wishlistCache: string[] = [];
let favoriteSellerCacheKey: string | null = null;
let favoriteSellerCache: string[] = [];

function parseStorageItems(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === "string")
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function readStorageItems(storageKey: string, cache: "wishlist" | "sellers"): string[] {
  if (typeof window === "undefined") return [];

  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    return [];
  }

  if (cache === "wishlist") {
    if (stored !== wishlistCacheKey) {
      wishlistCacheKey = stored;
      wishlistCache = parseStorageItems(stored);
    }
    return wishlistCache;
  }

  if (stored !== favoriteSellerCacheKey) {
    favoriteSellerCacheKey = stored;
    favoriteSellerCache = parseStorageItems(stored);
  }
  return favoriteSellerCache;
}

function loadWishlist(): string[] {
  return readStorageItems(STORAGE_KEY, "wishlist");
}

function saveWishlist(items: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch {
    // localStorage unavailable
  }
}

function loadFavoriteSellers(): string[] {
  return readStorageItems(SELLERS_STORAGE_KEY, "sellers");
}

function saveFavoriteSellers(items: string[]) {
  try {
    localStorage.setItem(SELLERS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch {
    // localStorage unavailable
  }
}

function subscribeToWishlist(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(WISHLIST_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, callback);
  };
}

function getServerSnapshot(): string[] {
  return EMPTY_ITEMS;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlistItems = useSyncExternalStore(
    subscribeToWishlist,
    loadWishlist,
    getServerSnapshot
  );
  const favoriteSellerIds = useSyncExternalStore(
    subscribeToWishlist,
    loadFavoriteSellers,
    getServerSnapshot
  );

  const toggleWishlist = useCallback((productId: string) => {
    const current = loadWishlist();
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    saveWishlist(next);
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  const toggleFavoriteSeller = useCallback((sellerId: string) => {
    const current = loadFavoriteSellers();
    const next = current.includes(sellerId)
      ? current.filter((id) => id !== sellerId)
      : [...current, sellerId];
    saveFavoriteSellers(next);
  }, []);

  const isFavoriteSeller = useCallback(
    (sellerId: string) => favoriteSellerIds.includes(sellerId),
    [favoriteSellerIds]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        favoriteSellerIds,
        toggleWishlist,
        isWishlisted,
        toggleFavoriteSeller,
        isFavoriteSeller,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
