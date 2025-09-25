import { ColorProductT } from "@/types/colorProduct";
import Image from "next/image";
import React from "react";

export default function ColorProduct({ colors }: ColorProductT) {
  return (
    <div className="details-product">
      <h1>Другие цвета</h1>
      <div>
        {colors.map((e, i) => (
          <Image
            key={i}
            src={e}
            alt={"color-product-img"}
            width={82.5}
            height={127}
            className={i ? "off-color" : ""}
          />
        ))}
      </div>
    </div>
  );
}
