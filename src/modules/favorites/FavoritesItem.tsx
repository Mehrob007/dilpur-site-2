"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import PropertyOff from "../../../public/icons/PropertyOff.svg";
import PropertyOn from "../../../public/icons/PropertyOn.svg";

import { useStore } from "@/store/globalState";
import BayButton from "@/components/ui/BayButton";
import ProductDetails from "@/components/ui/ProductDetails";
import { usePathname, useRouter } from "next/navigation";
import { getFileURL } from "@/utils/getFileURL";
import { ItemT } from "@/types/product";
import { GetProductByIdREQ } from "@/api/product/product";

export default function FavoritesItem({ id }: { id: number }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { setProperty, deleteProperty, propertys } = useStore();
  const pathName = usePathname();
  const [data, setData] = useState<ItemT | null>(null);
  const [outOfStock, setOutOfStock] = useState(false);

  // console.table({
  //   img: img,
  //   title: title,
  //   subTitle: subTitle,
  //   price: price,
  //   discount: discount,
  //   details: details,
  //   property: property,
  //   id: id,
  // });

  const getDataById = async () => {
    try {
      const res = await GetProductByIdREQ({ id });

      setData({
        ...res.data,
      });
      setOutOfStock(res?.data?.outOfStock);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getDataById();
  }, []);

  console.log("data", data);

  return (
    <div className="product-item">
      <div className="product-item-img">
        <div
          className="image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            onClick={() => router.push(`/${pathName.split("/")[1]}/` + id)}
            className="img-product"
            src={
              !isHovered
                ? getFileURL((data?.images as string[])?.[0])
                : getFileURL((data?.images as string[])?.[1])
            }
            alt="img-product"
            width={360}
            height={500}
          />
          <BayButton
            id={id || 0}
            cost={data?.cost as number}
            preCost={data?.preCost as number}
          />
        </div>

        <ProductDetails
          preCostProcent={
            data?.preCost && data?.cost
              ? Math.floor(
                  ((Number(data.preCost) - Number(data.cost)) /
                    Number(data.preCost)) *
                    100,
                )
              : 0
          }
          details={data?.tags as string[]}
        />

        <div className="property-like">
          {propertys?.includes(id as number) ? (
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
        </div>
      </div>
      <div className="product-item-info">
        <div className="product-item-text">
          <h1 onClick={() => router.push(`/${pathName.split("/")[1]}/` + id)}>
            {data?.name as string}
          </h1>
          <p>{data?.description as string}</p>
        </div>
        <div className="product-item-price">
          {outOfStock ? (
            <span className="out-of-stock">Нет в наличии</span>
          ) : (
            <>
              {data?.preCost ? (
                <>
                  <div className="discount">{data?.preCost as number} c.</div>{" "}
                  <div className="crossed">{data?.cost as number} c.</div>
                </>
              ) : (
                <div className="price">{data?.cost as number} c.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
