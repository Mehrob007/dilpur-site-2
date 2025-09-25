import Banner from "@/components/ui/Banner";
import GiftСard from "@/components/ui/GiftСard";
import PartnerStores from "@/components/ui/PartnerStores";
import ProductItems from "@/modules/product/ProductItems";
import React from "react";

export default function MainPage() {
  return (
    <div className="main-page">
      <Banner />
      <ProductItems title={"Одежда"} type={"showAll"} getURl={""} />
      <ProductItems title={"Обувь"} type={"showAll"} getURl={""} />
      <ProductItems title={"Аксессуары"} type={"showAll"} getURl={""} />
      <GiftСard />
      <PartnerStores />
    </div>
  );
}
