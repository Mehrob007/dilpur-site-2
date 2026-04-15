"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    // Every time the route changes — restart animation
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
    prevPath.current = pathname;
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div className={`page-transition${visible ? " page-transition-in" : ""}`}>
      {children}
    </div>
  );
}
