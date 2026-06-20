export function getEventStyle(
  eventType: string,
) {
  switch (
    eventType
  ) {
    case "purchase_completed":
      return "bg-green-500/20 text-green-400";

    case "wishlist_added":
      return "bg-pink-500/20 text-pink-400";

    case "product_opened":
      return "bg-blue-500/20 text-blue-400";

    case "product_added_to_cart":
      return "bg-violet-500/20 text-violet-400";

    default:
      return "bg-zinc-500/20 text-zinc-300";
  }
}