"use client";

import {
  motion,
  useMotionValue,
} from "framer-motion";

export function SpotlightCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      onMouseMove={e => {
        const rect =
          e.currentTarget.getBoundingClientRect();

        x.set(
          e.clientX - rect.left,
        );

        y.set(
          e.clientY - rect.top,
        );
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
      "
    >
      <motion.div
        className="
          absolute
          w-96
          h-96
          rounded-full
          pointer-events-none
          blur-3xl
        "
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "rgba(124,58,237,.2)",
        }}
      />

      {children}
    </motion.div>
  );
}