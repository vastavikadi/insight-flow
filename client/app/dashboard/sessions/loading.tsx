export default function Loading() {
  return (
    <div
      className="
        p-8
        space-y-6
      "
    >
      <div
        className="
          h-12
          w-64
          rounded-xl
          bg-white/5
          animate-pulse
        "
      />

      <div
        className="
          rounded-3xl
          border
          border-white/10
          overflow-hidden
        "
      >
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-16
              border-b
              border-white/5
              bg-white/5
              animate-pulse
            "
          />
        ))}
      </div>
    </div>
  );
}
