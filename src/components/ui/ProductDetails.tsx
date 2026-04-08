import { detailsT } from "@/types/product";
import React from "react";

export default function ProductDetails({ details, preCostProcent }: detailsT) {
  return (
    <div className="product-item-details">
      {preCostProcent ? (
        <span className="product-item-img-discount">-{preCostProcent}%</span>
      ) : null}
      {details?.find((e) => e.toLowerCase() === "хит продаж") ? (
        <span className="product-item-img-hit">ХИТ ПРОДАЖ</span>
      ) : null}
      {details?.find((e) => e.toLowerCase() === "акция") ? (
        <span className="product-item-img-action">АКЦИЯ</span>
      ) : null}
      {details?.find((e) => e.toLowerCase() === "новинка") ? (
        <span className="product-item-img-new">НОВИНКА</span>
      ) : null}
    </div>
  );
}
