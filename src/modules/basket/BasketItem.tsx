import React from "react";
import Image from "next/image";
import trash from "../../../public/icons/Trash.svg";
import { BasketItemT } from "@/types/basket";
export default function BasketItem({
  title,
  subTitle,
  size,
  color,
  count,
  price,
  img,
  deleteBasketItem,
  id,
}: BasketItemT) {
  return (
    <div className="basket-item">
      <Image src={img[0]} alt="images" width={130} height={180} />
      <div>
        <div>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </div>
        <div>
          <h2>
            Размер: <span>{size}</span>
          </h2>
          <h2>
            Цвет: <span>{color}</span>
          </h2>
          <h2>
            Кол-во: <span>{count} шт</span>
          </h2>
        </div>
        <div>
          <div>
            <span>{price} c</span>
            <Image
              onClick={() => deleteBasketItem(id)}
              src={trash}
              alt="images"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
