"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Flame,
  BarChart3,
} from "lucide-react";

export function DashboardSidebar() {
  return (
    <aside
      className="
        w-72
        border-r
        border-white/10
        bg-zinc-950
        p-6
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        InsightFlow
      </h1>

      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-white/5
          "
        >
          <LayoutDashboard size={18} />
          Overview
        </Link>

        <Link
          href="/dashboard/sessions"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-white/5
          "
        >
          <Users size={18} />
          Sessions
        </Link>

        <Link
          href="/dashboard/heatmap"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-white/5
          "
        >
          <Flame size={18} />
          Heatmaps
        </Link>

        <Link
          href="/dashboard/analytics"
          className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-white/5
          "
        >
          <BarChart3 size={18} />
          Analytics
        </Link>
      </nav>
    </aside>
  );
}