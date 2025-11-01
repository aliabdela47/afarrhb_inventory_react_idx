"use client";

import Image from "next/image";
import clsx from "clsx";

export function Logo({
  size = 40,
  className,
  rounded = true,
  withRing = true,
}: {
  size?: number;
  className?: string;
  rounded?: boolean;
  withRing?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center overflow-hidden",
        rounded ? "rounded-xl" : "rounded-md",
        // Soft, clean presentation that works on both light/dark backgrounds
        "bg-white/60 dark:bg-white/5 border border-border soft-shadow",
        withRing && "ring-1 ring-[color:hsl(var(--ring))]",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="AfarRHB Inventory Pro logo"
    >
      <Image
        src="/afarrhb-LOGO-768px.png"
        alt="AfarRHB Inventory Pro"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}
