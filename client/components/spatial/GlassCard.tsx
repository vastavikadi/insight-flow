import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        backdrop-blur-xl
        bg-white/5
        border
        border-white/10
        rounded-3xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}