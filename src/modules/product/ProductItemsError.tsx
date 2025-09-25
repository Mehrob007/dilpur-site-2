import Image from "next/image";
import React from "react";
import meh from "../../../public/icons/meh.svg";

export default function ProductItemsError() {
  return (
    <div className="product-items-error">
      <div>
        <Image src={meh} alt="meh" width={40} height={40} />
        <h1>Ошибка при загрузке товаров</h1>
      </div>
    </div>
  );
}
