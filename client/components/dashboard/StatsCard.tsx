interface Props {
  title: string;
  value: number | string;
}

export function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >
      <p className="text-zinc-400">
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-bold
          mt-3
        "
      >
        {value}
      </h2>
    </div>
  );
}