"use client";
import { ItemT, ProductItemsT } from "@/types/product";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import TypesProductHeader from "./TypesProductHeader";
import ProductItem from "./ProductItem";
import ProductItemsError from "./ProductItemsError";
import { usePathname, useSearchParams } from "next/navigation";
import { GetProductREQ } from "@/api/product/product";
import { useGlobalState } from "@/store/globalState";

export default function ProductItems({
  title,
  type = null,
  Limit = 21,
  TypeId,
  searchName,
}: ProductItemsT) {
  // const [data, setData] = useState<ProductItemT[] | null>(null);
  const [error] = useState<boolean>(false);
  // const { propertys } = useStore();
  const pathName = usePathname();
  const { gender } = useGlobalState();
  const searchParams = useSearchParams();
  const types = searchParams.getAll("types");
  const categorys = searchParams.getAll("categorys");
  const sizes = searchParams.getAll("sizes");
  const sorts = searchParams.get("sorts");
  const name = searchName || searchParams.get("name");
  // const [propertys, setPropertys] = useState<number[] | null>(null);
  // const propertys: number[] = getKeyStorage("property");

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
  const typesKey = types.join(",");
  const categorysKey = categorys.join(",");
  const sizesKey = sizes.join(",");

  const typeIds = useMemo(
    () => (TypeId ? [TypeId] : types.map((e) => +e)),
    [TypeId, typesKey, types],
  );
  const categoryIds = useMemo(
    () => categorys.map((e) => +e),
    [categorysKey, categorys],
  );
  const sizeIds = useMemo(() => sizes.map((e) => +e), [sizesKey, sizes]);

  const getData = useCallback(
    async (Name?: string, reset: boolean = false, pageNum: number = 0) => {
      try {
        const sender = gender === "female" ? 1 : 0;
        const res = await GetProductREQ({
          Limit,
          Name: Name || (name as string),
          Page: pageNum,
          TypeIds: typeIds,
          CategoriesIds: categoryIds,
          SizeIds: sizeIds,
          SortType: sorts || "",
          Gender: sender,
        });
        if (res && res.data) {
          if (reset) {
            setData(res.data);
            setPage(0);
          } else setData((prev) => [...prev, ...res.data]);
        }
      } catch (e) {
        setData([]);
        console.log(e);
      } finally {
        setFetching(false);
      }
    },
    [Limit, categoryIds, name, gender, sizeIds, sorts, typeIds],
  );

  useEffect(() => {
    getData(undefined, true, 0);
  }, [typesKey, categorysKey, sizesKey, sorts, name, gender]);

  useEffect(() => {
    if (page > 0) {
      getData(undefined, false, page);
    }
  }, [page, getData]);

  return (
    <div className="product-items max-width">
      <div className="product-items-header">
        <h1>{title}</h1>
        {(type === "goBack" || type === "filter") && (
          <TypesProductHeader type={type} className="desktop" />
        )}
      </div>
      <div
        onScroll={(e) => scrollHandler(e.currentTarget)}
        className={error || !data?.length ? "product-items-error" : "product-items-content"}
      >
        {error || !data?.length ? (
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
              title={(e?.brand as { name: string })?.name as string}
              subTitle={e.name as string}
              price={e.cost as number}
              discount={e.preCost as number}
              details={e.tags as string[]}
              // property={e.property}
            />
          ))
        )}
      </div>
      <div className="product-items-header mobile">
        <TypesProductHeader type={type} />
      </div>
    </div>
  );
}
