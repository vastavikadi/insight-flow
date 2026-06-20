interface Props {
  total: number;

  page: number;

  totalPages: number;
}

export function SessionStats({ total, page, totalPages }: Props) {
  return (
    <div
      className="
        grid
        md:grid-cols-3
        gap-6
        mb-8
      "
    >
      <div
        className="
          rounded-3xl
          bg-white/5
          p-6
        "
      >
        <p>Total Sessions</p>

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          {total}
        </h2>
      </div>

      <div
        className="
          rounded-3xl
          bg-white/5
          p-6
        "
      >
        <p>Current Page</p>

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          {page}
        </h2>
      </div>

      <div
        className="
          rounded-3xl
          bg-white/5
          p-6
        "
      >
        <p>Total Pages</p>

        <h2
          className="
            text-3xl
            font-bold
          "
        >
          {totalPages}
        </h2>
      </div>
    </div>
  );
}
