interface ProductMetric {
  productId: string;

  opened: number;

  wishlisted: number;

  carted: number;
}

export function ProductAnalyticsTable({
  products,
}: {
  products: ProductMetric[];
}) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-white/10

        bg-white/5

        overflow-hidden
      "
    >
      <div
        className="
          px-6
          py-5

          border-b
          border-white/10
        "
      >
        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Product Performance
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr
            className="
              border-b
              border-white/10
            "
          >
            <th className="p-4 text-left">Product</th>

            <th className="p-4 text-left">Views</th>

            <th className="p-4 text-left">Wishlists</th>

            <th className="p-4 text-left">Cart Adds</th>

            <th className="p-4 text-left">Wishlist Rate</th>

            <th className="p-4 text-left">Cart Rate</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const wishlistRate =
              product.opened > 0
                ? ((product.wishlisted / product.opened) * 100).toFixed(1)
                : "0";

            const cartRate =
              product.opened > 0
                ? ((product.carted / product.opened) * 100).toFixed(1)
                : "0";

            return (
              <tr
                key={product.productId}
                className="
                  border-b
                  border-white/5
                "
              >
                <td className="p-4">{product.productId}</td>

                <td className="p-4">{product.opened}</td>

                <td className="p-4">{product.wishlisted}</td>

                <td className="p-4">{product.carted}</td>

                <td className="p-4">{wishlistRate}%</td>

                <td className="p-4">{cartRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
