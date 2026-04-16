"use client";
import Banner from "@/components/ui/Banner";
import GiftСard from "@/components/ui/GiftСard";
import PartnerStores from "@/components/ui/PartnerStores";
import ProductItems from "@/modules/product/ProductItems";
import { useGlobalState } from "@/store/globalState";
import React from "react";

export default function MainPage() {
  const { type } = useGlobalState();

  return (
    <div className="main-page">
      <Banner />

      {type?.map((e, i) => (
        <ProductItems key={i} title={e?.name} TypeId={e?.id} type={"showAll"} />
      ))}

      {/* <ProductItems title={"Обувь"} type={"showAll"} getURl={""} />
      <ProductItems title={"Аксессуары"} type={"showAll"} getURl={""} /> */}
      <GiftСard />
      <PartnerStores />
    </div>
  );
}
