"use client";
import { ItemT, ProductItemsT, ProductItemT } from "@/types/product";
import React, { useEffect, useState } from "react";
import TypesProductHeader from "./TypesProductHeader";
import ProductItem from "./ProductItem";
import ProductItemsError from "./ProductItemsError";
import { useStore } from "@/store/globalState";
import { useSearchParams } from "next/navigation";
import { GetProductREQ } from "@/api/product/product";

export default function ProductItems({
  title,
  type = null,
  Limit = 21,
  pagination = false,
  TypeId,
  searchName
}: ProductItemsT) {
  // const [data, setData] = useState<ProductItemT[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const { propertys } = useStore();
  const searchParams = useSearchParams();
  const types = searchParams.getAll("types");
  const categorys = searchParams.getAll("categorys");
  const sizes = searchParams.getAll("sizes");
  const sorts = searchParams.get("sorts");
  const name = searchParams.get("name") || searchName;
  // const [propertys, setPropertys] = useState<number[] | null>(null);
  // const propertys: number[] = getKeyStorage("property");

  console.log("query", { types, categorys, sizes, sorts, name });

  const [page, setPage] = useState<number>(0);
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState<ItemT[] | []>([]);

  const scrollHandler = (target: {
    scrollHeight: number;
    scrollTop: number;
    clientHeight: number;
  }) => {
    if (!fetching) {
      if (target.scrollHeight - (target.scrollTop + target.clientHeight) < 1) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };

  const getData = async (Name?: string, reset: boolean = false) => {
    try {
      const res = await GetProductREQ({
        Limit,
        Name: Name || (name as string),
        Page: reset ? 0 : page,
        TypeIds: TypeId ? [TypeId] : types.map((e) => +e),
        CategoriesIds: categorys.map((e) => +e),
        SizeIds: sizes.map((e) => +e),
        SortType: sorts || "",
      });
      if (reset) {
        setData(res.data);
        setPage(0);
      } else setData([...data, ...res.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    getData(undefined, true);
  }, [types.join(","), categorys.join(","), sizes.join(","), sorts, name]);

  console.log("data", data);

  return (
    <div className="product-items max-width">
      <div className="product-items-header">
        <h1>{title}</h1>

        <TypesProductHeader type={type} />
      </div>
      <div
        onScroll={(e) => scrollHandler(e.currentTarget)}
        className={error ? "" : "product-items-content"}
      >
        {error ? (
          <ProductItemsError />
        ) : (
          Array.isArray(data) &&
          data.map((e, i) => (
            <ProductItem
              key={i}
              id={e.id as number}
              img={
                Array.isArray(e.fileNames) ? (e.fileNames as string[]) : [""]
              }
              title={e.name as string}
              subTitle={e.preName as string}
              price={e.cost as number}
              discount={e.preCost as number}
              // details={e.tags as string[]}
              // property={e.property}
            />
          ))
        )}
      </div>
    </div>
  );
}
