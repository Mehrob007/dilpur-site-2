import React, { useEffect } from "react";
import { SizesProductT } from "@/types/sizeProduct";
import secure from "@/../public/icons/secure.svg";
import Image from "next/image";

export default function SizesProduct({
  sizes,
  value,
  onChange,
}: SizesProductT) {
  console.log(value);

  useEffect(() => {
    onChange(sizes?.[0]);
  }, []);

  return (
    <div className="details-product">
      <h1>Размер</h1>
      <div>
        {sizes.map((e, i) => (
          <button
            onClick={() => onChange(e)}
            key={i}
            className={value?.name === e?.name ? "details-product-active" : ""}
          >
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
