"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
    </body>
  );
}
