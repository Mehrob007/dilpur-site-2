"use client";
import React, { ReactElement, useEffect, useState, useCallback } from "react";
import checkCircle from "../../../public/icons/checkCircle.svg";
import Image from "next/image";
import { sizeT } from "@/types/product";
import { useGlobalState } from "@/store/globalState";
import { GetProductByIdREQ } from "@/api/product/product";

export default function BayButton({
  id,
  cost,
  preCost,
}: {
  id: number;
  cost: number;
  preCost?: number;
}) {
  const [stateStage, setStateStage] = useState<number>(1);
  const { setBasketItems } = useGlobalState();

  const [sizes, setSizes] = useState<sizeT[]>();

  const addProdductToBasket = ({
    id,
    size,
    cost,
    preCost,
  }: {
    id: number;
    size: sizeT;
    cost: number;
    preCost?: number;
  }) => {
    const basketIds: {
      id: number;
      size: sizeT;
      count: number;
      cost: number;
      preCost?: number;
    }[] = JSON.parse(localStorage.getItem("basketIds") || "[]");
    if (basketIds?.find((e) => e.id === id)) {
      localStorage.setItem(
        "basketIds",
        JSON.stringify(
          basketIds.map((e) => {
            if (e.id === id) {
              return { ...e, count: e.count + 1 };
            } else {
              return e;
            }
          })
        )
      );
      setBasketItems(
        basketIds.map((e) => {
          if (e.id === id) {
            return { ...e, count: e.count + 1 };
          } else {
            return e;
          }
        })
      );
    } else {
      localStorage.setItem(
        "basketIds",
        JSON.stringify([...basketIds, { id, size, count: 1, cost, preCost }])
      );
      setBasketItems([...basketIds, { id, size, count: 1, cost, preCost }]);
    }
  };
  const getDataBasket = useCallback(async (id: number) => {
    try {
      const res = await GetProductByIdREQ({
        id: id,
      });
      const data = res?.data;
      setSizes(data?.sizes);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getDataBasket(id);
  }, [getDataBasket, id]);

  const stage: { [key: number]: ReactElement } = {
    1: (
      <div onClick={() => setStateStage(2)}>
        <h1>ДОБАВИТЬ В КОРЗИНУ</h1>
      </div>
    ),
    2: (
      <div className={"stage-size"}>
        {sizes &&
          sizes.map((e, i) => (
            <div
              key={i}
              onClick={() => {
                addProdductToBasket({
                  id,
                  size: e,
                  cost: cost,
                  preCost: preCost,
                });
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
