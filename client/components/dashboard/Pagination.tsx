"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const navigate = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(nextPage));

    router.push(`?${params}`);
  };

  return (
    <div
      className="
        flex
        justify-center

        gap-4

        mt-8
      "
    >
      <button disabled={page === 1} onClick={() => navigate(page - 1)}>
        Previous
      </button>

      <span>
        Page {page}
        {" / "}
        {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => navigate(page + 1)}>
        Next
      </button>
    </div>
  );
}
