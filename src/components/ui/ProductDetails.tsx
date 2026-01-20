import { detailsT } from "@/types/product";
import React from "react";

export default function ProductDetails({ details, preCostProcent }: detailsT) {
  return (
    <div className="product-item-details">
      {preCostProcent ? (
        <span className="product-item-img-discount">{preCostProcent}%</span>
      ) : (
        ""
      )}
      {details?.find((e) => e === "Новинка") ? (
        <span className="product-item-img-new">НОВИНКА</span>
      ) : (
        ""
      )}
    </div>
  );
}
