import { toast } from "sonner";

export const notify = {
  wishlistAdded(
    productName: string,
  ) {
    toast.success(
      `${productName} added to wishlist`,
    );
  },

  wishlistRemoved(
    productName: string,
  ) {
    toast.success(
      `${productName} removed from wishlist`,
    );
  },

  cartAdded(
    productName: string,
  ) {
    toast.success(
      `${productName} added to cart`,
    );
  },

  movedToCart(
    productName: string,
  ) {
    toast.success(
      `${productName} moved to cart`,
    );
  },

  purchaseCompleted(
    orderId: string,
  ) {
    toast.success(
      `Order ${orderId} completed successfully`,
    );
  },

  searchOpened() {
    toast.info(
      "Search products",
    );
  },
};