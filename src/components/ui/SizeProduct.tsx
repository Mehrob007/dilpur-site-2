import React from "react";
import { SizesProductT } from "@/types/sizeProduct";
import secure from "@/../public/icons/secure.svg";
import Image from "next/image";

export default function SizesProduct({ sizes }: SizesProductT) {
  return (
    <div className="details-product">
      <h1>Размер</h1>
      <div>
        {sizes.map((e, i) => (
          <button key={i}>
            <span>{e.name}</span>
          </button>
        ))}
      </div>
      <p>
        <Image src={secure} alt="secure" width={16} height={16} /> Размерная
        сетка
      </p>
    </div>
  );
}
