"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX =
    useSpring(x);

  const springY =
    useSpring(y);

  return (
    <motion.button
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={e => {
        const rect =
          e.currentTarget.getBoundingClientRect();

        x.set(
          (e.clientX -
            rect.left -
            rect.width / 2) *
            0.2,
        );

        y.set(
          (e.clientY -
            rect.top -
            rect.height / 2) *
            0.2,
        );
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="
        px-8
        py-4
        rounded-full
        bg-violet-600
        font-semibold
      "
    >
      {children}
    </motion.button>
  );
}