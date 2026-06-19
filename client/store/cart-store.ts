import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  wishlist: WishlistItem[];

  isOpen: boolean;
  isWishlistOpen: boolean;

  openCart: () => void;

  closeCart: () => void;

  openWishlist: () => void;

  closeWishlist: () => void;

  addItem: (item: CartItem) => void;

  removeItem: (id: string) => void;

  addToWishlist: (item: WishlistItem) => void;

  removeFromWishlist: (id: string) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  wishlist: [],

  isOpen: false,
  isWishlistOpen: false,

  openCart: () =>
    set({
      isOpen: true,
    }),

  closeCart: () =>
    set({
      isOpen: false,
    }),

  openWishlist: () =>
    set({
      isWishlistOpen: true,
    }),

  closeWishlist: () =>
    set({
      isWishlistOpen: false,
    }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  addToWishlist: (item) =>
    set((state) => {
      const exists = state.wishlist.some(
        (wishlistItem) => wishlistItem.id === item.id,
      );

      if (exists) {
        return state;
      }

      return {
        wishlist: [...state.wishlist, item],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      items: [],
    }),
}));
