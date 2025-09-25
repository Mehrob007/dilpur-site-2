import React from "react";
import { ArrDefData } from "@/constants/product";
import BasketItem from "./BasketItem";

export default function BasketItems({ open }: { open: boolean }) {
  if (!open) return;
  return (
    <>
      <span className="bg-basket"></span>
      <div className="basket">
        <div className="basket-items">
          {ArrDefData.filter((_, i) => i < 2).map((e, i) => (
            <BasketItem
              key={i}
              title={e.title}
              subTitle={e.subTitle}
              size={"X"}
              color={"Серый"}
              count={1}
              price={2500}
              discount={2000}
              img={e.img}
            />
          ))}
        </div>
        <button>Перейти к оформлению</button>
      </div>
    </>
  );
}
