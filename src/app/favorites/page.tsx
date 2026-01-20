"use client";
import GiftСard from "@/components/ui/GiftСard";
import PartnerStores from "@/components/ui/PartnerStores";
import FavoritesItems from "@/modules/favorites/FavoritesItems";
import { useStore } from "@/store/globalState";
import React from "react";

export default function Page() {
  const { propertys } = useStore();

  console.log("propertys", propertys);

  return (
    <div className="catalog">
      <FavoritesItems title="Избранное" ids={propertys} />
      <GiftСard />
      <PartnerStores />
    </div>
  );
}
