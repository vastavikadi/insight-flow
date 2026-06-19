import { getTracker } from "./tracker";

function tracker() {
  return getTracker();
}

export const analytics = {
  productOpened(productId: string) {
    tracker().track("product_opened", { productId });
  },

  addToCart(productId: string) {
    tracker().track("product_added_to_cart", { productId });
  },

  wishlistAdded(productId: string) {
    tracker().track("wishlist_added", { productId });
  },
  wishlistRemoved(productId: string) {
    tracker().track("wishlist_removed", { productId });
  },

  wishlistMovedToCart(productId: string) {
    tracker().track("wishlist_moved_to_cart", { productId });
  },

  searchPerformed(query: string) {
    tracker().track("search_performed", { query });
  },

  checkoutStarted() {
    tracker().track("checkout_started");
  },

  purchaseCompleted(orderId: string, products: unknown[], total: number) {
    console.log("PURCHASE EVENT", {
      orderId,
      products,
      total,
    });
    tracker().track("purchase_completed", {
      orderId,
      products,
      total,
    });
  },

  cartOpened() {
    tracker().track("cart_opened");
  },
};
