"use client";
import React, { useEffect } from "react";
import BasketItem from "./BasketItem";
import { useGlobalState } from "@/store/globalState";
import { sizeT } from "@/types/product";
import shoppingBasket from "@/../public/icons/shoppingBasket.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function BasketItems({
  open,
  onClose,
  order = false,
  setTotalPrice,
  totalPrice,
  setSkitka,
}: {
  open: boolean;
  onClose: () => void;
  order?: boolean;
  totalPrice?: number;
  setTotalPrice?: (price: number) => void;
  setSkitka?: (price: number) => void;
}) {
  const { basketItems, setBasketItems } = useGlobalState();
  const route = useRouter();
  const pathName = usePathname();

  const deleteBasketItem = (id: number) => {
    const newBasketItems = basketItems.filter((e) => e.id !== id);
    localStorage.setItem("basketIds", JSON.stringify(newBasketItems));
    setBasketItems(newBasketItems);
  };

  const getPrice = (priceItme: number) => {
    setTotalPrice && setTotalPrice((totalPrice as number) + priceItme);
  };

  const getSkitka = (priceItme: number) => {
    setSkitka && setSkitka((totalPrice as number) + priceItme);
  };

  useEffect(() => {
    const basketIds = localStorage.getItem("basketIds");
    const newBasketIds = basketIds
      ? (JSON.parse(basketIds) as {
          id: number;
          size: sizeT;
          count: number;
          cost: number;
          preCost?: number;
        }[])
      : [];
    setBasketItems(newBasketIds);
  }, [open]);

  useEffect(() => {
    const totalCost = basketItems.reduce((sum, s) => {
      if (s.preCost === null || s.preCost === undefined || s.preCost < 0) {
        return sum + s?.cost * s.count;
      } else {
        return sum + s?.preCost * s.count;
      }
    }, 0);
    setTotalPrice && setTotalPrice(totalCost);

    const skitka = basketItems.reduce((sum, s) => {
      if (s.preCost === null || s.preCost === undefined || s.preCost < 0) {
        return sum + 0;
      } else {
        return sum + (s?.cost - s?.preCost) * s.count;
      }
    }, 0);
    setSkitka && setSkitka(skitka);
  }, [basketItems]);

  if (!open) return;

  // basketItems.filter(
  //   (e, i) => e.id === ArrDefData?.[i]?.id && ArrDefData?.[i]
  // );

  // for (let i = 0; i < basketItems?.length; i++) {
  //   const found = ArrDefData.find((e) => e.id === basketItems[i]?.id);
  //   if (found) {
  //     parseBasket.push({ ...found, size: basketItems[i].size });
  //   }
  // }

  return (
    <>
      {/* <span className="bg-basket"></span> */}
      <div className={`${order ? "basket-order" : "basket"}`}>
        <div className="basket-items">
          {basketItems?.length ? (
            basketItems?.map((prev, i) => (
              <BasketItem
                setSkitka={getSkitka}
                getPrice={getPrice}
                order={order}
                id={prev.id as number}
                size={prev.size}
                count={prev.count}
                deleteBasketItem={deleteBasketItem}
                key={i}
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
        {!order && (
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
            {basketItems?.length
              ? "Перейти к оформлению"
              : "Перейти к покупкам"}
          </button>
        )}
      </div>
    </>
  );
}
