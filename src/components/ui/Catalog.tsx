"use client";
import React from "react";
import ProductItems from "@/modules/product/ProductItems";
import GiftСard from "@/components/ui/GiftСard";
import PartnerStores from "@/components/ui/PartnerStores";
import { useSearchParams } from "next/navigation";

export default function Catalog() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="catalog">
      <ProductItems
        title={name?.length ? "Найдено" : "Каталог"}
        type={"filter"}
        // showCount={Boolean(name?.length)}
      />
      <GiftСard />
      <PartnerStores />
    </div>
  );
}
