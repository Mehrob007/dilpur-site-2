import PartnerStores from "@/components/ui/PartnerStores";
import ProductItems from "@/modules/product/ProductItems";
import React from "react";

export default function page() {
  return (
    <div className="catalog">
      <ProductItems title={"Избранное"} type={null} />
      <PartnerStores />
    </div>
  );
}
