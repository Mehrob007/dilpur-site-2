"use client";
import React, { useEffect } from "react";
import { ArrDefData } from "@/constants/product";
import BasketItem from "./BasketItem";
import { useGlobalState } from "@/store/globalState";
import { ProductItemT, sizeT } from "@/types/product";
import shoppingBasket from "@/../public/icons/shoppingBasket.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BasketItems({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { basketItems, setBasketItems } = useGlobalState();
  const route = useRouter();
  const pathName = usePathname();

  // ArrDefData.filter((_, i) => basketIds?.includes(String(i)))

  const deleteBasketItem = (id: number) => {
    const newBasketItems = basketItems.filter((_, i) => i !== id);
    localStorage.setItem("basketIds", JSON.stringify(newBasketItems));
    setBasketItems(newBasketItems);
  };

  useEffect(() => {
    const basketIds = localStorage.getItem("basketIds");
    const newBasketIds = basketIds
      ? (JSON.parse(basketIds) as { id: number; size: sizeT }[])
      : [];
    setBasketItems(newBasketIds);
  }, [open]);

  if (!open) return;

  const parseBasket: ProductItemT[] = [];
  // basketItems.filter(
  //   (e, i) => e.id === ArrDefData?.[i]?.id && ArrDefData?.[i]
  // );

  for (let i = 0; i < basketItems?.length; i++) {
    const found = ArrDefData.find((e) => e.id === basketItems[i]?.id);
    if (found) {
      parseBasket.push({ ...found, size: basketItems[i].size });
    }
  }
  return (
    <>
      {/* <span className="bg-basket"></span> */}
      <div className="basket">
        <div className="basket-items">
          {basketItems?.length ? (
            parseBasket?.map((prev, i) => (
              <BasketItem
                id={i}
                deleteBasketItem={deleteBasketItem}
                key={i}
                title={prev.title}
                subTitle={prev.subTitle}
                size={prev?.size?.name as string | " "}
                color={"Серый"}
                count={1}
                price={2500}
                discount={2000}
                img={prev.img}
              />
            ))
          ) : (
            <div className="basket-dont-items">
              <div>
                <Image src={shoppingBasket} alt="shoppingBasket" />
                <h1>Ваша корзина пуста</h1>
                <p>
                  Похоже, вы еще ничего не добавили. <br /> Самое время это
                  исправить!
                </p>
              </div>
            </div>
          )}
        </div>
        <button
          className=""
          onClick={() => {
            if (basketItems?.length) {
              route.push("/" + pathName?.split("/")?.[1] + "/order");
            } else {
              route.push("/" + pathName?.split("/")?.[1] + "/catalog");
            }
            onClose();
          }}
        >
          {basketItems?.length ? "Перейти к оформлению" : "Перейти к покупкам"}
        </button>
      </div>
    </>
  );
}
