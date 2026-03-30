"use client";

import React, { Suspense } from "react";
import Catalog from "@/components/ui/Catalog";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <Catalog />
    </Suspense>
  );
}
