import { detailsT } from "@/types/product";
import React from "react";

export default function ProductDetails({ details }: detailsT) {
  return (
    <div className="product-item-details">
      {details && typeof details === "object" && (
        <span className="product-item-img-discount">-{details.discount}%</span>
      )}
      {details && typeof details === "object" ? (
        <span className="product-item-img-new">НОВИНКА</span>
      ) : (
        ""
      )}
    </div>
  );
}
