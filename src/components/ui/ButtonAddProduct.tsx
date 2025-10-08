import Image from "next/image";
import React from "react";
import PropertyOff from "../../../public/icons/greyLike.svg";
import PropertyOn from "../../../public/icons/PropertyOn.svg";
import { useStore } from "@/store/globalState";
import { ButtonAddProductT } from "@/types/buttonAddProduct";

export default function ButtonAddProduct({ id, onClick }: ButtonAddProductT) {
  const { propertys, setProperty, deleteProperty } = useStore();
  // console.log("propertys", propertys);

  return (
    <div className="button-add-product">
      <div>
        <button onClick={onClick}>Добавить в корзину</button>
        <span>
          {propertys?.includes(id) ? (
            <Image
              src={PropertyOn}
              alt="PropertyOn"
              onClick={() => deleteProperty(id as number)}
              width={30}
              height={30}
            />
          ) : (
            <Image
              src={PropertyOff}
              alt="PropertyOff"
              onClick={() => setProperty(id as number)}
              width={30}
              height={30}
            />
          )}
        </span>
      </div>
      <p>
        В наличии в магазине <span>Дилпур</span>
      </p>
    </div>
  );
}
