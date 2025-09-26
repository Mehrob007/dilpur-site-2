"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { sizes } from "@/constants/product";
import checkCircle from "../../../public/icons/checkCircle.svg";
import Image from "next/image";
import { sizeT } from "@/types/product";
import { useGlobalState } from "@/store/globalState";

export default function BayButton({ id }: { id: number }) {
  const [stateStage, setStateStage] = useState<number>(1);
  const { setBasketItems } = useGlobalState();

  const addProdductToBasket = ({ id, size }: { id: number; size: sizeT }) => {
    const basketIds = JSON.parse(localStorage.getItem("basketIds") || "[]");
    if (basketIds?.[0]) {
      localStorage.setItem(
        "basketIds",
        JSON.stringify([...basketIds, { id, size }])
      );
      setBasketItems([...basketIds, { id, size }]);
    } else {
      localStorage.setItem("basketIds", JSON.stringify([{ id, size }]));
      setBasketItems([{ id, size }]);
    }
  };

  const stage: { [key: number]: ReactElement } = {
    1: (
      <div onClick={() => setStateStage(2)}>
        <h1>ДОБАВИТЬ В КОРЗИНУ</h1>
      </div>
    ),
    2: (
      <div className={"stage-size"}>
        {sizes.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              addProdductToBasket({ id, size: e });
              setStateStage(3);
            }}
          >
            {e.name}
          </div>
        ))}
      </div>
    ),
    3: (
      <div className={stateStage === 3 ? "stage-adding" : ""}>
        <Image src={checkCircle} alt="checkCircle" width={24} height={24} />
        <h1>ТОВАР ДОБАВЛЕН В КОРЗИНУ</h1>
      </div>
    ),
  };

  useEffect(() => {
    if (stateStage === 3) setTimeout(() => setStateStage(1), 2000);
  }, [stateStage]);
  return <div className="bay-button">{stage[stateStage]}</div>;
}
