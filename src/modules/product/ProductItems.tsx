"use client";
import { ProductItemsT, ProductItemT } from "@/types/product";
import React, { useEffect, useState } from "react";
import TypesProductHeader from "./TypesProductHeader";
import ProductItem from "./ProductItem";
import ProductItemsError from "./ProductItemsError";
import { ArrDefData } from "@/constants/product";
import { useStore } from "@/store/globalState";
import { useSearchParams } from "next/navigation";

export default function ProductItems({
  title,
  type = null,
  getURl,
  limit = 20,
  pagination = false,
}: ProductItemsT) {
  const [data, setData] = useState<ProductItemT[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const { propertys } = useStore();
  const searchParams = useSearchParams();
  const types = searchParams.getAll("types");
  const categorys = searchParams.getAll("categorys");
  const sizes = searchParams.getAll("sizes");
  const sorts = searchParams.get("sorts");
  // const [propertys, setPropertys] = useState<number[] | null>(null);
  // const propertys: number[] = getKeyStorage("property");

  console.log("query", { types, categorys, sizes, sorts });

  useEffect(() => {
    setData(
      ArrDefData.map((e, i) => ({
        ...e,
        property: Boolean(propertys.includes(i)),
      }))
    );
  }, [propertys]);

  return (
    <div className="product-items max-width">
      <div className="product-items-header">
        <h1>{title}</h1>

        <TypesProductHeader type={type} />
      </div>
      <div className={error ? "" : "product-items-content"}>
        {error ? (
          <ProductItemsError />
        ) : (
          Array.isArray(data) &&
          data
            .filter((_, i) => i < limit)
            .map((e, i) => (
              <ProductItem
                key={i}
                id={i}
                img={e.img}
                title={e.title}
                subTitle={e.subTitle}
                price={e.price}
                discount={e.discount}
                details={e.details}
                property={e.property}
              />
            ))
        )}
      </div>
    </div>
  );
}
