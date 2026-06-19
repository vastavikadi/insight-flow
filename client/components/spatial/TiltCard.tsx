"use client";

import Tilt from "react-parallax-tilt";

export function TiltCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.02}
      transitionSpeed={2000}
    >
      {children}
    </Tilt>
  );
}