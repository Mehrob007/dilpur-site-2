import React from "react";
import ProductItems from "@/modules/product/ProductItems";
import GiftСard from "@/components/ui/GiftСard";
import PartnerStores from "@/components/ui/PartnerStores";

export default function Catalog() {
  return (
    <div className="catalog">
      <ProductItems title={"Каталог"} type={"filter"} getURl={""} />
      <GiftСard />
      <PartnerStores />
    </div>
  );
}
