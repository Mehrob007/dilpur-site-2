import Image from "next/image";
import React from "react";
import PropertyOff from "../../../public/icons/greyLike.svg";
import PropertyOn from "../../../public/icons/PropertyOn.svg";
import { useGlobalState, useStore } from "@/store/globalState";
import { ButtonAddProductT } from "@/types/buttonAddProduct";
import { GetShopByIdREQ } from "@/api/shop/shop";

export default function ButtonAddProduct({
  id,
  onClick,
  shop,
}: ButtonAddProductT) {
  const { propertys, setProperty, deleteProperty } = useStore();
  const { setOpenModalKey, setShopItem } = useGlobalState();

  // console.log("propertys", propertys);
  const getShopById = async (id: number) => {
    try {
      const res = await GetShopByIdREQ(id);
      if (res && res.data) {
        setShopItem(res.data);
      }
      setOpenModalKey("ModalShop");
    } catch (e) {
      console.error(e);
    }
  };

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
        В наличии в магазине{" "}
        <span onClick={() => shop?.id && getShopById(shop?.id)}>
          {shop?.name}
        </span>
      </p>
    </div>
  );
}
