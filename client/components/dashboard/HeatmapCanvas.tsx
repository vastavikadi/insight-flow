"use client";

import {
  useEffect,
  useRef,
} from "react";

import h337 from "heatmap.js";

interface HeatPoint {
  clickData: {
    x: number;
    y: number;
  };
}

export function HeatmapCanvas({
  points,
}: {
  points: HeatPoint[];
}) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (
      !containerRef.current
    ) {
      return;
    }

    const heatmap =
      h337.create({
        container:
          containerRef.current,

        radius: 40,

        maxOpacity: 1,

        blur: 0.9,
      });

    heatmap.setData({
      min: 0,
      max: 10,

      data: points.map(point => ({
        x: point.clickData.x,
        y: point.clickData.y,
        value: 1,
      })),
    });

  }, [points]);

  return (
    <div
      ref={containerRef}
      className="
        relative

        h-225

        rounded-3xl

        border
        border-white/10

        bg-zinc-950

        overflow-hidden
      "
    />
  );
}