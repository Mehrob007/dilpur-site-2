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
  discount,
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
            <label>{size}</label> | <label>{color}</label> |{" "}
            <label>{count} шт.</label>
          </h2>
        </div>
        <nav>
          <button>-</button>
          <h2>{count}</h2>
          <button>+</button>
        </nav>
        <div>
          <div>
            <div className="product-item-price">
              {discount ? (
                <>
                  <div className="discount">{discount} c.</div>{" "}
                  <div className="crossed">{price} c.</div>
                </>
              ) : (
                <div className="price">{price} c.</div>
              )}
            </div>
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
